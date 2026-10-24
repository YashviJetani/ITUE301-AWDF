# Advanced Web Development Lab: Practicals 1 to 6 (Full Stack React + Node + Express + MongoDB)

This repository contains the complete implementation for **Practicals 1 through 6** matching the exact syllabus, rubric criteria, supplementary challenges, and Postman API test suites.

---

## 📂 Architecture & Directory Structure

```
e:\adf\
├── student-portfolio\                   # React 18 Frontend (Practicals 1, 2, 3, 6)
│   ├── src\
│   │   ├── components\
│   │   │   ├── Header.jsx               # Practical 1: Accepts name, title, role, themeColor props
│   │   │   ├── About.jsx                # Practical 1: Biography & highlights card
│   │   │   ├── Skills.jsx               # Practical 1: Dynamic list from skillList prop
│   │   │   ├── Footer.jsx               # Practical 1: Contact, links, copyright
│   │   │   ├── NavBar.jsx               # Practical 2: React Router Links & theme toggle
│   │   │   ├── Spinner.jsx              # Practical 3 & 6: Loading indicator
│   │   │   ├── ErrorMessage.jsx         # Practical 3 & 6: Error banner with retry button
│   │   │   ├── Toast.jsx                # Practical 6: Feedback notifications
│   │   │   └── ConfirmModal.jsx         # Practical 6: Delete confirmation dialog
│   │   ├── pages\
│   │   │   ├── Home.jsx                 # Practicals 1 & 2: Composed portfolio layout
│   │   │   ├── Projects.jsx             # Practical 3: GitHub REST API integration
│   │   │   ├── Contact.jsx              # Practical 2: Controlled form & useState toggle
│   │   │   ├── TasksManager.jsx         # Practical 6: Full-Stack React + Node + MongoDB UI
│   │   │   └── NotFound.jsx             # Practical 2: 404 Not Found route
│   │   ├── services\
│   │   │   └── api.js                   # Practical 6: Centralized backend HTTP client
│   │   ├── App.jsx                      # Practical 2: Route configurations & dark/light state
│   │   ├── main.jsx                     # Practical 2: BrowserRouter root wrapper
│   │   └── index.css                    # Modern CSS Design System (Light/Dark themes)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── task-manager-api\                    # Node / Express / MongoDB Backend (Practicals 4, 5, 6)
│   ├── models\
│   │   └── Task.js                      # Practical 5: Mongoose Schema & pre-save hook
│   ├── middleware\
│   │   ├── logger.js                    # Practical 4: Request logging middleware
│   │   ├── validate.js                  # Practical 4 & 5: Content-Type & ObjectId validator
│   │   └── errorHandler.js              # Practical 4 & 5: Global error handler & 404 handler
│   ├── routes\
│   │   └── taskRoutes.js                # Practicals 4, 5, 6: REST CRUD Endpoints
│   ├── server.js                        # Practicals 4, 5, 6: Express app & MongoDB connection
│   ├── .env                             # Port & Mongo URI configuration
│   ├── TaskManager_API.postman_collection.json # Postman collection for all endpoints & tests
│   ├── test_api.ps1                     # Automated line-by-line Postman verification runner
│   └── package.json
│
└── README.md
```

---

## 🚀 Step-by-Step Practical Breakdown

### **Practical 1: Introduction to React and Component Architecture**
* **Objective:** Scaffold a React application using Vite and build a static UI with reusable functional components.
* **Component Tree:**
  * `App.jsx`
    * `Header.jsx`: Accepts `name`, `title`, `role`, and `themeColor` as props.
    * `About.jsx`: Short bio text and engineering highlights.
    * `Skills.jsx`: Dynamically maps and renders an array of skills received via the `skillList` prop.
    * `Footer.jsx`: Contact info, social links, and copyright.
* **Supplementary Solutions Implemented:**
  * Dynamic array mapping with unique keys.
  * `themeColor` prop applied dynamically.
  * Featured 3 projects showcase in `Home.jsx`.

---

### **Practical 2: State Management and Routing in React**
* **Objective:** Implement client-side routing with `react-router-dom` v6 and reactive state with `useState`.
* **Features:**
  * `BrowserRouter` wrapping `App.jsx` in `main.jsx`.
  * `NavBar.jsx` with `<NavLink>` tags for instant route navigation without page reloads.
  * Routes configured: `/` (Home), `/projects` (Projects), `/tasks` (Tasks Manager), `/contact` (Contact), and `*` (404 Not Found).
  * `useState` variable 1: Controlled inputs (`name`, `email`, `message`) updating on every keystroke with live character counter.
  * `useState` variable 2: UI element visibility toggle (Guidelines panel in Contact).
  * `useState` variable 3: Dark / Light mode toggle persisting to `localStorage` and toggling `data-theme` on `<html>`.

