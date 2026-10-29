D'FARIA GASTRONOMIA E EVENTOS — PUBLICAÇÃO NA HOSTGATOR

1. ONDE EXTRAIR
Extraia o conteúdo deste ZIP diretamente em /public_html.
Não existe pasta intermediária no pacote.

2. ARQUIVOS SUBSTITUÍDOS
Substitua os arquivos do site, inclusive .htaccess, páginas, assets e os scripts
api/enviar-orcamento.php e api/google-reviews.php.

IMPORTANTE: o pacote NÃO contém api/config.php e não apaga esse arquivo já
configurado no servidor. Não substitua nem exclua o seu api/config.php.

3. CONFIGURAÇÃO DO api/config.php
Se o arquivo ainda não existir, copie api/config.sample.php como api/config.php.
Preencha os três valores no formato documentado no arquivo de exemplo.

Variáveis obrigatórias:
- google_api_key: chave restrita à Places API (New) e ao IP da hospedagem;
- lead_form_token: mesmo valor do LEAD_FORM_TOKEN do sistema administrativo;
- lead_endpoint: endereço HTTPS já preenchido no arquivo de exemplo.

O formulário corrige automaticamente o endereço antigo sem “-dev” caso ele
ainda esteja salvo no config.php existente. Mesmo assim, o exemplo contém o
endereço atual correto.

4. COMO TESTAR
Acesse https://dfariagastronomia.com.br/orcamento, preencha nome e pelo menos
WhatsApp ou e-mail, envie e confirme a mensagem “Pedido enviado”. Depois,
confirme o novo registro no menu Leads do sistema administrativo, com origem
“site” e status “novo”.

5. RESPOSTA ESPERADA
Sucesso HTTP 200:
{"ok":true}

Erros sempre retornam JSON no formato:
{"ok":false,"erro":"mensagem"}

6. DIAGNÓSTICO RÁPIDO
- HTTP 400: campo inválido, contato ausente ou payload fora dos limites.
- HTTP 401: lead_form_token diferente do LEAD_FORM_TOKEN do sistema.
- HTTP 429: mais de cinco tentativas pelo mesmo IP em dez minutos.
- HTTP 502: endpoint inacessível, resposta não JSON, SSL/rede ou cURL.
- HTTP 503: config.php ausente/incompleto ou extensão cURL indisponível.

O api/config.php é bloqueado pelo .htaccess e nunca deve ser compartilhado.
Google Reviews e formulário são independentes; falhas do Google não impedem
o envio de pedidos.