/**
 * D'FARIA GASTRONOMIA E EVENTOS — MÓDULO PREMIUM DE CONVERSÃO & INTERAÇÕES
 * Inspiração: sousreserve.com.br
 * Regra P0: Nenhuma URL pública é alterada.
 * Todos os CTAs comerciais abrem este modal de 6 campos.
 * Somente o botão flutuante oficial abre o WhatsApp direto.
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5515996834734';

  /* ==========================================================================
     1. MODAL PREMIUM DE ORÇAMENTO (PRESERVADO INTEGRALMENTE CONFORME REGRA 1)
     ========================================================================== */
  function initModal() {
    if (document.getElementById('df-modal-orcamento')) return;

    const modalHtml = `
      <div id="df-modal-orcamento" class="df-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="df-modal-title">
        <div class="df-modal-container">
          <button type="button" class="df-modal-close" aria-label="Fechar formulário" id="df-modal-btn-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="df-modal-header">
            <img src="/logo-dfaria.png" alt="D'Faria Gastronomia e Eventos" class="df-modal-logo" />
            <h2 id="df-modal-title" class="df-modal-title">Vamos planejar seu evento?</h2>
            <p class="df-modal-subtitle">Conte-nos os detalhes essenciais para prepararmos seu atendimento e iniciarmos seu orçamento.</p>
          </div>

          <div class="df-modal-body">
            <!-- Formulário Ativo -->
            <form id="df-orcamento-form" novalidate>
              <div class="df-form-grid">
                
                <!-- 1. Nome Completo -->
                <div class="df-input-group df-col-full">
                  <label class="df-label" for="df-field-nome">Nome completo <span>*</span></label>
                  <input type="text" id="df-field-nome" name="nome" class="df-input" placeholder="Seu nome e sobrenome" required autocomplete="name" />
                  <span class="df-error-msg" id="err-nome">Por favor, informe seu nome completo.</span>
                </div>

                <!-- 2. E-mail -->
                <div class="df-input-group">
                  <label class="df-label" for="df-field-email">E-mail <span>*</span></label>
                  <input type="email" id="df-field-email" name="email" class="df-input" placeholder="seu@email.com" required autocomplete="email" />
                  <span class="df-error-msg" id="err-email">Informe um e-mail válido.</span>
                </div>

                <!-- 3. WhatsApp com DDD -->
                <div class="df-input-group">
                  <label class="df-label" for="df-field-whatsapp">WhatsApp com DDD <span>*</span></label>
                  <input type="tel" id="df-field-whatsapp" name="whatsapp" class="df-input" placeholder="(15) 99683-4734" required autocomplete="tel" />
                  <span class="df-error-msg" id="err-whatsapp">Informe um WhatsApp válido com DDD.</span>
                </div>

                <!-- 4. Data do Evento -->
                <div class="df-input-group">
                  <label class="df-label" for="df-field-data">Data do evento <span>*</span></label>
                  <input type="date" id="df-field-data" name="data_evento" class="df-input" required />
                  <span class="df-error-msg" id="err-data">Selecione uma data válida a partir de hoje.</span>
                </div>

                <!-- 5. Número de Convidados -->
                <div class="df-input-group">
                  <label class="df-label" for="df-field-convidados">Número de convidados <span>*</span></label>
                  <input type="number" id="df-field-convidados" name="convidados" class="df-input" min="1" step="1" placeholder="Ex: 120" required />
                  <span class="df-error-msg" id="err-convidados">Informe um número de convidados maior que zero.</span>
                </div>

                <!-- 6. Local da Festa -->
                <div class="df-input-group df-col-full">
                  <label class="df-label" for="df-field-local">Local da festa (cidade/espaço) <span>*</span></label>
                  <input type="text" id="df-field-local" name="local_festa" class="df-input" placeholder="Cidade, condomínio ou nome do espaço" required />
                  <span class="df-error-msg" id="err-local">Informe o local ou cidade do evento.</span>
                </div>

              </div>

              <div class="df-modal-footer">
                <button type="submit" id="df-btn-submit" class="df-submit-btn">
                  <span>Enviar Pedido e Iniciar Atendimento</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <p class="df-privacy-note">
                  Seus dados são protegidos e enviados diretamente para nossa equipe de atendimento por e-mail e WhatsApp. Consulte nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.
                </p>
              </div>
            </form>

            <!-- Tela de Sucesso -->
            <div id="df-orcamento-success" class="df-success-view">
              <div class="df-success-icon">✓</div>
              <h3 class="df-success-title">Orçamento Enviado com Sucesso!</h3>
              <p class="df-success-desc">
                Seus dados foram registrados e enviados para o nosso e-mail. Para garantir sua data na agenda com máxima prioridade, clique no botão abaixo para falar direto com a equipe no WhatsApp oficial:
              </p>
              <a href="#" id="df-btn-whatsapp-final" target="_blank" rel="noopener noreferrer" class="df-whatsapp-final-btn whatsapp-direct-link">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03s.87 2.35 1 2.51c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/>
                </svg>
                <span>Falar Conosco no WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const todayStr = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('df-field-data');
    if (dateInput) {
      dateInput.setAttribute('min', todayStr);
    }

    const modalBackdrop = document.getElementById('df-modal-orcamento');
    const btnClose = document.getElementById('df-modal-btn-close');

    function closeModal() {
      modalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    btnClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
        closeModal();
      }
    });

    const form = document.getElementById('df-orcamento-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      const nomeInput = document.getElementById('df-field-nome');
      if (!nomeInput.value.trim() || nomeInput.value.trim().length < 3) {
        nomeInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nomeInput.classList.remove('is-invalid');
      }

      const emailInput = document.getElementById('df-field-email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      const whatsappInput = document.getElementById('df-field-whatsapp');
      const cleanPhone = whatsappInput.value.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        whatsappInput.classList.add('is-invalid');
        isValid = false;
      } else {
        whatsappInput.classList.remove('is-invalid');
      }

      const dataInput = document.getElementById('df-field-data');
      if (!dataInput.value || dataInput.value < todayStr) {
        dataInput.classList.add('is-invalid');
        isValid = false;
      } else {
        dataInput.classList.remove('is-invalid');
      }

      const convidadosInput = document.getElementById('df-field-convidados');
      const qtdConvidados = parseInt(convidadosInput.value, 10);
      if (isNaN(qtdConvidados) || qtdConvidados <= 0) {
        convidadosInput.classList.add('is-invalid');
        isValid = false;
      } else {
        convidadosInput.classList.remove('is-invalid');
      }

      const localInput = document.getElementById('df-field-local');
      if (!localInput.value.trim() || localInput.value.trim().length < 2) {
        localInput.classList.add('is-invalid');
        isValid = false;
      } else {
        localInput.classList.remove('is-invalid');
      }

      if (!isValid) return;

      const submitBtn = document.getElementById('df-btn-submit');
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Enviando...';

      const dataParts = dataInput.value.split('-');
      const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

      const mensagem = `Olá, DFARIA Gastronomia e Eventos! Preenchi o formulário no site e gostaria de solicitar um orçamento.\n\nDADOS PARA ORÇAMENTO\n\nNome: ${nomeInput.value.trim()}\nE-mail: ${emailInput.value.trim()}\nWhatsApp: ${whatsappInput.value.trim()}\nData do evento: ${dataFormatada}\nNúmero de convidados: ${qtdConvidados}\nLocal da festa: ${localInput.value.trim()}\n\nAguardo o retorno da equipe para dar continuidade ao orçamento.`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

      fetch('/api/enviar-orcamento.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeInput.value.trim(),
          email: emailInput.value.trim(),
          whatsapp: whatsappInput.value.trim(),
          data_evento: dataFormatada,
          convidados: qtdConvidados,
          local: localInput.value.trim()
        })
      })
      .catch(() => {})
      .finally(() => {
        form.style.display = 'none';
        const successView = document.getElementById('df-orcamento-success');
        const finalBtn = document.getElementById('df-btn-whatsapp-final');
        finalBtn.setAttribute('href', whatsappUrl);
        
        finalBtn.onclick = function (event) {
          event.stopPropagation();
          window.open(whatsappUrl, '_blank');
          return false;
        };

        successView.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Enviar Pedido e Iniciar Atendimento';
      });
    });
  }

  window.dfOpenOrcamentoModal = function () {
    initModal();
    const modalBackdrop = document.getElementById('df-modal-orcamento');
    const form = document.getElementById('df-orcamento-form');
    const successView = document.getElementById('df-orcamento-success');
    
    if (form && successView) {
      form.style.display = 'block';
      successView.style.display = 'none';
    }

    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  /* ==========================================================================
     2. INTERCEPTADOR DOS CTAs COMERCIAIS
     ========================================================================== */
  function bindCommercialCTAs() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('#btn-whatsapp-flutuante, #df-btn-whatsapp-final, .whatsapp-floating-direct, .whatsapp-direct-link')) {
        return;
      }

      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.textContent || '').trim().toLowerCase();

      const isCommercialCta =
        target.classList.contains('js-open-orcamento') ||
        text.includes('solicite seu orçamento') ||
        text.includes('solicitar orçamento') ||
        text.includes('peça seu orçamento') ||
        text.includes('quero contratar') ||
        text.includes('pedir pelo formulário') ||
        text.includes('vamos conversar sobre seu evento') ||
        (href.includes('wa.me') && !target.classList.contains('whatsapp-floating-direct') && !target.classList.contains('whatsapp-direct-link')) ||
        href === '/orcamento';

      if (isCommercialCta) {
        e.preventDefault();
        window.dfOpenOrcamentoModal();
      }
    }, true);
  }

  /* ==========================================================================
     3. REFINAMENTO VISUAL AO ROLAR (HEADER SCROLL EFFECT)
     ========================================================================== */
  function initScrollEffects() {
    const header = document.querySelector('header.sticky');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.style.background = 'rgba(4, 12, 5, 0.94)';
        header.style.paddingTop = '2px';
        header.style.paddingBottom = '2px';
        header.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.9)';
      } else {
        header.style.background = 'rgba(6, 18, 8, 0.85)';
        header.style.paddingTop = '';
        header.style.paddingBottom = '';
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initModal();
      bindCommercialCTAs();
      initScrollEffects();
    });
  } else {
    initModal();
    bindCommercialCTAs();
    initScrollEffects();
  }
})();
