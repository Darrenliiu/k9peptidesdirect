from playwright.sync_api import sync_playwright
import sys
P="index shop product about dosing faq contact cart".split()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
  for w in [360,390,430,768]:
    pg=b.new_page(viewport={"width":w,"height":800})
    for n in P:
      pg.goto(f"file:///workspace/k9peptidesdirect/{n}.html")
      r=pg.evaluate("""()=>{const W=innerWidth;const bad=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>W+1&&!e.closest('.tw,.gal,nav')}).slice(0,3).map(e=>e.tagName+'.'+e.className);
      const small=[...document.querySelectorAll('a.btn,button,input,select')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height<44&&e.type!='checkbox'&&e.type!='range'}).length;
      return [document.documentElement.scrollWidth,W,bad,small]}""")
      if r[0]>r[1] or r[2] or r[3]: print(w,n,r)
    if w==390:
      for n in ["index","shop","product","cart"]:
        pg.goto(f"file:///workspace/k9peptidesdirect/{n}.html");pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))");pg.wait_for_timeout(900)
        pg.screenshot(path=f"screens/mobile-{n}.png",full_page=True)
      pg.goto("file:///workspace/k9peptidesdirect/index.html");pg.click(".burger");pg.wait_for_timeout(400);pg.screenshot(path="screens/mobile-nav.png")
  print("done")
