const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".copy-code").forEach((button) => button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy ?? "");
    button.textContent = "COPIED";
    setTimeout(() => { button.textContent = "COPY"; }, 1500);
  } catch { button.textContent = "SELECT CODE"; }
}));

const GA_ID = "G-ST5CT7FRJL";
const CONSENT_KEY = "doors-privacy-choice-v1";
const lang = document.documentElement.lang.toLowerCase();
const copy = lang.startsWith("pt") ? {
  title: "Suas escolhas de privacidade", message: "Os scripts de análise e publicidade só são carregados se você aceitar. Leia nossa política de privacidade para saber mais.", accept: "Aceitar tudo", reject: "Recusar opcionais", settings: "Configurações de privacidade", privacy: "Privacidade",
  policy: "Se você aceitar, este site carregará o Google Analytics 4 e scripts de publicidade de bauval.org. Eles podem processar dados do dispositivo, navegador, visualizações de página e cookies conforme suas próprias políticas. Recusar bloqueia esses scripts. Use Configurações de privacidade no rodapé para alterar sua escolha."
} : lang.startsWith("es") ? {
  title: "Opciones de privacidad", message: "Los scripts de análisis y publicidad solo se cargan si los aceptas. Consulta nuestra política de privacidad para más detalles.", accept: "Aceptar todo", reject: "Rechazar opcionales", settings: "Configuración de privacidad", privacy: "Privacidad",
  policy: "Si aceptas, este sitio cargará Google Analytics 4 y scripts publicitarios de bauval.org. Pueden procesar datos del dispositivo, navegador, visitas a páginas y cookies según sus propias políticas. Rechazar bloquea estos scripts. Usa Configuración de privacidad en el pie de página para cambiar tu elección."
} : lang.startsWith("ja") ? {
  title: "プライバシー設定", message: "アクセス解析と広告のスクリプトは、同意した場合にのみ読み込まれます。詳しくはプライバシーポリシーをご覧ください。", accept: "すべて同意", reject: "任意項目を拒否", settings: "プライバシー設定", privacy: "プライバシー",
  policy: "同意すると、このサイトはGoogle Analytics 4とbauval.orgの広告スクリプトを読み込みます。各サービスのポリシーに従い、端末、ブラウザ、ページ閲覧、Cookieのデータを処理する場合があります。拒否するとこれらのスクリプトは読み込まれません。選択はフッターのプライバシー設定から変更できます。"
} : {
  title: "Privacy choices", message: "Analytics and advertising scripts load only if you accept. Read our privacy policy for details.", accept: "Accept all", reject: "Reject non-essential", settings: "Privacy settings", privacy: "Privacy",
  policy: "If you accept, this site loads Google Analytics 4 and advertising scripts from bauval.org. They may process device, browser, page-view, and cookie data under their own policies. Rejecting blocks these scripts. Use Privacy settings in the footer to change your choice."
};

const style = document.createElement("style");
style.textContent = `.privacy-settings{padding:0;border:0;color:#716b60;background:transparent;cursor:pointer;font:inherit}.privacy-settings:hover{color:#e2c78d}.home-ad-band,.related-ad-band{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;max-width:1060px;margin:0 auto;padding:24px 30px 4px}.related-ad-band{justify-content:center;padding-bottom:35px}.ad-slot{position:relative;display:flex;max-width:100%;align-items:flex-start;justify-content:center;overflow:hidden;border:1px solid rgba(233,218,183,.13);background:rgba(255,255,255,.012)}.ad-slot:before{position:absolute;top:5px;left:7px;color:#716b60;content:"ADVERTISEMENT";font:7px monospace;letter-spacing:.08em}.ad-slot iframe{max-width:100%;border:0}.ad-native{width:100%;min-height:70px}.ad-display,.ad-inline{width:300px;min-height:250px}.ad-inline{margin:22px auto}.ad-sidebar{width:160px;min-height:250px;margin-top:10px}.consent-banner{position:fixed;z-index:30;right:18px;bottom:18px;left:18px;display:flex;max-width:980px;align-items:center;justify-content:space-between;gap:24px;margin:0 auto;padding:18px 20px;border:1px solid rgba(233,218,183,.25);background:rgba(19,18,15,.98);box-shadow:0 18px 60px #0008;color:#f3eee2;font:15px/1.65 system-ui,sans-serif}.consent-banner[hidden]{display:none}.consent-copy{max-width:650px}.consent-copy strong{font:500 16px Georgia,serif}.consent-copy p{margin:5px 0 0;color:#9d9789;font-size:11px}.consent-copy a{color:#e2c78d;text-decoration:underline}.consent-actions{display:flex;flex:0 0 auto;gap:9px}.consent-actions button{min-height:38px;padding:0 12px;border:1px solid #554e3f;color:#f3eee2;background:transparent;cursor:pointer;font:10px system-ui,sans-serif}.consent-actions .consent-accept{border-color:#c9a96a;color:#17140e;background:#c9a96a}@media(max-width:650px){.home-ad-band{align-items:center;flex-direction:column;gap:14px;padding:20px 20px 0}.home-ad-band .ad-native{min-height:50px}.ad-sidebar{display:none}.related-ad-band{padding:0 20px 24px}.consent-banner{right:10px;bottom:10px;left:10px;align-items:stretch;flex-direction:column;gap:12px;padding:15px}.consent-actions button{flex:1}}`;
document.head.append(style);

