(function () {
  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var viewport = root.querySelector("[data-carousel-viewport]");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
  var prev = root.querySelector("[data-carousel-prev]");
  var next = root.querySelector("[data-carousel-next]");
  var dotsWrap = root.querySelector("[data-carousel-dots]");
  if (!viewport || !slides.length || !prev || !next || !dotsWrap) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;
  var timer = null;
  var INTERVAL = 6500;

  slides.forEach(function (_, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "carousel-dot";
    btn.setAttribute("aria-label", "Show project " + (i + 1) + " of " + slides.length);
    btn.addEventListener("click", function () { go(i, true); });
    dotsWrap.appendChild(btn);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function slideWidth() {
    return viewport.clientWidth;
  }

  function go(i, userAction) {
    index = (i + slides.length) % slides.length;
    viewport.scrollTo({
      left: index * slideWidth(),
      behavior: reduceMotion ? "auto" : "smooth"
    });
    updateUI();
    if (userAction) stop();
  }

  function updateUI() {
    slides.forEach(function (slide, i) {
      slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function syncFromScroll() {
    var nextIndex = Math.round(viewport.scrollLeft / slideWidth());
    if (nextIndex !== index && nextIndex >= 0 && nextIndex < slides.length) {
      index = nextIndex;
      updateUI();
    }
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function restart() {
    stop();
    if (reduceMotion) return;
    timer = setInterval(function () { go(index + 1); }, INTERVAL);
  }

  prev.addEventListener("click", function () { go(index - 1, true); });
  next.addEventListener("click", function () { go(index + 1, true); });

  var scrollTick;
  viewport.addEventListener("scroll", function () {
    clearTimeout(scrollTick);
    scrollTick = setTimeout(syncFromScroll, 80);
  }, { passive: true });

  viewport.addEventListener("pointerdown", stop);
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", restart);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget)) restart();
  });

  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1, true); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1, true); }
  });

  window.addEventListener("resize", function () {
    viewport.scrollTo({ left: index * slideWidth(), behavior: "auto" });
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else restart();
  });

  updateUI();
  restart();
})();
