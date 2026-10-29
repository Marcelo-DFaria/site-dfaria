<?php
/**
 * Ponte do formulário de orçamento.
 *
 * O formulário de https://dfariagastronomia.com.br/orcamento envia para este
 * arquivo. Ele repassa os dados ao endpoint do sistema administrativo com a
 * chave secreta guardada em api/config.php — a chave nunca chega ao navegador.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const ENDPOINT_ATUAL = 'https://project--5688de85-1969-49a0-8bcd-bb1b4a17c55c-dev.lovable.app/api/public/lead-site';
const ENDPOINT_ANTIGO = 'https://project--5688de85-1969-49a0-8bcd-bb1b4a17c55c.lovable.app/api/public/lead-site';

function responder(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function comprimento(string $valor): int
{
    return function_exists('mb_strlen') ? mb_strlen($valor, 'UTF-8') : strlen($valor);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    responder(['ok' => false, 'erro' => 'Método não permitido.'], 405);
}

$configFile = __DIR__ . '/config.php';
$config = [];
if (is_readable($configFile)) {
    try {
        $carregado = require $configFile;
        $config = is_array($carregado) ? $carregado : [];
    } catch (Throwable $erro) {
        error_log('D\'Faria formulário: api/config.php inválido.');
    }
}
$token = is_array($config) && !empty($config['lead_form_token'])
    ? (string) $config['lead_form_token']
    : (string) (getenv('LEAD_FORM_TOKEN') ?: '');
$endpoint = is_array($config) && !empty($config['lead_endpoint'])
    ? (string) $config['lead_endpoint']
    : ENDPOINT_ATUAL;

// O endereço sem “-dev” só funciona depois de uma publicação do sistema e
// atualmente devolve uma página HTML “No published build”. Esta compatibilidade
// corrige instalações que ainda tenham o endereço antigo no config.php.
if (rtrim($endpoint, '/') === ENDPOINT_ANTIGO) {
    $endpoint = ENDPOINT_ATUAL;
}

if ($token === '' || $endpoint === '') {
    error_log('D\'Faria formulário: configuração ausente ou incompleta.');
    responder(['ok' => false, 'erro' => 'Formulário indisponível no momento. Fale pelo WhatsApp.'], 503);
}

if (!filter_var($endpoint, FILTER_VALIDATE_URL) || parse_url($endpoint, PHP_URL_SCHEME) !== 'https') {
    error_log('D\'Faria formulário: lead_endpoint inválido.');
    responder(['ok' => false, 'erro' => 'Formulário indisponível no momento. Fale pelo WhatsApp.'], 503);
}

if (!function_exists('curl_init')) {
    error_log('D\'Faria formulário: extensão cURL indisponível.');
    responder(['ok' => false, 'erro' => 'Formulário indisponível no momento. Fale pelo WhatsApp.'], 503);
}

$bruto = file_get_contents('php://input');
if ($bruto === false || strlen($bruto) > 20000) {
    responder(['ok' => false, 'erro' => 'Dados inválidos.'], 400);
}

$dados = json_decode($bruto, true);
if (!is_array($dados) || json_last_error() !== JSON_ERROR_NONE) {
    responder(['ok' => false, 'erro' => 'Dados inválidos.'], 400);
}

$campos = [
    'nome', 'whatsapp', 'email', 'data_evento', 'tipo_evento', 'convidados',
    'cidade', 'local', 'servicos', 'mensagem', 'website',
];
$limpo = [];
foreach ($campos as $campo) {
    $valor = $dados[$campo] ?? '';
    $limpo[$campo] = is_string($valor) ? trim($valor) : '';
}

if (comprimento($limpo['nome']) < 2) {
    responder(['ok' => false, 'erro' => 'Informe seu nome.'], 400);
}

$limites = [
    'nome' => 120, 'whatsapp' => 30, 'email' => 255, 'data_evento' => 10,
    'tipo_evento' => 80, 'convidados' => 6, 'cidade' => 80, 'local' => 120,
    'servicos' => 200, 'mensagem' => 2000, 'website' => 100,
];
foreach ($limites as $campo => $maximo) {
    if (comprimento($limpo[$campo]) > $maximo) {
        responder(['ok' => false, 'erro' => 'Verifique os campos do formulário.'], 400);
    }
}

$json = json_encode($limpo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($json === false) {
    responder(['ok' => false, 'erro' => 'Dados inválidos.'], 400);
}

$ch = curl_init($endpoint);
if ($ch === false) {
    responder(['ok' => false, 'erro' => 'Não foi possível enviar agora. Fale pelo WhatsApp.'], 502);
}
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $json,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'X-Form-Token: ' . $token,
        'X-Client-IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'desconhecido'),
        'Origin: https://dfariagastronomia.com.br',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
]);
$resposta = curl_exec($ch);
$curlErro = curl_errno($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($resposta === false || $curlErro !== 0 || $status === 0) {
    error_log('D\'Faria formulário: falha cURL, código ' . $curlErro . '.');
    responder(['ok' => false, 'erro' => 'Não foi possível enviar agora. Fale pelo WhatsApp.'], 502);
}

$decodificada = json_decode($resposta, true);
if (!is_array($decodificada) || json_last_error() !== JSON_ERROR_NONE) {
    // Evita repassar HTML de erro, redirects ou páginas do provedor ao navegador.
    error_log('D\'Faria formulário: backend retornou resposta não JSON, HTTP ' . $status . '.');
    responder(['ok' => false, 'erro' => 'Não foi possível enviar agora. Fale pelo WhatsApp.'], 502);
}

if ($status >= 200 && $status < 300 && ($decodificada['ok'] ?? false) === true) {
    responder(['ok' => true], 200);
}

$mensagem = isset($decodificada['erro']) && is_string($decodificada['erro'])
    ? $decodificada['erro']
    : 'Não foi possível enviar agora. Fale pelo WhatsApp.';
$statusSeguro = $status >= 400 && $status <= 599 ? $status : 502;
error_log('D\'Faria formulário: backend recusou o envio, HTTP ' . $statusSeguro . '.');
responder(['ok' => false, 'erro' => $mensagem], $statusSeguro);
