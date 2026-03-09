# create-nextdi-bun-app

🚀 A powerful and convenient CLI tool to scaffold your Next.js projects rapidly using **Bun**, Tailwind CSS, and standard configurations from the **Di Huynh Starter**.

## 🌟 Key Features
- 📦 Automatically fetches the latest `nextjs16-starter` template from GitHub.
- ⚡️ Lightning-fast dependency installation powered by **Bun**.
- 🧹 Automatically cleans up the old Git history (`.git`), providing a fresh start for your new project.
- 🎨 Initializes with an optimized source code structure adhering to Best Practices.

## 💻 System Requirements
To use this CLI, you must have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+ recommended).
- [Bun](https://bun.sh/) (Required, as the CLI strictly prioritizes Bun as the package manager).
- `git` installed and added to your system's environment variables.

## 🚀 Usage

The fastest way to scaffold your project is by using `bunx` directly, without needing any prior configurations:

```bash
bunx create-nextdi-bun-app <project-name>
```

Or using `npx` if preferred:

```bash
npx create-nextdi-bun-app <project-name>
```

**Real-world Example:**
```bash
bunx create-nextdi-bun-app my-portfolio
```

## 🛠️ How it Works Under the Hood
When you execute the CLI, it sequentially performs the following steps:
1. Validates the directory path and ensures the `<project-name>` folder does not already exist.
2. Clones the template repository from [di-huynh-dev/nextjs16-starter](https://github.com/di-huynh-dev/nextjs16-starter.git).
3. Deletes the cloned `.git` folder to prevent history conflicts with your future repository.
4. Executes `bun install` to download and install all required NPM Packages natively with Bun.

## 🎯 Next Steps

1. Navigate into your newly created project directory:
   ```bash
   cd <project-name>
   ```

2. Duplicate the environment variables configuration file (if applicable in the template):
   ```bash
   cp .env.example .env.local
   ```
   *(Don't forget to fill in the necessary API Keys).*

3. Start your local development server:
   ```bash
   bun run dev
   ```

## 👨‍💻 Author
- Designed & Developed by: **Di(Steven) Huynh**
- [GitHub Profile](https://github.com/di-huynh-dev)

## 📄 License
This CLI source is licensed under the MIT License. You are free to reference, modify, and upgrade the source code to suit your personal needs!
# create-nextdi-bun-app
