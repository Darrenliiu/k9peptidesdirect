P=[("bpc-157","BPC-157","Recovery","Body Protection Compound studied for tissue & gut repair.",80),
("tb-500","TB-500","Recovery","Thymosin Beta-4 fragment researched for mobility & soft tissue.",80),
("nad","NAD+","Longevity","Cellular energy cofactor studied for healthy aging.",80),
("glutathione","Glutathione","Wellness","Master antioxidant for oxidative-stress research.",80),
("b-complex","B-Complex","Wellness","Essential B vitamins supporting energy metabolism.",80),
("aod-9604","AOD-9604","Weight","GH fragment researched for fat metabolism.",80),
("joint-pack","Joint & Surgery Recovery Pack","Packages","BPC-157 + TB-500 protocol for pre/post-op support.",159),
("senior-pack","Senior Vitality Pack","Packages","NAD+ + Glutathione for aging working dogs.",179),
("performance-pack","K9 Performance Pack","Packages","Built for working, sport & service dogs.",209),
("cognitive-pack","Cognitive Focus Pack","Packages","Mental sharpness & training focus protocol.",129)]
CSS="""@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
:root{--navy:#003366;--ink:#292e4d;--blue:#087cf0;--sky:#e8f2fe;--bg:#f6f8fb;--line:#dde3ec}
*{box-sizing:border-box}body{margin:0;font-family:Outfit,sans-serif;color:var(--ink);background:#fff;line-height:1.55}
a{color:inherit;text-decoration:none}.w{max-width:1180px;margin:auto;padding:0 20px}
.bar{background:var(--navy);color:#fff;text-align:center;font-size:13px;padding:7px}
header{border-bottom:1px solid var(--line);position:sticky;top:0;background:#fff;z-index:9}
header .w{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{font-weight:700;font-size:22px;color:var(--navy);display:flex;gap:8px;align-items:center}.logo b{color:var(--blue)}
nav a{margin:0 12px;font-weight:500}nav a:hover{color:var(--blue)}
.btn{display:inline-block;background:var(--blue);color:#fff;padding:13px 26px;border-radius:999px;font-weight:600;border:0;cursor:pointer}
.btn.o{background:transparent;border:2px solid #fff}.btn.n{background:var(--navy)}
.hero{background:linear-gradient(135deg,var(--navy),#0a4f96);color:#fff;padding:90px 0}.hero .w{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
h1{font-size:52px;line-height:1.1;margin:0 0 18px}h2{font-size:34px;color:var(--navy);margin:0 0 12px}
.sec{padding:70px 0}.alt{background:var(--bg)}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:22px}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;transition:.2s}.card:hover{transform:translateY(-4px);box-shadow:0 12px 30px #00336622}
.card .b{padding:18px}.tag{font-size:12px;background:var(--sky);color:var(--blue);padding:3px 10px;border-radius:99px;font-weight:600}
.price{font-weight:700;color:var(--navy);font-size:20px}.img{aspect-ratio:1;display:grid;place-items:center;background:linear-gradient(160deg,var(--sky),#fff)}
.trust{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}.trust div{padding:20px;border-radius:14px;background:#fff;border:1px solid var(--line)}
.disc{background:#fff8e6;border:1px solid #f1d58a;padding:14px 18px;border-radius:12px;font-size:14px}
footer{background:var(--ink);color:#cfd6e4;padding:50px 0 20px;font-size:14px}footer .w>div{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:30px}footer h4{color:#fff}footer a{display:block;margin:6px 0}
.pd{display:grid;grid-template-columns:1fr 1fr;gap:50px}details{border-bottom:1px solid var(--line);padding:16px 0}summary{font-weight:600;cursor:pointer}
table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid var(--line);padding:12px;text-align:left}
input,select,textarea{width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;font:inherit;margin-bottom:12px}
.shop{display:grid;grid-template-columns:240px 1fr;gap:30px}.f label{display:block;margin:6px 0}
@media(max-width:820px){.hero .w,.pd,.shop,footer .w>div{grid-template-columns:1fr}.trust{grid-template-columns:1fr 1fr}nav{display:none}h1{font-size:36px}}"""
IM={'BPC-157':'bpc-157','TB-500':'tb-500','NAD+':'nad','Glutathione':'glutathione','B-Complex':'b-complex','AOD-9604':'aod-9604','Joint & Surgery Recovery Pack':'joint-pack','Senior Vitality Pack':'senior-pack','K9 Performance Pack':'performance-pack','Cognitive Focus Pack':'cognitive-pack'}
def vial(name,s=200):
  return f'<img src="images/{IM.get(name,"bpc-157")}.webp" alt="{name}" loading=lazy style="width:100%;height:100%;object-fit:cover">'
