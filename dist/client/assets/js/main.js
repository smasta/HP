
(function(){
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('siteMenu');
  var close = document.getElementById('menuClose');
  var lastFocus = null;
  if(!btn || !menu) return;
  function openMenu(){
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden','false');
    btn.setAttribute('aria-expanded','true');
    btn.setAttribute('aria-label','メニューを閉じる');
    document.body.style.overflow='hidden';
    if(close) close.focus();
  }
  function closeMenu(){
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','メニューを開く');
    document.body.style.overflow='';
    if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  btn.addEventListener('click', function(){
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  if(close) close.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && menu.classList.contains('is-open')) closeMenu();
    if(e.key==='Tab' && menu.classList.contains('is-open')){
      var focusable = menu.querySelectorAll('a,button');
      if(!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
})();

/* ---- reading progress and current navigation ---- */
(function(){
  var bar = document.querySelector('.reading-progress');
  var links = document.querySelectorAll('.header-nav a,.menu-list a');
  var path = location.pathname.replace(/\/+$/, '') || '/';
  links.forEach(function(link){
    var linkPath = new URL(link.href, location.href).pathname.replace(/\/+$/, '') || '/';
    if(linkPath===path) link.setAttribute('aria-current','page');
  });
  if(!bar) return;
  var queued = false;
  function update(){
    var max = document.documentElement.scrollHeight - innerHeight;
    var value = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    bar.style.transform = 'scaleX(' + value + ')';
    queued = false;
  }
  addEventListener('scroll', function(){
    if(!queued){queued=true;requestAnimationFrame(update);}
  }, {passive:true});
  update();
})();

/* ---- scroll reveal ---- */
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sel = '.section-head,.biz-card,.sub-card,.stat-row,.value-cell,.case-card,.feature-list li,.news-list li,.story p';
  var els = document.querySelectorAll(sel);
  if(!els.length) return;
  if(reduced || !('IntersectionObserver' in window)){
    els.forEach(function(e){ e.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){ io.observe(e); });
})();

/* ---- count-up numbers ---- */
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nums = document.querySelectorAll('[data-count]');
  if(!nums.length) return;
  function animate(el){
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if(reduced || !('IntersectionObserver' in window)){ el.textContent = target; return; }
    var start = null, dur = 1100;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if(p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ animate(en.target); io.unobserve(en.target); }
    });
  }, {threshold:.5});
  nums.forEach(function(n){ io.observe(n); });
})();

/* ---- pinned narrative activation ---- */
(function(){
  var lines = document.querySelectorAll('.pin-line p');
  if(!lines.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ en.target.classList.toggle('is-active', en.isIntersecting); });
  }, {threshold:.6});
  lines.forEach(function(l){ io.observe(l); });
})();

/* ---- hero photo slideshow ---- */
(function(){
  document.querySelectorAll('.hero-slides').forEach(function(wrap){
    var slides = wrap.querySelectorAll('.hero-slide');
    var dotsWrap = wrap.parentElement.querySelector('.hero-slide-dots');
    var dots = dotsWrap ? dotsWrap.querySelectorAll('span') : [];
    if(slides.length < 2) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) return;
    var i = 0;
    setInterval(function(){
      slides[i].classList.remove('is-active');
      if(dots[i]) dots[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
      if(dots[i]) dots[i].classList.add('is-active');
    }, 4600);
  });
})();

/* ---- reaction wave canvas ---- */
(function(){
  function WaveCanvas(canvas){
    var ctx = canvas.getContext('2d');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, t = Math.random() * 10;
    var hotspot = 0.5, hotspotTarget = 0.5;
    var layers = [
      {freq: 1.1, speed: 0.55, amp: 0.15, base: 0.42, color: '47,92,255', width: 1.6, alpha: 0.9, bump: 0.15},
      {freq: 1.7, speed: -0.35, amp: 0.09, base: 0.6, color: '150,150,142', width: 1.1, alpha: 0.45, bump: 0.05},
      {freq: 0.65, speed: 0.22, amp: 0.07, base: 0.5, color: '47,92,255', width: 1, alpha: 0.22, bump: 0.05}
    ];
    function resize(){
      var rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function pointFor(L, xp, hs){
      var bump = Math.exp(-Math.pow((xp - hs) * 4.2, 2)) * L.bump;
      var y = h * L.base + Math.sin(xp * Math.PI * 2 * L.freq + t * L.speed) * h * (L.amp + bump);
      return y;
    }
    function drawFrame(){
      if(!w || !h) resize();
      ctx.clearRect(0, 0, w, h);
      layers.forEach(function(L){
        ctx.beginPath();
        var steps = 90;
        for(var i = 0; i <= steps; i++){
          var xp = i / steps, x = xp * w, y = pointFor(L, xp, hotspot);
          if(i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(' + L.color + ',' + L.alpha + ')';
        ctx.lineWidth = L.width;
        ctx.stroke();
      });
      [0.3, 0.7].forEach(function(xp, i){
        var L = layers[0];
        var y = pointFor(L, xp, hotspot);
        var r = 2.6 + Math.sin(t * 2 + i * 2.4) * 1.5;
        ctx.beginPath();
        ctx.arc(xp * w, y, Math.max(0.6, r), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(47,92,255,0.9)';
        ctx.fill();
      });
    }
    function loop(){
      t += 0.016;
      hotspot += (hotspotTarget - hotspot) * 0.05;
      drawFrame();
      if(!reduced) requestAnimationFrame(loop);
    }
    canvas.addEventListener('mousemove', function(e){
      var r = canvas.getBoundingClientRect();
      hotspotTarget = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    });
    canvas.addEventListener('mouseleave', function(){ hotspotTarget = 0.5; });
    window.addEventListener('resize', resize);
    resize();
    if(reduced){ drawFrame(); } else { requestAnimationFrame(loop); }
  }
  document.querySelectorAll('.wave-canvas').forEach(function(c){ new WaveCanvas(c); });
})();
