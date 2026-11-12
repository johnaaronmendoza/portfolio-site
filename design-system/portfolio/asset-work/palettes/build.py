"""Colour-scheme options rendered on a mock of the real site layout (hero
window, buttons, about window, a project tile, marquee). Same layout and type
for every option, so only the colour changes."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).parent
F = ROOT / 'client/public/fonts/PressStart2P.woff2'
CP = ROOT / 'design-system/portfolio/asset-work/share-and-icons/fonts/CourierPrime-Bold.woff2'
CPR = ROOT / 'design-system/portfolio/asset-work/share-and-icons/fonts/CourierPrime-Regular.woff2'
SHOT = ROOT / 'design-system/portfolio/asset-work/tiles/src/uat-0.png'

P = {
 'a-current': dict(name='A  Navy Arcade (current)', page='#16163F', grid='rgba(244,234,213,.06)', text='#F4EAD5',
     body='#F4EAD5', bodyText='#000000', bar='#6C4AD0', barText='#F4EAD5', hero='#000000',
     n1='#FF7A2F', n2='#2EC4B6', acc='#FF7A2F', accText='#000000', acc2='#2EC4B6', acc2Text='#000000'),
 'b-paper': dict(name='B  Paper & Ink', page='#EFEAE0', grid='rgba(0,0,0,.05)', text='#111111',
     body='#FFFFFF', bodyText='#111111', bar='#111111', barText='#FFFFFF', hero='#111111',
     n1='#FFFFFF', n2='#FFD23F', acc='#2F5BFF', accText='#FFFFFF', acc2='#FFD23F', acc2Text='#111111'),
 'c-win95': dict(name='C  Win95 Desktop', page='#008080', grid='rgba(255,255,255,.07)', text='#FFFFFF',
     body='#C0C0C0', bodyText='#000000', bar='#000080', barText='#FFFFFF', hero='#000000',
     n1='#FFFF55', n2='#55FFFF', acc='#FFD400', accText='#000000', acc2='#FFFFFF', acc2Text='#000000'),
 'd-terminal': dict(name='D  Phosphor Terminal', page='#0B0F0C', grid='rgba(57,255,106,.06)', text='#E9E4D4',
     body='#E9E4D4', bodyText='#0B0F0C', bar='#1D6B35', barText='#FFFFFF', hero='#000000',
     n1='#39FF6A', n2='#FFB000', acc='#39FF6A', accText='#000000', acc2='#FFB000', acc2Text='#000000'),
 'e-riso': dict(name='E  Risograph Print', page='#F4E9D8', grid='rgba(0,0,0,.05)', text='#1A1A1A',
     body='#FFFBF3', bodyText='#1A1A1A', bar='#0078BF', barText='#FFFFFF', hero='#1A1A1A',
     n1='#FF48B0', n2='#FFE800', acc='#FF48B0', accText='#000000', acc2='#FFE800', acc2Text='#000000'),
}

def page(c):
    sw = ''.join(f'<i style="background:{c[k]}"></i>' for k in ('page','body','bar','acc','acc2'))
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:P;src:url("{F.as_uri()}")}}
@font-face{{font-family:C;font-weight:700;src:url("{CP.as_uri()}")}}
@font-face{{font-family:C;font-weight:400;src:url("{CPR.as_uri()}")}}
*{{box-sizing:border-box}}
body{{margin:0;width:1200px;height:760px;overflow:hidden;background:{c['page']};
 background-image:linear-gradient({c['grid']} 1px,transparent 1px),linear-gradient(90deg,{c['grid']} 1px,transparent 1px);background-size:32px 32px;font-family:C;color:{c['text']}}}
.win{{position:absolute;border:3px solid #000;box-shadow:8px 8px 0 #000;background:{c['body']}}}
.bar{{background:{c['bar']};color:{c['barText']};font:12px P;padding:10px 12px;display:flex;justify-content:space-between;border-bottom:3px solid #000}}
.btn{{position:absolute;border:3px solid #000;box-shadow:4px 4px 0 #000;font:700 18px C;padding:12px 20px}}
.mq{{position:absolute;left:0;right:0;top:0;height:48px;background:{c['acc']};color:{c['accText']};border-bottom:3px solid #000;font:13px P;display:flex;align-items:center;gap:28px;padding-left:24px;white-space:nowrap}}
.sw{{position:absolute;right:28px;bottom:24px;display:flex;gap:8px}} .sw i{{width:34px;height:34px;border:3px solid #000;display:block}}
</style></head><body>
<div class="mq">OPEN TO AI &amp; DATA ROLES <span>✦</span> SILVERLINK SG <span>✦</span> SCS AWARENESS PLATFORM <span>✦</span> DESK ASSIST <span>✦</span> OPEN TO AI &amp; DATA ROLES</div>
<div class="win" style="left:40px;top:96px;width:600px">
  <div class="bar"><span>welcome.exe</span><span>○□✕</span></div>
  <div style="background:{c['hero']};padding:36px 32px;font:40px/1.35 P"><div style="color:{c['n1']}">JOHN AARON</div><div style="color:{c['n2']}">BRANZUELA<span style="display:inline-block;width:14px;height:36px;background:{c['n1']};margin-left:8px;vertical-align:-4px"></span></div></div>
</div>
<div style="position:absolute;left:40px;top:380px;width:600px;font:700 20px/1.45 C;color:{c['text']}">&gt; AI, data and full-stack developer<br><span style="font-weight:400">I build AI and data tools people can trust.</span></div>
<div class="btn" style="left:40px;top:470px;background:{c['acc']};color:{c['accText']}">Download resume</div>
<div class="btn" style="left:270px;top:470px;background:{c['acc2']};color:{c['acc2Text']}">See projects</div>
<div class="win" style="left:690px;top:96px;width:470px">
  <div class="bar"><span>about_me.txt</span><span>○□✕</span></div>
  <div style="padding:22px 24px;color:{c['bodyText']};font:400 18px/1.5 C">Computing Science at SIT × Glasgow, graduating April 2027. Intern at LGA Telecom.</div>
</div>
<div class="win" style="left:690px;top:300px;width:470px">
  <div style="height:210px;background:{c['acc2']};border-bottom:3px solid #000;position:relative;overflow:hidden">
    <img src="{SHOT.as_uri()}" style="position:absolute;left:28px;top:26px;width:560px;border:3px solid #000;box-shadow:8px 8px 0 #000"></div>
  <div style="padding:14px 18px;color:{c['bodyText']}"><span style="font:11px P;background:{c['acc']};color:{c['accText']};border:2px solid #000;padding:4px 6px">2024</span>
  <div style="font:15px/1.5 P;margin-top:10px">UAT Testing Dashboard</div></div>
</div>
<div style="position:absolute;left:40px;bottom:26px;font:16px P;color:{c['text']}">{c['name']}</div>
<div class="sw">{sw}</div>
</body></html>'''

for k, c in P.items():
    (HERE / f'{k}.html').write_text(page(c))
print(' '.join(P))
