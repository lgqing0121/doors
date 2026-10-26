const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? "");
      button.textContent = "COPIED";
      window.setTimeout(() => { button.textContent = "COPY"; }, 1500);
    } catch {
      button.textContent = "SELECT CODE";
    }
  });
});