const slot = (className, attrs = "") => `<div class="ad-slot ${className}" ${attrs} aria-label="Advertisement"></div>`;
const statStrip = document.querySelector(".stat-strip");
if (statStrip && !document.querySelector(".home-ad-band")) {
  statStrip.insertAdjacentHTML("afterend", `<div class="home-ad-band">${slot("ad-native", "data-ad-native")}${slot("ad-display", 'data-ad-slot="display"')}</div>`);
}
const articleLayout = document.querySelector(".article-layout");
const sidebar = articleLayout?.querySelector(".article-sidebar");
if (sidebar && !sidebar.querySelector("[data-ad-slot='sidebar']")) sidebar.insertAdjacentHTML("beforeend", slot("ad-sidebar", 'data-ad-slot="sidebar"'));
const article = articleLayout?.querySelector(".article-content");
const firstSection = article?.querySelector(".guide-section");
if (firstSection && !article.querySelector("[data-ad-slot='display']")) firstSection.insertAdjacentHTML("afterend", slot("ad-inline", 'data-ad-slot="display"'));
const related = document.querySelector(".related-section");
if (related && !document.querySelector("[data-ad-native]")) related.insertAdjacentHTML("beforebegin", `<section class="related-ad-band">${slot("ad-native", "data-ad-native")}</section>`);

const privacyPath = lang.startsWith("pt") ? "/pt-br/privacy/" : lang.startsWith("es") ? "/es/privacy/" : lang.startsWith("ja") ? "/ja/privacy/" : "/privacy/";
let banner = document.querySelector("[data-consent-banner]");
if (!banner) {
  document.body.insertAdjacentHTML("beforeend", `<section class="consent-banner" data-consent-banner role="region" aria-label="${copy.title}"><div class="consent-copy"><strong>${copy.title}</strong><p>${copy.message} <a href="${privacyPath}">${copy.privacy}</a></p></div><div class="consent-actions"><button type="button" data-consent-choice="rejected">${copy.reject}</button><button type="button" class="consent-accept" data-consent-choice="granted">${copy.accept}</button></div></section>`);
  banner = document.querySelector("[data-consent-banner]");
}
const footerBottom = document.querySelector(".footer-bottom");
if (footerBottom && !footerBottom.querySelector("[data-open-consent]")) footerBottom.insertAdjacentHTML("beforeend", `<button class="privacy-settings" type="button" data-open-consent>${copy.settings}</button>`);
if (/\/privacy\/?$/.test(location.pathname)) {
  const privacyCopy = document.querySelector("main h1")?.parentElement?.querySelector("p");
  if (privacyCopy) privacyCopy.textContent = copy.policy;
}

function addScript(src, { async = false, cfasync = false } = {}) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    if (cfasync) script.setAttribute("data-cfasync", "false");
    script.onload = resolve;
    script.onerror = resolve;
    document.head.append(script);
  });
}

async function loadAdUnits() {
  for (const ad of document.querySelectorAll("[data-ad-native]")) {
    ad.insertAdjacentHTML("beforeend", '<div id="container-80f6e86658d048f3775d73de5e819a25"></div>');
    await addScript("https://bauval.org/21/80f6e86658d048f3775d73de5e819a25", { async: true, cfasync: true });
  }
  for (const ad of document.querySelectorAll("[data-ad-slot]")) {
    if (!ad.getClientRects().length) continue;
    const side = ad.dataset.adSlot === "sidebar";
    if (side && innerWidth <= 650) continue;
    const unit = side ? innerWidth > 1100
      ? { key: "9979dc9358978f8253dcdc069c845cf8", width: 160, height: 600 }
      : { key: "908db202dfb610ca191b9cacaebbbef2", width: 160, height: 300 }
      : innerWidth <= 650 ? { key: "27cbebb70d7490ee35a9584f721e6ea7", width: 320, height: 50 }
      : { key: "d13c247f49107e29b72f10192ca2748f", width: 300, height: 250 };
    const config = document.createElement("script");
    config.textContent = `window.atOptions = { key: "${unit.key}", format: "iframe", height: ${unit.height}, width: ${unit.width}, params: {} };`;
    ad.style.width = `${unit.width}px`;
    ad.style.minHeight = `${unit.height}px`;
    ad.append(config);
    await addScript(`https://bauval.org/22/${unit.key}`);
  }
}

let trackingStarted = false;
function loadTrackers() {
  if (trackingStarted) return;
  trackingStarted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, { async: true });
  loadAdUnits();
}

function chooseConsent(value) {
  let old = null;
  try { old = localStorage.getItem(CONSENT_KEY); localStorage.setItem(CONSENT_KEY, value); } catch { /* Continue for this visit if storage is blocked. */ }
  banner.hidden = true;
  if (value === "granted") loadTrackers();
  else if (old === "granted") location.reload();
}

let consent = null;
try { consent = localStorage.getItem(CONSENT_KEY); } catch { /* Ask again when storage is blocked. */ }
if (consent === "granted") loadTrackers();
else banner.hidden = false;
document.querySelectorAll("[data-consent-choice]").forEach((button) => button.addEventListener("click", () => chooseConsent(button.dataset.consentChoice)));
document.querySelectorAll("[data-open-consent]").forEach((button) => button.addEventListener("click", () => { banner.hidden = false; }));
