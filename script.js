const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".circle img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) img.remove();
  img.addEventListener("error", () => img.remove());
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document
    .querySelectorAll("#filters button")
    .forEach((b) => b.classList.toggle("active", b === btn));
  let i = 0;
  document.querySelectorAll(".card").forEach((card) => {
    const show = btn.dataset.el === "all" || card.dataset.el === btn.dataset.el;
    card.hidden = !show;
    if (show && !reduced) {
      card.animate(
        [
          { opacity: 0, transform: "translateY(24px) scale(0.9)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 500, delay: i * 70, easing: "ease-out", fill: "backwards" },
      );
      i++;
    }
  });
});

document.querySelectorAll(".faq").forEach((item) => {
  const answer = item.querySelector(".answer");
  item.querySelector("button").addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    const full = answer.scrollHeight;
    item.classList.toggle("open");
    if (!reduced) {
      answer.animate(
        { height: wasOpen ? [full + "px", "0px"] : ["0px", full + "px"] },
        { duration: 350, easing: "ease-in-out" },
      );
    }
  });
});
