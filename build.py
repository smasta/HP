#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Static site generator for the SMARTSTART renewal (Human Data & HealthTech).
Reads no external data; all copy lives in this file. Run: python3 build.py
"""
import os
import shutil

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")

# ----------------------------------------------------------------------------
# CSS
# ----------------------------------------------------------------------------
CSS = r"""
:root{
  --bg:#F5F5F2;
  --surface:#FFFFFF;
  --surface-2:#ECECE7;
  --ink:#0A0A0A;
  --muted:#6B6B66;
  --line:#DEDEDA;
  --accent:#2F5CFF;
  --accent-soft:rgba(47,92,255,.08);
  --radius-sm:8px;
  --radius-md:16px;
  --radius-pill:999px;
  --shadow-lift:0 20px 44px -22px rgba(10,10,10,.35);
  --shadow-soft:0 24px 80px -32px rgba(15,28,70,.22);
  --shadow-card:0 18px 55px -28px rgba(10,10,10,.28);
  --glow-blue:rgba(47,92,255,.34);
  --ease-out:cubic-bezier(.16,1,.3,1);
  --duration-fast:180ms;
  --duration-base:320ms;
  --space-1:8px;
  --space-2:16px;
  --space-3:24px;
  --space-4:40px;
  --mono:"SF Mono","SFMono-Regular",Menlo,Consolas,monospace;
  --sans:"Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic UI","Helvetica Neue",Arial,sans-serif;
  --serif:"Hiragino Mincho ProN","Yu Mincho","Hiragino Mincho Pro",serif;
  --maxw:1200px;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.8;font-size:16px;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
img{max-width:100%;display:block;}
a{color:inherit;text-decoration:none;}
button,a{touch-action:manipulation;}
:focus-visible{outline:3px solid var(--accent);outline-offset:4px;}
::selection{background:var(--ink);color:var(--bg);}
.skip-link{position:fixed;left:16px;top:12px;z-index:100;background:var(--accent);color:#fff;padding:10px 16px;border-radius:var(--radius-pill);font-size:12px;font-weight:700;transform:translateY(-160%);transition:transform var(--duration-fast) ease;}
.skip-link:focus{transform:translateY(0);}
.container{max-width:var(--maxw);margin:0 auto;padding:0 clamp(20px,4vw,48px);}
.overflow-x{overflow-x:auto;}

/* ---------- header ---------- */
.site-header{position:sticky;top:0;z-index:40;background:rgba(245,245,242,.92);border-bottom:1px solid var(--line);backdrop-filter:blur(18px);}
.reading-progress{position:absolute;left:0;bottom:-1px;height:2px;width:100%;transform:scaleX(0);transform-origin:left;background:var(--accent);will-change:transform;}
.site-header-inner{max-width:var(--maxw);margin:0 auto;padding:13px clamp(20px,4vw,48px);display:flex;align-items:center;gap:28px;}
.logo{display:flex;align-items:center;gap:10px;font-weight:900;font-size:17px;letter-spacing:-.02em;white-space:nowrap;}
.logo .mark{width:22px;height:22px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:12px;line-height:1;box-shadow:0 0 0 5px var(--accent-soft);}
.header-nav{display:flex;align-items:center;gap:clamp(16px,2vw,30px);margin-left:auto;}
.header-nav a{font-size:12px;font-weight:700;white-space:nowrap;position:relative;}
.header-nav a::after{content:"";position:absolute;left:0;right:100%;bottom:-7px;height:2px;background:var(--accent);transition:right .25s ease;}
.header-nav a:hover::after{right:0;}
.header-contact{background:transparent;color:var(--ink)!important;border:1px solid var(--ink);border-radius:99px;padding:8px 16px;transition:background .25s,color .25s;}
.header-contact::after{display:none;}
.header-contact:hover{background:var(--ink);color:#fff!important;}
.menu-btn{background:var(--ink);color:var(--bg);border:none;font:inherit;font-size:10.5px;font-weight:800;letter-spacing:.1em;border-radius:99px;padding:10px 16px;cursor:pointer;}
.menu-btn:hover{opacity:.85;}
@media(max-width:900px){.header-nav{display:none}.site-header-inner{justify-content:space-between}.logo{font-size:16px}}

/* ---------- fullscreen menu ---------- */
.site-menu{position:fixed;inset:0;background:var(--ink);color:var(--bg);z-index:50;transform:translateY(-100%);transition:transform .5s cubic-bezier(.65,0,.35,1);overflow-y:auto;}
.site-menu.is-open{transform:translateY(0);}
.site-menu-inner{max-width:var(--maxw);margin:0 auto;padding:20px clamp(20px,4vw,48px) 60px;min-height:100%;display:flex;flex-direction:column;}
.menu-close{align-self:flex-end;background:none;border:1px solid #333;color:var(--bg);font:inherit;font-size:11px;font-weight:700;letter-spacing:.08em;border-radius:99px;padding:10px 18px;cursor:pointer;margin-bottom:24px;}
.menu-list{list-style:none;margin:24px 0;padding:0;border-top:1px solid #2A2A28;}
.menu-list li{border-bottom:1px solid #2A2A28;opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease;}
.site-menu.is-open .menu-list li{opacity:1;transform:translateY(0);}
.site-menu.is-open .menu-list li:nth-child(1){transition-delay:.08s;} .site-menu.is-open .menu-list li:nth-child(2){transition-delay:.12s;}
.site-menu.is-open .menu-list li:nth-child(3){transition-delay:.16s;} .site-menu.is-open .menu-list li:nth-child(4){transition-delay:.20s;}
.site-menu.is-open .menu-list li:nth-child(5){transition-delay:.24s;} .site-menu.is-open .menu-list li:nth-child(6){transition-delay:.28s;}
.site-menu.is-open .menu-list li:nth-child(7){transition-delay:.32s;} .site-menu.is-open .menu-list li:nth-child(8){transition-delay:.36s;}
.site-menu.is-open .menu-list li:nth-child(9){transition-delay:.40s;}
.menu-list a{display:flex;align-items:baseline;justify-content:space-between;padding:18px 4px;font-size:clamp(1.5rem,4.5vw,2.6rem);font-weight:800;letter-spacing:-.01em;
  transition:color .25s,transform .3s cubic-bezier(.16,1,.3,1);}
.menu-list a span{font-family:var(--mono);font-size:12px;font-weight:400;letter-spacing:.06em;color:#8C8C86;transition:transform .3s;}
.menu-list a:hover{color:var(--accent);transform:translateX(10px);}
@media (prefers-reduced-motion: reduce){
  .menu-list li{transition:none;opacity:1;transform:none;}
  .menu-list a:hover{transform:none;}
}
.menu-footer{margin-top:auto;padding-top:30px;display:flex;flex-wrap:wrap;align-items:center;gap:18px;}
.menu-meta{font-family:var(--mono);font-size:11px;color:#8C8C86;letter-spacing:.04em;}

/* ---------- buttons ---------- */
.pill-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--ink);color:var(--bg);font-size:13px;font-weight:700;border-radius:var(--radius-pill);padding:13px 26px;min-height:46px;
  transition:opacity var(--duration-fast),transform var(--duration-base) var(--ease-out),box-shadow var(--duration-base);}
.pill-btn:hover{opacity:.85;transform:translateY(-3px);box-shadow:0 14px 28px -16px rgba(10,10,10,.45);}
.pill-btn:active{transform:translateY(0) scale(.98);box-shadow:none;}
.pill-btn[aria-disabled="true"],.pill-btn:disabled{opacity:.42;pointer-events:none;}
.pill-btn.on-dark{background:var(--bg);color:var(--ink);}
.pill-btn.outline{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink);}
.pill-btn.outline.on-dark{color:var(--bg);box-shadow:inset 0 0 0 1.5px var(--bg);}
.cta-row{display:flex;flex-wrap:wrap;gap:12px;}

/* ---------- breadcrumb / eyebrow ---------- */
.breadcrumb{font-family:var(--mono);font-size:11.5px;letter-spacing:.06em;color:var(--muted);margin:0 0 18px;}
.breadcrumb a:hover{color:var(--accent);}
.eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 16px;}
.eyebrow.on-dark{color:#9DB3FF;}

/* ---------- hero (dark, full-bleed) ---------- */
.hero{position:relative;background:radial-gradient(120% 100% at 22% 0%, #14141c 0%, #0A0A0A 55%);color:var(--bg);overflow:hidden;}
.hero-inner{max-width:var(--maxw);margin:0 auto;padding:clamp(90px,16vw,180px) clamp(20px,4vw,48px) clamp(60px,10vw,110px);position:relative;z-index:2;}
.hero.hero-lg .hero-inner{padding-top:clamp(120px,20vw,220px);padding-bottom:clamp(90px,14vw,150px);}
.wave-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:.75;z-index:1;}
.hero-photo{position:absolute;inset:0;background-size:cover;background-position:center 28%;z-index:0;}
.hero-scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,7,10,.32) 0%, rgba(6,7,10,.6) 48%, rgba(6,7,10,.94) 100%);z-index:2;}
.hero.has-photo .wave-canvas{opacity:.55;mix-blend-mode:screen;}
.hero.hero-lg{min-height:calc(100svh - 65px);display:flex;align-items:flex-end;}
.hero.hero-lg .hero-inner{width:100%;}
.hero.hero-lg h1{font-size:clamp(2.7rem,7vw,5.8rem);line-height:1.14;max-width:12ch;text-shadow:0 4px 30px rgba(0,0,0,.35);}
.hero.hero-lg .hero-sub{max-width:50ch;color:#F2F2ED;font-weight:500;}
@media (prefers-reduced-motion: no-preference){
  .hero.has-photo:not(.has-slides) .hero-photo{animation:kenburns 18s ease-out forwards;}
}
@keyframes kenburns{from{transform:scale(1);}to{transform:scale(1.09);}}

/* ---------- hero photo slideshow ---------- */
.hero-slides{position:absolute;inset:0;overflow:hidden;z-index:0;}
.hero-slide{position:absolute;inset:0;background-size:cover;background-position:center 28%;opacity:0;transition:opacity 1.6s ease;}
.hero-slide.is-active{opacity:1;}
@media (prefers-reduced-motion: no-preference){
  .hero-slide.is-active{animation:kenburns 5.2s ease-out forwards;}
}
.hero-slide-dots{position:absolute;right:clamp(20px,4vw,48px);bottom:26px;z-index:3;display:flex;gap:8px;}
.hero-slide-dots span{width:22px;height:2px;background:rgba(255,255,255,.28);transition:background .3s;}
.hero-slide-dots span.is-active{background:var(--accent);}

/* ---------- photo grid (people / imagery) ---------- */
.photo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:#000;border:1px solid #000;}
.photo-tile{position:relative;aspect-ratio:3/4;overflow:hidden;background:#0A0A0A;}
.photo-tile img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.16,1,.3,1);}
.photo-tile:hover img{transform:scale(1.07);}
.photo-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,.82) 100%);}
.photo-tile .pt-label{position:absolute;left:18px;right:18px;bottom:16px;z-index:1;color:#fff;}
.photo-tile .pt-label b{display:block;font-size:1rem;font-weight:800;letter-spacing:-.01em;}
.photo-tile .pt-label span{font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:#C7C7C1;}
.audience-nav{display:grid;grid-template-columns:repeat(4,1fr);background:var(--ink);border-top:1px solid #252522;}
.audience-nav a{min-height:122px;padding:24px clamp(18px,2.8vw,34px);color:#fff;border-right:1px solid #252522;display:flex;flex-direction:column;justify-content:space-between;transition:background .25s ease;}
.audience-nav a:last-child{border-right:0;}
.audience-nav a:hover{background:#151b35;}
.audience-nav small{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;color:#8EA8FF;}
.audience-nav b{font-size:clamp(.9rem,1.4vw,1.08rem);line-height:1.45;display:flex;justify-content:space-between;gap:10px;}
.audience-nav b span{color:var(--accent);}
@media(max-width:720px){.audience-nav{grid-template-columns:1fr 1fr}.audience-nav a{min-height:104px;border-bottom:1px solid #252522}.hero.hero-lg{min-height:78svh}.hero.hero-lg h1{font-size:clamp(2.35rem,11vw,4rem)}}
.editorial-hero{background:#fff;}
.editorial-hero-image{height:min(78vh,860px);min-height:560px;position:relative;overflow:hidden;background:#090909;color:#fff;}
.editorial-hero-image>img{width:100%;height:100%;object-fit:cover;object-position:center 42%;filter:saturate(.68) contrast(1.08);}
.editorial-hero-image::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.76) 0%,rgba(0,0,0,.28) 52%,rgba(0,0,0,.06) 100%);}
.editorial-hero-copy{position:absolute;z-index:2;left:clamp(24px,8vw,130px);bottom:clamp(44px,9vw,110px);}
.editorial-hero-copy>p{font-family:var(--mono);font-size:10px;letter-spacing:.16em;margin:0 0 18px;color:#b8c8ff;}
.editorial-hero-copy h1{font-size:clamp(3rem,7.6vw,7rem);line-height:1.02;letter-spacing:-.055em;margin:0 0 24px;max-width:9ch;font-weight:900;}
.editorial-hero-copy>span{display:block;max-width:34ch;font-size:clamp(12px,1.2vw,15px);line-height:1.8;}
.editorial-index{position:absolute;z-index:2;right:clamp(24px,4vw,60px);bottom:26px;font-family:var(--mono);font-size:9px;letter-spacing:.14em;}
.visual-strips{height:150px;background:#000;display:grid;grid-template-rows:repeat(3,1fr);gap:8px;padding:8px 0;overflow:hidden;}
.visual-strips div{overflow:hidden;}
.visual-strips img{width:100%;height:220px;object-fit:cover;transform:translateY(var(--shift, -25%));filter:saturate(.7) contrast(1.15);}
.visual-strips div:nth-child(2) img{--shift:-48%;}.visual-strips div:nth-child(3) img{--shift:-62%;}
.editorial-statement{max-width:var(--maxw);margin:auto;padding:clamp(72px,12vw,150px) clamp(20px,7vw,96px);display:grid;grid-template-columns:minmax(180px,.65fr) 1.35fr;gap:clamp(40px,10vw,150px);align-items:start;}
.statement-brand{font-weight:900;letter-spacing:-.03em;margin:0;font-size:15px;}
.statement-brand span{display:block;font-family:var(--mono);font-size:8px;font-weight:400;letter-spacing:.1em;color:var(--muted);margin-top:4px;}
.editorial-statement h2{font-size:clamp(2.2rem,5.2vw,5rem);line-height:1.14;letter-spacing:-.045em;margin:0 0 28px;max-width:11ch;}
.editorial-statement>div>p:not(.eyebrow){font-size:14px;color:var(--muted);max-width:46ch;margin:0 0 28px;}
.editorial-keywords{background:#fff;border-top:1px solid #111;border-bottom:1px solid #111;}
.editorial-keywords a{color:#0a0a0a!important;background:#fff!important;border-color:#d6d6d0!important;min-height:auto;padding:17px clamp(14px,2.8vw,34px);font-size:clamp(1rem,2.2vw,1.9rem);font-style:italic;font-weight:900;letter-spacing:-.04em;display:flex;flex-direction:row;align-items:center;}
.editorial-keywords a span{font-weight:300;color:#aaa;margin-left:auto;}
@media(max-width:720px){.editorial-hero-image{height:72svh;min-height:520px}.visual-strips{height:105px}.editorial-statement{grid-template-columns:1fr;gap:42px}.editorial-keywords a{min-height:auto}.editorial-hero-copy h1{font-size:clamp(3rem,13vw,4.4rem)}}
.hero h1{font-size:clamp(2.1rem,6vw,4.4rem);font-weight:800;line-height:1.28;letter-spacing:-.02em;margin:0 0 22px;max-width:16ch;}
.hero h1 .line{display:block;overflow:hidden;padding-bottom:.08em;}
.hero h1 .line-inner{display:block;transform:translateY(112%);animation:lineUp .9s cubic-bezier(.16,1,.3,1) forwards;}
.hero h1 .line:nth-child(1) .line-inner{animation-delay:.05s;}
.hero h1 .line:nth-child(2) .line-inner{animation-delay:.17s;}
.hero h1 .line:nth-child(3) .line-inner{animation-delay:.29s;}
.hero h1 .line:nth-child(4) .line-inner{animation-delay:.41s;}
@keyframes lineUp{to{transform:translateY(0);}}
.hero .hero-sub{font-size:clamp(14px,1.6vw,17px);color:#C7C7C1;max-width:56ch;line-height:1.9;margin:0 0 32px;
  opacity:0;transform:translateY(14px);animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .55s forwards;}
.hero .cta-row{opacity:0;transform:translateY(14px);animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .68s forwards;}
@keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
.hero .scroll-cue{position:absolute;left:clamp(20px,4vw,48px);bottom:26px;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:#7A7A73;z-index:3;}
@media (prefers-reduced-motion: no-preference){
  .hero .scroll-cue{animation:bob 2.2s ease-in-out infinite;}
}
@keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(6px);}}
@media (prefers-reduced-motion: reduce){
  .hero h1 .line-inner{animation:none;transform:none;}
  .hero .hero-sub,.hero .cta-row{animation:none;opacity:1;transform:none;}
}

/* ---------- sections ---------- */
.band{padding:clamp(64px,10vw,120px) 0;}
.band-tight{padding:clamp(40px,6vw,72px) 0;}
.band-dark{background:radial-gradient(120% 140% at 78% 0%, #14141c 0%, #0A0A0A 60%);color:var(--bg);}
.band-surface{background:var(--surface);}
.band-alt{background:var(--surface-2);}
.band-border-t{border-top:1px solid var(--line);}
h2.h-lg{font-size:clamp(1.7rem,3.6vw,2.8rem);font-weight:800;letter-spacing:-.015em;line-height:1.3;margin:0 0 18px;text-wrap:balance;max-width:20ch;}
p.lede{font-size:15.5px;color:var(--muted);max-width:62ch;line-height:1.9;}
.band-dark p.lede{color:#B9B9B2;}
.section-head{margin-bottom:44px;}

/* ---------- editorial home ---------- */
.feature-focus{position:relative;height:min(112vh,1080px);min-height:760px;background:#050505;color:#fff;overflow:hidden;}
.feature-focus>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 48%;filter:saturate(.55) contrast(1.2) brightness(.72);}
.feature-focus::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.86),rgba(0,0,0,.15) 64%),linear-gradient(0deg,rgba(0,0,0,.48),transparent 45%);}
.feature-focus .wave-canvas{z-index:2;opacity:.85;mix-blend-mode:screen;}
.feature-focus-copy{position:absolute;z-index:3;left:clamp(24px,11vw,170px);top:50%;transform:translateY(-50%);max-width:520px;}
.feature-focus-copy h2{font-size:clamp(2.6rem,6.3vw,6.1rem);line-height:1.04;letter-spacing:-.055em;margin:0 0 36px;}
.feature-focus-copy>p:not(.eyebrow){max-width:42ch;font-size:13px;line-height:2;color:#ddd;}
.feature-focus-copy>span{display:block;margin-top:40px;font-family:var(--mono);font-size:9px;letter-spacing:.16em;color:#9cb1ff;}
.brand-process>.container{display:grid;grid-template-columns:minmax(240px,.7fr) 1.3fr;gap:clamp(48px,10vw,150px);align-items:start;}
.brand-process-head{position:sticky;top:120px;}
.brand-process-list{border-top:1px solid var(--ink);}
.brand-process-list article{display:grid;grid-template-columns:44px 1fr 28px;gap:22px;padding:30px 0;border-bottom:1px solid var(--line);align-items:start;}
.brand-process-list article>span{font-family:var(--mono);font-size:10px;color:var(--accent);padding-top:5px;}
.brand-process-list h3{font-size:clamp(1rem,1.7vw,1.35rem);margin:0 0 10px;letter-spacing:-.02em;}
.brand-process-list p{font-size:13px;color:var(--muted);line-height:1.85;margin:0;}
.brand-process-list a{font-size:20px;transition:transform .25s;}
.brand-process-list article:hover a{transform:translateX(5px);color:var(--accent);}
.business-editorial{background:#050505;}
.business-editorial>.container{display:grid;grid-template-columns:minmax(250px,.72fr) 1.28fr;gap:clamp(48px,8vw,120px);align-items:start;}
.business-editorial .section-head{position:sticky;top:120px;}
.business-editorial .grid-cards{display:block;border:0;border-top:1px solid #393939;background:transparent;}
.business-editorial .biz-card{min-height:0;padding:26px 4px;display:grid;grid-template-columns:115px minmax(170px,.7fr) 1fr auto;align-items:center;gap:22px;border-bottom:1px solid #393939;background:transparent;transform:none!important;box-shadow:none!important;}
.business-editorial .biz-card::before{display:none;}
.business-editorial .biz-card h3{font-size:1rem;}
.business-editorial .biz-card p{font-size:11.5px;line-height:1.65;}
.business-editorial .biz-card .bc-link{font-size:0;}
.business-editorial .biz-card .bc-link .arrow{font-size:18px;}
.stats-editorial{padding-bottom:clamp(120px,20vw,270px);}
.stats-editorial>.container{display:grid;grid-template-columns:.65fr 1.35fr;gap:clamp(40px,8vw,120px);align-items:start;}
.stats-editorial .section-head{position:sticky;top:120px;}
.stats-editorial .stat-strip{border-top:0;}
.stats-editorial .stat-row{min-height:260px;border-bottom:0;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;padding:14px 0;}
.stats-editorial .stat-row:nth-child(2){margin-left:18%;}.stats-editorial .stat-row:nth-child(3){margin-left:4%;}
.stats-editorial .stat-label{padding-top:18px;font-size:12px;border-top:1px solid #bbb;}
.stats-editorial .stat-num{font-size:clamp(5.5rem,11vw,11rem);line-height:.8;letter-spacing:-.09em;font-weight:900;text-align:right;}
.stats-editorial .stat-num sub{font-size:14px;letter-spacing:0;margin-left:8px;}
.news-editorial .news-list{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;border:0;}
.news-editorial .news-list li{display:grid;grid-template-columns:1fr auto;gap:8px;padding:0;border:0;align-items:start;}
.news-editorial .news-list li::before{content:"";grid-column:1/-1;display:block;aspect-ratio:1.5;background-color:#e5e5e1;background-size:cover;background-position:center;border-radius:12px;margin-bottom:12px;filter:saturate(.72) contrast(1.04);}
.news-editorial .news-list li:nth-child(1)::before{background-image:linear-gradient(rgba(0,0,0,.04),rgba(0,0,0,.18)),url('/assets/img/office.jpg');}
.news-editorial .news-list li:nth-child(2)::before{background-image:linear-gradient(rgba(0,0,0,.04),rgba(0,0,0,.18)),url('/assets/img/senior.jpg');}
.news-editorial .news-list li:nth-child(3)::before{background-image:linear-gradient(rgba(0,0,0,.04),rgba(0,0,0,.18)),url('/assets/img/athlete.jpg');}
.news-editorial .news-date{font-size:10px;order:3;}.news-editorial .news-tag{font-size:9px;order:2;justify-self:end}.news-editorial .news-title{grid-column:1/-1;order:1;font-size:13px;font-weight:700;line-height:1.65;}
@media(max-width:850px){
  .brand-process>.container,.business-editorial>.container,.stats-editorial>.container{grid-template-columns:1fr;}
  .brand-process-head,.business-editorial .section-head,.stats-editorial .section-head{position:relative;top:auto;}
  .business-editorial .biz-card{grid-template-columns:90px 1fr auto}.business-editorial .biz-card p{display:none;}
  .stats-editorial .stat-row{min-height:190px}.stats-editorial .stat-row:nth-child(n){margin-left:0;}
}
@media(max-width:650px){.feature-focus{height:92svh;min-height:650px}.news-editorial .news-list{grid-template-columns:1fr}.stats-editorial .stat-row{grid-template-columns:.8fr 1.2fr}.business-editorial .biz-card{grid-template-columns:1fr auto}.business-editorial .bc-fn{grid-column:1/-1}.editorial-keywords{grid-template-columns:1fr 1fr}}

/* ---------- modern polish layer ---------- */
body{background:
  radial-gradient(900px 540px at 8% 24%,rgba(47,92,255,.055),transparent 70%),
  radial-gradient(760px 480px at 92% 72%,rgba(109,85,255,.045),transparent 72%),
  var(--bg);}
.site-header{box-shadow:0 10px 38px -28px rgba(10,10,10,.42);border-color:rgba(222,222,218,.72);}
.logo .mark{background:linear-gradient(135deg,#7191ff 0%,#2F5CFF 50%,#5a39ff 100%);box-shadow:0 0 0 5px rgba(47,92,255,.08),0 10px 24px -10px rgba(47,92,255,.7);}
.menu-btn{background:linear-gradient(135deg,#111 0%,#292933 100%);box-shadow:0 12px 28px -18px rgba(10,10,10,.75);transition:transform var(--duration-base) var(--ease-out),box-shadow var(--duration-base),background var(--duration-base);}
.menu-btn:hover{opacity:1;transform:translateY(-2px);box-shadow:0 18px 32px -18px rgba(10,10,10,.85);}
.header-contact{box-shadow:0 10px 26px -20px rgba(10,10,10,.75);}
.header-contact:hover{box-shadow:0 16px 32px -18px rgba(10,10,10,.72);transform:translateY(-1px);}
.editorial-hero-image::before{content:"";position:absolute;z-index:1;inset:-18%;pointer-events:none;background:
  radial-gradient(42% 46% at 72% 46%,rgba(47,92,255,.3),transparent 68%),
  radial-gradient(28% 30% at 26% 78%,rgba(100,67,255,.2),transparent 72%);mix-blend-mode:screen;animation:heroGlow 9s ease-in-out infinite alternate;}
.editorial-hero-image::after{z-index:1;background:
  linear-gradient(90deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.3) 50%,rgba(0,0,0,.05) 100%),
  linear-gradient(0deg,rgba(5,8,20,.3),transparent 48%);}
.editorial-hero-image>img{transition:transform 1.6s var(--ease-out),filter 1.2s ease;}
.editorial-hero-image:hover>img{transform:scale(1.025);filter:saturate(.8) contrast(1.08);}
.editorial-hero-copy h1{text-shadow:0 12px 42px rgba(0,0,0,.42),0 0 54px rgba(47,92,255,.12);}
.editorial-hero-copy>p{display:inline-flex;align-items:center;gap:9px;padding:7px 11px;border:1px solid rgba(184,200,255,.22);border-radius:var(--radius-pill);background:rgba(7,12,28,.22);backdrop-filter:blur(12px);}
.visual-strips{gap:4px;padding:4px 0;box-shadow:0 22px 56px -34px rgba(10,10,10,.8);}
.visual-strips img{transition:transform 1s var(--ease-out),filter .6s ease;}
.visual-strips div:hover img{transform:translateY(var(--shift,-25%)) scale(1.035);filter:saturate(.9) contrast(1.1);}
.editorial-statement{position:relative;isolation:isolate;}
.editorial-statement::before{content:"";position:absolute;z-index:-1;width:430px;height:430px;right:-190px;top:6%;border-radius:50%;background:radial-gradient(circle,rgba(47,92,255,.11),rgba(47,92,255,0) 70%);filter:blur(14px);}
.editorial-statement h2{background:linear-gradient(115deg,#090909 10%,#2c2c35 55%,#2F5CFF 140%);-webkit-background-clip:text;background-clip:text;color:transparent;}
.pill-btn{position:relative;overflow:hidden;background:linear-gradient(135deg,#121216 0%,#292936 100%);box-shadow:0 16px 34px -20px rgba(10,10,10,.76),inset 0 1px rgba(255,255,255,.12);}
.pill-btn::after{content:"";position:absolute;inset:-2px;background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.22) 48%,transparent 72%);transform:translateX(-130%);transition:transform .7s var(--ease-out);pointer-events:none;}
.pill-btn:hover{opacity:1;transform:translateY(-4px);box-shadow:0 22px 40px -20px rgba(10,10,10,.72),0 10px 28px -18px var(--glow-blue);}
.pill-btn:hover::after{transform:translateX(130%);}
.pill-btn.outline{background:rgba(255,255,255,.18);backdrop-filter:blur(12px);}
.pill-btn.on-dark{background:linear-gradient(135deg,#fff 0%,#e8edff 100%);box-shadow:0 18px 40px -20px rgba(128,153,255,.5);}
.pill-btn.outline.on-dark{background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.55);}
.editorial-keywords{box-shadow:0 20px 60px -46px rgba(10,10,10,.55);}
.editorial-keywords a{position:relative;overflow:hidden;transition:color var(--duration-base),transform var(--duration-base) var(--ease-out),box-shadow var(--duration-base)!important;}
.editorial-keywords a::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(47,92,255,.1),rgba(93,65,255,.03));transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease-out);}
.editorial-keywords a:hover{color:var(--accent)!important;transform:translateY(-3px);box-shadow:0 18px 36px -26px rgba(47,92,255,.7);z-index:2;}
.editorial-keywords a:hover::before{transform:scaleX(1);}
.editorial-keywords a>*{position:relative;z-index:1;}
.feature-focus::after{content:"";position:absolute;z-index:2;inset:0;pointer-events:none;background:
  radial-gradient(48% 42% at 72% 56%,rgba(47,92,255,.22),transparent 68%),
  linear-gradient(180deg,transparent 70%,rgba(10,13,28,.42));mix-blend-mode:screen;}
.feature-focus>img{transition:transform 1.8s var(--ease-out),filter 1.2s ease;}
.feature-focus:hover>img{transform:scale(1.028);filter:saturate(.68) contrast(1.18) brightness(.76);}
.feature-focus-copy h2{text-shadow:0 14px 52px rgba(0,0,0,.5),0 0 44px rgba(47,92,255,.1);}
.brand-process{position:relative;overflow:hidden;}
.brand-process::before{content:"";position:absolute;width:540px;height:540px;left:-280px;top:12%;border-radius:50%;background:radial-gradient(circle,rgba(47,92,255,.075),transparent 70%);filter:blur(10px);pointer-events:none;}
.brand-process-list article{position:relative;margin:0 -18px;padding:30px 18px;border-radius:var(--radius-md);transition:transform .45s var(--ease-out),background .35s ease,box-shadow .45s var(--ease-out),border-color .35s;}
.brand-process-list article:hover{transform:translateX(8px);background:linear-gradient(110deg,rgba(255,255,255,.95),rgba(240,243,255,.8));box-shadow:var(--shadow-card);border-color:transparent;}
.brand-process-list article:hover h3{color:var(--accent);}
.business-editorial{position:relative;overflow:hidden;background:
  radial-gradient(700px 540px at 15% 10%,rgba(47,92,255,.15),transparent 70%),
  radial-gradient(560px 420px at 90% 84%,rgba(98,65,255,.1),transparent 72%),#050505;}
.business-editorial::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.025),transparent 35%);}
.business-editorial .biz-card{position:relative;margin:0 -18px;padding-left:18px;padding-right:18px;border-radius:var(--radius-md);transition:transform .45s var(--ease-out),background .35s,box-shadow .45s!important;}
.business-editorial .biz-card:hover{transform:translateX(10px)!important;background:linear-gradient(110deg,rgba(47,92,255,.16),rgba(255,255,255,.035))!important;box-shadow:0 22px 54px -32px rgba(47,92,255,.5)!important;}
.business-editorial .biz-card:hover h3{color:#aebeff;}
.stats-editorial{position:relative;overflow:hidden;background:
  radial-gradient(700px 620px at 86% 30%,rgba(47,92,255,.095),transparent 72%),var(--surface-2);}
.stats-editorial .stat-row{transition:transform .55s var(--ease-out),filter .4s ease;}
.stats-editorial .stat-row:hover{transform:translateX(10px);}
.stats-editorial .stat-num{background:linear-gradient(150deg,#050505 25%,#252537 62%,#2F5CFF 135%);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 18px 52px rgba(47,92,255,.08);}
.news-editorial{background:linear-gradient(180deg,#fff 0%,#f8f8f5 100%);}
.news-editorial .news-list li{padding:14px;border:1px solid rgba(222,222,218,.72);border-radius:var(--radius-md);background:rgba(255,255,255,.72);box-shadow:0 14px 42px -34px rgba(10,10,10,.4);transition:transform .5s var(--ease-out),box-shadow .5s var(--ease-out),border-color .35s,background .35s;backdrop-filter:blur(12px);}
.news-editorial .news-list li::before{transition:transform .65s var(--ease-out),filter .5s ease,background-size .65s var(--ease-out);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2);}
.news-editorial .news-list li:hover{transform:translateY(-10px);background:#fff;border-color:rgba(47,92,255,.2);box-shadow:0 28px 64px -32px rgba(27,42,98,.28);}
.news-editorial .news-list li:hover::before{filter:saturate(.95) contrast(1.04) brightness(1.04);background-size:108%;}
.sub-card,.case-card{border-radius:var(--radius-md);box-shadow:0 12px 38px -32px rgba(10,10,10,.32);}
.sub-card:hover,.case-card:hover{border-color:rgba(47,92,255,.28);box-shadow:0 28px 64px -34px rgba(27,42,98,.3);}
.band-dark{background:
  radial-gradient(760px 500px at 82% 0%,rgba(47,92,255,.13),transparent 70%),
  radial-gradient(620px 440px at 12% 100%,rgba(100,67,255,.08),transparent 72%),#09090c;}
.site-footer{background:
  radial-gradient(680px 460px at 78% 4%,rgba(47,92,255,.12),transparent 72%),
  linear-gradient(180deg,#08080b 0%,#030304 100%);}
@keyframes heroGlow{from{transform:translate3d(-1.5%,-1%,0) scale(1)}to{transform:translate3d(1.5%,1%,0) scale(1.04)}}
@media(max-width:720px){
  .band{padding-top:clamp(72px,18vw,96px);padding-bottom:clamp(72px,18vw,96px);}
  .editorial-statement::before,.brand-process::before{opacity:.6;}
  .news-editorial .news-list li:hover,.brand-process-list article:hover,.business-editorial .biz-card:hover,.stats-editorial .stat-row:hover{transform:none!important;}
}
@media(prefers-reduced-motion:reduce){.editorial-hero-image::before{animation:none}.editorial-hero-image:hover>img,.feature-focus:hover>img{transform:none}}

/* ---------- narrative (story) ---------- */
.story p{font-family:var(--serif);font-size:clamp(1.05rem,2vw,1.4rem);line-height:2.05;max-width:34ch;margin:0 0 30px;text-wrap:balance;}
.story .cycle{font-family:var(--mono);font-size:13px;letter-spacing:.14em;color:var(--accent);margin:14px 0 0;}

/* ---------- pinned scroll narrative ---------- */
.pin-story{position:relative;background:#000;}
.pin-visual{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(120% 100% at 50% 30%, #14141c 0%, #000 65%);}
.pin-text{position:relative;z-index:2;margin-top:-100vh;pointer-events:none;}
.pin-line{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:0 clamp(20px,6vw,48px);}
.pin-line p{font-family:var(--serif);font-size:clamp(1.3rem,3.4vw,2.2rem);line-height:1.95;color:#EDEDE7;max-width:32ch;text-align:center;margin:0;
  opacity:.18;transform:translateY(16px) scale(.98);transition:opacity .6s ease,transform .6s ease;text-wrap:balance;}
.pin-line p.is-active{opacity:1;transform:translateY(0) scale(1);}
.pin-line p.cycle{font-family:var(--sans);font-weight:800;font-style:italic;font-size:clamp(2.4rem,8vw,5.4rem);letter-spacing:-.01em;color:#fff;line-height:1.1;max-width:none;}
.pin-line p.cycle em{color:var(--accent);font-style:italic;}

/* ---------- marquee ticker ---------- */
.marquee{overflow:hidden;background:var(--ink);padding:clamp(18px,3vw,30px) 0;border-top:1px solid #232320;border-bottom:1px solid #232320;}
.marquee-track{display:flex;width:max-content;}
@media (prefers-reduced-motion: no-preference){.marquee-track{animation:marquee 26s linear infinite;}}
.marquee-track span{font-weight:800;font-style:italic;font-size:clamp(1.3rem,3.6vw,2.2rem);color:#EDEDE7;white-space:nowrap;padding:0 26px;letter-spacing:-.01em;}
.marquee-track span.x{color:var(--accent);font-style:normal;font-weight:400;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@media (prefers-reduced-motion: reduce){
  .pin-visual{position:relative;height:auto;min-height:60vh;}
  .pin-text{margin-top:0;}
  .pin-line{min-height:auto;padding:48px clamp(20px,6vw,48px);}
  .pin-line p{opacity:1;transform:none;}
}

/* ---------- scroll reveal ---------- */
.section-head,.biz-card,.sub-card,.stat-row,.value-cell,.case-card,.feature-list li,.news-list li,.story p{
  opacity:0;transform:translateY(22px);
  transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);
}
.section-head.is-visible,.biz-card.is-visible,.sub-card.is-visible,.stat-row.is-visible,.value-cell.is-visible,
.case-card.is-visible,.feature-list li.is-visible,.news-list li.is-visible,.story p.is-visible{
  opacity:1;transform:translateY(0);
}
.grid-cards>*:nth-child(1){transition-delay:.02s;} .grid-cards>*:nth-child(2){transition-delay:.08s;}
.grid-cards>*:nth-child(3){transition-delay:.14s;} .grid-cards>*:nth-child(4){transition-delay:.20s;}
.grid-cards>*:nth-child(5){transition-delay:.26s;}
.sub-grid>*:nth-child(1){transition-delay:.02s;} .sub-grid>*:nth-child(2){transition-delay:.08s;}
.sub-grid>*:nth-child(3){transition-delay:.14s;} .sub-grid>*:nth-child(4){transition-delay:.20s;}
.value-grid>*:nth-child(1){transition-delay:.02s;} .value-grid>*:nth-child(2){transition-delay:.06s;}
.value-grid>*:nth-child(3){transition-delay:.10s;} .value-grid>*:nth-child(4){transition-delay:.14s;}
.value-grid>*:nth-child(5){transition-delay:.18s;}
.stat-strip>*:nth-child(1){transition-delay:.02s;} .stat-strip>*:nth-child(2){transition-delay:.08s;}
.stat-strip>*:nth-child(3){transition-delay:.14s;} .stat-strip>*:nth-child(4){transition-delay:.20s;}
.feature-list li:nth-child(1){transition-delay:.02s;} .feature-list li:nth-child(2){transition-delay:.06s;}
.feature-list li:nth-child(3){transition-delay:.10s;} .feature-list li:nth-child(4){transition-delay:.14s;}
.feature-list li:nth-child(5){transition-delay:.18s;}
@media (prefers-reduced-motion: reduce){
  .section-head,.biz-card,.sub-card,.stat-row,.value-cell,.case-card,.feature-list li,.news-list li,.story p{
    opacity:1!important;transform:none!important;transition:none!important;
  }
}

/* ---------- business grid ---------- */
.grid-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1px;background:#050505;border:1px solid #050505;}
.biz-card{background:#0A0A0A;color:#EDEDE7;padding:36px 28px;display:flex;flex-direction:column;gap:14px;min-height:280px;position:relative;overflow:hidden;
  transition:background .3s,transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s cubic-bezier(.16,1,.3,1);}
.biz-card::before{content:"";position:absolute;inset:0;opacity:.6;background:radial-gradient(120% 90% at var(--gx,30%) var(--gy,0%), rgba(47,92,255,.16) 0%, transparent 62%);pointer-events:none;}
.biz-card:nth-child(1){--gx:20%;--gy:0%;} .biz-card:nth-child(2){--gx:80%;--gy:10%;}
.biz-card:nth-child(3){--gx:30%;--gy:90%;} .biz-card:nth-child(4){--gx:75%;--gy:85%;}
.biz-card:nth-child(5){--gx:50%;--gy:0%;}
.biz-card:hover{background:#111110;transform:translateY(-6px);box-shadow:0 24px 50px -20px rgba(0,0,0,.55);z-index:1;}
.biz-card .bc-fn{position:relative;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;color:#8C8C86;}
.biz-card h3{position:relative;font-size:1.3rem;font-weight:800;margin:0;letter-spacing:-.01em;color:#fff;}
.biz-card p{position:relative;font-size:13px;color:#9A9A93;margin:0;line-height:1.75;flex:1;opacity:.7;transition:opacity .3s;}
.biz-card:hover p{opacity:1;}
.biz-card .bc-link{position:relative;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;margin-top:auto;color:#fff;}
.biz-card:hover .bc-link{color:var(--accent);}
.bc-link .arrow,.sc-link .arrow{display:inline-block;transition:transform .35s cubic-bezier(.16,1,.3,1);}
.biz-card:hover .arrow,.sub-card:hover .arrow{transform:translateX(5px);}

/* sub-service card (smaller, used inside hub pages) */
.sub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;}
.sub-card{border:1px solid var(--line);background:var(--surface);padding:26px 26px 28px;display:flex;flex-direction:column;gap:12px;
  transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s cubic-bezier(.16,1,.3,1),border-color .3s;}
.sub-card:hover{transform:translateY(-6px);box-shadow:0 20px 44px -22px rgba(10,10,10,.35);border-color:var(--ink);}
.sub-card:focus-visible,.biz-card:focus-visible,.case-card:focus-within{outline:3px solid var(--accent);outline-offset:3px;}
.sub-card .sc-tag{font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;}
.sub-card h3{margin:0;font-size:1.05rem;font-weight:800;letter-spacing:-.01em;}
.sub-card .sc-copy{font-size:13.5px;font-weight:700;color:var(--accent);}
.sub-card p{margin:0;font-size:13px;color:var(--muted);line-height:1.75;}
.sub-card .sc-link{margin-top:auto;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;}
.sub-card:hover .sc-link{color:var(--accent);}

/* ---------- stat strip ---------- */
.stat-strip{border-top:1px solid var(--line);}
.stat-row{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:26px 0;border-bottom:1px solid var(--line);flex-wrap:wrap;}
.stat-label{font-size:14.5px;font-weight:700;}
.stat-label small{display:block;font-family:var(--mono);font-weight:400;font-size:10.5px;color:var(--muted);letter-spacing:.06em;margin-top:4px;}
.stat-num{font-size:clamp(2.2rem,6.5vw,4.2rem);font-weight:800;letter-spacing:-.03em;font-variant-numeric:tabular-nums;line-height:1;white-space:nowrap;}
.stat-num sub{font-size:.28em;font-weight:700;margin-left:4px;bottom:0;}

/* ---------- value / feature list ---------- */
.value-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);}
.value-cell{background:var(--surface);padding:22px 22px 24px;display:flex;flex-direction:column;gap:8px;}
.value-cell .vn{font-family:var(--mono);font-size:11px;color:var(--accent);}
.value-cell b{font-size:14.5px;}
.value-cell span{font-size:12.8px;color:var(--muted);line-height:1.7;}

.feature-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;}
.feature-list li{border-top:1px solid var(--line);padding:16px 2px;font-size:14px;display:flex;gap:14px;}
.feature-list li:last-child{border-bottom:1px solid var(--line);}
.feature-list li::before{content:"—";color:var(--muted);flex:none;}

/* ---------- quote / evidence note ---------- */
.note-box{border-left:2px solid var(--line);padding:4px 0 4px 16px;font-size:12.5px;color:var(--muted);margin-top:18px;}

/* ---------- flow (core model) ---------- */
.flow-scroll{overflow-x:auto;padding-bottom:6px;}
.flow{display:flex;align-items:stretch;gap:0;min-width:max-content;}
.flow-node{background:var(--surface);border:1px solid var(--line);padding:18px 20px;min-width:160px;display:flex;flex-direction:column;gap:6px;}
.band-dark .flow-node{background:#141412;border-color:#2A2A28;}
.flow-node .fn-label{font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;color:var(--accent);}
.flow-node b{font-size:14px;}
.flow-node ul{margin:4px 0 0;padding-left:1.05em;font-size:12px;color:var(--muted);display:flex;flex-direction:column;gap:3px;}
.flow-arrow{display:flex;align-items:center;justify-content:center;min-width:38px;color:var(--muted);font-family:var(--mono);font-size:16px;}

/* ---------- cta band ---------- */
.cta-band{text-align:left;}
.cta-band h2{font-size:clamp(1.6rem,3.4vw,2.4rem);}

/* ---------- news ---------- */
.news-list{list-style:none;margin:0;padding:0;}
.news-list li{border-top:1px solid var(--line);padding:22px 2px;display:flex;gap:22px;flex-wrap:wrap;align-items:baseline;}
.news-list li:last-child{border-bottom:1px solid var(--line);}
.news-date{font-family:var(--mono);font-size:12px;color:var(--muted);min-width:96px;}
.news-tag{font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--accent);border:1px solid var(--accent-soft);background:var(--accent-soft);padding:3px 9px;border-radius:99px;}
.news-title{font-size:14.5px;font-weight:600;flex:1;min-width:220px;}

/* ---------- table ---------- */
table{width:100%;border-collapse:collapse;font-size:13.5px;}
th,td{text-align:left;padding:13px 4px;border-bottom:1px solid var(--line);vertical-align:top;}
th{width:180px;font-weight:700;color:var(--muted);font-size:12.5px;}

/* ---------- tag pills ---------- */
.tag-row{display:flex;flex-wrap:wrap;gap:8px;}
.tag-pill{font-size:12px;background:var(--surface-2);border:1px solid var(--line);border-radius:99px;padding:6px 14px;}

/* ---------- case card ---------- */
.case-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;}
.case-card{border:1px solid var(--line);background:var(--surface);padding:26px;display:flex;flex-direction:column;gap:12px;}
.case-card .cc-field{font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;}
.case-card h3{margin:0;font-size:1rem;}
.case-card p{margin:0;font-size:13px;color:var(--muted);line-height:1.7;}
.case-placeholder{border:1px dashed var(--line);background:var(--surface-2);padding:26px;font-size:12.5px;color:var(--muted);}

/* ---------- footer ---------- */
.site-footer{background:var(--ink);color:var(--bg);padding:clamp(56px,8vw,90px) 0 26px;}
.footer-top{padding-bottom:40px;border-bottom:1px solid #2A2A28;margin-bottom:40px;}
.footer-brand{font-size:1.6rem;font-weight:800;letter-spacing:-.01em;}
.footer-brand span{display:block;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:.08em;color:#8C8C86;margin-top:8px;}
.footer-copy{font-size:13px;color:#B9B9B2;margin-top:14px;}
.footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:32px;margin-bottom:48px;}
.footer-grid b{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;color:#8C8C86;margin-bottom:14px;text-transform:uppercase;}
.footer-grid a,.footer-grid span{display:block;font-size:13px;color:#D8D8D2;margin-bottom:10px;}
.footer-grid a:hover{color:var(--accent);}
.footer-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-family:var(--mono);font-size:11px;color:#6E6E68;padding-top:20px;border-top:1px solid #2A2A28;}
.footer-bottom a:hover{color:var(--bg);}

@media (max-width:760px){
  .stat-row{flex-direction:column;align-items:flex-start;gap:6px;}
}
@media (hover:none){
  .pill-btn:hover,.sub-card:hover,.biz-card:hover{transform:none;box-shadow:none;}
}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto;}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important;}
}
"""

JS = r"""
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
"""

# ----------------------------------------------------------------------------
# shared markup
# ----------------------------------------------------------------------------
MENU_ITEMS = [
    ("/measurement/", "測定事業", "Measurement"),
    ("/reaxion/", "REAXION事業", "Cognitive Motor"),
    ("/human-data/", "Human Data", "Data & Research"),
    ("/system/", "システム開発・保守", "Build"),
    ("/event/", "イベント支援・コンサル", "Experience"),
    ("/case-studies/", "導入実績・事例", "Case Studies"),
    ("/about/", "私たちについて", "About"),
    ("/news/", "新着情報", "News"),
    ("/recruit/", "採用情報", "Recruit"),
]

def header():
    items = "\n".join(
        f'<li><a href="{href}">{label}<span>{en}</span></a></li>'
        for href, label, en in MENU_ITEMS
    )
    return f"""
<header class="site-header">
  <div class="reading-progress" aria-hidden="true"></div>
  <div class="site-header-inner">
    <a href="/" class="logo"><span class="mark">&#10005;</span>SMARTSTART</a>
    <nav class="header-nav" aria-label="主要メニュー">
      <a href="/measurement/">測定</a>
      <a href="/reaxion/">REAXION</a>
      <a href="/case-studies/">導入事例</a>
      <a href="/about/">私たちについて</a>
      <a href="/contact/" class="header-contact">相談する</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="siteMenu" aria-label="メニューを開く">MENU</button>
  </div>
</header>
<nav class="site-menu" id="siteMenu" aria-hidden="true">
  <div class="site-menu-inner">
    <button class="menu-close" id="menuClose" aria-label="メニューを閉じる">&#10005; CLOSE</button>
    <ol class="menu-list">
      {items}
    </ol>
    <div class="menu-footer">
      <a href="/contact/" class="pill-btn on-dark">お問合せ</a>
      <span class="menu-meta">SMARTSTART INC. &mdash; Human Data &amp; HealthTech Company</span>
    </div>
  </div>
</nav>
"""

def footer():
    return """
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">SMARTSTART<span>HUMAN DATA &amp; HEALTHTECH COMPANY</span></div>
      <p class="footer-copy">人を測る。データでわかる。未来を変える。</p>
    </div>
    <div class="footer-grid">
      <div>
        <b>Business</b>
        <a href="/measurement/">測定事業</a>
        <a href="/reaxion/">REAXION事業</a>
        <a href="/human-data/">Human Data</a>
        <a href="/system/">システム開発・保守</a>
        <a href="/event/">イベント支援・コンサル</a>
      </div>
      <div>
        <b>Company</b>
        <a href="/about/">私たちについて</a>
        <a href="/about/company/">会社概要</a>
        <a href="/case-studies/">導入実績・事例</a>
        <a href="/news/">新着情報</a>
        <a href="/recruit/">採用情報</a>
      </div>
      <div>
        <b>Contact</b>
        <a href="/contact/">お問合せフォーム</a>
        <span>03-3556-9988</span>
        <span>info@smasta.co.jp</span>
        <span>東京都千代田区六番町1-1 恩田ビル3階</span>
      </div>
      <div>
        <b>Online Store</b>
        <a href="https://reaxion.jp" target="_blank" rel="noopener">REAXION オンラインストア &#8599;</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; SMARTSTART INC. All Rights Reserved.</span>
      <a href="/privacy-policy/">プライバシーポリシー</a>
    </div>
  </div>
</footer>
"""

def page(title, description, body):
    return f"""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | SMARTSTART</title>
<meta name="description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title} | SMARTSTART">
<meta property="og:description" content="{description}">
<meta property="og:image" content="https://smartstart-human-data.oxy1234.chatgpt.site/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title} | SMARTSTART">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="https://smartstart-human-data.oxy1234.chatgpt.site/assets/img/og.png">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main-content">本文へ移動</a>
{header()}
<main id="main-content" tabindex="-1">
{body}
</main>
{footer()}
<script src="/assets/js/main.js"></script>
</body>
</html>
"""

def wave_canvas(variant="hero"):
    return f'<canvas class="wave-canvas" data-variant="{variant}" aria-hidden="true"></canvas>'

def breadcrumb(trail):
    parts = " / ".join(
        (f'<a href="{href}">{label}</a>' if href else label) for label, href in trail
    )
    return f'<p class="breadcrumb">{parts}</p>'

def hero_dark(eyebrow, title_html, sub, ctas=None, breadcrumb_html="", lg=False, scroll_cue=None, photo=None, photos=None):
    cta_html = ""
    if ctas:
        buttons = "\n".join(
            f'<a href="{href}" class="pill-btn {cls if "on-dark" in cls else (cls + " on-dark").strip()}">{label}</a>'
            for label, href, cls in ctas
        )
        cta_html = f'<div class="cta-row">{buttons}</div>'
    scroll_html = f'<span class="scroll-cue">{scroll_cue}</span>' if scroll_cue else ""
    lg_class = " hero-lg" if lg else ""
    dots_html = ""
    if photos:
        photo_class = " has-photo has-slides"
        slides = "".join(
            f"""<div class="hero-slide{' is-active' if i == 0 else ''}" style="background-image:url('{src}')"></div>"""
            for i, src in enumerate(photos)
        )
        photo_html = f"""<div class="hero-slides">{slides}</div><div class="hero-scrim"></div>"""
        dots_html = '<div class="hero-slide-dots">' + "".join(
            f'<span{" class=\"is-active\"" if i == 0 else ""}></span>' for i in range(len(photos))
        ) + '</div>'
    elif photo:
        photo_class = " has-photo"
        photo_html = f"""<div class="hero-photo" style="background-image:url('{photo}')"></div><div class="hero-scrim"></div>"""
    else:
        photo_class = ""
        photo_html = ""
    lines_html = "".join(
        f'<span class="line"><span class="line-inner">{ln}</span></span>' for ln in title_html.split("<br>")
    )
    return f"""
<section class="hero{lg_class}{photo_class}">
  {photo_html}
  {wave_canvas("hero")}
  <div class="hero-inner">
    {breadcrumb_html}
    <p class="eyebrow on-dark">{eyebrow}</p>
    <h1>{lines_html}</h1>
    <p class="hero-sub">{sub}</p>
    {cta_html}
  </div>
  {dots_html}
  {scroll_html}
</section>
"""

def photo_grid(items):
    tiles = "\n".join(
        f"""<div class="photo-tile"><img src="{src}" alt="{alt}" loading="lazy"><span class="pt-label"><b>{title}</b><span>{en}</span></span></div>"""
        for src, alt, title, en in items
    )
    return f'<div class="photo-grid">{tiles}</div>'

def biz_grid():
    items = [
        ("01", "測定事業", "Measurement", "反応年齢・転倒リスク・大会記録——独自の計測技術で「わかる」を届ける。", "/measurement/"),
        ("02", "REAXION事業", "Cognitive Motor", "見る・認知する・判断する・動く。反応する力を鍛えるトレーニングシステム。", "/reaxion/"),
        ("03", "Human Data", "Data & Research", "測定から生まれるデータを蓄積・分析し、次の価値へつなげる。", "/human-data/"),
        ("04", "システム開発・保守", "Build", "測定事業・REAXION事業を支える開発力を、対外的にも提供する。", "/system/"),
        ("05", "イベント支援・コンサル", "Experience", "企画から運営、事務局代行まで。計測技術を現場で実証する。", "/event/"),
    ]
    cards = "\n".join(
        f"""<a class="biz-card" href="{href}">
      <span class="bc-fn">{n} — {en}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <span class="bc-link">詳しく見る<span class="arrow">&rarr;</span></span>
    </a>""" for n, title, en, copy, href in items
    )
    return f'<div class="grid-cards">{cards}</div>'

def core_model_flow(dark=False):
    return f"""
<div class="flow-scroll">
  <div class="flow">
    <div class="flow-node"><span class="fn-label">MEASURE</span><b>人を測る</b><ul><li>認知機能・身体機能</li><li>反応速度・判断・記憶</li><li>動作・転倒リスク</li></ul></div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-node"><span class="fn-label">ANALYZE</span><b>データから理解する</b><ul><li>クラウド・統計・AI</li><li>個人分析・集団分析</li><li>経時変化</li></ul></div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-node"><span class="fn-label">IMPROVE</span><b>人を高める</b><ul><li>トレーニング・運動</li><li>行動変容</li><li>継続測定</li></ul></div>
  </div>
</div>
"""

def stat_strip(items):
    rows = "\n".join(
        f"""<div class="stat-row"><span class="stat-label">{label}<small>{en}</small></span><span class="stat-num"><span data-count="{num}">0</span>{('<sub>'+suffix+'</sub>') if suffix else ''}</span></div>"""
        for label, en, num, suffix in items
    )
    return f'<div class="stat-strip">{rows}</div>'

def marquee(words):
    seq = "".join(f'<span>{w}</span><span class="x">&times;</span>' for w in words)
    return f'<div class="marquee"><div class="marquee-track">{seq}{seq}</div></div>'

def pin_story(paragraphs, cycle_last=True):
    n = len(paragraphs)
    lines = []
    for i, p in enumerate(paragraphs):
        cls = ' class="cycle"' if (cycle_last and i == n - 1) else ""
        lines.append(f'<div class="pin-line"><p{cls}>{p}</p></div>')
    return f"""
<section class="pin-story">
  <div class="pin-visual">{wave_canvas("story")}</div>
  <div class="pin-text">{"".join(lines)}</div>
</section>
"""

def cta_band(title, sub, ctas):
    buttons = "\n".join(
        f'<a href="{href}" class="pill-btn {cls if "on-dark" in cls else (cls + " on-dark").strip()}">{label}</a>'
        for label, href, cls in ctas
    )
    return f"""
<section class="band band-dark">
  <div class="container cta-band">
    <h2>{title}</h2>
    <p class="lede">{sub}</p>
    <div class="cta-row" style="margin-top:26px;">{buttons}</div>
  </div>
</section>
"""

def sub_grid(items):
    cards = "\n".join(
        f"""<a class="sub-card" href="{href}">
      <span class="sc-tag">{tag}</span>
      <h3>{title}</h3>
      <p class="sc-copy">{copy}</p>
      <p>{desc}</p>
      <span class="sc-link">詳しく見る<span class="arrow">&rarr;</span></span>
    </a>""" for tag, title, copy, desc, href in items
    )
    return f'<div class="sub-grid">{cards}</div>'

def write(path, html):
    full = os.path.join(ROOT, path.lstrip("/"), "index.html")
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(html)

# ----------------------------------------------------------------------------
# build
# ----------------------------------------------------------------------------
def build():
    os.makedirs(os.path.join(ROOT, "assets", "css"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "assets", "js"), exist_ok=True)
    with open(os.path.join(ROOT, "assets", "css", "style.css"), "w", encoding="utf-8") as f:
        f.write(CSS)
    with open(os.path.join(ROOT, "assets", "js", "main.js"), "w", encoding="utf-8") as f:
        f.write(JS)

    import pages
    pages.build_all(write=write, page=page, hero_dark=hero_dark, breadcrumb=breadcrumb,
                     biz_grid=biz_grid, core_model_flow=core_model_flow, stat_strip=stat_strip,
                     cta_band=cta_band, sub_grid=sub_grid, pin_story=pin_story, marquee=marquee,
                     photo_grid=photo_grid)

    dist = os.path.join(os.path.dirname(ROOT), "dist")
    client = os.path.join(dist, "client")
    server = os.path.join(dist, "server")
    shutil.rmtree(dist, ignore_errors=True)
    shutil.copytree(ROOT, client)
    os.makedirs(server, exist_ok=True)
    worker = """export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && !url.pathname.split('/').pop().includes('.')) {
      const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname + '/index.html';
      response = await env.ASSETS.fetch(new Request(new URL(path, url), request));
    }
    return response;
  }
};
"""
    with open(os.path.join(server, "index.js"), "w", encoding="utf-8") as f:
        f.write(worker)

    print("Build complete ->", ROOT)

if __name__ == "__main__":
    build()