def _old(name,s=200):
  return f'''<svg width="{s}" height="{s}" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#08 7cf0" opacity=".08"/><rect x="72" y="40" width="56" height="20" rx="4" fill="#003366"/><rect x="66" y="58" width="68" height="110" rx="12" fill="#fff" stroke="#087cf0" stroke-width="3"/><rect x="72" y="92" width="56" height="44" rx="4" fill="#003366"/><text x="100" y="112" font-family="Outfit" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">{name[:12]}</text><text x="100" y="127" font-family="Outfit" font-size="7" fill="#9cc8ff" text-anchor="middle">K9 PEPTIDES DIRECT</text><path d="M150 150c6-4 14-2 16 4s-4 12-10 10-10-8-6-14z" fill="#087cf0" opacity=".5"/></svg>'''.replace("#08 7","#087")
PAW='<svg width="30" height="30" viewBox="0 0 24 24" fill="#087cf0"><circle cx="5" cy="9" r="2.4"/><circle cx="9.5" cy="4.5" r="2.4"/><circle cx="14.5" cy="4.5" r="2.4"/><circle cx="19" cy="9" r="2.4"/><path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z"/></svg>'
DISC='<div class="disc"><b>Important:</b> Products are sold for research and veterinary-guided use only. Not intended to diagnose, treat, cure or prevent any disease. Always consult a licensed veterinarian before starting any peptide protocol. Statements have not been evaluated by the FDA.</div>'
def nl_form(source,fid,label="Subscribe"):
  return (
    f'<form class="nl-form" action="/api/subscribe" method="post" data-nl="{source}" novalidate>'
    f'<input type="hidden" name="source" value="{source}">'
    f'<label class="nl-hp"><span>Company</span><input type="text" name="company" tabindex="-1" autocomplete="off"></label>'
    f'<div class="nl-row">'
    f'<label class="sr-only" for="{fid}">Email address</label>'
    f'<input id="{fid}" type="email" name="email" placeholder="you@email.com" autocomplete="email" inputmode="email" required maxlength="254" spellcheck="false">'
    f'<button class="btn" type="submit">{label}</button>'
    f'</div>'
    f'<p class="nl-status" role="status" aria-live="polite"></p>'
    f'</form>'
  )
