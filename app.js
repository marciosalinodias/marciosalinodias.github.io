document.documentElement.classList.add("js");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Content from Marcio Salino Dias's supplied CV and project websites.
const frontend = [
  ["React", "react", "INTERFACES WEB"],
  ["Next.js", "nextjs", "APLICAÇÕES WEB"],
  ["React Native", "react", "MOBILE · iOS / ANDROID"],
  ["Dart / Flutter", null, "DESENVOLVIMENTO MOBILE"],
  ["Expo", null, "ECOSSISTEMA REACT NATIVE"],
  ["JavaScript", "javascript", "VANILLA JS / JQUERY"],
  ["HTML5", "html", "ESTRUTURA WEB"],
  ["CSS3", "css", "ESTILIZAÇÃO WEB"],
];
const backend = [
  ["Node.js", "nodejs", "SERVIÇOS E INTEGRAÇÕES"],
  ["C#", null, "DESENVOLVIMENTO BACKEND"],
  ["PHP / Laravel", null, "APLICAÇÕES E SISTEMAS"],
  ["PostgreSQL", "postgres", "BANCO DE DADOS RELACIONAL"],
  ["MySQL", null, "BANCO DE DADOS RELACIONAL"],
  ["MongoDB", "mongodb", "BANCO DE DADOS NoSQL"],
  ["SQL Server", null, "BANCO DE DADOS RELACIONAL"],
  ["APIs RESTful", "api", "ARQUITETURA E INTEGRAÇÕES"],
];
for (const [id, skills] of [
  ["frontend-skills", frontend],
  ["backend-skills", backend],
]) {
  document.getElementById(id).innerHTML = skills
    .map(([name, icon, description]) => {
      const mark = icon
        ? `<img src="assets/${icon}.svg" alt="" width="24" height="24">`
        : `<span class="skill-mark" aria-hidden="true">${name === "C#" ? "C#" : name === "SQL Server" ? "SQL" : name.slice(0, 2).toUpperCase()}</span>`;
      return `<article class="skill"><h4>${mark}${name}</h4><p>${description}</p></article>`;
    })
    .join("");
}
const projects = [
  {
    name: "handoff-it",
    image: "handoff-it",
    imageAlt: "Página real do handoff-it, produto de memória de contexto para ferramentas de IA",
    context: "PRODUTO PRÓPRIO",
    description:
      "Meu produto para preservar o contexto de projetos entre ferramentas de IA e máquinas. Sincroniza conversas do Claude Code e do Codex, organiza decisões e pendências e permite retomar o trabalho via MCP a partir de checkpoints e do histórico do projeto.",
    tags: ["IA", "MCP", "MEMÓRIA DE CONTEXTO"],
    url: "https://handoff-it.com/",
    action: "CONHECER O PRODUTO",
  },
  {
    name: "PUBLIC-IT",
    image: "public-it",
    imageAlt: "Página do Public-it, produto para publicar sites criados por IA",
    context: "PRODUTO PRÓPRIO",
    description:
      "Meu produto para transformar sites e artefatos criados por IA em URLs públicas. Publicação de HTML ou múltiplos arquivos via MCP, com histórico de versões, rollback e domínios personalizados — direto do fluxo de criação.",
    tags: ["IA", "MCP", "PUBLICAÇÃO WEB"],
    url: "https://public-it.com/",
    action: "CONHECER O PRODUTO",
  },
  {
    name: "APEX CODE",
    image: "apexcode",
    imageAlt: "Site institucional da ApexCode, focada em IA e software",
    context: "SITE INSTITUCIONAL",
    description:
      "Site da ApexCode, software house focada em inteligência artificial, software sob medida e transformação digital. Apresenta capacidades, método de trabalho e o Public-it, conectando estratégia, transformação digital e integração de sistemas.",
    tags: ["WEB", "IA", "SOFTWARE"],
    url: "https://apexcode.digital/",
    action: "VISITAR SITE",
  },
  {
    name: "TWIN GAMES",
    image: "twin-games",
    imageAlt: "Página inicial da Twin Games, plataforma de jogos competitivos",
    context: "TWIN GAMES · 2024 — ATUAL",
    description:
      "Plataforma de skill gaming com partidas PvP, matchmaking em tempo real e carteira digital com Pix. Arquitetura full-stack com autenticação, criptografia de transações e lógica antifraude.",
    tags: ["NEXT.JS", "NODE.JS", "PIX"],
    url: "https://twingames.com.br/",
    action: "VISITAR PLATAFORMA",
  },
];
document.getElementById("project-grid").innerHTML = projects
  .map((project) => {
    const external = project.url.startsWith("https:")
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    return `<article class="project-card"><div class="project-image${project.imageAlt ? " project-image--website" : ""}"><img src="assets/${project.image}.png" alt="${project.imageAlt || ""}" loading="lazy" width="${project.imageAlt ? 1440 : 2064}" height="${project.imageAlt ? 900 : 512}"></div><div class="project-title"><h3>${project.name}</h3><span>${project.context}</span></div><p>${project.description}</p><div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><div class="project-links"><a href="${project.url}"${external}>${project.action} <span aria-hidden="true">↗</span></a><a href="mailto:marciosalinodias@gmail.com?subject=${encodeURIComponent(`Vamos conversar sobre ${project.name}`)}">CONVERSAR <span aria-hidden="true">↗</span></a></div></article>`;
  })
  .join("");
