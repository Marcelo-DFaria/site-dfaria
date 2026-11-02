/**
 * D'FARIA GASTRONOMIA E EVENTOS — RUNTIME PREMIUM ENGINE
 * Padrão Google Stitch (Haute Flamme Gastronomie) & Hero/Menu Claudia Rauscher
 * Preserva 100% de todas as 53 URLs, Modal de Orçamento (6 campos) e WhatsApp VIP.
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5515996834734';

  /* ==========================================================================
     1. INICIALIZAÇÃO E CONTROLE DE ESTADO
     ========================================================================== */
  function initEngine() {
    setupHeaderAndDrawer();
    setupHeroCinematic();
    setupCardapiosLuxury();
    setupQuoteModal();
    setupFloatingWhatsApp();
    setupBadgesAndSeals();
  }

  /* ==========================================================================
     2. CABEÇALHO & DRAWER EDITORIAL (ESTILO CLAUDIA RAUSCHER + STITCH)
     ========================================================================== */
  function setupHeaderAndDrawer() {
    const header = document.querySelector('header');
    if (!header) return;

    // Atualiza estrutura interna do header para o padrão refinado
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    
    header.innerHTML = `
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="/" class="flex items-center gap-3.5 text-decoration-none group" aria-label="D'Faria Gastronomia - Início">
          <img src="/logo-dfaria.png" alt="D'Faria Gastronomia e Eventos" class="df-header-logo-img" />
          <div class="hidden sm:flex flex-col">
            <span class="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] text-[#e4c27d] uppercase font-semibold">D'Faria</span>
            <span class="font-['Playfair_Display'] text-sm text-[#e4e2de] tracking-wide font-normal">Haute Gastronomie</span>
          </div>
        </a>

        <!-- Menu Desktop Horizontal -->
        <nav class="hidden lg:flex items-center gap-2" aria-label="Navegação Principal">
          <a href="/" ${isHome ? 'aria-current="page"' : ''}>Início</a>
          <a href="/cardapios" ${window.location.pathname.includes('/cardapios') ? 'aria-current="page"' : ''}>Cardápios</a>
          <a href="/eventos" ${window.location.pathname.includes('/eventos') ? 'aria-current="page"' : ''}>Eventos</a>
          <a href="/gastronomia" ${window.location.pathname.includes('/gastronomia') ? 'aria-current="page"' : ''}>Gastronomia</a>
          <a href="/depoimentos" ${window.location.pathname.includes('/depoimentos') ? 'aria-current="page"' : ''}>Depoimentos</a>
          <a href="/contato" ${window.location.pathname.includes('/contato') ? 'aria-current="page"' : ''}>Contato</a>
        </nav>

        <!-- Ações do Header -->
        <div class="flex items-center gap-3">
          <button type="button" onclick="window.dfOpenOrcamentoModal()" class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded text-[11px] font-bold tracking-widest uppercase bg-[#e4c27d] text-[#261a00] hover:brightness-110 transition-all shadow-md">
            <span>Orçamento VIP</span>
          </button>
          
          <button type="button" id="df-btn-open-drawer" class="df-menu-trigger-btn" aria-label="Abrir Menu Completo">
            <span class="material-symbols-outlined text-[20px]">menu</span>
            <span class="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>
    `;

    // Garante existência do Drawer Lateral Editorial no DOM
    if (!document.getElementById('editorial-drawer')) {
      const drawerWrap = document.createElement('div');
      drawerWrap.innerHTML = `
        <div id="editorial-drawer-backdrop"></div>
        <aside id="editorial-drawer" aria-label="Menu Editorial de Navegação">
          <div>
            <div class="flex items-center justify-between pb-6 border-b border-[#e4c27d]/20">
              <div class="flex items-center gap-3">
                <img src="/logo-dfaria.png" alt="D'Faria" style="height: 38px; width: auto;" />
                <span class="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-[0.2em] text-[#e4c27d] font-bold">Haute Flamme</span>
              </div>
              <button type="button" id="df-btn-close-drawer" class="w-10 h-10 flex items-center justify-center text-[#d0c5b4] hover:text-[#e4c27d] transition-colors" aria-label="Fechar Menu">
                <span class="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            <!-- Categorias Principais -->
            <div class="mt-8 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
              <div>
                <span class="text-[10px] font-bold tracking-[0.25em] text-[#998f80] uppercase block mb-3 font-['Plus_Jakarta_Sans']">Experiências &amp; Cardápios</span>
                <nav class="flex flex-col">
                  <a href="/cardapios"><span>Coleções &amp; Menus</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/gastronomia"><span>Alta Gastronomia &amp; Fogo</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/eventos"><span>Casamentos &amp; Grandes Eventos</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/frios-e-finger-food"><span>Ilhas de Frios &amp; Grazing Tables</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/alugue-material-para-festa"><span>D'Faria Locações &amp; Acervo</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                </nav>
              </div>

              <div>
                <span class="text-[10px] font-bold tracking-[0.25em] text-[#998f80] uppercase block mb-3 font-['Plus_Jakarta_Sans']">Destinos &amp; Condomínios</span>
                <nav class="flex flex-col">
                  <a href="/buffet-no-ninho-verde-1"><span>Ninho Verde I &amp; II</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/buffet-novillage-manacá"><span>Village Manacá (Tatuí)</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/colina-das-estrelas"><span>Colina das Estrelas</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/condominio-haras-vitória"><span>Haras Vitória</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/regioes"><span>Todas as 53 Cidades Atendidas</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                </nav>
              </div>

              <div>
                <span class="text-[10px] font-bold tracking-[0.25em] text-[#998f80] uppercase block mb-3 font-['Plus_Jakarta_Sans']">A Casa &amp; Contato</span>
                <nav class="flex flex-col">
                  <a href="/o-dfaria"><span>O Legado do Chef Cristiano</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/depoimentos"><span>Depoimentos &amp; Avaliações 5.0</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                  <a href="/contato"><span>Concierge &amp; Reservas</span><span class="material-symbols-outlined text-sm">north_east</span></a>
                </nav>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-[#e4c27d]/15">
            <button type="button" onclick="window.dfCloseDrawer(); window.dfOpenOrcamentoModal();" class="w-full py-3.5 rounded bg-[#e4c27d] text-[#261a00] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all text-center">
              Solicitar Proposta Sob Medida
            </button>
            <p class="text-[11px] text-[#998f80] text-center mt-3 font-['Plus_Jakarta_Sans']">
              Cesário Lange • Atendimento em todo SP
            </p>
          </div>
        </aside>
      `;
      document.body.appendChild(drawerWrap);

      // Eventos de clique do drawer
      const drawer = document.getElementById('editorial-drawer');
      const backdrop = document.getElementById('editorial-drawer-backdrop');
      const btnOpen = document.getElementById('df-btn-open-drawer');
      const btnClose = document.getElementById('df-btn-close-drawer');

      window.dfOpenDrawer = function () {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      };

      window.dfCloseDrawer = function () {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      };

      if (btnOpen) btnOpen.addEventListener('click', window.dfOpenDrawer);
      if (btnClose) btnClose.addEventListener('click', window.dfCloseDrawer);
      if (backdrop) backdrop.addEventListener('click', window.dfCloseDrawer);
    }
  }

  /* ==========================================================================
     3. HERO CINEMATOGRÁFICA (ESTILO CLAUDIA RAUSCHER - SEM VÉU, COM VÍDEO REAL)
     ========================================================================== */
  function setupHeroCinematic() {
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    if (!isHome) return;

    // Localiza a primeira seção da Home
    const heroOld = document.querySelector('main > section:first-child');
    if (!heroOld) return;

    // Se já estiver com o novo layout cinematográfico, não re-renderiza
    if (document.getElementById('df-hero-cinematic-root')) return;

    const heroWrap = document.createElement('div');
    heroWrap.id = 'df-hero-cinematic-root';
    heroWrap.innerHTML = `
      <section class="hero-cinematic-container" aria-label="D'Faria Gastronomia e Eventos">
        <!-- Vídeo Institucional Real e Puro de Alta Definição -->
        <video class="hero-cinematic-video" autoplay muted loop playsinline preload="auto" poster="/og-dfaria.jpg">
          <source src="/video/dfaria-apresentacao.mp4" type="video/mp4" />
        </video>

        <!-- Scrim Cinematográfico para Legibilidade Pura (SEM VÉU AMARELO) -->
        <div class="hero-scrim-overlay"></div>

        <!-- Conteúdo Textual Majestoso -->
        <div class="hero-content-wrap">
          <!-- Tag de Tradição -->
          <div class="df-heritage-tag">
            <span class="pulse-dot"></span>
            <span class="text">Desde 2016 • Cesário Lange • +2.000 Eventos</span>
          </div>

          <!-- Título Principal -->
          <h1 class="hero-title-main">
            D’FARIA
            <span class="hero-title-sub">Gastronomia e Eventos</span>
          </h1>

          <!-- Frase Solicitada pelo Usuário -->
          <p class="hero-signature-quote">
            “Excelência em cada evento. Perfeição em cada detalhe.”
          </p>

          <!-- Descrição Editorial -->
          <p class="hero-body-desc">
            Experiências gastronômicas autorais, serviço impecável e cenografia sensorial para casamentos, celebrações residenciais e encontros corporativos de alto padrão.
          </p>

          <!-- Ações Soberanas -->
          <div class="hero-ctas-group">
            <button type="button" onclick="window.dfOpenOrcamentoModal()" class="df-btn-gold-solid">
              <span>Solicitar Orçamento</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <a href="/cardapios" class="df-btn-outline-glass">
              <span>Explorar Cardápios</span>
              <span class="material-symbols-outlined text-[18px]">restaurant_menu</span>
            </a>
          </div>

          <!-- Indicador de Rolagem -->
          <div class="hero-scroll-indicator">
            <span>Descubra a Arte</span>
            <div class="line"></div>
          </div>
        </div>
      </section>
    `;

    // Substitui a hero antiga pela nova
    heroOld.parentNode.replaceChild(heroWrap, heroOld);
  }

  /* ==========================================================================
     4. CONTRASTE IMPECÁVEL NOS CARDÁPIOS (NUNCA TEXTO BRANCO EM BRANCO)
     ========================================================================== */
  function setupCardapiosLuxury() {
    // 1) Força todo card e link de cardápio para contraste escuro
    const cards = document.querySelectorAll('a.group.flex.h-full.flex-col, .rounded-3xl.bg-ivory, article, div.rounded-xl.border');
    cards.forEach(card => {
      card.style.setProperty('background-color', '#1b1c1a', 'important');
      card.style.setProperty('border-color', 'rgba(228, 194, 125, 0.25)', 'important');
      card.style.setProperty('color', '#e4e2de', 'important');

      // Corrige divs filhas que herdaram fundo branco ou claro
      const innerDivs = card.querySelectorAll('div');
      innerDivs.forEach(d => {
        d.style.setProperty('background-color', 'transparent', 'important');
      });

      // Corrige títulos do card
      const titles = card.querySelectorAll('h2, h3, .font-display');
      titles.forEach(t => {
        t.style.setProperty('color', '#e4e2de', 'important');
        t.style.setProperty('font-family', "'Playfair Display', Georgia, serif", 'important');
      });

      // Corrige parágrafos de descrição
      const paras = card.querySelectorAll('p, .text-stone, .font-brand');
      paras.forEach(p => {
        p.style.setProperty('color', '#d0c5b4', 'important');
        p.style.setProperty('font-family', "'Plus Jakarta Sans', sans-serif", 'important');
        p.style.setProperty('font-weight', '300', 'important');
      });

      // Adiciona botão 'Pedir Proposta Deste Cardápio' caso não exista
      if (!card.querySelector('.df-btn-card-quote')) {
        const titleEl = card.querySelector('h3, h2');
        const menuTitle = titleEl ? titleEl.textContent.trim() : 'Cardápio Sob Medida';
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'df-btn-card-quote';
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[16px]">receipt_long</span>
          <span>Pedir Proposta Deste</span>
        `;
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          window.dfOpenOrcamentoModal(menuTitle);
        });

        // Insere no container de texto do card
        const textContainer = card.querySelector('.flex.flex-1.flex-col') || card;
        textContainer.appendChild(btn);
      }
    });
  }

  /* ==========================================================================
     5. MODAL DE ORÇAMENTO COM 6 CAMPOS (WHATSAPP + API PHP ENVIAR-ORCAMENTO)
     ========================================================================== */
  function setupQuoteModal() {
    if (document.getElementById('df-quote-modal-root')) return;

    const modalRoot = document.createElement('div');
    modalRoot.id = 'df-quote-modal-root';
    modalRoot.className = 'df-modal-backdrop';
    modalRoot.innerHTML = `
      <div class="df-modal-box" role="dialog" aria-modal="true" aria-labelledby="df-modal-title">
        <div class="flex items-center justify-between pb-4 border-b border-[#e4c27d]/20 mb-5">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#e4c27d] text-[28px]">stars</span>
            <div>
              <h3 id="df-modal-title" class="font-['Playfair_Display'] text-xl text-[#e4e2de] font-normal leading-tight">Solicitar Proposta Exclusiva</h3>
              <p class="font-['Plus_Jakarta_Sans'] text-xs text-[#998f80]">D'Faria Concierge • Resposta em até 2 horas</p>
            </div>
          </div>
          <button type="button" onclick="window.dfCloseOrcamentoModal()" class="w-9 h-9 flex items-center justify-center text-[#d0c5b4] hover:text-[#e4c27d] transition-colors" aria-label="Fechar Janela">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <form id="df-modal-quote-form" class="space-y-4">
          <!-- Campo 1: Nome -->
          <div>
            <label for="df-field-nome">Nome Completo *</label>
            <input type="text" id="df-field-nome" name="nome" required placeholder="Ex: Dra. Mariana Albuquerque" />
          </div>

          <!-- Campos 2 e 3: WhatsApp e E-mail -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="df-field-whatsapp">WhatsApp *</label>
              <input type="tel" id="df-field-whatsapp" name="whatsapp" required placeholder="(15) 99999-0000" />
            </div>
            <div>
              <label for="df-field-email">E-mail</label>
              <input type="email" id="df-field-email" name="email" placeholder="seu@email.com" />
            </div>
          </div>

          <!-- Campos 4 e 5: Data e Formato do Evento -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="df-field-data">Data Estimada *</label>
              <input type="date" id="df-field-data" name="data_evento" required />
            </div>
            <div>
              <label for="df-field-tipo">Tipo de Celebração *</label>
              <select id="df-field-tipo" name="tipo_evento" required>
                <option value="">Selecione o formato</option>
                <option value="Casamento / Bodas">Casamento / Bodas</option>
                <option value="Parrilla & Fogo de Chão Privado">Parrilla &amp; Fogo de Chão Privado</option>
                <option value="Aniversário / Festa Privada">Aniversário / Festa Privada</option>
                <option value="Evento Corporativo / Gala">Evento Corporativo / Gala</option>
                <option value="Locação de Materiais e Mobiliário">Locação de Materiais &amp; Acervo</option>
                <option value="Outro Formato Especial">Outro Formato Especial</option>
              </select>
            </div>
          </div>

          <!-- Campo 6: Convidados, Cidade e Cardápio Selecionado -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="df-field-convidados">Número de Convidados</label>
              <input type="number" id="df-field-convidados" name="convidados" min="20" placeholder="Ex: 100" />
            </div>
            <div>
              <label for="df-field-cidade">Cidade / Condomínio *</label>
              <input type="text" id="df-field-cidade" name="cidade" required placeholder="Ex: Ninho Verde II, Cesário Lange" />
            </div>
          </div>

          <!-- Detalhes e Cardápio Preferencial -->
          <div>
            <label for="df-field-cardapio">Cardápio de Interesse ou Mensagem</label>
            <textarea id="df-field-cardapio" name="mensagem" rows="2" placeholder="Conte-nos detalhes ou preferências gastronômicas..."></textarea>
          </div>

          <!-- Botão de Envio -->
          <button type="submit" class="w-full py-4 rounded bg-[#e4c27d] text-[#261a00] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg">
            <span class="material-symbols-outlined text-[18px]">send</span>
            <span>Enviar ao Concierge D'Faria</span>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modalRoot);

    // Funções Globais do Modal
    window.dfOpenOrcamentoModal = function (preselectedMenu) {
      const modal = document.getElementById('df-quote-modal-root');
      if (!modal) return;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (preselectedMenu) {
        const textarea = document.getElementById('df-field-cardapio');
        if (textarea) textarea.value = 'Interesse no cardápio: ' + preselectedMenu;
      }
    };

    window.dfCloseOrcamentoModal = function () {
      const modal = document.getElementById('df-quote-modal-root');
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    // Fechar ao clicar fora da caixa
    modalRoot.addEventListener('click', function (e) {
      if (e.target === modalRoot) window.dfCloseOrcamentoModal();
    });

    // Submissão do formulário
    const form = document.getElementById('df-modal-quote-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('df-field-nome').value.trim();
        const whats = document.getElementById('df-field-whatsapp').value.trim();
        const email = document.getElementById('df-field-email').value.trim();
        const data = document.getElementById('df-field-data').value;
        const tipo = document.getElementById('df-field-tipo').value;
        const convidados = document.getElementById('df-field-convidados').value.trim();
        const cidade = document.getElementById('df-field-cidade').value.trim();
        const msg = document.getElementById('df-field-cardapio').value.trim();

        // Envia cópia assíncrona para a API PHP se disponível
        try {
          fetch('/api/enviar-orcamento.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, whats, email, data, tipo, convidados, cidade, msg })
          }).catch(() => {});
        } catch (_) {}

        // Monta mensagem VIP no WhatsApp
        let textMsg = `Olá Concierge D'Faria! Gostaria de um orçamento exclusivo:%0A%0A`;
        textMsg += `*Nome:* ${encodeURIComponent(nome)}%0A`;
        textMsg += `*WhatsApp:* ${encodeURIComponent(whats)}%0A`;
        if (email) textMsg += `*E-mail:* ${encodeURIComponent(email)}%0A`;
        textMsg += `*Tipo de Celebração:* ${encodeURIComponent(tipo)}%0A`;
        textMsg += `*Data Estimada:* ${encodeURIComponent(data)}%0A`;
        textMsg += `*Local / Cidade:* ${encodeURIComponent(cidade)}%0A`;
        if (convidados) textMsg += `*Convidados:* ${encodeURIComponent(convidados)} pessoas%0A`;
        if (msg) textMsg += `*Cardápio / Detalhes:* ${encodeURIComponent(msg)}%0A`;

        window.dfCloseOrcamentoModal();
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${textMsg}`, '_blank');
      });
    }
  }

  /* ==========================================================================
     6. BOTÃO WHATSAPP FLUTUANTE
     ========================================================================== */
  function setupFloatingWhatsApp() {
    let btn = document.getElementById('btn-whatsapp-flutuante');
    if (!btn) {
      btn = document.createElement('a');
      btn.id = 'btn-whatsapp-flutuante';
      btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20D%27Faria.`;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.setAttribute('aria-label', 'Atendimento Concierge WhatsApp');
      btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 32px;">chat</span>`;
      document.body.appendChild(btn);
    }
  }

  /* ==========================================================================
     7. BADGES DE AUTORIDADE E CONDICIONAIS
     ========================================================================== */
  function setupBadgesAndSeals() {
    // Garante que o selo de Logística Certificada esteja presente nas páginas de condomínio
    const path = window.location.pathname.toLowerCase();
    const isCondoPage = path.includes('ninho-verde') || path.includes('colina-das-estrelas') || path.includes('manac') || path.includes('haras');
    
    if (isCondoPage && !document.getElementById('df-condo-badge-certified')) {
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        const badgeBox = document.createElement('div');
        badgeBox.id = 'df-condo-badge-certified';
        badgeBox.className = 'mx-auto max-w-4xl px-6 py-6 my-8 rounded-lg bg-[#20352c]/50 border border-[#e4c27d]/30 flex items-center gap-4';
        badgeBox.innerHTML = `
          <span class="material-symbols-outlined text-[#e4c27d] text-[36px] shrink-0">verified_user</span>
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#e4c27d] block">Logística Homologada</span>
            <p class="text-sm text-[#d0c5b4] mt-0.5">Operação independente com cozinha de campanha móvel, caminhões climatizados e acesso credenciado às portarias e regimentos internos.</p>
          </div>
        `;
        mainContainer.insertBefore(badgeBox, mainContainer.children[1] || null);
      }
    }
  }

  // Executa no DOMContentLoaded e após possíveis trocas de rota no SPA
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }

  // Observador de mutação para re-aplicar após hidratação do SPA
  let timeoutId = null;
  const observer = new MutationObserver(function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      setupCardapiosLuxury();
      setupHeaderAndDrawer();
    }, 150);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
