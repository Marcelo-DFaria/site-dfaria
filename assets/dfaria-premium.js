/**
 * D'Faria Gastronomia e Eventos — Script Premium & Runtime Engine
 * Garante que todas as melhorias (Modal 6 campos, Galeria 15 Esculturas,
 * Botões Uiverse Animados e Preservação de URLs) funcionem tanto no SSR
 * quanto após a hidratação do React / TanStack Router.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. DADOS DAS 15 ESCULTURAS REAIS EM FRUTAS DO D'FARIA
     ========================================================================== */
  const SCULPTURES = [
    { id: '01', file: 'escultura-01.png', title: 'Centro Esculpido em Melancia Floral', badge: 'Arte Viva' },
    { id: '02', file: 'escultura-02.jpg', title: 'Entalhe Artístico Floral com Cisne de Melão', badge: 'Exclusivo' },
    { id: '03', file: 'escultura-03.jpg', title: 'Melancia Esculpida Especial de Réveillon', badge: 'Celebração' },
    { id: '04', file: 'escultura-04.png', title: 'Ilha de Frios com Frutas Tropicais e Mamão em Flor', badge: 'Alta Mesa' },
    { id: '05', file: 'escultura-05.png', title: 'Composição Esculpida em Abacaxi com Aves Decorativas', badge: 'Criação Única' },
    { id: '06', file: 'escultura-06.jpg', title: 'Escultura Geométrica em Melancia e Cascata de Frutas', badge: 'Harmonia' },
    { id: '07', file: 'escultura-07.png', title: 'Centro de Mesa em Melancia para Eventos de Fim de Ano', badge: 'Destaque' },
    { id: '08', file: 'escultura-08.jpg', title: 'Pétalas Esculpidas em Melancia com Uvas e Maçãs', badge: 'Detalhe Nobre' },
    { id: '09', file: 'escultura-09.png', title: 'Banquete de Fim de Ano com Mesa de Frutas Esculpidas', badge: 'Grande Formato' },
    { id: '10', file: 'escultura-10.jpg', title: 'Cesta de Melão Amarelo com Morangos e Uvas Nobres', badge: 'Delicadeza' },
    { id: '11', file: 'escultura-11.jpg', title: 'Arranjo Central Tropical com Pássaros e Melancia', badge: 'Arte Viva' },
    { id: '12', file: 'escultura-12.jpg', title: 'Escultura Real D’Faria — Pétalas em Camadas', badge: 'Assinatura D’Faria' },
    { id: '13', file: 'escultura-13.jpg', title: 'Composição Floral Clássica em Melancia', badge: 'Tradição' },
    { id: '14', file: 'escultura-14.jpg', title: 'Escultura de Boas-Vindas com Tipografia em Casca', badge: 'Personalizado' },
    { id: '15', file: 'escultura-15.jpg', title: 'Composição Esculpida Especial de Fim de Ano', badge: 'Arte Viva' }
  ];

  /* ==========================================================================
     2. TEMPLATES UIVERSE.IO
     ========================================================================== */
  const UIVERSE_SOCIAL_HTML = `
<ul class="example-2">
  <li class="icon-content">
    <a href="https://www.instagram.com/dfariagastronomia/" aria-label="Instagram" data-social="instagram" target="_blank" rel="noopener noreferrer">
      <div class="filled"></div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    </a>
    <div class="tooltip">Instagram</div>
  </li>
  <li class="icon-content">
    <a href="https://www.facebook.com/dfariagastronomia" aria-label="Facebook" data-social="facebook" target="_blank" rel="noopener noreferrer">
      <div class="filled"></div>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    </a>
    <div class="tooltip">Facebook</div>
  </li>
  <li class="icon-content">
    <a href="https://wa.me/5515996834734?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20o%20D&#x27;Faria." aria-label="WhatsApp" data-social="whatsapp" target="_blank" rel="noopener noreferrer">
      <div class="filled"></div>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03s.87 2.35 1 2.51c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"></path>
      </svg>
    </a>
    <div class="tooltip">WhatsApp</div>
  </li>
  <li class="icon-content">
    <a href="https://www.google.com/maps/place/D&#x27;Faria+Gastronomia+e+Eventos/@-23.2240952,-47.9538734,20z/data=!4m6!3m5!1s0x94c67b4af88cc327:0xdbf145a965fdadbc!8m2!3d-23.224285!4d-47.9537514!16s%2Fg%2F11fmm0h46x" aria-label="Avaliações no Google" data-social="google" target="_blank" rel="noopener noreferrer">
      <div class="filled"></div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </a>
    <div class="tooltip">Google Maps</div>
  </li>
</ul>
`;

  function createAnimatedButtonHtml(text, isSecondary) {
    const secClass = isSecondary ? ' secondary' : '';
    return `
<button class="animated-button${secClass} js-open-orcamento" type="button">
  <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
  </svg>
  <span class="text">${text}</span>
  <span class="circle"></span>
  <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
  </svg>
</button>
`.trim();
  }

  /* ==========================================================================
     3. MOTOR DE APLICAÇÃO DINÂMICA (SOBREVIVE AO REACT E AO TANSTACK ROUTER)
     ========================================================================== */
  let isApplying = false;

  function applyEnhancements() {
    if (isApplying) return;
    isApplying = true;

    try {
      const isSculpturePage = window.location.pathname.includes('esculturas-em-frutas');

      // A) Substituição da Capa errada (Brie) para Escultura Real
      const wrongCoverImgs = document.querySelectorAll('img[src*="foto-30-DGJvWG-c"]');
      wrongCoverImgs.forEach(img => {
        if (isSculpturePage || img.closest('a[href*="esculturas-em-frutas"]')) {
          img.src = '/assets/esculturas/escultura-12.jpg';
          img.alt = 'Esculturas Artísticas em Frutas — D’Faria Gastronomia';
        }
      });

      // B) Se estiver na página de esculturas, garantir a galeria com os 15 quadros animados
      if (isSculpturePage) {
        if (!document.getElementById('df-sculptures-gallery-container')) {
          injectSculptureGallery();
        }
      }

      // C) Aplicar os botões de redes sociais animados no rodapé
      const footers = document.querySelectorAll('footer');
      footers.forEach(footer => {
        const existingUiverse = footer.querySelector('.example-2');
        if (!existingUiverse) {
          const oldSocialUl = footer.querySelector('ul.flex.flex-wrap.items-center.gap-3');
          if (oldSocialUl) {
            oldSocialUl.outerHTML = UIVERSE_SOCIAL_HTML;
          }
        }
      });

      // D) Aplicar botões animados em todos os pontos de conversão
      const ctaLinks = document.querySelectorAll('a, button');
      ctaLinks.forEach(el => {
        if (el.classList.contains('animated-button')) return;
        if (el.id === 'btn-whatsapp-flutuante' || el.closest('#btn-whatsapp-flutuante')) return;
        if (el.id === 'df-btn-whatsapp-final' || el.closest('.df-modal-backdrop')) return;

        const text = el.textContent ? el.textContent.trim() : '';

        if (/Solicite seu orçamento|SOLICITAR ORÇAMENTO|Solicitar orçamento pelo WhatsApp/i.test(text) && !el.classList.contains('animated-button')) {
          const label = text.includes('SOLICITAR') ? 'SOLICITAR ORÇAMENTO' : 'Solicite seu orçamento';
          const temp = document.createElement('div');
          temp.innerHTML = createAnimatedButtonHtml(label, false);
          const newBtn = temp.firstElementChild;
          el.parentNode.replaceChild(newBtn, el);
        } else if (text === 'Pedir pelo formulário' && !el.classList.contains('animated-button')) {
          const temp = document.createElement('div');
          temp.innerHTML = createAnimatedButtonHtml('Pedir pelo formulário', true);
          const newBtn = temp.firstElementChild;
          el.parentNode.replaceChild(newBtn, el);
        }
      });

      // E) Garantir que todo botão com js-open-orcamento abra o modal
      bindButtons();

    } catch (err) {
      console.warn('[D’Faria Runtime] Aviso na sincronização:', err);
    } finally {
      isApplying = false;
    }
  }

  function injectSculptureGallery() {
    const main = document.querySelector('main') || document.body;
    const finalSection = main.querySelector('section:last-of-type') || main.lastElementChild;

    const container = document.createElement('section');
    container.id = 'df-sculptures-gallery-container';
    container.style.cssText = 'background: linear-gradient(180deg, #07150a 0%, #0a1e0f 50%, #07150a 100%); padding: 4rem 1.5rem; border-top: 1px solid rgba(207,168,83,0.18);';

    let gridHtml = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 3.5rem;">
          <p style="color: var(--df-gold); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.28em; font-weight: 600; margin-bottom: 0.8rem;">Acervo Fotográfico Real</p>
          <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; color: #ffffff; line-height: 1.15; margin: 0 0 1rem 0;">Galeria de Esculturas em Frutas</h2>
          <p style="color: rgba(252,250,245,0.85); font-size: 1.05rem; max-width: 62ch; margin: 0 auto; line-height: 1.6;">Obras autorais executadas artesanalmente em melancias, melões, abacaxis e mamões para centros de mesa e ilhas gastronômicas de luxo.</p>
        </div>
        <div class="df-sculpture-grid">
    `;

    SCULPTURES.forEach(s => {
      gridHtml += `
        <div class="df-sculpture-frame" data-lightbox-src="/assets/esculturas/${s.file}" data-lightbox-caption="${s.title}">
          <div class="df-sculpture-img-wrapper">
            <span class="df-sculpture-badge">${s.badge}</span>
            <img src="/assets/esculturas/${s.file}" alt="${s.title}" class="df-sculpture-img" loading="lazy" />
          </div>
          <div class="df-sculpture-info">
            <h3 class="df-sculpture-title">${s.title}</h3>
            <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--df-gold);">D’Faria Gastronomia</span>
              <span style="font-size: 0.75rem; color: rgba(252,250,245,0.7); display: inline-flex; align-items: center; gap: 4px;">Ampliar 🔍</span>
            </div>
          </div>
        </div>
      `;
    });

    gridHtml += `
        </div>
      </div>
    `;

    container.innerHTML = gridHtml;

    if (finalSection && finalSection.parentNode) {
      finalSection.parentNode.insertBefore(container, finalSection);
    } else {
      main.appendChild(container);
    }
  }

  /* ==========================================================================
     4. MODAL DE ORÇAMENTO PREMIUM (6 CAMPOS OBRIGATÓRIOS)
     ========================================================================== */
  function initModal() {
    if (document.getElementById('df-orcamento-modal')) return;

    const modalHtml = `
      <div id="df-orcamento-modal" class="df-modal-backdrop" aria-hidden="true">
        <div class="df-modal-card" role="dialog" aria-modal="true" aria-labelledby="df-modal-title">
          <button type="button" class="df-modal-close" id="df-modal-close-btn" aria-label="Fechar formulário">&times;</button>
          
          <div id="df-form-container">
            <div class="df-modal-header">
              <span class="df-modal-tag">D'Faria Gastronomia e Eventos</span>
              <h2 id="df-modal-title" class="df-modal-title">Solicitar Proposta de Orçamento</h2>
              <p class="df-modal-desc">Preencha os dados do seu evento para elaborarmos um cardápio e uma proposta sob medida.</p>
            </div>

            <form id="df-form-orcamento" class="df-form" novalidate>
              <div class="df-form-grid">
                <div class="df-form-group">
                  <label for="df-nome">Nome Completo *</label>
                  <input type="text" id="df-nome" name="nome" required placeholder="Seu nome completo" autocomplete="name" />
                  <span class="df-field-error" id="err-nome"></span>
                </div>

                <div class="df-form-group">
                  <label for="df-email">E-mail *</label>
                  <input type="email" id="df-email" name="email" required placeholder="seu@email.com" autocomplete="email" />
                  <span class="df-field-error" id="err-email"></span>
                </div>

                <div class="df-form-group">
                  <label for="df-whatsapp">WhatsApp (com DDD) *</label>
                  <input type="tel" id="df-whatsapp" name="whatsapp" required placeholder="(15) 99999-9999" autocomplete="tel" />
                  <span class="df-field-error" id="err-whatsapp"></span>
                </div>

                <div class="df-form-group">
                  <label for="df-data">Data do Evento *</label>
                  <input type="date" id="df-data" name="data_evento" required />
                  <span class="df-field-error" id="err-data"></span>
                </div>

                <div class="df-form-group">
                  <label for="df-convidados">Número de Convidados *</label>
                  <input type="number" id="df-convidados" name="convidados" required min="10" max="5000" placeholder="Ex: 120" />
                  <span class="df-field-error" id="err-convidados"></span>
                </div>

                <div class="df-form-group">
                  <label for="df-local">Local / Cidade do Evento *</label>
                  <input type="text" id="df-local" name="local_evento" required placeholder="Ex: Cesário Lange, Tatuí, Chácara..." />
                  <span class="df-field-error" id="err-local"></span>
                </div>
              </div>

              <div class="df-form-group" style="margin-top: 1rem;">
                <label for="df-obs">Observações / Preferências de Cardápio (Opcional)</label>
                <textarea id="df-obs" name="observacoes" rows="2" placeholder="Ex: Casamento, churrasco premium, ilha de frios, intolerâncias..."></textarea>
              </div>

              <div class="df-form-actions">
                <button type="submit" class="df-submit-btn" id="df-submit-btn">
                  <span>ENVIAR E SOLICITAR PROPOSTA</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>

              <p class="df-form-privacy">Seus dados serão utilizados exclusivamente para contato da equipe D'Faria Gastronomia e elaboração de sua proposta.</p>
            </form>
          </div>

          <div id="df-success-container" class="df-success-view" style="display: none;">
            <div class="df-success-icon">✓</div>
            <h3 class="df-success-title">Proposta Enviada com Sucesso!</h3>
            <p class="df-success-desc">Registramos suas informações. Para agilizar o retorno e obter atendimento imediato com o Chef Cristiano, clique no botão abaixo para conversar no WhatsApp:</p>

            <div class="df-success-summary" id="df-success-summary"></div>

            <a id="df-btn-whatsapp-final" href="#" target="_blank" rel="noopener noreferrer" class="df-whatsapp-final-btn whatsapp-direct-link">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z"></path>
              </svg>
              <span>CONTINUAR NO WHATSAPP AGORA</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('df-orcamento-modal');
    const closeBtn = document.getElementById('df-modal-close-btn');
    const form = document.getElementById('df-form-orcamento');
    const phoneInput = document.getElementById('df-whatsapp');

    // Máscara de telefone
    if (phoneInput) {
      phoneInput.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
          e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
          e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
          e.target.value = `(${v}`;
        }
      });
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });

    // Submissão do formulário
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('df-nome').value.trim();
      const email = document.getElementById('df-email').value.trim();
      const whatsapp = document.getElementById('df-whatsapp').value.trim();
      const data = document.getElementById('df-data').value;
      const convidados = document.getElementById('df-convidados').value.trim();
      const local = document.getElementById('df-local').value.trim();
      const obs = document.getElementById('df-obs').value.trim();

      if (!nome || !email || !whatsapp || !data || !convidados || !local) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      const submitBtn = document.getElementById('df-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando proposta...';

      const payload = { nome, email, whatsapp, data, convidados, local, obs };

      // Envia assíncrono para o backend
      try {
        fetch('/api/enviar-orcamento.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (err) {}

      // Monta WhatsApp
      const dataFormatada = data.split('-').reverse().join('/');
      const textMsg = `Olá! Gostaria de solicitar um orçamento com o D'Faria Gastronomia e Eventos:\n\n` +
        `• *Nome:* ${nome}\n` +
        `• *E-mail:* ${email}\n` +
        `• *WhatsApp:* ${whatsapp}\n` +
        `• *Data do Evento:* ${dataFormatada}\n` +
        `• *Nº de Convidados:* ${convidados}\n` +
        `• *Local/Cidade:* ${local}\n` +
        (obs ? `• *Observações:* ${obs}\n\n` : `\n`) +
        `Aguardo proposta personalizada!`;

      const waUrl = `https://wa.me/5515996834734?text=${encodeURIComponent(textMsg)}`;

      document.getElementById('df-form-container').style.display = 'none';
      const successView = document.getElementById('df-success-container');
      successView.style.display = 'block';

      const summary = document.getElementById('df-success-summary');
      summary.innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Evento:</strong> ${dataFormatada} • ${convidados} convidados</p>
        <p><strong>Local:</strong> ${local}</p>
      `;

      const finalWaBtn = document.getElementById('df-btn-whatsapp-final');
      finalWaBtn.href = waUrl;
      finalWaBtn.onclick = function (event) {
        event.stopPropagation();
        window.open(waUrl, '_blank');
      };
    });
  }

  function openModal() {
    initModal();
    const modal = document.getElementById('df-orcamento-modal');
    if (!modal) return;
    document.getElementById('df-form-container').style.display = 'block';
    document.getElementById('df-success-container').style.display = 'none';
    const submitBtn = document.getElementById('df-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>ENVIAR E SOLICITAR PROPOSTA</span>`;
    }
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('df-orcamento-modal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  window.dfOpenOrcamentoModal = openModal;
  window.dfCloseOrcamentoModal = closeModal;

  /* ==========================================================================
     5. LIGHTBOX DE ALTA RESOLUÇÃO
     ========================================================================== */
  function initLightbox() {
    if (document.getElementById('df-lightbox-modal')) return;

    const lbHtml = `
      <div id="df-lightbox-modal" class="df-lightbox" aria-hidden="true">
        <button type="button" class="df-lightbox-close" id="df-lightbox-btn-close">&times;</button>
        <div class="df-lightbox-content">
          <img id="df-lightbox-img" src="" alt="" class="df-lightbox-image" />
          <div id="df-lightbox-caption" class="df-lightbox-caption"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lbHtml);

    const lb = document.getElementById('df-lightbox-modal');
    const lbImg = document.getElementById('df-lightbox-img');
    const lbCap = document.getElementById('df-lightbox-caption');
    const lbClose = document.getElementById('df-lightbox-btn-close');

    function closeLb() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb();
    });
  }

  /* ==========================================================================
     6. DELEGAÇÃO DE EVENTOS GLOBAL
     ========================================================================== */
  function bindButtons() {
    document.querySelectorAll('.js-open-orcamento, .animated-button').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        openModal();
      };
    });
  }

  document.addEventListener('click', function (e) {
    // Lightbox click
    const frame = e.target.closest('.df-sculpture-frame, [data-lightbox-src]');
    if (frame) {
      const src = frame.getAttribute('data-lightbox-src') || (frame.querySelector('img') ? frame.querySelector('img').src : '');
      const caption = frame.getAttribute('data-lightbox-caption') || (frame.querySelector('.df-sculpture-title') ? frame.querySelector('.df-sculpture-title').textContent : '');
      const lb = document.getElementById('df-lightbox-modal');
      const lbImg = document.getElementById('df-lightbox-img');
      const lbCap = document.getElementById('df-lightbox-caption');
      if (lb && lbImg && src) {
        lbImg.src = src;
        lbImg.alt = caption;
        if (lbCap) lbCap.textContent = caption;
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    // Modal click
    const trigger = e.target.closest('.js-open-orcamento, .animated-button');
    if (trigger) {
      e.preventDefault();
      openModal();
    }
  }, true);

  /* ==========================================================================
     7. MUTATION OBSERVER & INICIALIZAÇÃO
     ========================================================================== */
  function initEngine() {
    initModal();
    initLightbox();
    applyEnhancements();

    // Observa mutações geradas pelo React / TanStack Router
    const observer = new MutationObserver(function () {
      applyEnhancements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Monitora transições de rota
    window.addEventListener('popstate', applyEnhancements);
    window.addEventListener('hashchange', applyEnhancements);

    // Verificação periódica inicial
    let checks = 0;
    const interval = setInterval(function () {
      applyEnhancements();
      checks++;
      if (checks > 10) clearInterval(interval);
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }

})();
