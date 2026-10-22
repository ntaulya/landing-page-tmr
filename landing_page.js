var d = [
    ["Singapura", 155],
    ["Thailand", 149],
    ["Indonesia", 129],
    ["Filipina", 123],
    ["Vietnam", 123],
    ["Malaysia", 122],
  ],
  h = "";
d.forEach(function (x) {
  h +=
    '<div class="row' +
    (x[0] == "Indonesia" ? " me" : "") +
    '"><span>' +
    x[0] +
    '</span><div class="trk"><i data-w="' +
    (x[1] / 155) * 100 +
    '" style="width:0"></i></div><span>' +
    x[1] +
    "</span></div>";
});
document.getElementById("ch").innerHTML = h;
(function () {
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches,
    io = "IntersectionObserver" in window;
  function fill() {
    document.querySelectorAll("#ch i").forEach(function (i) {
      i.style.width = i.dataset.w + "%";
    });
  }
  if (rm || !io) {
    fill();
    return;
  }
  var bar = document.createElement("div");
  bar.id = "bar";
  document.body.appendChild(bar);
  var hd = document.querySelector("header");
  function sc() {
    var m = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (m > 0 ? (scrollY / m) * 100 : 0) + "%";
    hd.classList.toggle("sc", scrollY > 8);
  }
  addEventListener("scroll", sc, { passive: true });
  sc();
  var els = document.querySelectorAll(
      ".hero .w>*,section .tag,section h2,.lead,.q,.card,.st,.ft",
    ),
    seen = new Map();
  els.forEach(function (el) {
    var p = el.parentElement,
      n = seen.get(p) || 0;
    seen.set(p, n + 1);
    el.classList.add("rv");
    el.style.transitionDelay = Math.min(n, 5) * 80 + "ms";
  });
  var ob = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.querySelector("#ch")) fill();
          ob.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  els.forEach(function (el) {
    ob.observe(el);
  });
})();
