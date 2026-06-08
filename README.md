# 🔐 POT - Password Manager

> ✨ A beautiful, secure, and private password manager that lives entirely in your browser

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://pot.treegex.ir)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06b6d4)](https://tailwindcss.com)

**Live Demo:** [pot.treegex.ir](https://pot.treegex.ir)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-key-features)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Security Model](#-security-model)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**POT** is a modern, elegant password manager that puts your privacy first. Unlike cloud-based solutions that store your
sensitive data on external servers, POT keeps everything local on your device. Your secrets never leave your browser. No
servers. No tracking. No compromise.

**Live Demo:** [pot.treegex.ir](https://pot.treegex.ir)

### Why POT?

| Problem                           | POT Solution                    |
|-----------------------------------|---------------------------------|
| Cloud services can be hacked      | ✅ 100% local storage            |
| Companies track your data         | ✅ Zero analytics, zero tracking |
| Need internet to access passwords | ✅ Works completely offline      |
| Complicated setup and accounts    | ✅ No signup, no account needed  |
| Monthly subscription fees         | ✅ Completely free, forever      |

Perfect for:

- 🔒 **Privacy-conscious individuals** who want full control
- 👨‍👩‍👧‍👦 **Families** sharing credentials securely
- 💼 **Freelancers** managing client access
- 🏢 **Small teams** needing a simple solution
- ✈️ **Frequent travelers** without reliable internet

---

## ✨ Key Features

### Core Functionality

| Feature                      | Description                                                                     |
|------------------------------|---------------------------------------------------------------------------------|
| 🔐 **100% Local Storage**    | Your data never leaves your device - no servers, no cloud, no internet required |
| 🎲 **Password Generator**    | Create cryptographically strong passwords with customizable options             |
| 🏷️ **Smart Categories**     | Custom categories with color coding for visual organization                     |
| 🔍 **Instant Search**        | Real-time search across titles, usernames, and categories                       |
| 🔄 **Multiple Sort Options** | Sort by date (newest first), title (A-Z), or category                           |

### User Experience

| Feature                  | Description                                                      |
|--------------------------|------------------------------------------------------------------|
| 🎨 **Beautiful UI**      | Modern glass-morphism design with smooth animations              |
| 🌙 **Dark/Light Mode**   | Toggle between themes with automatic system preference detection |
| 🌍 **Bilingual Support** | English & Persian (Farsi) with full RTL layout                   |
| 📱 **Fully Responsive**  | Works perfectly on desktop, tablet, and mobile devices           |
| ⚡ **Fast Performance**   | Optimized rendering with React 19 and Vite                       |

### Data Management

| Feature                  | Description                                              |
|--------------------------|----------------------------------------------------------|
| 📦 **Import/Export**     | JSON backup & restore for complete data control          |
| 💾 **IndexedDB Storage** | Persistent local database that survives browser restarts |
| 🔄 **Real-time Sync**    | All changes reflected immediately across the UI          |

---

## 🚀 Quick Start

### Option 1: Online Access (Recommended)

Simply visit: **[https://pot.treegex.ir](https://pot.treegex.ir)**

No installation. No account. No signup. Just open and use.

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/treegex/pot.git
cd pot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> The app runs on `http://localhost:3000`

### System Requirements

- **Modern browser** (Chrome, Firefox, Safari, Edge)
- **JavaScript enabled**
- **IndexedDB support** (all modern browsers)
- No internet connection required after initial load

---

## 📖 Usage Guide

### Getting Started in 3 Steps

**Step 1:** Open POT in your browser
**Step 2:** Click "Add Entry" button
**Step 3:** Fill in your credential details and save

That's it! Your data is now securely stored in your browser.

### Managing Your Vault

#### ➕ Adding a New Entry

| Field            | Description                                            | Required |
|------------------|--------------------------------------------------------|----------|
| 📝 **Title**     | Service name (e.g., "Google Account", "WiFi Password") | ✅ Yes    |
| 👤 **Username**  | Email, username, or identifier                         | ✅ Yes    |
| 🔑 **Password**  | The secret value you want to store                     | No       |
| 📋 **Note**      | Additional info (2FA codes, security questions)        | No       |
| 🏷️ **Category** | Organize your entries (Work, Personal, Custom)         | No       |

#### 🔍 Searching & Filtering

- **Search Bar:** Find entries by title, username, or category - results appear instantly
- **Category Filters:** Click category buttons to see only specific groups
- **Sort Options:** Choose between Newest, A-Z, or Category sorting

#### 🎨 Creating Custom Categories

1. Select **"Custom..."** from the category dropdown
2. Enter your **category name** (e.g., "Banking", "Shopping")
3. Pick a **color** from the palette or use the color picker
4. All entries with this category will share the color for visual grouping

#### 📦 Backup & Restore

**To Backup (Export):**

```
Click "Export Data" → File downloads as pot_export.json → Save somewhere safe
```

**To Restore (Import):**

```
Click "Import Data" → Select your JSON backup → All entries restored instantly
```

> 💡 **Pro Tip:** Export your vault weekly and store backups in multiple safe locations. Since data is local-only,
> backups are your only recovery method!

### Password Generator

Click **"Generate Strong Password"** to access the generator:

| Setting          | Options                     | Default |
|------------------|-----------------------------|---------|
| 📏 **Length**    | 6 to 64 characters (slider) | 16      |
| 🔢 **Numbers**   | Include 0-9 digits          | ✅ On    |
| ✨ **Symbols**    | Include !@#$%^&*()_+ etc.   | ✅ On    |
| 🔠 **Uppercase** | Include A-Z letters         | ✅ On    |
| 🔡 **Lowercase** | Include a-z letters         | ✅ On    |

The generator creates random passwords using `Math.random` - suitable for client-side generation of strong passwords.

---

## 🎨 UI Features

### Dark/Light Mode

- Toggle between themes with the **moon/sun icon** in the navbar
- Respects system preferences on first load (uses `prefers-color-scheme`)
- Smooth color transitions throughout the UI
- Persistent preference saved in `localStorage`

### RTL Support (Persian)

- Full Persian language translation of all UI text
- Right-to-left layout automatically enabled when Farsi is selected
- Special font optimization for Persian text (IRANSans)
- Proper directional handling for all UI components

### Animations & Effects

- **Glass-morphism design:** Frosted glass effects with backdrop blur
- **Framer Motion animations:** Smooth entrance and exit animations
- **Hover effects:** Subtle scaling and color transitions
- **Modal popups:** Animated modals for forms and confirmations

### Responsive Design

| Device      | Layout                                 |
|-------------|----------------------------------------|
| **Desktop** | 3-column grid, full sidebar            |
| **Tablet**  | 2-column grid, compact controls        |
| **Mobile**  | 1-column grid, touch-optimized buttons |

---

## 🛠️ Technology Stack

### Frontend

| Technology        | Version | Purpose                                                |
|-------------------|---------|--------------------------------------------------------|
| **React**         | 19.0    | UI framework with modern hooks and concurrent features |
| **TypeScript**    | 5.8     | Full type safety and better developer experience       |
| **Vite**          | 6.2     | Fast build tool and development server                 |
| **Tailwind CSS**  | 4.1     | Utility-first styling with dark mode support           |
| **Framer Motion** | 12.23   | Production-ready animation library                     |
| **Lucide React**  | 0.546   | Beautiful, consistent icon set                         |

### Storage

| Technology    | Version | Purpose                           |
|---------------|---------|-----------------------------------|
| **idb**       | 8.0     | Promise-based IndexedDB wrapper   |
| **IndexedDB** | Native  | Browser's built-in NoSQL database |

### Utilities

| Technology         | Version | Purpose                            |
|--------------------|---------|------------------------------------|
| **clsx**           | 2.1     | Conditional className merging      |
| **tailwind-merge** | 3.5     | Tailwind class conflict resolution |

---

## 📁 Project Structure

```
pot/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Navigation, theme toggle, language selector
│   │   │   └── Footer.tsx          # Simple footer with attribution
│   │   ├── landing/
│   │   │   └── Hero.tsx            # Landing page, feature cards, FAQ accordion
│   │   ├── dashboard/
│   │   │   ├── PasswordCard.tsx    # Individual entry card with copy/show/delete
│   │   │   └── PasswordForm.tsx    # Add/Edit form with password generator
│   │   └── ui/
│   │       └── Shared.tsx          # Reusable: Modal, Button, Input, Select, Checkbox
│   ├── context/
│   │   └── AppContext.tsx          # Global state, CRUD operations, i18n
│   ├── types.ts                    # TypeScript interfaces and translations
│   ├── db.ts                       # IndexedDB wrapper class
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles, Tailwind, fonts
├── public/
│   └── fonts/                      # IRANSax font files for Persian
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Component Breakdown

| Component        | Responsibility                                               |
|------------------|--------------------------------------------------------------|
| **App**          | Main orchestrator, route management (landing/dashboard)      |
| **Navbar**       | Theme/language toggles, navigation                           |
| **Hero**         | Landing page marketing, feature showcase, FAQ                |
| **PasswordCard** | Display single entry, copy to clipboard, show/hide password  |
| **PasswordForm** | Create/edit entries, password generator, category management |
| **Modal**        | Reusable modal dialog with animations                        |
| **AppContext**   | Global state, IndexedDB operations, localization             |

---

## 🔒 Security Model

### What POT Does NOT Do

| Item                            | Status  |
|---------------------------------|---------|
| Send data to any server         | ❌ Never |
| Track your activity or usage    | ❌ Never |
| Require an account or email     | ❌ Never |
| Store anything in the cloud     | ❌ Never |
| Have any access to your secrets | ❌ Never |
| Use cookies or analytics        | ❌ Never |
| Collect usage statistics        | ❌ Never |

### What POT Does Do

| Item                                   | Status |
|----------------------------------------|--------|
| Store data in your browser's IndexedDB | ✅ Yes  |
| Allow full export/import control       | ✅ Yes  |
| Work completely offline                | ✅ Yes  |
| Give you 100% ownership of your data   | ✅ Yes  |
| Use your device's native crypto APIs   | ✅ Yes  |
| Persist data between browser sessions  | ✅ Yes  |

### Important Security Notes

> ⚠️ **Data Persistence Warning:** Since data is stored locally in your browser's IndexedDB, clearing your browser's "
> Site Data", "Cache", or "Storage" will permanently delete your vault. **Always keep JSON backups!** POT cannot recover
> your data if it's deleted from your browser.

> 🔐 **Encryption Note:** Current version stores data in plain text within IndexedDB (just like your browser stores other
> website data). Future versions will add client-side AES-256-GCM encryption for an additional layer of security.

### Privacy Guarantee

**Zero telemetry. Zero tracking. Zero data collection.**

POT does not contain:

- Analytics scripts (Google Analytics, etc.)
- Tracking pixels
- Crash reporting (unless you enable it in dev tools)
- External API calls (except loading fonts)
- Any code that sends data to external servers

---

## 🌐 Localization

### Supported Languages

| Language        | Code | RTL | Translation Coverage | Status     |
|-----------------|------|-----|----------------------|------------|
| English         | `en` | ✅   | 100%                 | ✅ Complete |
| Persian (Farsi) | `fa` | ✅   | 100%                 | ✅ Complete |

### Translation Structure

```typescript
translations = {
    en: {
        appName: "Pot",
        heroTitle: "Organize Your Digital Life",
        addPassword: "Add Entry",
        // ... 50+ strings
    },
    fa: {
        appName: "پات",
        heroTitle: "سازماندهی دنیای دیجیتال شما",
        addPassword: "افزودن مورد",
        // ... 50+ strings
    }
}
```

### Adding a New Language

1. Add language code to `Language` type in `types.ts`
2. Add full translation object to the `translations` record
3. Add language option button to `Navbar` component
4. Update RTL detection logic if needed

---

## 📡 FAQ

### General Questions

| Question                  | Answer                                                                           |
|---------------------------|----------------------------------------------------------------------------------|
| **Is it really free?**    | Yes, POT is completely free. No hidden costs, no premium tiers, no subscription. |
| **Do I need an account?** | No accounts, no signups, no emails. Just open and use.                           |
| **Can I use it offline?** | Yes! POT works entirely offline once loaded. No internet connection needed.      |
| **Is my data backed up?** | Only if you export it manually. Always keep JSON backups!                        |

### Technical Questions

| Question                                   | Answer                                                                        |
|--------------------------------------------|-------------------------------------------------------------------------------|
| **Where is my data stored?**               | IndexedDB in your browser. Same place your browser stores other website data. |
| **What happens if I clear browser cache?** | Your data will be deleted. This is why backups are essential.                 |
| **Is my data encrypted?**                  | Currently stored as plain text in IndexedDB. Encryption coming in v1.1.       |
| **Can I sync across devices?**             | Not automatically. Use Export/Import to manually transfer data.               |

### Troubleshooting

| Question                     | Answer                                                      |
|------------------------------|-------------------------------------------------------------|
| **My data disappeared!**     | Did you clear browser cache? Restore from your JSON backup. |
| **Import isn't working**     | Ensure file is a valid JSON array exported from POT.        |
| **Dark mode isn't working**  | Check system preferences or toggle manually.                |
| **Persian text looks wrong** | Make sure IRANSax fonts are properly loaded.                |

---

## 🚀 Roadmap

### Version 1.1 (Planned - Q2 2026)

| Feature                                             | Status      |
|-----------------------------------------------------|-------------|
| 🔐 AES-256-GCM encryption for stored data           | Planned     |
| 🧩 Browser extension for auto-fill (Chrome/Firefox) | Planned     |
| 🔑 TOTP 2FA code generator                          | Planned     |
| 📊 Password strength analyzer                       | Planned     |
| 🔄 Optional cloud sync (opt-in only)                | Researching |

### Version 1.2 (Future)

| Feature                                  | Status  |
|------------------------------------------|---------|
| 🖼️ File attachments (images, documents) | Planned |
| 👥 Encrypted sharing between users       | Planned |
| ⏰ Expiration reminders for passwords     | Planned |
| 📱 PWA support for installable app       | Planned |
| 🎨 Custom themes                         | Planned |
| 🔍 Breach detection (haveibeenpwned API) | Planned |

### Version 2.0 (Long-term)

| Feature                             | Status      |
|-------------------------------------|-------------|
| Desktop apps (Electron/Tauri)       | Researching |
| CLI tool for devs                   | Planned     |
| Self-hosted server option           | Researching |
| Biometric authentication (WebAuthn) | Planned     |

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/pot.git
cd pot

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run lint
```

### How to Contribute

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing`)
5. 🎉 Open a Pull Request

### Contribution Guidelines

- Follow existing code style and TypeScript patterns
- Add appropriate tests if applicable
- Update documentation for user-facing changes
- Ensure type checking passes (`npm run lint`)
- Test on multiple browsers if possible

### Areas Needing Help

- 🧪 Writing unit tests
- 🌐 Adding more language translations
- 🐛 Bug fixes and edge cases
- 📱 Mobile-specific improvements
- 🎨 Accessibility enhancements

---

## 📄 License

**MIT License** - Full text below

```
MIT License

Copyright (c) 2026 Ali Azmoodeh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Free for personal and commercial use. No attribution required (though appreciated).

---

## 👨‍💻 Author

| Name              | Role           | Contact                                               |
|-------------------|----------------|-------------------------------------------------------|
| **Ali Azmoodeh**  | Lead Developer | [treeroot.ir@gmail.com](mailto:treeroot.ir@gmail.com) |
| **Google Stitch** | UI/UX Design   | -                                                     |

---

## 🙏 Acknowledgments

- **Lucide** for the beautiful open-source icons
- **Vazirmatn** for the Persian font
- **React team** for the amazing framework
- **Tailwind CSS team** for the utility-first CSS
- **All contributors** who help improve POT

---

## 📞 Support & Links

| Resource             | Link                                                            |
|----------------------|-----------------------------------------------------------------|
| 🌐 **Live Demo**     | [pot.treegex.ir](https://pot.treegex.ir)                        |
| 📧 **Email Support** | treeroot.ir@gmail.com                                           |
| 🐛 **Issue Tracker** | [GitHub Issues](https://github.com/aliazmoodehvaldi/pot/issues) |

---

<p align="center">
  <img src="https://img.shields.io/badge/🔒-Zero%20Knowledge-blue?style=for-the-badge" alt="Zero Knowledge">
  <img src="https://img.shields.io/badge/💾-100%25%20Local-brightgreen?style=for-the-badge" alt="100% Local">
  <img src="https://img.shields.io/badge/🌍-Bilingual-orange?style=for-the-badge" alt="Bilingual">
  <img src="https://img.shields.io/badge/📱-Responsive-purple?style=for-the-badge" alt="Responsive">
  <img src="https://img.shields.io/badge/🆓-Free%20Forever-red?style=for-the-badge" alt="Free Forever">
</p>

<p align="center">
  <sub>⚡ Your secrets. Your device. Your control. Never compromised. ⚡</sub>
</p>

<p align="center">
  <sub>Made with ☕ and 🔒 by developers who care about privacy</sub>
</p>

---

**Ready to take control of your digital life?** 👉 [Launch POT Now](https://pot.treegex.ir)