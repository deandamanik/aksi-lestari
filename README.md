<p align="center">
  <img src="./public/logo-aksilestari.svg" alt="AksiLestari logo" width="90" />
</p>

<h1 align="center">AksiLestari</h1>

<p align="center">
  A React-based web application for community participation in waste management across Indonesia.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-087ea4?style=flat&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=flat&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/MapLibre_GL-JS-396cb2?style=flat&logo=maplibre&logoColor=white" alt="MapLibre GL" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Implementation Notes](#implementation-notes)

---

## Overview

AksiLestari provides a structured flow for users to document, identify, and act on waste they encounter - either by submitting a report for local authorities or by handling it independently with guided steps. It includes an educational hub (AksiPedia) with modules and quizzes, an interactive map showing waste report locations and nearby waste banks, community cleanup activities with a volunteer leaderboard, and a personal profile workspace for tracking contributions and appreciation balance.

The entire application runs client-side. There is no backend server or database - all datasets are served from local JavaScript modules. Authentication uses a single demo account persisted via `localStorage`, and balance redemption state is maintained in `sessionStorage` for the browser session.

---

## Features

- **Lapor Sampah** - Multi-step reporting with photo upload, location selection, waste identification, and follow-up actions
- **Aksi Mandiri** - Guided self-handling flow with before/after documentation and validation tracking
- **AksiPedia** - Waste education modules, quizzes, and simulated material scanning
- **Peta Sampah** - Interactive map with waste reports, waste banks, heatmap layer, search, and geolocation
- **Komunitas** - Community cleanup activities and volunteer leaderboard
- **Profil** - XP progression, missions, contribution history, settings, and simulated appreciation balance redemption

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Mapping | MapLibre GL JS |
| Map Services | MapTiler Cloud, OpenStreetMap Nominatim |
| Motion | Lenis |
| Fonts | Quicksand, Quando (via `@fontsource`) |
| Icons | Custom inline SVG components |

---

## Architecture

AksiLestari is a client-side single-page application. React Router handles all navigation, and a Vercel rewrite rule (`vercel.json`) ensures deep links resolve correctly in production.

Application state is managed through three React Context providers:

- `AuthContext` - Demo user session with `localStorage` persistence
- `LaporContext` - In-memory report data accumulated across the multi-step Lapor flow
- `ToastContext` - Application-wide notification system

All domain data (waste reports, bank sampah locations, education modules, community events, leaderboard entries, missions, contribution history, and saldo records) is defined in local JavaScript modules under `src/data/`. The only external network requests are to MapTiler for map tiles and to OpenStreetMap Nominatim for reverse geocoding.

---

## Project Structure

```text
src/
├── assets/            # Static assets imported by components
├── components/
│   ├── common/        # AuthGate, Button, Icons, Modal, ScrollToTop
│   └── layout/        # Navbar, Footer
├── context/           # AuthContext, LaporContext, ToastContext
├── data/              # Local datasets organized by feature domain
│   ├── aksipedia/     # Modules, quiz content, scan result, waste banks
│   ├── beranda/       # Homepage section data
│   ├── komunitas/     # Community events, leaderboard
│   ├── lapor/         # Identification data, action options, guidance
│   ├── peta-sampah/   # Waste report coordinates, bank sampah locations
│   └── profil/        # User profile, missions, saldo, contribution history
├── hooks/             # useLenisScroll, useAuth, useToast, useInView, useObjectURL
├── layouts/           # MainLayout (Navbar+Footer), LaporLayout (report flow shell)
├── pages/             # Route-level page components by feature
│   ├── aksipedia/
│   ├── auth/
│   ├── beranda/
│   ├── komunitas/
│   ├── lapor/
│   ├── peta-sampah/
│   └── profil/
├── routes/            # AppRoutes.jsx - centralized route definitions
├── styles/            # (reserved)
└── utils/             # Formatters, map utilities, scroll math, auth redirect
```

---

## Getting Started

### Prerequisites

- Node.js
- npm
- A MapTiler API key (free tier available at [maptiler.com](https://www.maptiler.com/))

### Installation

```bash
git clone https://github.com/deandamanik/aksi-lestari.git
cd aksi-lestari
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_MAPTILER_KEY=your_maptiler_api_key
```

`VITE_MAPTILER_KEY` is used by MapLibre GL to load vector basemap tiles for the Peta Sampah map and the location picker in the Lapor flow.

### Development

```bash
npm run dev
```

Open the URL printed by Vite in the terminal.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

---

## Implementation Notes

The current implementation focuses on demonstrating the complete frontend product flow. Several domain operations are simulated locally rather than backed by production services:

- **Authentication** is a client-side demo session. Login and registration both activate the same hardcoded demo user with no credential validation or multi-user support.
- **Waste identification** (the scan feature in AksiPedia) returns a fixed PET plastic bottle result regardless of the uploaded image. It is a UI simulation, not model inference.
- **Map datasets** (waste reports, bank sampah locations) are static JavaScript modules, not fetched from an external API or database.
- **Saldo Apresiasi** and the redemption flow to e-wallets and vouchers are entirely simulated in the browser. No real monetary transactions occur.
- **Leaderboard, community events, missions, and contribution history** are sourced from local mock data.
- **XP and Saldo are separate systems.** XP tracks volunteer level progression and cannot be converted to currency. Saldo Apresiasi is a monetary value in Rupiah, managed independently.
