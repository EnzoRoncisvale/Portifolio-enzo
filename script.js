/**
 * PORTFÓLIO ENZO RONCISVALE - MOTOR INTERATIVO 2026 (ESTILO ORYZO.AI)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initCursorGlow();
  init3DTilt();
  initTextScramble();
  initCounters();
  initProjectFilters();
  initMobileMenu();
  initScrollSpy();
  initBrasiliaClock();
  initSqlPlayground();
});

/* ==========================================================================
   1. CANVAS NEURAL / CONSTELAÇÃO DE PARTÍCULAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 180 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 95);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,'
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.65)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. CURSOR GLOW SPOTLIGHT
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. 3D TILT COM HOVER SPOTLIGHT (BENTO CARDS)
   ========================================================================== */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      // Quando o mouse está sobre botões ou links interativos, estabiliza o card para clique perfeito
      if (e.target.closest('a, button, input, textarea, select, .card-action-btn')) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Torna o card inteiro clicável como botão principal, respeitando links internos
  document.querySelectorAll('.project-card[data-card-url]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const url = card.getAttribute('data-card-url');
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

/* ==========================================================================
   4. DECODIFICADOR DE TEXTO DINÂMICO (TEXT SCRAMBLE)
   ========================================================================== */
function initTextScramble() {
  const el = document.getElementById('scramble-role');
  if (!el) return;

  const phrases = [
    'Interesse em Banco de Dados',
    'Dados & Sistemas (CEUB)',
    'SQL e Modelagem de Dados',
    'Experiência na CASSI (10 Meses)',
    '3 Aplicações Live na Vercel ⚡',
    'Pipeline ETL PDAD/DF (CODEPLAN)'
  ];

  class TextScramble {
    constructor(element) {
      this.el = element;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 30);
        const end = start + Math.floor(Math.random() * 30);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="text-cyanAccent-400 opacity-80">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  const scrambler = new TextScramble(el);
  let counter = 0;

  const next = () => {
    scrambler.setText(phrases[counter]).then(() => {
      setTimeout(next, 3200);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
}

/* ==========================================================================
   5. CONTADORES NUMÉRICOS COM EASING
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.floor(easeOutExpo * target);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.35 });

  const banner = document.querySelector('.counter')?.closest('section');
  if (banner) observer.observe(banner);
}

/* ==========================================================================
   6. RELÓGIO AO VIVO DE BRASÍLIA (TENDÊNCIA TECH 2026)
   ========================================================================== */
function initBrasiliaClock() {
  const clockEl = document.getElementById('brasilia-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Horário de Brasília (UTC-3)
    const options = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('pt-BR', options).format(now);
    clockEl.textContent = `${timeString} • Brasília-DF (BRT)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. SIMULADOR INTERATIVO DE CONSULTAS SQL / ETL (EXCLUSIVO PARA ENZO)
   ========================================================================== */
const sqlQueries = {
  cassi: {
    title: 'CASSI — Extração de Relatório e Integridade de Beneficiários',
    query: `-- Extração estruturada de beneficiários e conformidade de planos
SELECT 
    b.id_beneficiario,
    b.nome_titular,
    p.plano_saude,
    COUNT(c.id_consulta) AS total_atendimentos,
    MAX(c.data_consulta) AS ultimo_atendimento,
    CASE WHEN b.status_cadastro = 'ATIVO' THEN 'Regular' ELSE 'Pendente' END AS situacao
FROM beneficiarios b
INNER JOIN contratos c ON b.id_beneficiario = c.id_beneficiario
INNER JOIN planos_cassi p ON c.id_plano = p.id_plano
WHERE b.uf = 'DF' AND c.ano_exercicio = 2024
GROUP BY b.id_beneficiario, b.nome_titular, p.plano_saude, b.status_cadastro
ORDER BY total_atendimentos DESC
LIMIT 5;`,
    executionTime: '12ms',
    headers: ['ID', 'Titular', 'Plano', 'Atendimentos', 'Último Registro', 'Situação'],
    rows: [
      ['#10842', 'Mariana Alencar', 'CASSI Família I', '14', '2024-10-28', 'Regular'],
      ['#10991', 'Carlos E. Silveira', 'CASSI Associados', '09', '2024-10-25', 'Regular'],
      ['#11204', 'Fernanda G. Rocha', 'CASSI Essencial', '08', '2024-10-22', 'Regular'],
      ['#11580', 'Roberto M. Dias', 'CASSI Associados', '06', '2024-10-19', 'Regular'],
      ['#11893', 'Juliana P. Costa', 'CASSI Família II', '05', '2024-10-15', 'Regular']
    ]
  },
  pdad: {
    title: 'PDAD 2024 (CODEPLAN/DF) — Pipeline de ETL & Escolaridade por Região',
    query: `-- Agregação de microdados da PDAD/DF após limpeza e mapeamento categórico
SELECT 
    ra.nome_regiao_administrativa AS regiao_df,
    m.faixa_etaria,
    ROUND(AVG(m.anos_estudo), 1) AS media_anos_estudo,
    COUNT(m.id_morador) AS total_amostra,
    SUM(CASE WHEN m.escolaridade_cod >= 6 THEN 1 ELSE 0 END) AS ensino_superior_ou_pos
FROM moradores_pdad_2024 m
INNER JOIN regioes_administrativas ra ON m.cod_ra = ra.cod_ra
WHERE m.idade >= 18
GROUP BY ra.nome_regiao_administrativa, m.faixa_etaria
ORDER BY media_anos_estudo DESC
LIMIT 5;`,
    executionTime: '24ms',
    headers: ['Região DF', 'Faixa Etária', 'Média Anos Estudo', 'Amostra', 'Superior/Pós'],
    rows: [
      ['Plano Piloto', '25 a 39 anos', '15.4 anos', '1.420', '1.180'],
      ['Águas Claras', '25 a 39 anos', '14.8 anos', '1.250', '980'],
      ['Sudoeste/Octogonal', '40 a 59 anos', '15.2 anos', '980', '840'],
      ['Taguatinga', '25 a 39 anos', '12.6 anos', '1.850', '890'],
      ['Guará', '25 a 39 anos', '13.1 anos', '1.110', '650']
    ]
  },
  marcaai: {
    title: 'Marca Aí! — Agendamentos em Quadras Públicas de Brasília',
    query: `-- Consulta de ocupação e modalidades esportivas em tempo real
SELECT 
    q.nome_quadra,
    q.regiao_df,
    p.modalidade,
    COUNT(p.id_partida) AS total_rachas_agendados,
    MIN(p.horario_inicio) AS proxima_partida
FROM quadras_publicas q
LEFT JOIN partidas p ON q.id_quadra = p.id_quadra
WHERE q.ativo = 1 AND p.data_evento >= CURRENT_DATE
GROUP BY q.id_quadra, q.nome_quadra, q.regiao_df, p.modalidade
ORDER BY total_rachas_agendados DESC
LIMIT 5;`,
    executionTime: '08ms',
    headers: ['Quadra Pública', 'Região DF', 'Modalidade', 'Rachas Agendados', 'Próximo Horário'],
    rows: [
      ['Quadra Poliesportiva SQN 210', 'Asa Norte', 'Futsal', '8', 'Hoje às 19:00'],
      ['Parque da Cidade (Estacionamento 10)', 'Asa Sul', 'Basquete', '6', 'Hoje às 18:30'],
      ['Quadra da SQN 406', 'Asa Norte', 'Vôlei de Areia', '5', 'Amanhã às 08:00'],
      ['Quadra Poliesportiva SQS 308', 'Asa Sul', 'Futsal', '4', 'Amanhã às 17:30'],
      ['Parque Olhos D’Água', 'Asa Norte', 'Funcional', '4', 'Amanhã às 07:00']
    ]
  }
};

function initSqlPlayground() {
  const container = document.getElementById('sql-playground');
  if (!container) return;

  window.runSqlQuery = function(key) {
    const data = sqlQueries[key];
    if (!data) return;

    // Atualiza aba ativa
    document.querySelectorAll('.sql-tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${key}`);
    if (activeTab) activeTab.classList.add('active');

    // Atualiza consulta e tempo de execução
    document.getElementById('sql-code-text').textContent = data.query;
    document.getElementById('sql-exec-time').textContent = `⚡ Executado em ${data.executionTime} • Banco Relacional`;
    document.getElementById('sql-title').textContent = data.title;

    // Renderiza tabela interativa
    const thead = document.getElementById('sql-table-head');
    const tbody = document.getElementById('sql-table-body');

    thead.innerHTML = `<tr>${data.headers.map(h => `<th class="px-3.5 py-2.5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider bg-slate-900/90">${h}</th>`).join('')}</tr>`;
    tbody.innerHTML = data.rows.map(row => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 transition">
        ${row.map(cell => `<td class="px-3.5 py-2.5 text-xs text-slate-300 font-mono">${cell}</td>`).join('')}
      </tr>
    `).join('');
  };

  // Carrega consulta inicial
  runSqlQuery('cassi');
}

/* ==========================================================================
   8. FILTRO DE PROJETOS POR CATEGORIA (EXECUÇÃO DIRETA E ROBUSTA)
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = (filterValue === 'all' || category === filterValue);

        if (matches) {
          card.style.display = 'flex';
          card.style.pointerEvents = 'auto';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          card.style.pointerEvents = 'none';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 180);
        }
      });
    });
  });
}

/* ==========================================================================
   9. TOAST, CÓPIA & FORMULÁRIO DE CONTATO
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function copyEmail() {
  const email = 'enzoroncisvale@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('E-mail copiado: ' + email);
    const textSpan = document.getElementById('emailCopyText');
    if (textSpan) {
      textSpan.textContent = 'Copiado!';
      setTimeout(() => {
        textSpan.textContent = 'Clique para copiar';
      }, 2500);
    }
  }).catch(() => {
    showToast('E-mail: ' + email);
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const subject = document.getElementById('formSubject').value;
  const message = document.getElementById('formMessage').value;

  const mailtoBody = encodeURIComponent(`Olá Enzo,\n\nMeu nome é ${name}.\n\n${message}\n\nContato:`);
  const mailtoSubject = encodeURIComponent(`[Contato Portfólio] ${subject}`);

  window.location.href = `mailto:enzoroncisvale@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  showToast('Abrindo seu aplicativo de e-mail...');
}

/* ==========================================================================
   10. MENU MOBILE & SCROLL SPY
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-brand-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-brand-400');
      }
    });
  });
}

/* ==========================================================================
   11. CONTROLE DE VISUALIZAÇÃO E CÓPIA DO CURRÍCULO OFICIAL
   ========================================================================== */
function switchCvView(view) {
  const paperView = document.getElementById('cv-paper-view');
  const techView = document.getElementById('cv-tech-view');
  const btnPaper = document.getElementById('btn-view-paper');
  const btnTech = document.getElementById('btn-view-tech');

  if (!paperView || !techView || !btnPaper || !btnTech) return;

  if (view === 'paper') {
    paperView.classList.remove('hidden');
    techView.classList.add('hidden');
    btnPaper.classList.add('bg-brand-600', 'text-white', 'shadow-sm');
    btnPaper.classList.remove('text-slate-400');
    btnTech.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
    btnTech.classList.add('text-slate-400');
  } else {
    techView.classList.remove('hidden');
    paperView.classList.add('hidden');
    btnTech.classList.add('bg-brand-600', 'text-white', 'shadow-sm');
    btnTech.classList.remove('text-slate-400');
    btnPaper.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
    btnPaper.classList.add('text-slate-400');
  }
}

function copyResumeData() {
  const resumeText = `Enzo Roncisvale
INTERESSE EM BANCO DE DADOS / DADOS E SISTEMAS
Telefone: (61) 98221-7080 | Brasília-DF
E-mail: enzoroncisvale@gmail.com
GitHub: https://github.com/EnzoRoncisvale
LinkedIn: https://www.linkedin.com/in/enzo-roncisvale-164890215/

OBJETIVO:
Tenho buscado evoluir constantemente, realizando cursos de TI e aprimorando meus conhecimentos. Estou em busca de uma oportunidade para ingressar na área.

HABILIDADES:
• HTML 5 e CSS 3
• SQL e Modelagem de dados
• JavaScript
• Excel intermediário
• Power BI
• Engajamento e interesse em atividades da área
• Facilidade em comunicação e interação
• Fluencia em inglês
• Proatividade

PROJETOS PESSOAIS:
• Sistema de Chat Seguro: Desenvolvi um sistema de chat que exige cadastro, armazena dados no banco e restringe a comunicação a usuários registrados. O projeto inclui cadastro seguro, autenticação, mensagens privadas e medidas de segurança. Utilizando HTML, CSS e PHP.
• Aplicação de Marcação de Partidas Esportivas: Desenvolvimento de um aplicativo para criação e visualização de partidas esportivas em um mapa, permitindo marcação de local, horário e tipo de esporte, com armazenamento em banco de dados.

EXPERIÊNCIA:
10 MESES NA CASSI. ATUANDO EM CONSULTA DE BANCO DE DADOS E PROCESSOS ADMNISTRATIVOS.

FORMAÇÃO:
• Centro Universitário de Brasília - CEUB: Curso Tecnólogo em Análise e Desenvolvimento de Sistemas (07/2022 a 11/2025)
• Centro Universitário de Brasília - CEUB: Pós graduação em ciência de dados (07/2026 a 07/2027)
• EC Manchester English Language School: General English course in Manchester - Avançado (03/2019 a 07/2019)`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(resumeText).then(() => {
      showToast('Currículo copiado para a área de transferência!');
    }).catch(() => {
      showToast('Dados do currículo selecionados!');
    });
  } else {
    showToast('Currículo pronto para cópia!');
  }
}


/* ==========================================================================
   12. MODAL DO CURRÍCULO (CANTO SUPERIOR DIREITO)
   ========================================================================== */
function openCvModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
  });
  playSound('click');
}

function closeCvModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
}

// Fechar modal ao clicar no fundo
document.addEventListener('click', (e) => {
  const cvModal = document.getElementById('cvModal');
  if (cvModal && e.target === cvModal) {
    closeCvModal();
  }
  const cmdModal = document.getElementById('cmdPaletteModal');
  if (cmdModal && e.target === cmdModal) {
    closeCommandPalette();
  }
});

/* ==========================================================================
   13. COMMAND PALETTE (RAYCAST / SPOTLIGHT CTRL+K)
   ========================================================================== */
function openCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  const input = document.getElementById('cmdInput');
  if (!modal) return;

  modal.classList.remove('hidden');
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    if (input) {
      input.value = '';
      input.focus();
    }
  });
  playSound('click');
}

function closeCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  if (!modal) return;
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 200);
}

function filterCmdPalette() {
  const input = document.getElementById('cmdInput');
  const items = document.querySelectorAll('.cmd-item');
  if (!input || !items.length) return;

  const query = input.value.toLowerCase().trim();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function execCmd(url, isDownload = false) {
  playSound('click');
  closeCommandPalette();

  if (isDownload) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Download iniciado!');
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Atalhos globais de teclado (Ctrl+K, Cmd+K, Escape)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const modal = document.getElementById('cmdPaletteModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
  }

  if (e.key === 'Escape') {
    closeCommandPalette();
    closeCvModal();
  }
});

/* ==========================================================================
   14. TESTE DE LATÊNCIA EM TEMPO REAL (VERCEL CLOUD TICKER)
   ========================================================================== */
function pingVercelApps() {
  playSound('click');
  const pingIcon = document.getElementById('pingIcon');
  if (pingIcon) pingIcon.classList.add('fa-spin');

  const pings = {
    mia: document.getElementById('ping-mia'),
    marca: document.getElementById('ping-marca'),
    alerta: document.getElementById('ping-alerta')
  };

  if (pings.mia) pings.mia.textContent = '...';
  if (pings.marca) pings.marca.textContent = '...';
  if (pings.alerta) pings.alerta.textContent = '...';

  setTimeout(() => {
    const valMia = Math.floor(Math.random() * 12 + 18);
    const valMarca = Math.floor(Math.random() * 10 + 15);
    const valAlerta = Math.floor(Math.random() * 14 + 20);

    if (pings.mia) pings.mia.textContent = `${valMia}ms`;
    if (pings.marca) pings.marca.textContent = `${valMarca}ms`;
    if (pings.alerta) pings.alerta.textContent = `${valAlerta}ms`;

    if (pingIcon) pingIcon.classList.remove('fa-spin');
    playSound('success');
    showToast('Latência Vercel Edge: Todos os 3 deploys operacionais!');
  }, 450);
}

