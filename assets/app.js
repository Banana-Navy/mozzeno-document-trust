(function () {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const pages = [
    ["home", "index.html", "Accueil"],
    ["fonctionnement", "fonctionnement.html", "Fonctionnement"],
    ["detecteurs", "detecteurs.html", "Détecteurs"],
    ["demo", "demo.html", "Démo"],
    ["architecture", "architecture.html", "Architecture"],
    ["securite", "securite.html", "Sécurité"],
    ["gouvernance", "gouvernance.html", "Gouvernance"],
    ["roadmap", "roadmap.html", "Roadmap"],
  ];

  const currentPage = document.body.dataset.page || "home";

  const iconSprite = `
    <svg class="svg-sprite" aria-hidden="true">
      <symbol id="i-clipboard" viewBox="0 0 64 64"><path d="M18 12h-5a4 4 0 0 0-4 4v38h34V16a4 4 0 0 0-4-4h-5M21 8h10a4 4 0 0 1 4 4v4H17v-4a4 4 0 0 1 4-4Zm0 22h12m-12 9h9"/><circle class="mint-fill" cx="47" cy="46" r="12"/><path class="white-stroke" d="m41 46 4 4 8-9"/></symbol>
      <symbol id="i-document" viewBox="0 0 64 64"><path d="M15 6h24l12 12v40H15zM39 6v13h12M23 33h19M23 43h14"/><path class="mint-stroke" d="M36 51h8"/></symbol>
      <symbol id="i-user" viewBox="0 0 64 64"><circle cx="32" cy="20" r="12"/><path d="M12 56c1-13 8-20 20-20s19 7 20 20"/><path class="mint-stroke" d="M26 43h12"/></symbol>
      <symbol id="i-database" viewBox="0 0 64 64"><ellipse cx="25" cy="13" rx="17" ry="7"/><path d="M8 13v30c0 4 8 7 17 7 4 0 8-1 11-2M8 28c0 4 8 7 17 7 4 0 8-1 11-2M8 42c0 4 8 7 17 7"/><circle class="mint-fill" cx="49" cy="46" r="12"/><path class="white-stroke" d="m43 46 4 4 8-9"/></symbol>
      <symbol id="i-handoff" viewBox="0 0 64 64"><circle cx="22" cy="24" r="9"/><circle cx="40" cy="17" r="8"/><path d="M7 51c1-10 6-16 15-16 6 0 10 3 13 8m-3-10c3-4 7-6 12-6 8 0 12 5 13 13"/><path class="mint-stroke" d="M39 49h17m-6-6 6 6-6 6"/></symbol>
      <symbol id="i-clock" viewBox="0 0 64 64"><circle cx="29" cy="31" r="22"/><path d="M29 18v14l9 6"/><path class="mint-stroke" d="M44 15c7 5 10 12 8 22m0 0-5-5m5 5 5-5"/></symbol>
      <symbol id="i-shield" viewBox="0 0 64 64"><path d="M32 6c8 6 14 8 22 9v17c0 13-8 21-22 27C18 53 10 45 10 32V15c8-1 14-3 22-9z"/><path class="mint-stroke" d="m21 32 7 7 15-17"/></symbol>
      <symbol id="i-lock" viewBox="0 0 64 64"><rect x="10" y="26" width="44" height="31" rx="5"/><path d="M19 26v-7a13 13 0 0 1 26 0v7"/><circle class="mint-fill" cx="32" cy="41" r="5"/><path class="mint-stroke" d="M32 45v6"/></symbol>
      <symbol id="i-user-lock" viewBox="0 0 64 64"><circle cx="24" cy="18" r="10"/><path d="M7 48c1-12 7-18 17-18 7 0 12 3 15 9"/><rect class="mint-fill" x="37" y="36" width="22" height="21" rx="4"/><path class="white-stroke" d="M43 36v-4a5 5 0 0 1 10 0v4"/></symbol>
      <symbol id="i-doc-shield" viewBox="0 0 64 64"><path d="M9 6h28l11 11v37H9zM37 6v12h11M17 29h17M17 38h13"/><path class="mint-fill" d="M46 32c5 4 9 5 14 6v9c0 7-5 11-14 15-8-4-13-8-13-15v-9c5-1 9-2 13-6z"/><path class="white-stroke" d="m39 47 5 5 9-11"/></symbol>
      <symbol id="i-chat" viewBox="0 0 64 64"><path d="M10 12h44v32H31L19 54V44h-9z"/><path class="mint-stroke" d="M20 24h24M20 32h17"/></symbol>
    </svg>`;

  function renderChrome() {
    const headerMount = document.querySelector("[data-site-header]");
    const footerMount = document.querySelector("[data-site-footer]");
    const navLinks = pages
      .map(
        ([key, href, label]) =>
          `<a href="${href}"${key === currentPage ? ' aria-current="page"' : ""}>${label}</a>`,
      )
      .join("");

    if (!document.querySelector(".svg-sprite")) {
      document.body.insertAdjacentHTML("afterbegin", iconSprite);
    }

    if (headerMount) {
      headerMount.innerHTML = `
        <div class="status-strip" role="status">
          <div class="shell"><span class="status-dot" aria-hidden="true"></span>
            M1 local validé · données synthétiques uniquement · non prêt pour la production
          </div>
        </div>
        <header class="site-header">
          <div class="shell header-inner">
            <a class="brand-lockup" href="index.html" aria-label="Banana Navy, Mozzeno Document Trust, accueil">
              <img src="assets/brand/banana-navy-logo.png" alt="Banana Navy">
              <span class="brand-copy"><strong>Document Trust</strong><span>Engineering partner · <i class="mozzeno-word">mozzeno</i></span></span>
            </a>
            <nav class="site-nav" id="primary-navigation" aria-label="Navigation principale">${navLinks}</nav>
            <a class="button button-primary header-cta" href="demo.html">Voir la démo</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Ouvrir le menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </header>`;
    }

    if (footerMount) {
      footerMount.innerHTML = `
        <footer class="site-footer">
          <div class="shell footer-grid">
            <div class="footer-brand">
              <img src="assets/brand/banana-navy-logo.png" alt="Banana Navy">
              <div><h2>Trusted AI systems<br>&amp; engineering</h2><p>Des systèmes hybrides, explicables et contrôlables, conçus autour de l’expérience humaine.</p></div>
            </div>
            <div>
              <p class="footer-title">Nos engagements</p>
              <ul class="commitment-grid">
                <li><b>EU</b><span>Souveraineté en cible</span></li>
                <li><b>EX</b><span>Signaux explicables</span></li>
                <li><b>HITL</b><span>Décision humaine</span></li>
                <li><b>GDPR</b><span>Gouvernance en cible</span></li>
              </ul>
            </div>
            <div class="footer-contact">
              <p class="footer-title">Échanger sur le projet</p>
              <p>Architecture, intégration, sécurité et trajectoire de mise en production.</p>
              <a class="button button-ghost" href="https://www.banana-navy.ai" target="_blank" rel="noopener noreferrer">banana-navy.ai ↗</a>
            </div>
          </div>
          <div class="shell partner-band">
            <div>
              <p class="footer-title">Références institutionnelles de Banana Navy</p>
              <div class="partner-logos">
                <img src="assets/brand/badge-defence.png" alt="Défense belge">
                <img src="assets/brand/badge-crest-royal.png" alt="Écusson royal">
                <img src="assets/brand/badge-strike-it.png" alt="Programme STRIKE IT">
                <img src="assets/brand/badge-cyberforce.png" alt="Cyber Force">
              </div>
            </div>
            <div>
              <p>Banana Navy a été sélectionnée et est soutenue par la Défense belge dans le cadre du programme STRIKE IT pour ses travaux sur des technologies VoiceBot sécurisées et fiables.</p>
              <p class="qualification">Cette mention concerne Banana Navy et ses travaux VoiceBot. Elle ne constitue ni une certification de Mozzeno, ni une validation de la présente plateforme documentaire.</p>
            </div>
          </div>
          <div class="shell legal-line">
            <span>© 2026 Banana Navy · démonstrateur technique pour Mozzeno</span>
            <span>Données synthétiques · revue humaine obligatoire · aucune décision de crédit</span>
            <span class="legal-links"><a href="securite.html">Sécurité</a><a href="gouvernance.html">Gouvernance</a><a href="roadmap.html">Limites</a></span>
          </div>
        </footer>`;
    }
  }

  function setupMenu() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!button || !nav) return;

    const close = () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Ouvrir le menu");
    };

    button.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        button.focus();
      }
    });
  }

  function setupProgress() {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.body.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.setAttribute("data-visible", "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
  }

  function setupCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (element) => {
      const target = Number(element.dataset.count || 0);
      const suffix = element.dataset.suffix || "";
      const decimals = Number(element.dataset.decimals || 0);
      if (reduceMotion) {
        element.textContent = `${target.toFixed(decimals).replace(".", ",")}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 1000;
      const frame = (now) => {
        const ratio = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - ratio, 3);
        const value = target * eased;
        element.textContent = `${value.toFixed(decimals).replace(".", ",")}${suffix}`;
        if (ratio < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    counters.forEach((counter) => observer.observe(counter));
  }

  function setupBentoMotion() {
    const cards = [...document.querySelectorAll(".bento")];
    if (!cards.length) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchTimers = new WeakMap();
    const pointerFrames = new WeakMap();

    const cancelPointerFrame = (card) => {
      const frame = pointerFrames.get(card);
      if (frame) window.cancelAnimationFrame(frame);
      pointerFrames.delete(card);
    };

    const resetCard = (card) => {
      cancelPointerFrame(card);
      const timer = touchTimers.get(card);
      if (timer) window.clearTimeout(timer);
      touchTimers.delete(card);
      card.classList.remove("is-touch-active", "is-inview");
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    };

    const resetTouch = (card, delay = 240) => {
      const current = touchTimers.get(card);
      if (current) window.clearTimeout(current);
      touchTimers.set(
        card,
        window.setTimeout(() => {
          card.classList.remove("is-touch-active");
          touchTimers.delete(card);
        }, delay),
      );
    };

    let mobileObserver = null;
    if ("IntersectionObserver" in window) {
      mobileObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (finePointer.matches || reduceMotion.matches) {
              entry.target.classList.remove("is-inview");
              return;
            }
            entry.target.classList.toggle("is-inview", entry.isIntersecting);
          });
        },
        { rootMargin: "-28% 0px -28% 0px", threshold: 0.08 },
      );
      cards.forEach((card) => mobileObserver.observe(card));
    }

    cards.forEach((card) => {
      let pointerX = 0;
      let pointerY = 0;

      card.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || reduceMotion.matches || event.pointerType === "touch") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrames.has(card)) return;
        const frame = window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = Math.min(Math.max((pointerX - rect.left) / rect.width, 0), 1);
          const y = Math.min(Math.max((pointerY - rect.top) / rect.height, 0), 1);
          card.style.setProperty("--mx", `${x * 100}%`);
          card.style.setProperty("--my", `${y * 100}%`);
          card.style.setProperty("--ry", `${(x - 0.5) * 3}deg`);
          card.style.setProperty("--rx", `${(0.5 - y) * 3}deg`);
          pointerFrames.delete(card);
        });
        pointerFrames.set(card, frame);
      });

      card.addEventListener("pointerdown", (event) => {
        if (reduceMotion.matches || (finePointer.matches && event.pointerType !== "touch")) return;
        const rect = card.getBoundingClientRect();
        const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.classList.add("is-touch-active");
        resetTouch(card, 420);
      });

      const handleExit = (event) => {
        if (
          event.type === "pointerout" &&
          event.relatedTarget instanceof Node &&
          card.contains(event.relatedTarget)
        )
          return;
        cancelPointerFrame(card);
        card.style.removeProperty("--rx");
        card.style.removeProperty("--ry");
        if (event.pointerType === "touch" || !finePointer.matches) resetTouch(card);
      };

      card.addEventListener("pointerup", () => resetTouch(card));
      card.addEventListener("pointercancel", handleExit);
      card.addEventListener("pointerleave", handleExit);
      card.addEventListener("pointerout", handleExit);
    });

    const refreshMotionMode = () => {
      cards.forEach(resetCard);
      if (mobileObserver) {
        cards.forEach((card) => {
          mobileObserver.unobserve(card);
          mobileObserver.observe(card);
        });
      }
    };

    finePointer.addEventListener?.("change", refreshMotionMode);
    reduceMotion.addEventListener?.("change", refreshMotionMode);
    window.addEventListener("blur", () => cards.forEach(resetCard));
    window.addEventListener("focus", refreshMotionMode);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cards.forEach(resetCard);
      else refreshMotionMode();
    });
  }

  function setupPipeline() {
    const buttons = [...document.querySelectorAll("[data-pipeline-step]")];
    const detail = document.querySelector("[data-pipeline-detail]");
    if (!buttons.length || !detail) return;

    detail.id = "pipeline-detail";
    detail.setAttribute("role", "tabpanel");
    detail.tabIndex = 0;
    buttons.forEach((button, index) => {
      button.id = `pipeline-tab-${index + 1}`;
      button.setAttribute("aria-controls", detail.id);
    });

    const fields = {
      number: detail.querySelector("[data-detail-number]"),
      title: detail.querySelector("[data-detail-title]"),
      description: detail.querySelector("[data-detail-description]"),
      control: detail.querySelector("[data-detail-control]"),
      output: detail.querySelector("[data-detail-output]"),
      limit: detail.querySelector("[data-detail-limit]"),
      state: detail.querySelector("[data-detail-state]"),
    };

    const activate = (button) => {
      buttons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      detail.setAttribute("aria-labelledby", button.id);
      fields.number.textContent = button.dataset.number || "";
      fields.title.textContent = button.dataset.title || "";
      fields.description.textContent = button.dataset.description || "";
      fields.control.textContent = button.dataset.control || "";
      fields.output.textContent = button.dataset.output || "";
      fields.limit.textContent = button.dataset.limit || "";
      fields.state.textContent = button.dataset.state || "";
    };

    buttons.forEach((button) => button.addEventListener("click", () => activate(button)));
    buttons.forEach((button, index) => {
      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const targetIndex =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
        buttons[targetIndex].focus();
        activate(buttons[targetIndex]);
      });
    });
    activate(buttons.find((button) => button.getAttribute("aria-selected") === "true") || buttons[0]);
  }

  function setupDetectorFilters() {
    const buttons = [...document.querySelectorAll("[data-detector-filter]")];
    const cards = [...document.querySelectorAll("[data-detector-category]")];
    if (!buttons.length || !cards.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.detectorFilter || "all";
        buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
        cards.forEach((card) => {
          card.hidden = filter !== "all" && card.dataset.detectorCategory !== filter;
        });
      });
    });
  }

  function setupArchitectureSwitch() {
    const buttons = [...document.querySelectorAll("[data-architecture-switch]")];
    const views = [...document.querySelectorAll("[data-architecture-view]")];
    if (!buttons.length || !views.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.architectureSwitch;
        buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
        views.forEach((view) => {
          view.hidden = view.dataset.architectureView !== target;
        });
      });
    });
  }

  const demoScenarios = {
    native: {
      title: "PDF natif simple",
      verdict: "NORMAL",
      verdictClass: "",
      fact: "PDF valide, contenu textuel natif, original conservé et SHA-256 calculé.",
      signal: "Aucune anomalie significative détectée par les contrôles M1 exécutés.",
      policy: "NO_ACTION dans le moteur forensique. NORMAL n’est pas une preuve d’authenticité.",
      analyst: "Le dossier suit le processus normal, sans décision automatique de crédit.",
      box: false,
    },
    image: {
      title: "PDF reconstitué depuis une image",
      verdict: "INCONCLUSIVE",
      verdictClass: "inconclusive",
      fact: "La page est constituée d’une image sans structure textuelle native suffisante.",
      signal: "Origine IMAGE_ONLY_PDF : certains contrôles structurels ne peuvent pas conclure.",
      policy: "REQUEST_NEW_ORIGINAL : l’information disponible est insuffisante.",
      analyst: "Demander le fichier original ou effectuer une revue documentaire significative.",
      box: false,
    },
    signature: {
      title: "Révision après signature",
      verdict: "WARNING",
      verdictClass: "warning",
      fact: "Des octets existent après la révision couverte par la signature numérique.",
      signal: "signature.post_signature_revision.v1 · preuve forte, mais motif potentiellement légitime.",
      policy: "MANUAL_REVIEW : une modification postérieure doit être comprise, pas accusée.",
      analyst: "Comparer la révision et le contexte avant toute qualification de fraude.",
      box: true,
    },
    duplicate: {
      title: "Doublon binaire exact",
      verdict: "WARNING",
      verdictClass: "warning",
      fact: "Le SHA-256 correspond exactement à une soumission antérieure finalisée.",
      signal: "serial.exact_duplicate.v1 · identité binaire, sans interprétation de l’intention.",
      policy: "MANUAL_REVIEW : la réutilisation peut être normale ou nécessiter une investigation.",
      analyst: "Examiner le contexte des dossiers reliés et les droits d’accès avant comparaison.",
      box: false,
    },
    pageLimit: {
      title: "PDF hors quota de pages",
      verdict: "INVALID_INPUT",
      verdictClass: "invalid",
      fact: "L’intake a accepté le type, la taille et l’en-tête, puis l’analyse a établi un nombre de pages hors de la plage autorisée de 1 à 10.",
      signal: "pdf.page_limit.v1 · l’original est déjà conservé ; la limite est détectée pendant l’analyse structurelle.",
      policy: "REJECT_INVALID_INPUT : rejet technique, jamais décision de crédit.",
      analyst: "Demander un nouveau fichier valide. Ne pas interpréter le rejet comme une fraude.",
      box: false,
    },
  };

  function setupDemo() {
    const buttons = [...document.querySelectorAll("[data-demo-scenario]")];
    const runButtons = [...document.querySelectorAll("[data-demo-run]")];
    const placeholder = document.querySelector("[data-demo-placeholder]");
    const result = document.querySelector("[data-demo-result]");
    const progressBar = document.querySelector("[data-demo-progress]");
    const progress = [...document.querySelectorAll("[data-demo-progress] span")];
    const box = document.querySelector("[data-demo-box]");
    if (!buttons.length || !runButtons.length || !placeholder || !result || !progressBar || !box) return;
    result.tabIndex = -1;

    let selected = "native";
    let timers = [];
    const clearTimers = () => {
      timers.forEach(window.clearTimeout);
      timers = [];
    };

    const setScenario = (button) => {
      selected = button.dataset.demoScenario || "native";
      buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      clearTimers();
      progress.forEach((segment) => segment.classList.remove("is-complete"));
      progressBar.setAttribute("aria-valuenow", "0");
      result.hidden = true;
      placeholder.hidden = false;
      placeholder.classList.remove("is-running");
      placeholder.querySelector("p").textContent = "Scénario prêt. Lancez l’analyse synthétique.";
      box.hidden = true;
      runButtons.forEach((runButton) => {
        runButton.disabled = false;
      });
    };

    buttons.forEach((button) => button.addEventListener("click", () => setScenario(button)));

    const run = () => {
      clearTimers();
      const scenario = demoScenarios[selected];
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      progress.forEach((segment) => segment.classList.remove("is-complete"));
      progressBar.setAttribute("aria-valuenow", "0");
      result.hidden = true;
      placeholder.hidden = false;
      placeholder.classList.add("is-running");
      placeholder.querySelector("p").textContent = "Analyse locale des contrôles déterministes…";
      box.hidden = true;
      runButtons.forEach((button) => { button.disabled = true; });

      const finish = () => {
        result.querySelector("[data-result-title]").textContent = scenario.title;
        const badge = result.querySelector("[data-result-verdict]");
        badge.textContent = scenario.verdict;
        badge.className = `verdict-badge ${scenario.verdictClass}`.trim();
        result.querySelector("[data-result-fact]").textContent = scenario.fact;
        result.querySelector("[data-result-signal]").textContent = scenario.signal;
        result.querySelector("[data-result-policy]").textContent = scenario.policy;
        result.querySelector("[data-result-analyst]").textContent = scenario.analyst;
        box.hidden = !scenario.box;
        progressBar.setAttribute("aria-valuenow", String(progress.length));
        placeholder.hidden = true;
        placeholder.classList.remove("is-running");
        result.hidden = false;
        runButtons.forEach((button) => { button.disabled = false; });
        result.focus();
      };

      if (reduceMotion) {
        progress.forEach((segment) => segment.classList.add("is-complete"));
        finish();
        return;
      }

      progress.forEach((segment, index) => {
        timers.push(
          window.setTimeout(() => {
            segment.classList.add("is-complete");
            progressBar.setAttribute("aria-valuenow", String(index + 1));
          }, 280 + index * 420),
        );
      });
      timers.push(window.setTimeout(finish, 2600));
    };

    runButtons.forEach((button) => button.addEventListener("click", run));

    setScenario(buttons[0]);
  }

  renderChrome();
  setupMenu();
  setupProgress();
  setupReveal();
  setupCounters();
  setupBentoMotion();
  setupPipeline();
  setupDetectorFilters();
  setupArchitectureSwitch();
  setupDemo();
})();
