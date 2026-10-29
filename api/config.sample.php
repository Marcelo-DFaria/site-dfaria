<?php
/**
 * D'Faria Gastronomia e Eventos — Arquivo de Configuração
 *
 * Copie este arquivo como api/config.php no servidor (HostGator)
 * e preencha os valores reais.
 *
 * O arquivo api/config.php NUNCA é enviado ao navegador nem ao público.
 */

return [
    // E-mail que receberá os pedidos de orçamento preenchidos no site:
    'email_destino' => 'contato@dfariagastronomia.com.br',

    // Chave da Places API (New) do Google, para carregar avaliações do Google:
    'google_api_key' => 'COLE_AQUI_A_CHAVE_DO_GOOGLE_PLACES',

    // Chave secreta e endpoint do sistema administrativo (opcional):
    'lead_form_token' => 'COLE_AQUI_A_CHAVE_DO_FORMULARIO',
    'lead_endpoint' => 'https://project--5688de85-1969-49a0-8bcd-bb1b4a17c55c-dev.lovable.app/api/public/lead-site',
];
