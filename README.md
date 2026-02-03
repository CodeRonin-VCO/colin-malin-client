# 🧠 Colin-Malin

Colin-Malin est une application de quiz interactive construite avec React, Express et PostgreSQL, conçue pour offrir une expérience fluide, moderne et responsive. Elle propose une interface sombre élégante, une navigation mobile/desktop, et une gestion complète des utilisateurs et des statistiques.

## Fonctionnalités

- Authentification (inscription / connexion)
- Configuration personnalisée du quiz (catégorie, difficulté, nombre de questions)
- Quiz à choix multiples (4 réponses)
- Statistiques détaillées après chaque session
- Interface admin pour gérer les utilisateurs et les questions
- Responsive design avec navigation mobile et desktop
- Thème sombre avec palette personnalisée

## Technologies

- Frontend: React avec Vite
    - State: Jotai
    - Graphiques: chart.js
    - Bundling: Vite
- Backend: Node.js / Express.js
- Base de données: PostgreSQL avec Sequelize

## À venir

- Quiz multijoueur
- Classement global
- Mode hors-ligne


## Structure du projet
```
src/
├─ App.css                # Styles globaux de l’application
├─ App.jsx                # Composant racine React
├─ index.css              # CSS global de base
├─ main.jsx               # Point d’entrée React
├─ assets/                # Assets statiques (images, SVG, logos, etc.)
│  └─ (images, svgs, logos...)
├─ atom/                  # État global avec Jotai atoms
│  └─ atom.js
├─ components/            # Composants réutilisables et spécifiques
│  ├─ dashboard/          # Composants du dashboard admin
│  │  ├─ charts/          # Graphiques et visualisations
│  │  │  ├─ byDateChart/
│  │  │  ├─ byDifficulty/
│  │  │  └─ byTheme/
│  │  ├─ overview/       # Composant récapitulatif du dashboard
│  │  │  ├─ overview.jsx
│  │  │  └─ overview.module.css
│  │  ├─ preferences/    # Gestion des préférences utilisateurs
│  │  └─ profile/        # Profil utilisateur
│  ├─ forms/             # Formulaires (login, register, quiz, questions)
│  │  ├─ add-questions/
│  │  │  ├─ add-questions.jsx
│  │  │  └─ add-questions.module.css
│  │  ├─ config-game/
│  │  │  ├─ config-game.jsx
│  │  │  └─ config-game.module.css
│  │  ├─ login/
│  │  │  ├─ login.jsx
│  │  │  └─ login.module.css
│  │  ├─ register/
│  │  │  ├─ register.jsx
│  │  │  └─ register.module.css
│  │  └─ update-questions/
│  │     ├─ update-questions.jsx
│  │     └─ update-questions.module.css
│  ├─ games/              # Composants liés aux jeux
│  │  └─ solo/
│  │     ├─ solo.jsx
│  │     └─ solo.module.css
│  ├─ manage-questions/   # Gestion et affichage des questions
│  │  └─ manage-questions.jsx
│  ├─ modal/              # Popups et notifications
│  │  ├─ popup-config/
│  │  ├─ popup-quizResults/
│  │  └─ toast/           # Toasts de notification
│  ├─ nav/                # Navigation (desktop et mobile)
│  │  ├─ nav-desktop/
│  │  └─ nav-mobile/
│  ├─ protectedRoute/     # Route protégée pour pages sécurisées
│  │  └─ protectedRoute.jsx
│  └─ searchBar/          # Barre de recherche
│     ├─ searchBar.jsx
│     └─ searchBar.module.css
├─ hooks/                 # Custom hooks réutilisables
│  ├─ useAuth.js
│  ├─ useDebounce.js
│  ├─ useGames.js
│  ├─ useQuestions.js
│  ├─ useScores.js
│  └─ useUser.js
├─ layouts/               # Composants de layout réutilisables
│  ├─ footer/
│  │  ├─ footer.jsx
│  │  └─ footer.module.css
│  ├─ header/
│  │  ├─ header.jsx
│  │  └─ header.module.css
│  └─ home-header/
│     ├─ home-header.jsx
│     └─ home-header.module.css
├─ pages/                 # Pages principales de l’application
│  ├─ admin/
│  │  ├─ admin.route.jsx
│  │  └─ admin.route.module.css
│  ├─ getStarted/
│  │  ├─ getStarted.route.jsx
│  │  └─ getStarted.route.module.css
│  ├─ home/
│  │  ├─ home.route.jsx
│  │  └─ home.route.module.css
│  ├─ quiz/
│  │  ├─ quiz.jsx
│  │  └─ quiz.module.css
│  ├─ quiz-config/
│  │  ├─ quiz-config.route.jsx
│  │  └─ quiz-config.route.module.css
│  └─ stats/
│     ├─ stat.route.jsx
│     └─ stat.route.module.css
├─ services/             # API calls et logique réseau
│  ├─ auth.service.js
│  ├─ games.service.js
│  ├─ questions.service.js
│  ├─ scores.service.js
│  └─ user.service.js
├─ styles/               # Variables SCSS et styles globaux
│  └─ variables-colors.scss
└─ utils/                # Fonctions utilitaires
   ├─ equalArray.js
   ├─ expiredToken.js
   ├─ shuffleArray.js
   ├─ translate-mapping.js
   └─ validation.js
```