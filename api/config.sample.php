<?php
/**
 * Copie este arquivo como api/config.php no servidor (HostGator)
 * e preencha os valores reais.
 *
 * A chave do Google deve permanecer restrita ao IP do servidor
 * e somente à Places API (New).
 *
 * O arquivo real api/config.php NÃO deve ser enviado ao navegador, incluído
 * em ZIPs ou sobrescrito em atualizações futuras.
 *
 * Valores obrigatórios:
 * - google_api_key: chave da Places API (New), usada SOMENTE pelas avaliações;
 * - lead_form_token: deve ser idêntico ao segredo LEAD_FORM_TOKEN guardado no
 *   sistema administrativo;
 * - lead_endpoint: endereço HTTPS abaixo, sem alterações.
 *
 * As duas integrações são independentes: uma falha no Google Reviews não
 * interfere no envio de pedidos de orçamento.
 *
 * Este arquivo é lido apenas pelo PHP no servidor — nunca é enviado ao navegador.
 */

return [
    'google_api_key' => 'COLE_AQUI_A_CHAVE_DO_GOOGLE_PLACES',

    // Chave secreta compartilhada com o sistema administrativo.
    'lead_form_token' => 'COLE_AQUI_A_CHAVE_DO_FORMULARIO',

    // Endereço do sistema administrativo que recebe os pedidos de orçamento.
    'lead_endpoint' => 'https://project--5688de85-1969-49a0-8bcd-bb1b4a17c55c-dev.lovable.app/api/public/lead-site',
];
