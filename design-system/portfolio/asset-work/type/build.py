"""Type pairing options on a mock of the site in the Paper & Ink palette.
Same layout and colours for each; only the fonts change. Fonts are the OFL
files from github.com/google/fonts (fetched to /home/claude/ext/gfonts)."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).parent
G = Path('/home/claude/ext/gfonts/ofl')
CP = ROOT / 'design-system/portfolio/asset-work/share-and-icons/fonts'
FACES = {
 'Press Start 2P': [(ROOT/'client/public/fonts/PressStart2P.woff2', '400')],
 'Courier Prime': [(CP/'CourierPrime-Regular.woff2','400'), (CP/'CourierPrime-Bold.woff2','700')],
 'IBM Plex Sans': [(G/'ibmplexsans/IBMPlexSans[wdth,wght].ttf','100 700')],
 'IBM Plex Mono': [(G/'ibmplexmono/IBMPlexMono-Regular.ttf','400'), (G/'ibmplexmono/IBMPlexMono-SemiBold.ttf','600'), (G/'ibmplexmono/IBMPlexMono-Bold.ttf','700')],
 'Space Grotesk': [(G/'spacegrotesk/SpaceGrotesk[wght].ttf','300 700')],
 'Space Mono': [(G/'spacemono/SpaceMono-Regular.ttf','400'), (G/'spacemono/SpaceMono-Bold.ttf','700')],
 'Archivo': [(G/'archivo/Archivo[wdth,wght].ttf','100 900')],
 'Archivo Black': [(G/'archivoblack/ArchivoBlack-Regular.ttf','400')],
}
CSS = ''.join(f'@font-face{{font-family:"{fam}";font-weight:{w};src:url("{p.as_uri()}")}}\n' for fam, fs in FACES.items() for p, w in fs)

# Each role: (family, weight, size px, extra css)
OPTS = {
 't0-current': dict(name='0  Current: Press Start 2P + Courier Prime',
   hero=("Press Start 2P",400,40,''), h2=("Press Start 2P",400,30,''), bar=("Press Start 2P",400,12,''),
   tile=("Press Start 2P",400,15,'line-height:1.6'), body=("Courier Prime",400,18,'line-height:1.55'),
   label=("Courier Prime",700,16,''), stat=("Press Start 2P",400,30,''), btn=("Courier Prime",700,17,'')),
 't1-plex': dict(name='1  Plex Desktop: IBM Plex Sans + Plex Mono (pixel name only)',
   hero=("Press Start 2P",400,40,''), h2=("IBM Plex Sans",700,40,'font-stretch:85%;letter-spacing:-0.01em'), bar=("IBM Plex Mono",600,14,''),
   tile=("IBM Plex Sans",700,22,'font-stretch:85%;line-height:1.2'), body=("IBM Plex Sans",400,18,'line-height:1.6'),
   label=("IBM Plex Mono",600,15,''), stat=("IBM Plex Mono",700,40,'letter-spacing:-0.02em'), btn=("IBM Plex Mono",600,16,'')),
 't2-grotesk': dict(name='2  Grotesk Brutal: Space Grotesk + Space Mono',
   hero=("Press Start 2P",400,40,''), h2=("Space Grotesk",700,42,'letter-spacing:-0.02em'), bar=("Space Mono",700,14,''),
   tile=("Space Grotesk",700,23,'line-height:1.15;letter-spacing:-0.01em'), body=("Space Grotesk",400,18,'line-height:1.6'),
   label=("Space Mono",700,15,''), stat=("Space Grotesk",700,42,'letter-spacing:-0.03em'), btn=("Space Mono",700,16,'')),
 't3-archivo': dict(name='3  Poster: Archivo Black + Archivo + Courier Prime',
   hero=("Press Start 2P",400,40,''), h2=("Archivo Black",400,40,'letter-spacing:-0.01em'), bar=("Courier Prime",700,15,''),
   tile=("Archivo Black",400,21,'line-height:1.15'), body=("Archivo",400,18,'line-height:1.6'),
   label=("Courier Prime",700,16,''), stat=("Archivo Black",400,40,''), btn=("Archivo",700,17,'')),
}
def f(r): fam,w,sz,x = r; return f"font-family:'{fam}';font-weight:{w};font-size:{sz}px;{x}"

def page(o):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{CSS}
*{{box-sizing:border-box}}body{{margin:0;width:1200px;height:820px;overflow:hidden;background:#EFEAE0;color:#111;
 background-image:linear-gradient(rgba(0,0,0,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.05) 1px,transparent 1px);background-size:24px 24px}}
.win{{position:absolute;border:3px solid #000;box-shadow:8px 8px 0 #000;background:#fff}}
.bar{{background:#111;color:#fff;padding:9px 12px;display:flex;justify-content:space-between;border-bottom:3px solid #000;{f(o['bar'])}}}
.btn{{position:absolute;border:3px solid #000;box-shadow:4px 4px 0 #000;padding:11px 18px;{f(o['btn'])}}}
.lab{{{f(o['label'])}}}
</style></head><body>
<div class="win" style="left:40px;top:32px;width:600px"><div class="bar"><span>welcome.exe</span><span>○□✕</span></div>
 <div style="background:#111;padding:30px 30px;line-height:1.35;{f(o['hero'])}"><div style="color:#fff">JOHN AARON</div><div style="color:#FFD23F">BRANZUELA</div></div></div>
<div style="position:absolute;left:40px;top:262px;width:600px">
 <div class="lab" style="color:#2347D6">&gt; AI, data and full-stack developer</div>
 <div style="margin-top:10px;{f(o['body'])}">I build AI and data tools people can trust, now building Desk Assist at LGA Telecom.</div></div>
<div class="btn" style="left:40px;top:396px;background:#3A66FF;color:#fff">Download resume</div>
<div class="btn" style="left:270px;top:396px;background:#FFD23F;color:#000">See projects</div>
<div style="position:absolute;left:40px;top:480px;width:600px;display:flex;gap:3px;background:#000;border:3px solid #000">
 <div style="flex:1;background:#FFD23F;padding:12px 14px"><div style="{f(o['stat'])}">89.61%</div><div class="lab" style="margin-top:6px">UWB model accuracy</div></div>
 <div style="flex:1;background:#FFD23F;padding:12px 14px"><div style="{f(o['stat'])}">1,000+</div><div class="lab" style="margin-top:6px">network configs migrated</div></div></div>
<div style="position:absolute;left:40px;top:640px;display:flex;align-items:center;gap:16px;width:600px">
 <div style="{f(o['h2'])}">ABOUT <span style="color:#2347D6">ME</span></div><div style="flex:1;height:6px;background:#3A66FF"></div></div>
<div class="win" style="left:690px;top:32px;width:470px"><div class="bar"><span>about_me.txt</span><span>○□✕</span></div>
 <div style="padding:20px 22px;{f(o['body'])}">At LGA Telecom I'm building <b style="background:#3A66FF;color:#000;padding:0 .2em">Desk Assist</b>, which drafts ticket replies for an agent to review. I listen first, write clear requirements, then build and test.</div></div>
<div class="win" style="left:690px;top:330px;width:470px">
 <div style="height:170px;background:#FFD23F;border-bottom:3px solid #000"></div>
 <div style="padding:16px 18px"><span class="lab" style="background:#3A66FF;color:#000;border:2px solid #000;padding:3px 7px">2025</span>
 <div style="margin-top:12px;{f(o['tile'])}">UWB Indoor Localization</div>
 <div style="margin-top:8px;{f(o['body'])};font-size:16px">Tells clear UWB signals from blocked ones with an SVM-RBF model.</div>
 <div class="lab" style="margin-top:10px">▸ 89.61% accuracy &nbsp;▸ 0.9612 AUC</div></div></div>
<div style="position:absolute;left:40px;bottom:22px;font:12px 'Press Start 2P';color:#111">{o['name']}</div>
</body></html>'''
for k,o in OPTS.items(): (HERE/f'{k}.html').write_text(page(o))
print(' '.join(OPTS))
