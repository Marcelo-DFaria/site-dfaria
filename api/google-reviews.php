<?php
/**
 * Endpoint server-side das avaliações do Perfil da Empresa no Google.
 *
 * A chave do Google Places API (New) fica SOMENTE neste servidor
 * (arquivo api/config.php, fora do bundle JavaScript). O navegador
 * consulta apenas https://dfariagastronomia.com.br/api/google-reviews.php
 * e nunca vê a chave.
 *
 * A chave deve continuar restrita ao IP do servidor (69.6.248.61)
 * e somente à Places API (New).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$apiKey = getenv('GOOGLE_API_KEY') ?: '';
$configFile = __DIR__ . '/config.php';
if ($apiKey === '' && is_readable($configFile)) {
    $config = require $configFile;
    if (is_array($config) && !empty($config['google_api_key'])) {
        $apiKey = (string) $config['google_api_key'];
    }
}

$placeQuery = "D'Faria Gastronomia e Eventos, Cesário Lange - SP";
$cacheFile = sys_get_temp_dir() . '/dfaria-google-reviews.json';
$cacheTtl = 6 * 3600; // 6 horas

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function readCache(string $file, int $ttl): ?array
{
    if (!is_readable($file)) {
        return null;
    }
    if (time() - (int) filemtime($file) > $ttl) {
        return null;
    }
    $data = json_decode((string) file_get_contents($file), true);
    return is_array($data) ? $data : null;
}

$cached = readCache($cacheFile, $cacheTtl);
if ($cached !== null) {
    respond($cached);
}

if ($apiKey === '') {
    respond(['reviews' => [], 'error' => 'missing_key'], 200);
}

function callPlaces(string $url, string $apiKey, string $fieldMask, ?array $body = null): ?array
{
    $ch = curl_init($url);
    $headers = [
        'Content-Type: application/json',
        'X-Goog-Api-Key: ' . $apiKey,
        'X-Goog-FieldMask: ' . $fieldMask,
    ];
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => $headers,
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_UNICODE));
    }
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($raw === false || $status < 200 || $status >= 300) {
        return null;
    }
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : null;
}

// 1. Localiza o place oficial.
$search = callPlaces(
    'https://places.googleapis.com/v1/places:searchText',
    $apiKey,
    'places.id',
    ['textQuery' => $placeQuery, 'languageCode' => 'pt-BR']
);

$placeId = $search['places'][0]['id'] ?? null;
if (!$placeId) {
    respond(['reviews' => [], 'error' => 'place_not_found'], 200);
}

// 2. Busca detalhes e avaliações reais.
$details = callPlaces(
    'https://places.googleapis.com/v1/places/' . rawurlencode($placeId) . '?languageCode=pt-BR',
    $apiKey,
    'id,rating,userRatingCount,googleMapsUri,reviews'
);

if ($details === null) {
    respond(['reviews' => [], 'error' => 'places_error'], 200);
}

$reviews = [];
foreach (($details['reviews'] ?? []) as $i => $review) {
    $text = $review['originalText']['text'] ?? ($review['text']['text'] ?? '');
    if (trim((string) $text) === '') {
        continue;
    }
    $reviews[] = [
        'id' => $review['name'] ?? ('review-' . $i),
        'rating' => (float) ($review['rating'] ?? 0),
        'text' => (string) $text,
        'author' => (string) ($review['authorAttribution']['displayName'] ?? ''),
        'authorPhoto' => $review['authorAttribution']['photoUri'] ?? null,
        'authorUri' => $review['authorAttribution']['uri'] ?? null,
        'reviewUri' => $review['googleMapsUri'] ?? null,
        'relative' => $review['relativePublishTimeDescription'] ?? null,
    ];
}

$payload = [
    'updatedAt' => gmdate('c'),
    'rating' => isset($details['rating']) ? (float) $details['rating'] : null,
    'total' => isset($details['userRatingCount']) ? (int) $details['userRatingCount'] : null,
    'mapsUri' => $details['googleMapsUri'] ?? null,
    'reviews' => $reviews,
];

@file_put_contents($cacheFile, json_encode($payload, JSON_UNESCAPED_UNICODE));

respond($payload);