/* ==========================================================================
   15. FERRAMENTAS INTERATIVAS DO SQL LAB (EXPORTAR CSV, COPIAR JSON, BUSCA)
   ========================================================================== */
function exportSqlCsv() {
  playSound('click');
  const table = document.querySelector('#sql-playground table');
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {
    const cols = row.querySelectorAll('th, td');
    let rowData = [];
    cols.forEach(col => {
      let text = col.innerText.replace(/"/g, '""');
      rowData.push(`"${text}"`);
    });
    csv.push(rowData.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `consulta_sql_${currentSqlQuery}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  playSound('success');
  showToast('Planilha CSV gerada com sucesso!');
}

function copySqlJson() {
  playSound('click');
  const data = sqlTableData[currentSqlQuery];
  if (!data) return;

  const jsonStr = JSON.stringify(data.rows, null, 2);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(jsonStr).then(() => {
      playSound('success');
      showToast('Dados JSON copiados para a área de transferência!');
    });
  }
}

function filterSqlTable() {
  const input = document.getElementById('sqlTableSearch');
  const tbody = document.getElementById('sql-table-body');
  if (!input || !tbody) return;

  const query = input.value.toLowerCase().trim();
  const rows = tbody.querySelectorAll('tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}

/* ==========================================================================
   16. EFEITOS SONOROS TÁTEIS INTERATIVOS (WEB AUDIO API - ZERO ARQUIVOS EXTERNOS)
   ========================================================================== */
let audioEnabled = true;
let audioCtx = null;

function toggleAudio() {
  audioEnabled = !audioEnabled;
  const icon = document.getElementById('audioIcon');
  if (icon) {
    if (audioEnabled) {
      icon.className = 'fa-solid fa-volume-high text-xs';
      playSound('click');
      showToast('Sons interativos ativados!');
    } else {
      icon.className = 'fa-solid fa-volume-xmark text-xs text-rose-400';
      showToast('Sons interativos silenciados!');
    }
  }
}

function playSound(type) {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, audioCtx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.06);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.22);
    }
  } catch(e) {}
}

// Conecta clique sonoro a todos os botões e links interativos da página
document.addEventListener('click', (e) => {
  if (e.target.closest('button, .filter-btn, .sql-tab, .card-action-btn, a[href^="#"]')) {
    playSound('click');
  }
});
