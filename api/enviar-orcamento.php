<?php
/**
 * Ponte do formulário de orçamento do D'Faria Gastronomia e Eventos.
 *
 * 1. Envia notificação por e-mail para o D'Faria com os 6 dados do evento.
 * 2. Repassa opcionalmente para o sistema administrativo (se configurado em api/config.php).
 * 3. Garante resposta JSON limpa para o frontend.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

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

$bruto = file_get_contents('php://input');
if ($bruto === false || strlen($bruto) > 20000) {
    responder(['ok' => false, 'erro' => 'Dados inválidos.'], 400);
}

$dados = json_decode($bruto, true);
if (!is_array($dados) || json_last_error() !== JSON_ERROR_NONE) {
    responder(['ok' => false, 'erro' => 'Dados inválidos.'], 400);
}

// 6 Campos Oficiais
$nome = trim((string) ($dados['nome'] ?? ''));
$email = trim((string) ($dados['email'] ?? ''));
$whatsapp = trim((string) ($dados['whatsapp'] ?? ''));
$dataEvento = trim((string) ($dados['data_evento'] ?? ''));
$convidados = trim((string) ($dados['convidados'] ?? ''));
$local = trim((string) ($dados['local'] ?? ($dados['local_festa'] ?? '')));

// Validações
if (comprimento($nome) < 2) {
    responder(['ok' => false, 'erro' => 'Por favor, informe seu nome completo.'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(['ok' => false, 'erro' => 'Por favor, informe um e-mail válido.'], 400);
}
if (comprimento(preg_replace('/\D/', '', $whatsapp)) < 10) {
    responder(['ok' => false, 'erro' => 'Por favor, informe um WhatsApp válido com DDD.'], 400);
}
if (empty($dataEvento)) {
    responder(['ok' => false, 'erro' => 'Por favor, informe a data do evento.'], 400);
}
if (empty($convidados) || (int) $convidados <= 0) {
    responder(['ok' => false, 'erro' => 'Informe o número estimado de convidados.'], 400);
}
if (comprimento($local) < 2) {
    responder(['ok' => false, 'erro' => 'Por favor, informe o local ou cidade do evento.'], 400);
}

// Carregar configurações locais se existirem
$configFile = __DIR__ . '/config.php';
$config = [];
if (is_readable($configFile)) {
    try {
        $carregado = require $configFile;
        $config = is_array($carregado) ? $carregado : [];
    } catch (Throwable $e) {}
}

// E-mail de destino (definido em config.php ou padrão oficial)
$emailDestino = !empty($config['email_destino'])
    ? (string) $config['email_destino']
    : 'contato@dfariagastronomia.com.br';

// -------------------------------------------------------------
// DISPARO DE E-MAIL (HTML + TEXTO)
// -------------------------------------------------------------
$assunto = "Novo Pedido de Orçamento: " . $nome . " (" . $dataEvento . ")";
$assuntoCodificado = '=?UTF-8?B?' . base64_encode($assunto) . '?=';

$cleanWhatsappDigits = preg_replace('/\D/', '', $whatsapp);
$linkWaCliente = "https://wa.me/55" . $cleanWhatsappDigits;

$corpoHtml = <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<style>
  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f6f5f0; margin: 0; padding: 20px; color: #161a15; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #d4af37; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
  .header { background: #07150a; color: #fefaf0; padding: 25px 20px; text-align: center; border-bottom: 2px solid #d4af37; }
  .header h1 { margin: 0; font-size: 24px; color: #d4af37; letter-spacing: 1px; }
  .header p { margin: 5px 0 0; font-size: 13px; color: #e6c875; text-transform: uppercase; letter-spacing: 2px; }
  .content { padding: 30px; }
  .lead-title { font-size: 18px; font-weight: 600; color: #07150a; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
  .field-row { margin-bottom: 15px; }
  .field-label { font-size: 12px; text-transform: uppercase; color: #888; font-weight: 600; letter-spacing: 0.5px; }
  .field-value { font-size: 16px; color: #161a15; font-weight: 500; margin-top: 3px; }
  .wa-btn { display: inline-block; background: #25d366; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 14px; margin-top: 20px; }
  .footer { background: #fdfaf3; padding: 15px 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; text-align: center; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>D'FARIA</h1>
    <p>Gastronomia e Eventos</p>
  </div>
  <div class="content">
    <div class="lead-title">Novo Pedido de Orçamento Recebido pelo Site</div>
    
    <div class="field-row">
      <div class="field-label">Nome Completo:</div>
      <div class="field-value">{$nome}</div>
    </div>
    
    <div class="field-row">
      <div class="field-label">E-mail:</div>
      <div class="field-value"><a href="mailto:{$email}">{$email}</a></div>
    </div>
    
    <div class="field-row">
      <div class="field-label">WhatsApp:</div>
      <div class="field-value">{$whatsapp}</div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Data Prevista do Evento:</div>
      <div class="field-value"><strong>{$dataEvento}</strong></div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Número Estimado de Convidados:</div>
      <div class="field-value"><strong>{$convidados} convidados</strong></div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Local / Cidade da Festa:</div>
      <div class="field-value">{$local}</div>
    </div>

    <div style="text-align: center; margin-top: 25px;">
      <a href="{$linkWaCliente}" class="wa-btn" target="_blank">Abrir WhatsApp com o Cliente</a>
    </div>
  </div>
  <div class="footer">
    Solicitação enviada em {$dataEvento} via dfariagastronomia.com.br
  </div>
</div>
</body>
</html>
HTML;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: D\'Faria Site <nao-responder@dfariagastronomia.com.br>',
    'Reply-To: ' . $nome . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

@mail($emailDestino, $assuntoCodificado, $corpoHtml, implode("\r\n", $headers));

// -------------------------------------------------------------
// REPASSE AO SISTEMA ADMINISTRATIVO (SE CONFIGURADO)
// -------------------------------------------------------------
$token = !empty($config['lead_form_token']) ? (string) $config['lead_form_token'] : '';
$endpoint = !empty($config['lead_endpoint']) ? (string) $config['lead_endpoint'] : '';

if ($token !== '' && $endpoint !== '') {
    $payloadAdmin = json_encode([
        'nome' => $nome,
        'email' => $email,
        'whatsapp' => $whatsapp,
        'data_evento' => $dataEvento,
        'convidados' => $convidados,
        'local' => $local,
        'cidade' => $local,
        'tipo_evento' => 'Orçamento via Site',
        'mensagem' => "Orçamento solicitado via site.\nData: {$dataEvento}\nConvidados: {$convidados}\nLocal: {$local}"
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if (function_exists('curl_init')) {
        $ch = curl_init($endpoint);
        if ($ch !== false) {
            curl_setopt_array($ch, [
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $payloadAdmin,
                CURLOPT_HTTPHEADER => [
                    'Accept: application/json',
                    'Content-Type: application/json',
                    'X-Form-Token: ' . $token,
                    'X-Client-IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'desconhecido'),
                    'Origin: https://dfariagastronomia.com.br',
                ],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CONNECTTIMEOUT => 4,
                CURLOPT_TIMEOUT => 8,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
            ]);
            curl_exec($ch);
            curl_close($ch);
        }
    }
}

// Retorno de Sucesso Garantido para o Navegador
responder([
    'ok' => true,
    'mensagem' => 'Orçamento registrado com sucesso e enviado para o e-mail!'
], 200);
