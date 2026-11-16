"""Option 2 mockup: three one-line proof points under the hero, replacing
the five-figure stats band. Facts only from the site (StatsBand, Experience,
UWB case study). Desktop 1366 and phone 375."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
G = Path('/home/claude/ext/gfonts/ofl')
CSS = f'''
@font-face{{font-family:"Plex Sans";font-weight:100 700;font-stretch:85% 100%;src:url("{(G/'ibmplexsans/IBMPlexSans[wdth,wght].ttf').as_uri()}")}}
@font-face{{font-family:"Plex Mono";font-weight:600;src:url("{(G/'ibmplexmono/IBMPlexMono-SemiBold.ttf').as_uri()}")}}
@font-face{{font-family:"Plex Mono";font-weight:700;src:url("{(G/'ibmplexmono/IBMPlexMono-Bold.ttf').as_uri()}")}}
@font-face{{font-family:P2P;src:url("{(ROOT/'client/public/fonts/PressStart2P.woff2').as_uri()}")}}
@font-face{{font-family:Bangers;src:url("{(G/'bangers/Bangers-Regular.ttf').as_uri()}")}}
*{{box-sizing:border-box;margin:0}}
body{{background:#EFEAE0;background-image:radial-gradient(rgb(0 0 0 / .08) 1.1px,transparent 1.3px);background-size:10px 10px;color:#111;font-family:"Plex Sans";overflow:hidden}}
.win{{border:3px solid #000;box-shadow:8px 8px 0 #000;background:#111}}
.bar{{background:#111;color:#fff;font:600 14px "Plex Mono";padding:9px 12px;display:flex;justify-content:space-between;border-bottom:3px solid #000}}
.name{{font-family:P2P;line-height:1.3}}
.role{{font:700 16px "Plex Mono";color:#2347D6}}
.lead{{font:600 20px/1.4 "Plex Sans"}}
.btn{{display:inline-block;border:3px solid #000;box-shadow:4px 4px 0 #000;font:600 16px "Plex Mono";padding:11px 18px}}
.proof{{border:3px solid #000;background:#fff;box-shadow:6px 6px 0 #000}}
.proof .head{{background:#111;color:#fff;font:600 13px "Plex Mono";padding:7px 12px;display:flex;justify-content:space-between}}
.row{{display:flex;align-items:center;gap:14px;padding:12px 14px;border-top:3px solid #000}}
.row:first-of-type{{border-top:0}}
.fig{{flex:none;min-width:118px;text-align:center;font:700 22px "Plex Mono";letter-spacing:-.02em;background:#111;color:#fff;border:3px solid #000;padding:6px 8px}}
.fig.b{{background:#3A66FF;color:#fff}}
.txt{{flex:1;font:500 16px/1.4 "Plex Sans"}}
.txt b{{font-weight:700}}
.go{{flex:none;font:600 14px "Plex Mono";color:#2347D6;text-decoration:underline;text-underline-offset:3px}}
.ribbon{{background:#3A66FF;border-top:3px solid #000;border-bottom:3px solid #000;font:700 18px "Plex Mono";padding:12px 0;white-space:nowrap;overflow:hidden}}
.label{{position:fixed;right:10px;bottom:10px;font:600 12px "Plex Mono";background:#111;color:#fff;padding:3px 8px}}
'''
ROWS = [
 ('89.61%', 'b', '<b>UWB signal classifier</b> beat its 85.75% baseline (SVM-RBF, 41,996 samples, team coursework)', 'Case study →'),
 ('40%', '', '<b>Fewer manual agent actions</b> after I automated Freshservice workflows at LGA Telecom', 'Experience →'),
 ('1,000+', '', '<b>Network configurations migrated</b> while leading the FreeSDN integration at LGA Telecom', 'Experience →'),
]
def proof(compact=False):
    rows=''.join(f'<div class="row"><span class="fig {c}">{f}</span><span class="txt">{t}</span>{"" if compact else f"<span class=go>{g}</span>"}</div>' for f,c,t,g in ROWS)
    return f'<div class="proof"><div class="head"><span>proof.txt</span><span>○□✕</span></div>{rows}</div>'
desk = f'''<!doctype html><html><head><meta charset="utf-8"><style>{CSS}body{{width:1366px;height:860px}}</style></head><body>
<div style="display:grid;grid-template-columns:7fr 5fr;gap:40px;max-width:1152px;margin:40px auto 0;padding:0 24px">
 <div>
  <div class="win"><div class="bar"><span>welcome.exe</span><span>○□✕</span></div>
   <div class="name" style="padding:34px 36px;font-size:40px"><div style="color:#fff">JOHN AARON</div><div style="color:#FFD23F">BRANZUELA</div></div></div>
  <div class="role" style="margin-top:26px">&gt; AI, data and full-stack developer</div>
  <div class="lead" style="margin-top:10px">I build AI and data tools people can trust, now building Desk Assist at LGA Telecom.</div>
  <div style="margin-top:22px;display:flex;gap:14px"><span class="btn" style="background:#3A66FF;color:#fff">Download resume</span><span class="btn" style="background:#fff">See projects</span><span class="btn" style="background:transparent">Email me</span></div>
 </div>
 <div style="padding-top:4px"><div class="win" style="background:#fff"><div class="bar"><span>desk_assist.exe</span><span>○□✕</span></div>
   <div style="padding:14px 16px 16px"><div style="font:700 20px 'Plex Sans';font-stretch:85%">How Desk Assist will draft a reply</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#fff;color:#111;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#EFEAE0;color:#000">1</span>Ticket</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#fff;color:#111;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#FFD23F;color:#000">AI</span>Reads the thread</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#fff;color:#111;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#FFD23F;color:#000">AI</span>Finds knowledge-base guidance</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#fff;color:#111;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#FFD23F;color:#000">AI</span>Drafts a reply</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#111;color:#fff;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#fff;color:#000">AGENT</span>Agent reviews</div><div style="display:flex;align-items:center;gap:10px;border:3px solid #000;padding:7px 10px;margin-top:8px;background:#fff;color:#111;font:600 15px Plex Sans"><span style="font:700 12px Plex Mono;border:2px solid #000;padding:1px 5px;background:#EFEAE0;color:#000">6</span>Sent</div></div></div></div>
 <div style="grid-column:1 / -1;margin-top:10px">{proof()}</div>
</div>
<div class="ribbon" style="margin-top:40px">&nbsp; ABOUT ME ✦ AI ✦ DATA ✦ FULL-STACK ✦ ABOUT ME ✦ AI ✦ DATA ✦ FULL-STACK ✦ ABOUT ME ✦ AI ✦ DATA</div>
<div class="label">OPTION 2 MOCKUP · desktop 1366 (hero as live after PR #7)</div></body></html>'''
mob = f'''<!doctype html><html><head><meta charset="utf-8"><style>{CSS}body{{width:375px;height:1180px}}
.row{{flex-wrap:wrap;gap:10px}} .fig{{min-width:0;font-size:20px}} .txt{{flex-basis:100%;font-size:16px}}</style></head><body>
<div style="padding:28px 16px 0">
 <div class="win"><div class="bar"><span>welcome.exe</span><span>○□✕</span></div>
  <div class="name" style="padding:22px 18px;font-size:22px"><div style="color:#fff">JOHN AARON</div><div style="color:#FFD23F">BRANZUELA</div></div></div>
 <div class="role" style="margin-top:22px;font-size:15px">&gt; AI, data and full-stack developer</div>
 <div class="lead" style="margin-top:8px;font-size:18px">I build AI and data tools people can trust, now building Desk Assist at LGA Telecom.</div>
 <div style="margin-top:18px;display:grid;gap:12px"><span class="btn" style="background:#3A66FF;color:#fff;text-align:center">Download resume</span><span class="btn" style="background:#fff;text-align:center">See projects</span></div>
 <div style="margin-top:26px">{proof(compact=True)}</div>
</div>
<div class="ribbon" style="margin-top:30px">&nbsp; ABOUT ME ✦ AI ✦ DATA ✦ FULL-STACK</div>
<div class="label">OPTION 2 · phone 375</div></body></html>'''
(Path(__file__).parent/'desktop.html').write_text(desk); (Path(__file__).parent/'mobile.html').write_text(mob); print('ok')
