# GreenGit 🌿

![GreenGit Interface](/public/og-image.png)

**GreenGit** (formerly GitCanvas) is an open-source visual planning tool that helps you design your dream GitHub contribution graph. Paint your commits, visualize streaks, and automatically generate a shell script to make your plan a reality.

> **Live Demo**: [greengit.xyz](https://greengit.xyz)

## 🚀 Features

- **Visual Grid Editor**: Click and drag to paint commit levels.
- **Profile Simulator**: Preview how your graph looks with a mock GitHub profile header.
- **Templates**: Quickly start with "Checkerboard" or "Random" patterns.
- **Live Stats**: See your total commits and longest streak in real-time.
- **Persistence**: Your work is automatically saved to your browser's local storage.
- **Export to Script**: Generate a `plan.sh` script to execute your plan.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS Modules (Zero runtime overhead)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Getting Started

We welcome contributions! Here's how to get the project running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/greengit.git
   cd greengit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📂 Project Structure

```bash
src/
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Main application entry point
│   └── globals.css     # Global styles and CSS variables
├── components/
│   ├── GraphContainer.tsx  # The main contribution grid logic
│   ├── Controls.tsx        # Toolbar for eraser/unlock/numbers
│   ├── ProfileHeader.tsx   # Editable profile simulator
│   └── MarketingSection.tsx # "How it Works" section
└── hooks/
    └── useContributionGrid.ts # Custom hook managing grid state & persistence
```

## 🤝 Contributing

We'd love your help to make GreenGit better!

### Good First Issues
- **Themes**: Add a theme switcher (e.g., Halloween, Dracular).
- **Mobile UI**: Improve the toolbar layout on very small screens.
- **Share**: Add a "Share to Twitter" button.

### Pull Request Flow
1. Fork the repo.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📝 Script Usage (For Users)

1. Design your graph in the app.
2. Click **"Script"** to download `plan.sh`.
3. Create a **new private repository** on GitHub.
4. Run the script in that repo:
   ```bash
   chmod +x plan.sh
   ./plan.sh
   ```
5. Push the changes to GitHub.

## ⚠️ Disclaimer

This tool allows backdating commits. While a standard Git feature, use it responsibly for planning, art, or educational purposes. Do not use it to misrepresent work history.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
