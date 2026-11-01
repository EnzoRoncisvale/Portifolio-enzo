# Portfólio Profissional & Engenharia de Dados — Enzo Roncisvale 🚀

[![Vercel Deploy](https://img.shields.io/badge/Vercel-3%20Deploys%20Ativos-black?style=for-the-badge&logo=vercel)](https://mia-crm-prototipo.vercel.app)
[![Formação CEUB](https://img.shields.io/badge/Forma%C3%A7%C3%A3o-CEUB%20ADS%20%2B%20P%C3%B3s%20Dados-indigo?style=for-the-badge&logo=graduations)](https://github.com/EnzoRoncisvale)
[![Experiência](https://img.shields.io/badge/CASSI-10%20Meses%20(SQL)-emerald?style=for-the-badge)](https://github.com/EnzoRoncisvale)

Portfólio moderno, ultra-interativo e de alta performance desenvolvido para apresentar os projetos em produção, experiência em Banco de Dados / Dados e Sistemas (ex-CASSI) e formação acadêmica pelo CEUB de **Enzo Roncisvale**.

🔗 **Repositório Oficial:** [github.com/EnzoRoncisvale/Portifolio-enzo](https://github.com/EnzoRoncisvale/Portifolio-enzo)

---

## ⚡ Aplicações em Produção (Deploy Ativo na Vercel)

| Aplicação | Link no Ar (Vercel) | Repositório | Tecnologias Chave |
| :--- | :--- | :--- | :--- |
| **MIA CRM Inteligente** | [mia-crm-prototipo.vercel.app](https://mia-crm-prototipo.vercel.app) | [`mia-crm`](https://github.com/EnzoRoncisvale/mia-crm) | Next.js 16 (App Router), React 19, TypeScript, Recharts, Tailwind CSS v4, Multi-tenant SaaS |
| **Marca Aí!** | [marca-ai-kappa.vercel.app](https://marca-ai-kappa.vercel.app) | [`marca-ai`](https://github.com/EnzoRoncisvale/marca-ai) | Leaflet Maps, Quadras Públicas de Brasília, Capacitor (Android Nativo), PWA, GitHub Actions |
| **AlertaEncosta** | [alerta-encosta.vercel.app](https://alerta-encosta.vercel.app/) | [`alerta-encosta`](https://github.com/EnzoRoncisvale/alerta-encosta) | Telemetria IoT, Defesa Civil, Decreto Federal nº 12.652/2025, Protocolo CAP/JSON, Human-in-the-Loop |
| **ETL PDAD/DF** | Notebook no GitHub | [`P-s-Gradua-o-em-ciencia-de-dados`](https://github.com/EnzoRoncisvale/P-s-Gradua-o-em-ciencia-de-dados) | Python, Pandas, Jupyter, CODEPLAN/DF, Auditoria e Limpeza de Microdados Reais |
| **Sistema de Chat Seguro** | Código no GitHub | [`Projeto_chat`](https://github.com/EnzoRoncisvale/Projeto_chat) | HTML5, CSS3, PHP, MySQL, Hash Criptográfico, Proteção contra SQL Injection |
| **Tunico's Gym** | Código no GitHub | [`tunicos-gym`](https://github.com/EnzoRoncisvale/tunicos-gym) | Performance Monocromática, Filtro Facetado de 31 Unidades (DF, GO, BA), Voucher Dinâmico |

---

## 💎 Recursos Interativos & Design 2026 (Estilo Oryzo.ai / Raycast)

- **Canvas Neural Dinâmico:** Fundo animado com física de partículas interconectadas que reagem vetorialmente à posição do ponteiro do mouse.
- **Bento Cards com 3D Tilt & Dynamic Spotlight:** Efeito tridimensional suave com iluminação radial que acompanha o cursor em tempo real, estabilizando automaticamente sobre botões.
- **Command Palette Rápida (`Ctrl + K` / `⌘K`):** Navegação ultrarrápida estilo Raycast/Linear para pesquisar projetos, rodar queries, abrir currículo ou contatar via WhatsApp.
- **Monitor de Latência em Tempo Real (Vercel Edge Network):** Widget com checagem de ping instantânea dos 3 deploys da Vercel.
- **Laboratório SQL Interativo:**
  - Consultas SQL reais (CASSI, PDAD/DF e Marca Aí) executadas em tempo real.
  - Exportação dos dados para planilha **`.csv`** com 1 clique.
  - Cópia do dataset formatado em **`JSON`**.
  - Filtro em tempo real de registros da tabela.
- **Efeitos Sonoros Táteis (Web Audio API):** Síntese nativa de áudio para cliques e ações (sem arquivos externos pesados), com controle de mute/unmute.
- **Currículo Oficial Integrado (Canto Superior Direito):**
  - Modal interativo de alta resolução (`#cvModal`) para leitura direta na tela.
  - Download com 1 clique do arquivo original: `Curriculo_Enzo_Roncisvale.pdf` (68 KB).
  - Impressão otimizada para folha A4 (`Ctrl + P`).

---

## 📂 Estrutura do Repositório

```text
Portifolio-enzo/
├── index.html                    # Estrutura principal da Landing Page
├── style.css                     # Estilos visuais, 3D tilt, animações e regras de impressão A4
├── script.js                     # Motor interativo (canvas, SQL lab, command palette, áudio, filtros)
├── Curriculo_Enzo_Roncisvale.pdf # Arquivo oficial do currículo diagramado para download
├── abrir-portfolio.bat           # Inicializador rápido de dois cliques para Windows
├── .gitignore                    # Regras de exclusão do git
└── README.md                     # Documentação completa do projeto
```

---

## 💻 Como Executar Localmente

### Opção 1: Inicializador Rápido
Basta dar um duplo clique no arquivo **`abrir-portfolio.bat`** na pasta do projeto para abrir diretamente no navegador padrão.

### Opção 2: Servidor HTTP Local (Python)
```bash
# Na pasta do projeto:
python -m http.server 3000
```
Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Como Publicar na Vercel ou GitHub Pages

### Publicação na Vercel:
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **Add New... > Project** e selecione o repositório **`Portifolio-enzo`**.
3. Clique em **Deploy**. A Vercel gerará o link de produção em segundos com CDN global e HTTPS.

### Publicação no GitHub Pages:
1. No repositório **`Portifolio-enzo`** no GitHub, vá em **Settings > Pages**.
2. Em **Branch**, selecione `main` e a pasta `/ (root)`.
3. Clique em **Save**. Seu portfólio estará online em `https://enzoroncisvale.github.io/Portifolio-enzo/`.

---

## 👤 Contato

- **Enzo Roncisvale** — *Interesse em Banco de Dados / Dados e Sistemas*
- 📍 Brasília - DF
- 📞 Telefone / WhatsApp: [(61) 98221-7080](https://wa.me/5561982217080)
- ✉️ E-mail: [enzoroncisvale@gmail.com](mailto:enzoroncisvale@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/enzo-roncisvale-164890215](https://www.linkedin.com/in/enzo-roncisvale-164890215/)
- 🐙 GitHub: [github.com/EnzoRoncisvale](https://github.com/EnzoRoncisvale)