---

### **Practical 3: API Integration and Data Rendering in React**
* **Objective:** Consume a public REST API in React and manage asynchronous request lifecycles.
* **Features:**
  * `useEffect` hook triggering GitHub REST API fetch on component mount.
  * Three state variables: `repos` (array), `loading` (boolean), `error` (string | null).
  * `<Spinner />` rendered conditionally during active network requests.
  * `<ErrorMessage />` rendered conditionally on fetch failure, equipped with a **Retry** button.
  * Interactive controls:
    * Live search input filtering repositories dynamically by name.
    * User switcher (`@facebook`, `@octocat`).
    * **Simulate Error URL** button to test the error path as prescribed by the syllabus.
    * Star count and fork count displayed for every repository.

---

### **Practical 4: Building a RESTful API with Node.js and Express**
* **Objective:** Design and implement a RESTful backend server with CRUD endpoints and middleware pipeline.
* **Pipeline Structure:**
  `Client -> Logger Middleware -> Content-Type Validator -> Express Router -> 404 Handler -> Global Error Handler`
* **Endpoints:**
  * `GET /tasks`: Returns all tasks with HTTP `200`.
  * `GET /tasks/:id`: Returns single task with HTTP `200`, or `404` if not found.
  * `POST /tasks`: Creates a task with HTTP `201`, or `400` if validation fails.
  * `PUT /tasks/:id`: Updates task with HTTP `200`, or `404` if not found.
  * `DELETE /tasks/:id`: Deletes task with HTTP `200`, or `404` if not found.
* **Middlewares:**
  * `requestLogger`: Logs `${req.method} ${req.url} - ${ISO timestamp}`.
  * `checkContentType`: Enforces `Content-Type: application/json` on POST/PUT.
  * `validateTaskId`: Validates MongoDB ObjectId format before hitting the controller.
  * `notFoundHandler`: Structured JSON for undefined routes (`404`).
  * `errorHandler`: Centralized error response returning JSON errors (`500` or `400`).

---

### **Practical 5: MongoDB Integration and Schema Design with Mongoose**
* **Objective:** Connect MongoDB via Mongoose and enforce schema validation and persistence.
* **Task Schema (`models/Task.js`):**
  * `title`: String, required, trim, minlength 2.
  * `description`: String, trim.
  * `completed`: Boolean, default `false`.
  * `priority`: String, enum `['low', 'medium', 'high']`, default `'medium'`.
  * `createdAt`: Date, default `Date.now`.
  * Pre-save hook trimming whitespace from `title`.
* **Validation:** Missing required fields reject requests with structured JSON error messages rather than unhandled promise crashes.

---

### **Practical 6: Full Stack Integration (React + Express + MongoDB)**
* **Objective:** Connect the React frontend to the Express+MongoDB backend into an end-to-end full-stack app.
* **Integration Features:**
  * `cors()` middleware on Express to permit requests from `http://localhost:5173`.
  * Central `src/services/api.js` with `BASE_URL = 'http://localhost:5000'`.
  * `TasksManager.jsx` page:
    * Create task form sending POST requests to `/tasks`.
    * View task list retrieved from MongoDB on mount.
    * Inline task title edit and checkbox toggle for completed status (PUT).
    * Delete task with confirmation modal (`ConfirmModal.jsx`).
    * Real-time toast alerts (`Toast.jsx`) for operations.
    * Database persistence verified across browser refreshes.

---

## 📬 Postman Testing Guide (Line-by-Line)

Import the provided file `task-manager-api/TaskManager_API.postman_collection.json` directly into **Postman** (or **Thunder Client**).

### Postman Test Suite Sequence:
1. **01. Server Health Check:** `GET {{baseUrl}}/` -> Checks 200 OK and API status.
2. **02. GET /tasks:** `GET {{baseUrl}}/tasks` -> Queries MongoDB tasks array.
3. **03. POST /tasks (Create Task 1 - High Priority):**
   * Body:
     ```json
     {
       "title": "Complete Practical 1 to 6 in React and Node",
       "description": "Build modern portfolio, route setup, GitHub API fetch, and Express Mongoose full stack app.",
       "priority": "high",
       "completed": false
     }
     ```
   * Verifies 201 Created and saves `taskId` variable.
4. **04. POST /tasks (Create Task 2 - Medium Priority):**
   * Body:
     ```json
     {
       "title": "Study Mongoose Schema Validation",
       "description": "Review required fields, pre-save hooks, and custom error formatting.",
       "priority": "medium",
       "completed": false
     }
     ```