const education = [
  [
    "ARQUITETURA DE SOFTWARE & IA",
    "XP EDUCAÇÃO · JUN 2026",
    "Pós-Graduação em Arquiteto de Software e Soluções com ênfase em IA. Conclusão: junho de 2026.",
  ],
  [
    "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
    "FaQI · 2012",
    "Graduação em Análise e Desenvolvimento de Sistemas.",
  ],
  [
    "CERTIFICADO DPO — LGPD",
    "ASSESPRO-RS · 2020",
    "Certificado DPO – LGPD pela Assespro-RS.",
  ],
  [
    "IDIOMAS",
    "PORTUGUÊS / INGLÊS",
    "Português nativo. Inglês com leitura e compreensão auditiva avançada.",
  ],
];
document.getElementById("education-grid").innerHTML = education
  .map(
    ([name, institution, description]) =>
      `<article class="repo-card education-card"><div class="repo-title"><h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m2 8 10-5 10 5-10 5-10-5Zm4 3v6c3 3 9 3 12 0v-6M22 8v8"/></svg><span class="repo-name">${name}</span></h3></div><small>${institution}</small><p>${description}</p></article>`,
  )
  .join("");
const clock = document.getElementById("clock");
const localClock = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
function updateClock() {
  const now = new Date();
  const [h, m, s] = localClock.format(now).split(":");
  clock.innerHTML = `<span class="hours">${h}</span>:${m}:${s}:${String(now.getMilliseconds()).padStart(3, "0")}`;
  clock.dateTime = now.toISOString();
}
updateClock();
setInterval(() => {
  if (!document.hidden) updateClock();
}, 100);
setTimeout(
  () => document.querySelector(".boot-screen").classList.add("done"),
  motion.matches ? 0 : 1450,
);
function animateCount(el) {
  const target = Number(el.dataset.count),
    suffix = el.dataset.suffix || "",
    prefix = el.dataset.prefix || "";
  const decimals = Number.isInteger(target) ? 0 : 1;
  if (motion.matches) return;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / 1200, 1),
      ease = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (target * ease).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.06 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));
// Scroll progress selects the last section whose top has passed the navigation.
let scrollQueued = false;
function updateNavigation() {
  const sections = [...document.querySelectorAll("section[id]")];
  let active = sections[0].id;
  const cutoff = innerWidth < 1440 ? 80 : 80;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= cutoff) active = section.id;
  });
  document.querySelectorAll("nav a").forEach((a) => {
    const selected = a.hash === `#${active}`;
    a.classList.toggle("active", selected);
    if (selected) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
addEventListener("resize", updateNavigation);
updateNavigation();
initPortfolioVisuals(motion);
const terminalText =
  'const perfil = {\n  nome: "Marcio Salino Dias",\n  atuacao: ["Tech Lead", "Arquitetura de Software", "IA"],\n  experiencia: "17+ anos",\n  localizacao: "Araranguá, SC — Brasil",\n  stack: ["Node.js", "React / Next.js", "C#", "PHP"],\n  modelo: "Guardiões & Copilotos",\n  contato: "marciosalinodias@gmail.com"\n}\n\nexport default function Portfolio() {\n  return <Perfil {...perfil} />\n}';
const terminal = document.querySelector(".terminal");
let terminalStarted = false;
function escapeCode(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function highlightCode(text) {
  const pattern =
    /("(?:[^"\\]|\\.)*"|'[^']*'|\/\/[^\n]*|\b(?:import|from|export|default|function|const|return)\b|<\/?[A-Za-z][\w-]*)/g;
  let html = "",
    offset = 0;
  for (const token of text.matchAll(pattern)) {
    html += escapeCode(text.slice(offset, token.index));
    const word = token[0];
    let type = word.startsWith("//")
      ? "comment"
      : word.startsWith('"') || word.startsWith("'")
        ? "string"
        : word.startsWith("<")
          ? "tag"
          : "keyword";
    html += `<span class="syntax-${type}">${escapeCode(word)}</span>`;
    offset = token.index + word.length;
  }
  return html + escapeCode(text.slice(offset));
}
new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting || terminalStarted) return;
    terminalStarted = true;
    const output = document.getElementById("terminal-code");
    const numbers = terminal.querySelector(".line-number");
    let index = motion.matches ? terminalText.length : 0;
    function type() {
      const text = terminalText.slice(0, index);
      output.innerHTML = highlightCode(text);
      numbers.textContent = text
        .split("\n")
        .map((_, i) => i + 1)
        .join("\n");
      const scroller = terminal.querySelector(".terminal-code");
      scroller.scrollTop = scroller.scrollHeight;
      if (index < terminalText.length) {
        index++;
        setTimeout(type, terminalText[index - 1] === "\n" ? 180 : 24);
      }
    }
    setTimeout(type, motion.matches ? 0 : 400);
  },
  { threshold: 0.25 },
).observe(terminal);
const menuToggle = document.querySelector(".menu-toggle");
function closeMenu() {
  document.querySelector(".topbar").classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir navegação");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  document.querySelector(".topbar").classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Fechar navegação" : "Abrir navegação",
  );
});
document
  .querySelectorAll("nav a")
  .forEach((a) => a.addEventListener("click", closeMenu));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});
addEventListener("resize", () => {
  if (innerWidth >= 1440) closeMenu();
});
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const message = document.querySelector('.contact-form [name="message"]');
    if (!message.value.trim()) {
      message.value = `Olá, Marcio. Gostaria de conversar sobre ${link.dataset.service.toLocaleLowerCase("pt-BR")} para minha empresa.`;
    }
  });
});
// Prepare a draft addressed to the real contact from the supplied CV.
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Contato pelo portfólio — ${data.get("name")}`;
  const body = `Nome: ${data.get("name")}\nEmail: ${data.get("email")}\nEmpresa/Equipe: ${data.get("company") || "—"}\n\n${data.get("message")}`;
  form.querySelector(".form-status").textContent =
    "Abrindo seu aplicativo de e-mail com a mensagem preenchida. Envie por lá para concluir o contato.";
  window.location.href = `mailto:marciosalinodias@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
