# HireLink Frontend (React + Vite)

This project is the frontend for **HireLink**, built using **React** and **Vite** with a focus on clean UI and scalable structure.

It uses modern tooling for fast development, hot module replacement, and consistent code quality.

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript**
- **Tailwind CSS**
- **Biome** (for code formatting, linting, and import organization)

---

## Development

### Install dependencies
```bash
npm install

#### Run the development server
```bash
npm run dev

##### Code Quality & Formatting:

This project uses Biome as a single tool for:
- Code formatting
- Linting
- Organizing imports

###### Useful commands
```bash
npm run check
npm run check:write

---
######## Notes:
ESLint and Prettier have been fully removed in favor of Biome.

The Admin section UI (Login & Dashboard) is implemented before backend integration.

Backend integration for Talent and Employer roles will be added incrementally.

Build
```bash
npm run build

Preview production build
```bash
npm run preview