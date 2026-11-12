"""Comic-theme mockup on the Paper & Ink + Plex site. One page showing the
proposed comic elements; nothing here is wired into the site."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
G = Path('/home/claude/ext/gfonts/ofl')
M = ROOT / 'client/public/assets/mascot/poses'
T = ROOT / 'attached_assets'
css = f'''
@font-face{{font-family:Bangers;src:url("{(G/'bangers/Bangers-Regular.ttf').as_uri()}")}}
@font-face{{font-family:"Plex Sans";font-weight:100 700;font-stretch:85% 100%;src:url("{(G/'ibmplexsans/IBMPlexSans[wdth,wght].ttf').as_uri()}")}}
@font-face{{font-family:"Plex Mono";font-weight:600;src:url("{(G/'ibmplexmono/IBMPlexMono-SemiBold.ttf').as_uri()}")}}
@font-face{{font-family:"Plex Mono";font-weight:700;src:url("{(G/'ibmplexmono/IBMPlexMono-Bold.ttf').as_uri()}")}}
@font-face{{font-family:P2P;src:url("{(ROOT/'client/public/fonts/PressStart2P.woff2').as_uri()}")}}
*{{box-sizing:border-box}}
body{{margin:0;width:1200px;height:860px;overflow:hidden;background:#EFEAE0;font-family:"Plex Sans";color:#111;
 background-image:radial-gradient(rgba(0,0,0,.09) 1.2px,transparent 1.4px);background-size:10px 10px}}
.panel{{position:absolute;background:#fff;border:4px solid #000;box-shadow:8px 8px 0 #000}}
.bar{{background:#111;color:#fff;font:600 14px "Plex Mono";padding:8px 12px;display:flex;justify-content:space-between;border-bottom:4px solid #000}}
.cap{{position:absolute;background:#FFD23F;border:3px solid #000;font:22px/1 Bangers;letter-spacing:.04em;padding:8px 12px}}
.bubble{{position:absolute;background:#fff;border:3px solid #000;border-radius:28px;padding:16px 20px;font:600 19px/1.35 "Plex Sans"}}
.bubble:after{{content:"";position:absolute;width:26px;height:26px;background:#fff;border-right:3px solid #000;border-bottom:3px solid #000;left:46px;bottom:-16px;transform:rotate(45deg)}}
.tl:after{{left:auto;right:46px;bottom:auto;top:-16px;transform:rotate(225deg)}}
.label{{position:absolute;left:24px;font:700 13px "Plex Mono";background:#111;color:#fff;padding:4px 8px}}
'''
burst = lambda x,y,s,fill,txt,fs,rot: f'''<div style="position:absolute;left:{x}px;top:{y}px;width:{s}px;height:{s}px;transform:rotate({rot}deg)">
<svg viewBox="0 0 100 100" width="{s}" height="{s}" style="position:absolute;inset:0"><polygon points="{' '.join(f'{50+(48 if i%2==0 else 33)*__import__('math').cos(i*3.14159/12)},{50+(48 if i%2==0 else 33)*__import__('math').sin(i*3.14159/12)}' for i in range(24))}" fill="{fill}" stroke="#000" stroke-width="3" stroke-linejoin="miter"/></svg>
<div style="position:absolute;inset:0;display:grid;place-items:center;font:{fs}px/1 Bangers;letter-spacing:.03em;text-align:center">{txt}</div></div>'''
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>
<!-- Hero as the opening panel -->
<div class="panel" style="left:36px;top:40px;width:640px;height:400px;overflow:hidden">
 <div class="bar"><span>issue_01.exe</span><span>○□✕</span></div>
 <div style="position:absolute;inset:40px 0 0 0;background:#111"></div>
 <div class="cap" style="left:18px;top:58px">MEANWHILE, IN SINGAPORE...</div>
 <div style="position:absolute;left:28px;top:130px;font:38px/1.35 P2P"><div style="color:#fff">JOHN AARON</div><div style="color:#FFD23F">BRANZUELA</div></div>
 <img src="{(M/'point-right.png').as_uri()}" style="position:absolute;right:16px;bottom:-6px;height:200px;image-rendering:pixelated">
 <div style="position:absolute;left:28px;bottom:26px;font:700 16px 'Plex Mono';color:#FFD23F">&gt; AI, data and full-stack developer</div>
</div>
<div class="bubble tl" style="left:330px;top:466px;width:330px">I build AI and data tools people can trust.</div>
<style>.b1:after{{left:250px;top:-16px;transform:rotate(225deg)}}</style>
<div class="bubble b1" style="display:none"></div>
<!-- Stat with a POW burst -->
{burst(40,470,230,'#FFD23F','89.61%!',46,-6)}
<div style="position:absolute;left:62px;top:700px;font:700 14px 'Plex Mono';background:#fff;border:3px solid #000;padding:5px 9px">UWB model accuracy</div>
<!-- Section title in comic lettering -->
<div style="position:absolute;left:330px;top:600px;font:76px/1 Bangers;letter-spacing:.03em;color:#111;text-shadow:5px 5px 0 #3A66FF">PROJECTS</div>
<div style="position:absolute;left:330px;top:690px;width:330px;font:400 16px/1.5 'Plex Sans'">Reading text stays in Plex Sans: comic lettering only for short shouts.</div>
<!-- Project tile as a comic panel -->
<div class="panel" style="left:716px;top:40px;width:448px;height:470px">
 <div style="position:relative;height:250px;border-bottom:4px solid #000;overflow:hidden;background:#FFD23F">
  <img src="{(T/'tile_silverlink.webp').as_uri()}" style="width:100%;height:100%;object-fit:cover">
  <div class="cap" style="left:12px;top:12px;font-size:18px">ISSUE #01 · 2025</div>
  {burst(310,130,130,'#3A66FF','<span style="color:#fff">BOOKED!</span>',26,8)}
 </div>
 <div style="padding:16px 18px">
  <div style="font:700 condensed 30px/1.1 'Plex Sans'">SilverLink SG</div>
  <div style="margin-top:8px;font:400 16px/1.5 'Plex Sans'">Seniors and youth trade skills and book live events, built to block double-bookings.</div>
  <div style="margin-top:12px;font:700 14px 'Plex Mono'">▸ 4 gRPC services &nbsp;▸ 8-node cluster</div>
 </div>
</div>
<!-- Mascot narrating the chat -->
<div class="bubble" style="left:780px;top:560px;width:280px;font-size:17px">Psst! Want the 30-second tour? Ask me.</div>
<img src="{(M/'happy.png').as_uri()}" style="position:absolute;left:1070px;top:600px;height:150px;image-rendering:pixelated">
<div class="label" style="left:716px;top:800px">COMIC MOCKUP: Paper &amp; Ink + Plex + Bangers lettering</div>
</body></html>'''
(Path(__file__).parent / 'comic.html').write_text(html)
print('ok')
