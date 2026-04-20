# 🧠 Colin-Malin — Frontend

Colin-Malin est une application de quiz interactive construite avec React, Express et PostgreSQL, conçue pour offrir une expérience fluide, moderne et responsive. Elle propose une interface sombre élégante, une navigation mobile/desktop, et une gestion complète des utilisateurs et des statistiques.

---

## Fonctionnalités

- Authentification (inscription / connexion / déconnexion)
- Configuration personnalisée du quiz (thème, difficulté, nombre de questions)
- Quiz à choix multiples (4 réponses) avec timer par question
- Résultats détaillés après chaque session
- Dashboard de statistiques (scores par thème, difficulté, évolution dans le temps)
- Espace admin pour ajouter, modifier et supprimer des questions
- Profil utilisateur (modification username, email, mot de passe, description)
- Responsive design avec navigation mobile et desktop
- Thème sombre avec palette personnalisée

---

## Technologies

| Catégorie | Technologie |
|---|---|
| Framework | React 19 avec Vite |
| State management | Jotai |
| Routing | React Router v7 |
| Graphiques | Chart.js + react-chartjs-2 |
| Styles | CSS Modules + SCSS |
| Tests | Jest (ES Modules via `--experimental-vm-modules`) |
| Icônes | react-icons |
| Notifications | Composant Toast custom |

---

## Prérequis

- Node.js 18+
- Le backend Colin-Malin doit être lancé (voir README backend)

---

## Installation

```bash
# Cloner le projet
git clone https://github.com/ton-repo/colin-malin-client.git
cd colin-malin-client

# Installer les dépendances
npm install
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8008/api
```

> ⚠️ Ne jamais committer le fichier `.env` — il est dans `.gitignore`

---

## Lancer le projet

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint

# Tests
npm test

# Tests en mode watch
npm run test:watch
```

---

## Tests

Les tests couvrent les utilitaires et les services frontend avec Jest.

```bash
npm test
```

### Ce qui est testé

| Fichier | Type |
|---|---|
| `validatePassword`, `equalArray`, `shuffleArray` | Fonctions utilitaires pures |
| `handleExpiredToken`, `translateValue`, `translateArray` | Fonctions utilitaires pures |
| `HttpError`, `fetchJson` | Client HTTP (apiClient) |
| `auth.service`, `games.service` | Services frontend |
| `questions.service`, `scores.service`, `user.service` | Services frontend |

### Configuration Jest (ES Modules)

Ce projet utilise Vite avec `"type": "module"`. Jest nécessite une configuration spécifique :

```json
"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch"
}
```

Pour mocker un module avec les ES Modules natifs, utiliser `jest.unstable_mockModule` avec des imports dynamiques :

```js
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

const { register } = await import("./auth.service.js");
```

---

## Architecture

```
src/
├─ atom/                  # État global avec Jotai
├─ components/            # Composants réutilisables
│  ├─ dashboard/          # Statistiques et graphiques
│  │  ├─ charts/          # Graphiques (byDateChart, byDifficulty, bytheme)
│  │  ├─ overview/        # Vue d'ensemble des stats
│  │  ├─ preferences/     # Préférences utilisateur
│  │  └─ profile/         # Profil dans le dashboard
│  ├─ forms/              # Formulaires (login, register, config-game, questions)
│  ├─ games/              # Composants quiz (solo)
│  ├─ manage-questions/   # Interface de gestion des questions (admin)
│  ├─ modal/              # Popups (config, résultats) et toasts
│  ├─ nav/                # Navigation desktop et mobile
│  ├─ protectedRoute/     # Protection des routes authentifiées
│  ├─ searchBar/          # Barre de recherche
│  └─ ui/buttons/         # Composants boutons réutilisables
├─ hooks/                 # Custom hooks (useAuth, useGames, useQuestions...)
├─ layouts/               # Mise en page (header, footer, home-header)
├─ pages/                 # Pages principales (home, quiz, stats, admin...)
├─ services/              # Appels API centralisés via fetchJson
├─ styles/                # Variables SCSS globales
└─ utils/                 # Fonctions utilitaires
```

### Gestion des appels API

Tous les appels HTTP passent par `fetchJson` dans `apiClient.js` — une fonction centralisée qui gère les headers, le token JWT et les erreurs HTTP via une classe `HttpError` :

```
Composant → Hook custom → Service → fetchJson → API
```

### Gestion de l'authentification

- Token JWT stocké dans un atom Jotai
- Vérification du token à chaque navigation via `ProtectedRoute`
- Expiration automatique gérée par `handleExpiredToken` — redirige vers `/` et nettoie le state

---

## À venir

- Quiz multijoueur + stat entre amis
- Classement global
- Consultation du profil des autres utilisateurs
- Gestion des rôles (admin / utilisateur) via l'espace admin

---

## Améliorations techniques identifiées

- **Sentry** — monitoring des erreurs inattendues en production (réseau coupé, serveur planté)
- **TanStack Query** — remplacement des hooks custom par une gestion du cache et du loading plus fine