NL_PAW_D='<circle cx="5" cy="9" r="2.4"/><circle cx="9.5" cy="4.5" r="2.4"/><circle cx="14.5" cy="4.5" r="2.4"/><circle cx="19" cy="9" r="2.4"/><path d="M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z"/>'
NL_HEX='M12 2.1 21.2 7.4v9.2L12 21.9 2.8 16.6V7.4Z'
NL_BG_CTA=(
  '<div class="nl-bg" aria-hidden="true">'
  '<svg class="nl-bg-art" viewBox="0 0 1440 420" preserveAspectRatio="xMaxYMid slice" focusable="false">'
  f'<defs><symbol id="nl-paw" viewBox="0 0 24 24">{NL_PAW_D}</symbol>'
  f'<symbol id="nl-hex" viewBox="0 0 24 24"><path d="{NL_HEX}"/></symbol></defs>'
  '<g fill="none" stroke="#9cc8ff" stroke-width="1.1">'
  '<g opacity=".22">'
  '<use href="#nl-hex" x="980" y="46" width="56" height="56"/>'
  '<use href="#nl-hex" x="1026" y="72" width="56" height="56"/>'
  '<use href="#nl-hex" x="1072" y="46" width="56" height="56"/>'
  '<use href="#nl-hex" x="1118" y="72" width="56" height="56"/>'
  '<use href="#nl-hex" x="1164" y="46" width="56" height="56"/>'
  '<use href="#nl-hex" x="1026" y="124" width="56" height="56"/>'
  '<use href="#nl-hex" x="1072" y="150" width="56" height="56"/>'
  '<use href="#nl-hex" x="1118" y="124" width="56" height="56"/>'
  '<use href="#nl-hex" x="1164" y="150" width="56" height="56"/>'
  '<use href="#nl-hex" x="1210" y="72" width="56" height="56"/>'
  '<use href="#nl-hex" x="1210" y="124" width="56" height="56"/>'
  '</g>'
  '<g opacity=".14">'
  '<use href="#nl-hex" x="980" y="150" width="56" height="56"/>'
  '<use href="#nl-hex" x="1072" y="98" width="56" height="56"/>'
  '<use href="#nl-hex" x="1256" y="98" width="56" height="56"/>'
  '<use href="#nl-hex" x="1164" y="202" width="56" height="56"/>'
  '</g>'
  '</g>'
  '<g fill="#9cc8ff" opacity=".28">'
  '<circle cx="1008" cy="74" r="2.4"/><circle cx="1054" cy="100" r="2.4"/><circle cx="1100" cy="74" r="2.4"/>'
  '<circle cx="1146" cy="100" r="2.4"/><circle cx="1192" cy="74" r="2.4"/><circle cx="1100" cy="178" r="2.4"/>'
  '</g>'
  '<use href="#nl-paw" x="1188" y="188" width="120" height="120" fill="#fff" opacity=".09" transform="rotate(-16 1248 248)"/>'
  '<use href="#nl-paw" x="860" y="250" width="72" height="72" fill="#fff" opacity=".07" transform="rotate(22 896 286)"/>'
  '<use href="#nl-paw" x="1288" y="18" width="54" height="54" fill="#fff" opacity=".08" transform="rotate(8 1315 45)"/>'
  '</svg></div>'
)
NL_BG_POP=(
  '<div class="nl-bg" aria-hidden="true">'
  '<svg class="nl-bg-art" viewBox="0 0 440 220" preserveAspectRatio="xMaxYMin slice" focusable="false">'
  f'<defs><symbol id="nl-pop-paw" viewBox="0 0 24 24">{NL_PAW_D}</symbol>'
  f'<symbol id="nl-pop-hex" viewBox="0 0 24 24"><path d="{NL_HEX}"/></symbol></defs>'
  '<g fill="none" stroke="#087cf0" stroke-width="1">'
  '<g opacity=".16">'
  '<use href="#nl-pop-hex" x="292" y="8" width="44" height="44"/>'
  '<use href="#nl-pop-hex" x="328" y="28" width="44" height="44"/>'
  '<use href="#nl-pop-hex" x="364" y="8" width="44" height="44"/>'
  '<use href="#nl-pop-hex" x="328" y="68" width="44" height="44"/>'
  '<use href="#nl-pop-hex" x="364" y="48" width="44" height="44"/>'
  '</g></g>'
  '<g fill="#087cf0" opacity=".22"><circle cx="314" cy="30" r="2"/><circle cx="350" cy="50" r="2"/><circle cx="386" cy="30" r="2"/></g>'
  '<use href="#nl-pop-paw" x="352" y="118" width="78" height="78" fill="#003366" opacity=".06" transform="rotate(-14 391 157)"/>'
  '</svg></div>'
)
NL_POPUP=(
  '<div class="nl-pop" hidden>'
  '<div class="nl-pop-back" data-nl-close tabindex="-1"></div>'
  '<div class="nl-pop-card" role="dialog" aria-modal="true" aria-labelledby="nl-pop-h">'
  +NL_BG_POP+
  '<button class="nl-x" type="button" aria-label="Close" data-nl-close>&times;</button>'
  '<span class="tag">Newsletter</span>'
  '<h2 id="nl-pop-h">A quieter way to keep up</h2>'
  '<p>Restocks, new products, and the occasional research note. We write when there is something worth opening.</p>'
  +nl_form("popup","nl-pop-email")+
  '</div></div>'
)
def page(fn,title,body):
  h=f'''<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>{title} | K9 Peptides Direct</title><link rel=icon href=favicon.svg type="image/svg+xml"><link rel=stylesheet href=style.css><script src=newsletter.js defer></script></head><body>
<div class=bar>Free cold-pack shipping $150+<span class=dk> · Third-party tested · Vet-consult support</span></div>
<header><div class=w><a class=logo href=index.html>{PAW}<span>K9 Peptides <b>Direct</b></span></a><nav><a href=shop.html>Shop</a><a href=shop.html#packages>Packages</a><a href=dosing.html>Research Guide</a><a href=about.html>About</a><a href=faq.html>FAQ</a><a href=contact.html>Contact</a></nav><div class=hr><a class="btn n cartb" href=cart.html aria-label="Cart, 2 items"><svg width=22 height=22 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.4 12h11l2-8H6.3"/></svg><span class=ct>Cart</span><span class=badge>2</span></a><button class=burger aria-label="Menu" onclick="document.body.classList.toggle('nav-open')"><span></span><span></span><span></span></button></div></div></header>
{body}
<footer><div class=w><div><div><div class=logo style="color:#fff">{PAW}K9 Peptides<b>Direct</b></div><p>Research-grade peptides formulated and dosed for canine wellness. Lab-verified, vet-informed.</p></div>
<div><h4>Shop</h4><a href=shop.html>All Products</a><a href=shop.html>Packages</a><a href=product.html>BPC-157</a></div><div><h4>Learn</h4><a href=dosing.html>Research Guide</a><a href=faq.html>FAQ</a><a href=about.html>About</a></div><div><h4>Support</h4><a href=contact.html>Contact</a><a href=#>Shipping</a><a href=#>Returns</a></div>
<div class="nl-foot"><h4>Stay in touch</h4><p class="nl-blurb">Restocks, new products, and the occasional research note.</p>{nl_form("footer","nl-foot-email","Join")}</div></div>
<p style="margin-top:30px;font-size:12px;opacity:.7">© 2026 K9PeptidesDirect.com · For research & veterinary-guided use only. Not for human consumption. Not evaluated by the FDA.</p></div></footer>{NL_POPUP}<script>if(innerWidth<641)document.querySelectorAll('details.f').forEach(d=>d.open=false);const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{{threshold:.12}});document.querySelectorAll('.sec .w,.goal,.tst .card').forEach(el=>{{el.classList.add('rv');o.observe(el)}})</script></body></html>'''
  open(fn,"w").write(h)
