
# 📊 FinSight Dashboard

A responsive **personal finance dashboard** built using **React + Vite + Tailwind CSS**.

FinSight demonstrates modern frontend architecture for tracking transactions, calculating financial KPIs, and visualizing balance trends over time.

---

## ✅ Quick Overview

* **Language:** JavaScript (ES Modules)
* **Framework:** React
* **Bundler:** Vite
* **Build Command:**

```bash
npm run build
```

Vite compiles the React application and generates optimized assets inside the `dist/` folder.

---

## 🚀 Features

FinSight provides a single-page dashboard to:

* View total **Balance**, **Income**, and **Expenses**
* Analyze **weekly & monthly balance trends**
* Search and filter transactions
* Add or delete transactions (Admin role)
* Switch between **Viewer** and **Admin** modes

---

## 🧱 Tech Stack

### Language

* JavaScript (ES Modules)
* JSX

### Frontend

* React 19
* Vite 8

### UI & Visualization

* Tailwind CSS 4
* react-icons
* Recharts

### Tooling

* ESLint 9
* Babel React Compiler (via Vite)

---

## 🏗️ Architecture Overview

### 1. Application Entry

`src/main.jsx`

* Mounts React application using `createRoot`
* Wrapped inside `StrictMode`

---

### 2. Top-Level State Management

`src/App.jsx`

Main orchestrator responsible for:

* Transactions state
* Role management
* Mobile sidebar state

Core actions:

```js
addTransaction(tx)
deleteTransaction(id)
```

---

### 3. Dashboard Composition

`src/pages/Dashboard.jsx`

Composes:

* KPI Cards
* Balance Trend Chart
* Transaction Table

Data flows through props from the parent state.

---

### 4. Business Logic — Custom Hook

`src/hooks/useAnalytics.js`

Uses `useMemo` to compute:

* Total income
* Total expenses
* Net balance
* Weekly balance series
* Monthly balance series

Transforms raw transactions into chart-ready datasets.

---

### 5. UI Components

#### Dashboard Components

* `KPICards.jsx`
* `BalanceChart.jsx`
* `TransactionTable.jsx`

#### Layout Components

* `Navbar.jsx`
* `Sidebar.jsx`

---

## 🔄 Data Flow

1. User performs an action (add/delete).
2. Child component triggers handler.
3. `App.jsx` updates transactions state.
4. Dashboard receives updated data.
5. `useAnalytics` recalculates derived values.
6. UI automatically re-renders.

This follows React’s **unidirectional data flow** model.

---

## 👥 Role Behavior

### Viewer

* View dashboard analytics
* Cannot modify transactions

### Admin

* Add transactions
* Delete transactions
* Full dashboard interaction

---

## 📁 Project Structure

```
finsight-dashboard/
├─ src/
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ KPICards.jsx
│  │  │  ├─ BalanceChart.jsx
│  │  │  └─ TransactionTable.jsx
│  │  └─ layout/
│  │     ├─ Navbar.jsx
│  │     └─ Sidebar.jsx
│  ├─ hooks/
│  │  └─ useAnalytics.js
│  ├─ pages/
│  │  └─ Dashboard.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ vite.config.js
├─ eslint.config.js
└─ package.json
```

---
### 📸 Screenshots
![Dashboard](<img1.png>)

![](<img2.png>)

![](<img3.png>)



## ⚙️ Getting Started

### Prerequisites

* Node.js 18+
* npm 9+

---

### Install Dependencies

```bash
npm install
```

---

### Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

### Production Build

```bash
npm run build
```

---

### Preview Production Build

```bash
npm run preview
```

---

### Run Linter

```bash
npm run lint
```

---

## 🏭 Build Pipeline

* Vite runs dev server with Hot Module Reloading
* JSX compiles into browser-ready JavaScript
* Tailwind generates utilities automatically
* Production build outputs optimized static assets to `dist/`

---

