from playwright.sync_api import sync_playwright
import os,re
P="index shop product about dosing faq contact cart".split()
issues=[]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
  for w in [360,390,430,768,1366]:
    pg=b.new_page(viewport={"width":w,"height":800})
    errs=[];pg.on("console",lambda m:m.type=="error" and errs.append(m.text));pg.on("pageerror",lambda e:errs.append(str(e)))
    for n in P:
      pg.goto(f"file:///workspace/k9peptidesdirect/{n}.html");pg.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')");pg.wait_for_timeout(700)
      pg.evaluate("window.scrollTo(0,document.body.scrollHeight)");pg.wait_for_timeout(200)
      r=pg.evaluate("""()=>{const W=innerWidth;return {sw:document.documentElement.scrollWidth,W,
        broken:[...document.images].filter(i=>!i.complete||i.naturalWidth==0).map(i=>i.src),
        links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),
        small:[...document.querySelectorAll('a.btn,button,select,input:not([type=checkbox]):not([type=range])')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height<44}).map(e=>e.outerHTML.slice(0,60)),
        btnh:[...new Set([...document.querySelectorAll('a.btn,button.btn')].map(e=>Math.round(e.getBoundingClientRect().height)).filter(h=>h))]}}""")
      if r['sw']>r['W']: issues.append((w,n,'overflow',r['sw']))
      if r['broken']: issues.append((w,n,'img',r['broken'][:2]))
      if r['small']: issues.append((w,n,'small',r['small'][:2]))
      if len(r['btnh'])>1: issues.append((w,n,'btnheights',r['btnh']))
      for l in r['links']:
        f=l.split('#')[0]
        if f and not f.startswith(('http','mailto')) and not os.path.exists(f): issues.append((w,n,'deadlink',l))
      if errs: issues.append((w,n,'console',errs[:2]));errs.clear()
    if w<1366:
      pg.goto("file:///workspace/k9peptidesdirect/shop.html");pg.evaluate("scrollTo(0,300)");pg.click(".burger");pg.wait_for_timeout(400)
      ok=pg.evaluate("document.querySelector('nav').getBoundingClientRect().left==0 && document.querySelector('nav').getBoundingClientRect().top>=0")
      pg.click("nav a[href='faq.html']");pg.wait_for_load_state();
      if not ok or not pg.url.endswith("faq.html"): issues.append((w,'nav','fail',ok,pg.url))
    else:
      pg.goto("file:///workspace/k9peptidesdirect/product.html");pg.click("a.btn[href='cart.html'] >> nth=1");
      if not pg.url.endswith("cart.html"): issues.append((w,'cartflow',pg.url))
    if w==390:
      for n,f in [("index","home"),("shop","shop"),("product","product"),("cart","cart")]:
        pg.goto(f"file:///workspace/k9peptidesdirect/{n}.html");pg.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')");pg.wait_for_timeout(800);pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))");pg.wait_for_timeout(900)
        pg.screenshot(path=f"screens/mobile-{f}.png",full_page=True)
  for i in issues: print(i)
  print("issues:",len(issues))
