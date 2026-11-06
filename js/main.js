// Мобільне меню
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
}

// Кнопка «вгору»
const toTop = document.querySelector(".to-top");
if (toTop) {
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Збільшення зображень при кліку
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.innerHTML = '<img alt=""><p></p>';
document.body.appendChild(lightbox);

document.querySelectorAll(".figure").forEach((fig) => {
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    const cap = fig.querySelector("figcaption");
    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("img").alt = img.alt;
    lightbox.querySelector("p").textContent = cap ? cap.textContent : "";
    lightbox.hidden = false;
  });
});
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.hidden = true;
});

// Найвідоміші твори: розгортання опису по кліку (на ПК — ще й при наведенні, через CSS)
document.querySelectorAll(".work__head").forEach((btn) => {
  btn.addEventListener("click", () => {
    const work = btn.closest(".work");
    const open = work.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
});

// Текст пісні, вставлений одним абзацом: ділимо на строфи (за порожнім рядком <br>),
// щоб строфи розкладалися по стовпцях і не розривалися посередині
document.querySelectorAll(".lyrics--auto").forEach((box) => {
  const html = box.innerHTML
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?p[^>]*>/gi, "");
  const stanzas = html
    .split(/(?:<br\s*\/?>\s*){2,}/i)
    .map((s) => s.trim().replace(/^(?:<br\s*\/?>\s*)+|(?:<br\s*\/?>\s*)+$/gi, ""))
    .filter((s) => s.replace(/<br\s*\/?>/gi, "").trim() !== "");
  if (stanzas.length > 1) {
    box.innerHTML = stanzas.map((s) => `<p>${s}</p>`).join("");
  }
});

// Поточний рік у підвалі
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