def card(p): return f'<a class=card href=product.html><div class=img>{vial(p[1])}</div><div class=b><span class=tag>{p[2]}</span><h3 style="margin:10px 0 4px">{p[1]}</h3><p style="font-size:14px;margin:0 0 10px">{p[3]}</p><span class=price>${p[4]}</span></div></a>'
CSS_M="\n/* ---- responsive system ---- */\nhtml{-webkit-text-size-adjust:100%}body{overflow-x:hidden;font-size:clamp(15px,.9rem + .25vw,17px)}img{max-width:100%;display:block}\nh1{font-size:clamp(30px,5.2vw,52px)}h2{font-size:clamp(24px,3.4vw,34px)}h3{font-size:clamp(17px,1.6vw,20px)}\n.sec{padding:clamp(44px,7vw,70px) 0}.w{padding:0 clamp(16px,4vw,20px)}\n.btn{min-height:48px;padding:0 26px;display:inline-flex;align-items:center;justify-content:center;line-height:1;font-size:16px;text-decoration:none}\ninput,select,textarea{min-height:48px;font-size:16px}.hr{display:flex;align-items:center;gap:10px}\n.burger{display:none;width:48px;height:48px;border:1px solid var(--line);border-radius:12px;background:#fff;flex-direction:column;justify-content:center;align-items:center;gap:5px;cursor:pointer}.burger span{width:22px;height:2px;background:var(--navy);transition:.3s}\n.fsum{list-style:none;cursor:default;font-weight:700;color:var(--navy);pointer-events:none}.fsum::-webkit-details-marker{display:none}\nlabel:has(>input[type=checkbox]){display:flex;gap:10px;align-items:flex-start}label>input[type=checkbox]{width:20px!important;height:20px;min-height:0;margin:2px 0 0;flex:none}.tw{overflow-x:auto;-webkit-overflow-scrolling:touch}.tw table{min-width:520px}.pd>*,.shop>*,.split>*{min-width:0}.pd .tw table{min-width:0}.pd td{white-space:normal}\n.goal{height:clamp(220px,30vw,320px)}td,th{white-space:nowrap}\n@media(max-width:960px){\n .burger{display:flex}.cartb{min-height:48px;padding:0 16px;font-size:14px}\n nav{display:flex!important;position:fixed;top:105px;left:0;right:0;bottom:0;background:#fff;flex-direction:column;padding:12px 20px;transform:translateX(100%);transition:transform .3s;z-index:20}\n nav a{margin:0;padding:16px 4px;border-bottom:1px solid var(--line);font-size:18px;min-height:52px}\n .nav-open nav{transform:none}.nav-open{overflow:hidden}\n .nav-open .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}.nav-open .burger span:nth-child(2){opacity:0}.nav-open .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}\n .trust{grid-template-columns:1fr 1fr}.stats .w{grid-template-columns:1fr 1fr;gap:20px}.tst{grid-template-columns:1fr}\n .split,.pd,.shop{grid-template-columns:1fr;gap:28px}footer .w>div{grid-template-columns:1fr 1fr}\n}\n@media(max-width:640px){\n header .w{height:64px}.logo{font-size:18px}.logo svg{width:24px;height:24px}nav{top:97px}\n .bar{font-size:12px;padding:6px 10px}.dk{display:none}.logo{gap:6px}\n .fb{min-height:auto;padding:110px 0 56px;background-position:70% center}.fb:before{background:linear-gradient(180deg,#003366cc,#003366ee)}\n .fb .c p{font-size:17px!important}.fb .btn,.pd .btn,.split .btn,form .btn,.card .btn{width:100%}.fb .c .btn+.btn,.fb .c a.o{margin-top:10px}\n .grid{grid-template-columns:1fr 1fr;gap:12px}.grid .card .b{padding:12px}.grid .card h3{font-size:15px}.grid .card p{font-size:13px}.price{font-size:17px}\n .goal-grid,.sec .grid:has(.goal){grid-template-columns:1fr}\n .ban{min-height:240px}.ban .w{padding-bottom:28px}\n .gal{overflow-x:auto;scroll-snap-type:x mandatory}.gal img{flex:0 0 70%;height:180px;scroll-snap-align:start}.gal img:hover{flex:0 0 70%}\n .f{border:1px solid var(--line);border-radius:12px;padding:0 16px}.fsum{pointer-events:auto;cursor:pointer;min-height:48px;display:flex;align-items:center;justify-content:space-between}.fsum:after{content:'+';font-size:22px}.f[open] .fsum:after{content:'–'}\n .f label{min-height:44px;display:flex;align-items:center;gap:10px}\n .shop>div>div:first-child{flex-wrap:wrap;gap:10px}.shop select{width:100%!important}\n footer .w>div{grid-template-columns:1fr 1fr;gap:20px}footer .w>div>div:first-child{grid-column:1/-1}footer a{min-height:36px;display:flex;align-items:center}\n .disc{font-size:13px}details summary{min-height:44px;display:flex;align-items:center}\n}\n@media(max-width:380px){.grid{grid-template-columns:1fr}.trust{grid-template-columns:1fr}}\n"
CSS_NL="""
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.nl-hp{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}
.nl-row{display:flex;gap:10px;align-items:stretch}
.nl-row input{margin:0;flex:1;min-width:0}
.nl-row .btn{flex:none;white-space:nowrap}
.nl-status{min-height:1.4em;margin:10px 0 0;font-size:14px}
.nl-status.ok{color:#1f7a46}
.nl-status.err{color:#b42318}
.nl-form.is-busy .btn{opacity:.7;pointer-events:none}
.nl-cta{position:relative;overflow:hidden;isolation:isolate;color:#fff;background:radial-gradient(ellipse 62% 120% at 92% 8%,#1a74db 0%,transparent 58%),radial-gradient(ellipse 46% 80% at 4% 108%,#001428 0%,transparent 52%),linear-gradient(135deg,var(--navy),#0a4f96)}
.nl-cta:after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.07;background-image:radial-gradient(#fff 0.6px,transparent .7px);background-size:3px 3px}
.nl-cta .nl-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
.nl-cta .nl-bg-art{width:100%;height:100%;display:block}
.nl-cta h2{color:#fff}
.nl-cta p{opacity:.92;margin:0}
.nl-cta-box{position:relative;z-index:1;display:grid;grid-template-columns:1.15fr .85fr;gap:36px;align-items:center}
.nl-cta .nl-row input{background:#fff;border-color:transparent}
.nl-cta .nl-status.ok{color:#c8f0d4}
.nl-cta .nl-status.err{color:#ffd2cc}
.nl-cta .tag{background:#ffffff22;color:#fff}
footer .w>div{grid-template-columns:1.5fr 1fr 1fr 1fr 1.5fr}
footer .nl-foot{position:relative}
footer .nl-foot:before{content:'';position:absolute;right:0;top:-8px;width:64px;height:64px;opacity:.1;pointer-events:none;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23087cf0'%3E%3Ccircle cx='5' cy='9' r='2.4'/%3E%3Ccircle cx='9.5' cy='4.5' r='2.4'/%3E%3Ccircle cx='14.5' cy='4.5' r='2.4'/%3E%3Ccircle cx='19' cy='9' r='2.4'/%3E%3Cpath d='M12 10c3 0 7 5 6 8s-4 2-6 2-5 1-6-2 3-8 6-8z'/%3E%3C/svg%3E")}
footer .nl-blurb{margin:0 0 12px;opacity:.85}
footer .nl-form input{margin:0;background:#1a2038;border-color:#3d4566;color:#fff}
footer .nl-form input::placeholder{color:#8b93a7}
footer .nl-status.ok{color:#9be7b8}
footer .nl-status.err{color:#ffb4ac}
.nl-pop[hidden]{display:none!important}
.nl-pop{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;padding:20px}
.nl-pop-back{position:absolute;inset:0;background:#292e4d73;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
.nl-pop-card{position:relative;overflow:hidden;isolation:isolate;background:linear-gradient(180deg,#e8f2fe 0%,#fff 46%);border-radius:18px;padding:32px 28px 28px;max-width:440px;width:100%;box-shadow:0 24px 60px #00336633;border:1px solid var(--line)}
.nl-pop-card:before{content:'';position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,var(--blue),var(--navy));z-index:2}
.nl-pop-card .nl-bg{position:absolute;inset:0 auto auto 0;width:100%;height:220px;z-index:0;pointer-events:none}
.nl-pop-card .nl-bg-art{width:100%;height:100%;display:block}
.nl-pop-card>:not(.nl-bg):not(.nl-x){position:relative;z-index:1}
.nl-pop-card h2{font-size:28px;margin:10px 0 8px;color:var(--navy)}
.nl-pop-card>p{margin:0 0 18px;color:#4a5168}
.nl-pop-card .nl-x{position:absolute;top:12px;right:12px;width:40px;height:40px;border:0;background:#fff;border-radius:10px;font-size:24px;line-height:1;color:var(--navy);cursor:pointer;z-index:2;box-shadow:0 1px 0 #00336614}
.nl-x:hover,.nl-x:focus-visible{background:var(--sky);outline:2px solid var(--blue);outline-offset:2px}
@media(max-width:960px){footer .w>div{grid-template-columns:1fr 1fr}footer .nl-foot{grid-column:1/-1}}
@media(max-width:820px){.nl-cta-box{grid-template-columns:1fr;gap:22px}.nl-cta .nl-bg{opacity:.55}footer .w>div{grid-template-columns:1fr 1fr}footer .nl-foot{grid-column:1/-1}}
@media(max-width:640px){.nl-row{flex-direction:column}.nl-row .btn{width:100%}.nl-pop-card{padding:26px 20px 22px}.nl-pop-card h2{font-size:24px}.nl-pop-card .nl-bg{height:180px}}
@media(prefers-reduced-motion:reduce){.nl-pop-card{animation:none}}
"""
open("favicon.svg","w").write(PAW.replace('width="30" height="30" ','xmlns="http://www.w3.org/2000/svg" '))
open("style.css","w").write(CSS+""".img{overflow:hidden}.img img{transition:transform .5s}.card:hover .img img{transform:scale(1.06)}
.fb{position:relative;min-height:640px;display:flex;align-items:center;color:#fff;background-size:cover;background-position:center}
.fb:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#003366ee 0%,#003366aa 45%,#00336610 100%)}.fb .w{position:relative;width:100%}.fb .c{max-width:600px}
.ban{position:relative;min-height:340px;display:flex;align-items:flex-end;color:#fff;background-size:cover;background-position:center}.ban:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#003366e6,#00336630)}.ban .w{position:relative;width:100%;padding-bottom:40px}.ban h1{margin:0}
.goal{position:relative;height:320px;border-radius:18px;overflow:hidden;color:#fff;display:flex;align-items:flex-end}.goal img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s}.goal:hover img{transform:scale(1.08)}.goal:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#003366f0,transparent 60%)}.goal div{position:relative;z-index:1;padding:22px}.goal h3{margin:0}
.split{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}.split img{width:100%;border-radius:20px;box-shadow:0 20px 50px #00336633}
.tst{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.tst .card{padding:26px}.tst img{width:64px;height:64px;border-radius:50%;object-fit:cover;float:left;margin-right:14px}
.gal{display:flex;gap:10px;overflow:hidden}.gal img{height:220px;flex:1;min-width:0;object-fit:cover;border-radius:12px;transition:flex .4s}.gal img:hover{flex:2}
.stats{background:var(--navy);color:#fff}.stats .w{display:grid;grid-template-columns:repeat(4,1fr);text-align:center;padding:40px 20px}.stats b{font-size:40px;display:block;color:#7fbcff}
.rv{opacity:0;transform:translateY(30px);transition:all .8s ease}.rv.in{opacity:1;transform:none}
@keyframes fu{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}.fb .c>*{animation:fu .9s ease both}.fb .c>*:nth-child(2){animation-delay:.15s}.fb .c>*:nth-child(3){animation-delay:.3s}
@media(max-width:820px){.split,.tst,.stats .w{grid-template-columns:1fr}.gal img{height:120px}}"""+CSS_M+'\n.logo{white-space:nowrap;flex:0 1 auto;min-width:0}.cartb{position:relative;gap:8px}.cartb svg{flex:none}\n.badge{background:var(--blue);color:#fff;font-size:12px;font-weight:700;min-width:20px;height:20px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;padding:0 5px;border:2px solid #fff}\n@media(max-width:960px){\n header .w{gap:10px}.hr{gap:8px;flex:none}\n .btn.cartb,.burger{width:44px;height:44px;min-height:44px;padding:0;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--navy);box-shadow:0 1px 2px #00336614}\n .cartb .ct{display:none}.cartb .badge{position:absolute;top:-6px;right:-6px;min-width:18px;height:18px;font-size:11px}\n .burger span{width:20px}.burger:active,.cartb:active{background:var(--sky)}\n}\n@media(max-width:640px){.logo{font-size:clamp(15px,4.6vw,18px)}.logo svg{width:clamp(20px,6vw,24px);height:clamp(20px,6vw,24px)}}\n'+CSS_NL)
page("index.html","Home",f'''<section class=fb style="background-image:url(images/hero-dog.webp)"><div class=w><div class=c><span class=tag>Lab-verified · Vet-informed</span><h1>Peptide support built for the dogs who give everything.</h1><p style="font-size:19px;opacity:.9">Recovery, mobility, longevity and performance protocols — precision-dosed for canine body weight and backed by third-party COAs.</p><a class=btn href=shop.html>Shop Peptides</a> &nbsp;<a class="btn o" href=dosing.html>Find a Protocol</a></div></div></section>
<section class=sec><div class="w trust"><div><h3>🧪 99%+ Purity</h3>Third-party HPLC tested</div><div><h3>🩺 Vet-Consult</h3>Screening before protocols</div><div><h3>❄️ Cold-Chain</h3>Insulated shipping</div><div><h3>📄 COA Library</h3>Every batch published</div></div></section>
<section class="sec alt"><div class=w><h2>Shop by goal</h2><p>Choose a goal — we'll match the protocol.</p><div class=grid>{"".join(f'<a class=goal href=shop.html><img src="images/{i}.webp" alt="{g}" loading=lazy><div><h3>{g}</h3><p style="margin:4px 0 0">{d} →</p></div></a>' for g,d,i in [("Joint & Mobility","Arthritis, hips, aging joints","goal-joint"),("Surgery Recovery","Pre/post-op tissue support","goal-surgery"),("Senior Longevity","Energy and cellular health","goal-senior"),("Working & Sport","Performance and fast recovery","goal-performance")])}</div></div></section>
<section class=sec><div class=w><h2>Best sellers</h2><div class=grid>{"".join(card(p) for p in P[:4])}</div></div></section>
<section class=stats><div class=w><div><b>12k+</b>Dogs supported</div><div><b>99.2%</b>Avg. HPLC purity</div><div><b>48</b>Partner vets</div><div><b>4.9★</b>Owner rating</div></div></section>
<section class=sec><div class="w split"><img src="images/lab.webp" alt="Quality control lab" loading=lazy><div><span class=tag>Quality first</span><h2>Every batch, independently verified</h2><p>Each lot is HPLC- and mass-spec-tested by an independent lab before it ships. Certificates are published for every batch number printed on your vial.</p><a class="btn n" href=about.html>Our standards</a></div></div></section>
<section class="sec alt"><div class="w split"><div><span class=tag>Vet-guided</span><h2>Screened by veterinarians, not algorithms</h2><p>Our intake connects you with licensed vets who review your dog's history before any protocol is fulfilled.</p><a class=btn href=contact.html>Start intake</a></div><img src="images/vet.webp" alt="Veterinarian with dog" loading=lazy></div></section>
<section class=sec><div class=w><h2>Owners & handlers love the results</h2><div class=tst>{"".join(f'<div class=card><img src="images/{i}.webp" alt=""><b>{n}</b><br><small>{r}</small><p style="clear:both;padding-top:10px">"{q}"</p>★★★★★</div>' for i,n,r,q in [("t1","Jess M.","Agility competitor","Recovery between trials has never been smoother. The dosing card made it easy."),("t2","Officer R. Diaz","K9 handler","Our patrol dog came back from a soft-tissue injury ahead of schedule, with vet oversight the whole way."),("t3","Linda K.","Senior beagle mom","At 13, Bella is back to her morning walks. The vet intake gave me real peace of mind.")])}</div></div></section>
<section class=sec style="padding-top:0"><div class="w gal">{"".join(f'<img src="images/{i}.webp" alt="" loading=lazy>' for i in ["run","goal-performance","rehab","goal-joint","t1","goal-senior"])}</div></section><section class="sec alt"><div class=w><h2>How it works</h2><div class=grid><div class=card><div class=b><h3>1 · Take the finder quiz</h3>Tell us breed, weight, age and goals.</div></div><div class=card><div class=b><h3>2 · Vet screening</h3>Quick health intake reviewed before shipping.</div></div><div class=card><div class=b><h3>3 · Pre-dosed protocol</h3>Weight-based dosing chart in every box.</div></div></div></div></section>
<section class="sec nl-cta" aria-labelledby="nl-cta-h">{NL_BG_CTA}<div class="w nl-cta-box"><div><span class="tag">Newsletter</span><h2 id="nl-cta-h">Stay close to restocks and research notes</h2><p>The occasional email when we add a product, restock a favorite, or publish a protocol guide. No daily noise.</p></div>{nl_form("cta","nl-cta-email")}</div></section>
<section class=sec><div class=w>{DISC}</div></section>''')
page("shop.html","Shop",f'''<section class=ban style="background-image:url(images/run.webp)"><div class=w><h1>Shop peptides for dogs</h1><p style="font-size:18px;opacity:.9">Lab-verified single peptides and goal-based protocol packs.</p></div></section><section class=sec><div class=w><h2>Shop all peptides</h2><div class=shop><details class=f open><summary class=fsum>Filters</summary><h4>Category</h4>{"".join(f'<label><input type=checkbox style="width:auto"> {c}</label>' for c in ["Recovery","Longevity","Wellness","Weight","Packages"])}<h4>Dog size</h4>{"".join(f'<label><input type=checkbox style="width:auto"> {c}</label>' for c in ["Small (<25 lb)","Medium (25-60 lb)","Large (60+ lb)"])}<h4>Price</h4><input type=range></details>
<div><div style="display:flex;justify-content:space-between;align-items:center"><span>{len(P)} products</span><select style="width:200px"><option>Sort: Best selling</option><option>Price low-high</option></select></div><div class=grid id=packages>{"".join(card(p) for p in P)}</div></div></div></div></section>''')
page("product.html","BPC-157",f'''<section class=sec><div class="w pd"><div class="img card">{vial("BPC-157",420)}</div><div><span class=tag>Recovery</span><h1 style="color:var(--navy);font-size:42px">BPC-157 for Dogs</h1><div>★★★★★ <small>(212 reviews)</small></div><p class=price style="font-size:30px">$80.00</p><p>A body protection compound researched for soft-tissue, tendon and gut lining support. Lyophilized, 5 mg vial, with weight-based canine dosing chart.</p>
<label>Dog weight</label><select><option>Small (&lt;25 lb)</option><option>Medium (25–60 lb)</option><option>Large (60+ lb)</option></select><label>Purchase</label><select><option>One-time purchase — $80</option><option>Subscribe & save 15% — $68</option></select>
<a class=btn href=cart.html style="width:100%;text-align:center">Add to cart</a><p style="font-size:14px">✓ COA batch #K9-2610 &nbsp; ✓ Cold-pack shipping &nbsp; ✓ Vet screening included</p>
<details open><summary>Research overview</summary><p>Studied in animal models for connective tissue healing and GI integrity.</p></details><details><summary>Dosing & reconstitution</summary><p>See the <a href=dosing.html style="color:var(--blue)">research guide</a>. Always follow your veterinarian's direction.</p></details><details><summary>What's in the box</summary><p>Vial, bacteriostatic water, insulin syringes, alcohol pads, dosing card.</p></details><details><summary>Certificate of Analysis</summary><p>HPLC purity 99.2% · Mass spec verified.</p></details>{DISC}</div></div></section>
<section class="sec alt"><div class=w><h2>Often paired with</h2><div class=grid>{"".join(card(p) for p in [P[1],P[6],P[2]])}</div></div></section>''')
page("about.html","About",f'''<section class=ban style="background-image:url(images/t2.webp)"><div class=w><h1>Built by dog people. Verified by labs.</h1><p style="font-size:18px;opacity:.9">Working dogs, athletes and senior companions deserve research-grade quality.</p></div></section><section class=sec><div class="w split"><img src="images/lab.webp" alt=""><div><h2>Our standard</h2><p>Independent HPLC & mass-spec testing on every lot, cold-chain fulfilment, and published COAs.</p></div></div></section><section class="sec alt"><div class="w split"><div><h2>Vet network</h2><p>Licensed veterinarians review each intake. Rehab specialists help shape our recovery protocols.</p></div><img src="images/rehab.webp" alt=""></div></section><section class=sec><div class="w grid"><div class=card><div class=b><h3>Our standard</h3>Every batch is third-party tested and published.</div></div><div class=card><div class=b><h3>Vet network</h3>Licensed veterinarians review intake forms.</div></div><div class=card><div class=b><h3>Canine-first dosing</h3>Charts scaled to weight, not guesswork.</div></div></div></section>''')
page("dosing.html","Research Guide",f'''<section class=ban style="background-image:url(images/rehab.webp)"><div class=w><h1>Canine peptide research guide</h1><p style="font-size:18px;opacity:.9">Weight-based reference, reconstitution and storage.</p></div></section><section class=sec><div class=w><h2>Canine peptide research guide</h2><p>Educational reference only — your veterinarian sets the final protocol.</p>{DISC}<h3>Typical research ranges by weight</h3><div class=tw><table><tr><th>Peptide</th><th>&lt;25 lb</th><th>25–60 lb</th><th>60+ lb</th><th>Cycle</th></tr>{"".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>" for a,b,c,d,e in [("BPC-157","50 mcg","100 mcg","150–200 mcg","4–6 wks"),("TB-500","0.25 mg","0.5 mg","1 mg","4 wks"),("NAD+","5 mg","10 mg","20 mg","Ongoing"),("Glutathione","25 mg","50 mg","100 mg","4–8 wks")])}</table></div><p style="font-size:13px">Illustrative placeholder values for mockup — confirm with veterinary guidance before publishing.</p>
<h3>Reconstitution in 4 steps</h3><ol><li>Wipe vial tops with alcohol.</li><li>Add bacteriostatic water slowly down the vial wall.</li><li>Swirl gently — never shake.</li><li>Refrigerate at 2–8°C; use within 30 days.</li></ol></div></section>''')
page("faq.html","FAQ",'<section class=ban style="background-image:url(images/goal-senior.webp)"><div class=w><h1>Frequently asked questions</h1><p style="font-size:18px;opacity:.9">Straight answers on safety, dosing, shipping and testing.</p></div></section><section class=sec><div class=w><h2>Frequently asked questions</h2>'+"".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q,a in [("Are peptides safe for dogs?","Research is emerging; we require a veterinary consult before any protocol."),("Do I need a prescription?","Products are sold for research/vet-guided use. Our intake form connects you with a vet."),("How are products shipped?","Insulated cold packs, 1–3 day shipping."),("How do I choose a dose?","Use our weight-based guide and confirm with your vet."),("Can I see test results?","Yes — every batch COA is published."),("What's your return policy?","Unopened products within 30 days.")])+'</div></section>')
page("contact.html","Contact",'<section class=ban style="background-image:url(images/vet.webp)"><div class=w><h1>Talk to our team</h1><p style="font-size:18px;opacity:.9">Protocol questions, vet partnerships and order support.</p></div></section><section class=sec><div class="w pd"><div><h2>Talk to our team</h2><p>Questions on protocols, orders or COAs? We reply within one business day.</p><p>📧 support@k9peptidesdirect.com<br>🕘 Mon–Fri 9–5 PT</p></div><form class=card style="padding:24px"><input placeholder="Name"><input placeholder="Email"><select><option>Topic: Order</option><option>Protocol question</option><option>Vet partnership</option></select><input placeholder="Dog breed & weight"><textarea rows=5 placeholder="Message"></textarea><button class=btn type=button>Send message</button></form></div></section>')
page("cart.html","Cart",f'''<section class=sec><div class="w pd"><div><h2>Your cart</h2><div class=tw><table><tr><th>Item</th><th>Qty</th><th>Total</th></tr><tr><td>BPC-157 · Medium</td><td>1</td><td>$80.00</td></tr><tr><td>Joint & Surgery Recovery Pack</td><td>1</td><td>$159.00</td></tr></table></div></div><div class=card style="padding:24px;align-self:start"><h3>Order summary</h3><p>Subtotal $239.00<br>Cold-pack shipping <b>FREE</b><br><span class=price>Total $239.00</span></p><label><input type=checkbox style="width:auto"> I confirm a veterinarian will supervise use and products are for research/vet-guided use.</label><br><br><a class=btn style="width:100%;text-align:center">Continue to vet intake & checkout</a></div></div></section>''')
