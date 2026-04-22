# John Aaron Branzuela — Portfolio

Personal portfolio site built with an 8-bit Industrial Retro-Futurism aesthetic.

**Live:** https://portfolio-site-lh1v.vercel.app

## Stack

- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Routing:** wouter
- **Server:** Express (static file serving only)
- **Deployment:** Vercel

## Project Structure

```
client/       # React SPA
server/       # Express static server
shared/       # Shared constants
attached_assets/  # Images used across project detail pages
```

## Running locally

```bash
pnpm install
pnpm dev       # http://localhost:3000
```

```bash
pnpm build     # Production build → dist/
pnpm start     # Serve production build
pnpm check     # TypeScript type check
```

## Projects featured

- **SilverLink SG** — Cloud-native intergenerational platform (gRPC, Kubernetes, WebRTC)
- **UAT Testing Dashboard** — Full-stack defect tracker for hospital appointment system UAT
- **AI Finance Insights Engine** — Automated ETL + NLP pipeline with Power BI dashboard
- **SCS Awareness Platform** — Multilingual visual-novel deployed at real outreach booths
- **Fire Safety Drill Companion** — Offline Android AR evacuation app (ARCore, TFLite)
- **UWB Indoor Localization** — SVM-RBF classifier on 42k UWB samples (89.61% accuracy)
- **GreenLoopFarms** — SGD $10k NYP JumpStart grant-winning hydroponic farm concept
