# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Brainly FE 2

## Folder Structure

```
brainly-fe-2-main/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── default.png
│   │   ├── Medium.png
│   │   ├── react.svg
│   │   ├── Reddit.png
│   │   ├── X.png
│   │   ├── Youtube.png
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CreateContentModal.tsx
│   │   ├── DottedButton.tsx
│   │   ├── Input.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   ├── hooks/
│   │   └── useContent.tsx
│   ├── icons/
│   │   ├── CrossIcon.tsx
│   │   ├── Logo.tsx
│   │   ├── Medium.tsx
│   │   ├── PlusIcon.tsx
│   │   ├── Reddit.tsx
│   │   ├── ShareIcon.tsx
│   │   ├── TwitterIcon.tsx
│   │   ├── YoutubeIcon.tsx
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   ├── Signin.tsx
│   │   ├── Signup.tsx
│   │   ├── ShareDbrain.tsx
│   ├── config.ts
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── App.tsx
│   └── Talib/
│       └── README.md
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── README.md
```

## Description
- This project is a React frontend for Brainly FE 2, using TypeScript, Tailwind CSS, and Vite.
- Main features include content dashboard, authentication (signin/signup), content sharing, and filtering.
- Components and icons are organized for modular development.
- Backend API configuration is in `src/config.ts`.

## Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Update backend URL in `src/config.ts` if needed.

## Contribution
Feel free to open issues or submit pull requests for improvements.
