# MADslides (DDN Slide Builder)

**AI-powered slide creation with a curated library, tokenized design system, and flexible publishing.**

MADslides is a powerful, React-based tool designed to leverage AI (like Claude or Antigravity) to create beautiful, consistent slides. It combines a solid grid system with a tokenized design engine, enabling "bento-like" displays where slides serve as canvases for components and content cards.

## 🌟 Vision

To create a workflow where you can start from a template or scratch, describe your needs to an AI, and get impeccable, design-system-compliant slides instantly.

## 🚀 Workflow

1.  **Ignite**: Open AI on this folder. All installs run automatically.
2.  **Browse the Library**: Pick curated examples that fit your story.
3.  **Speak with AI**: Describe modifications in natural language. The AI uses the tokenized design system to ensure consistency.
4.  **Expand the Library**: Create new layouts and diagrams, adding them to the library for future use.
5.  **Publish**: Deploy as a web app with presentation and scroll modes.

## 🎨 Design Principles

- **Tokenized Everything**: Colors, spacing, typography, and motion are defined as tokens. No hardcoded values.
- **Apple Rigor**: Impeccable layouts, precise spacing, and intentional pixel-perfect design.
- **Desktop First, Mobile Ready**: 16:9 slides that adapt beautifully to mobile scroll modes.
- **Library as Foundation**: The library is the source of truth, constantly enriched by new creations.

## 🛠 Tech Stack

- **Framework**: React 18, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS (Tokenized)
- **State/Routing**: React Router DOM
- **Components**: PrimeReact, Lucide React, Radix UI
- **Animations**: Framer Motion
- **Validation**: Zod
- **Charts**: Recharts

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18+
- **npm**: v9+

### Quick Start

We provide a setup script to handle dependencies and permissions:

```bash
./setup.sh
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to access the builder.

### Verification

Before pushing any code, run the verification script to ensure build integrity:

```bash
./verify.sh
```

## 📂 Project Structure

- `src/shared`: Unified design tokens & system.
- `src/slides`: Library of reusable slide components.
- `src/builder`: UI for browsing slides and building decks.
- `src/decks`: Content and logic for specific presentations (e.g., Strategy, Exascaler).
- `src/data`: Slide registry & metadata.

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