5. **05. GET /tasks/:id:** `GET {{baseUrl}}/tasks/{{taskId}}` -> Confirms single task retrieval.
6. **06. PUT /tasks/:id:** `PUT {{baseUrl}}/tasks/{{taskId}}` -> Updates title and sets `completed: true`.
7. **07. POST /tasks (Validation Failure):**
   * Body: `{ "description": "No title" }`
   * Expects: `400 Bad Request` with structured JSON error: `"Task title is required"`.
8. **08. POST /tasks (Missing Content-Type Header):**
   * Header: `Content-Type: text/plain`
   * Expects: `400 Bad Request` with message: `"Expected application/json"`.
9. **09. GET /tasks/bad-id-123:**
   * Expects: `400 Bad Request` with message: `"Invalid task ID format"`.
10. **10. GET /non-existent-endpoint:**
    * Expects: `404 Not Found` with message: `"Endpoint not found"`.
11. **11. DELETE /tasks/:id:** `DELETE {{baseUrl}}/tasks/{{taskId}}` -> Expects 200 OK.
12. **12. GET /tasks/:id (Verify Deletion):**
    * Expects: `404 Not Found` confirming permanent deletion.

---

## 💻 How to Run the Applications Locally

### 1. Start the Backend API Server:
```powershell
cd e:\adf\task-manager-api
npm install
npm start
```
* Backend runs on: `http://localhost:5000`
* Connects to local MongoDB: `mongodb://127.0.0.1:27017/taskmanager_db`

### 2. Run Automated API Verification (Postman equivalent):
```powershell
cd e:\adf\task-manager-api
powershell -ExecutionPolicy Bypass -File .\test_api.ps1
```

### 3. Start the Frontend React Application:
```powershell
cd e:\adf\student-portfolio
npm install
npm run dev
```
* Frontend runs on: `http://localhost:5173`

---

## 🔒 Practical 7: Authentication & Middleware Pipeline
* **JWT Authentication:** Tokens signed with HMAC-SHA256 and standard 1-hour expiration.
* **bcrypt Password Hashing:** Automatically salts and hashes user passwords before saving into MongoDB.
* **Middleware Pipeline:** `authMiddleware` verifies the `Authorization: Bearer <token>` header on all `/tasks` routes.
* **Input Validation:** `validateRegister`, `validateLogin`, `validateTask` enforce rules and return structured JSON errors (`400 Bad Request`).
* **Profile Endpoint:** `GET /auth/me` returns authenticated user profile from decoded token.

---

## ⚡ Practical 8: Performance Optimization & Lazy Loading in React
* **Route-Based Code Splitting:** `React.lazy()` applied across all page routes (`Home`, `Projects`, `TasksManager`, `Contact`, `Login`, `Register`).
* **Suspense & Fallback UI:** Smooth animated spinner fallback while chunks are downloaded dynamically.
* **Measured Evidence:** Production build produces distinct chunk files (`Home-...js`, `Projects-...js`, `Contact-...js`, etc.) reducing initial payload size.

---

## 🚀 Practical 9: In-Memory Caching & Query Optimization
* **node-cache Integration:** In-memory caching for `GET /tasks` and `GET /tasks/:id` with 60s TTL.
* **Response Headers:** `X-Cache: HIT` and `X-Cache: MISS` headers communicate cache status.
* **Cache Invalidation:** Cache keys flushed immediately on database writes (`POST`, `PUT`, `DELETE`).
* **Metrics Endpoint:** `GET /api/cache/stats` provides real-time hit counts, miss counts, and hit rate percentage.

---

## 📡 Practical 10: Asynchronous Processing with Event-Driven Architecture
* **Native EventEmitter:** Decouples background tasks without third-party message broker overhead.
* **Event Handlers:** Listens for `task-created`, `task-updated`, and `task-deleted`.
* **Non-Blocking Verification:** Immediate HTTP 201 response sent to the client (<15ms) while the background worker finishes ~1000ms later.

---

## 🐳 Practical 11: Containerization with Docker & Docker Compose
* **Backend Dockerfile:** Alpine Node 18 runtime exposing port 5000.
* **Frontend Dockerfile:** Multi-stage build producing optimized production bundle.
* **Docker Compose:** Single command starts `mongodb`, `backend`, and `frontend`:
```powershell
docker-compose up --build
```

---

## 🔄 Practical 12: CI/CD Pipeline with GitHub Actions
* **Automated CI Workflow:** `.github/workflows/ci.yml` runs on every push and pull request to `main`.
* **Automated Testing:** Jest + Supertest suite testing health checks, input validation, 404 handlers, and auth guards.
* **Pipeline Status Badge:**
  `![CI Pipeline](https://github.com/student/adf-fullstack-portfolio/actions/workflows/ci.yml/badge.svg)`

