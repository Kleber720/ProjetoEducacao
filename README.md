# EduKation

A full-stack study workspace that brings focused study sessions, structured notes, and YouTube lessons into one place.

EduKation helps students turn a video lesson into a study session: choose Pomodoro or Cornell, create a notebook or reopen an existing one, take notes, and save the result for later review. The application connects a React interface to a TypeScript REST API and a MySQL database.

**React 19 · JavaScript · TypeScript · Node.js · Express 5 · MySQL · Vite · Oxlint**

## What you can do

- **Study with Pomodoro:** use 25-minute focus sessions, 5-minute short breaks, and a 15-minute long break after four completed focus cycles. Pause, resume, reset, or skip a session.
- **Take Cornell notes:** organize a notebook into questions and keywords, class notes, and a summary.
- **Watch a lesson alongside your notes:** paste a YouTube link and load the embedded player in either study workspace.
- **Choose your notebook:** start with a blank notebook or select one previously saved under the same study method.
- **Review saved work:** open the Cadernos page to browse Pomodoro and Cornell notebooks and expand their full contents.
- **Create an account and sign in:** register with a name, email, and password; the API also supports user searches, partial updates, and deletion.

The interface is currently in Brazilian Portuguese. Layouts adapt to smaller screens, and the UI includes labeled fields, keyboard focus styles, loading states, and error feedback.

## Try the main flow

1. Register an account and sign in.
2. Choose **Pomodoro** or **Cornell** on the Home page.
3. Select **Criar novo caderno** to start a notebook.
4. Add a title, take notes, and optionally load a YouTube lesson.
5. Click **Salvar caderno**. A successful save redirects a new notebook to **Cadernos**.
6. Expand a saved title to review it, or return to a study method and choose an existing notebook.

## Engineering highlights

- **Clear backend responsibilities.** Routes map HTTP requests to controllers; services validate input and coordinate operations; repository interfaces define persistence contracts; infrastructure classes execute SQL.
- **Direct, parameterized persistence.** The application uses mysql2 connection pooling and query placeholders. Foreign keys associate each notebook with its user and cascade notebook deletion when that user is removed.
- **Deadline-based timer.** Remaining time is calculated from a timestamp rather than an accumulated tick count. The Pomodoro page also synchronizes the display when the browser tab becomes visible again.
- **Shared frontend behavior.** Both study methods use the same notebook-choice component and YouTube URL parser. A shared fetch wrapper handles JSON requests and API errors.
- **Independent notebook loading.** The notebook panel loads both methods concurrently with Promise.allSettled, so a failure in one request does not hide the other method’s results. Requests are cancelled when the component unmounts.
- **Password handling.** Newly registered passwords use Node.js scrypt with a random salt. Verification uses timingSafeEqual, and public user responses exclude the stored password.

Useful entry points: [Pomodoro workspace](frontend/src/pages/Pomodoro.jsx), [Cornell workspace](frontend/src/pages/cornell.jsx), [notebook panel](frontend/src/painel/PainelNotebook.jsx), and [user service](backend/services/UserServices.ts).

## Project structure

```text
backend/
  config/          MySQL connection pool
  controller/      HTTP responses and error handling
  infrastructure/  SQL queries
  models/          Entities, DTOs, and value objects
  repository/      Persistence interfaces
  routes/          REST endpoints
  services/        Validation and application logic
  tests/           Automated API and service tests
  Server.ts        Express entry point
frontend/
  src/
    components/    Shared buttons, sidebar, and notebook selection
    pages/         Login, registration, Home, Pomodoro, and Cornell
    painel/        Saved-notebook panel
    services/      API calls, timer helpers, and YouTube parsing
database/
  edukation.sql    Complete schema and legacy-table cleanup
  pomodoro.sql     Individual Pomodoro table script
  cornell.sql      Individual Cornell table script
```

## Run locally

### Requirements

- Node.js 24 and npm. This version also supports the native TypeScript hooks used by the tests.
- A running MySQL server and an account with permission to create the local database and tables.
- Internet access for dependency installation and YouTube playback.

Run the following commands from the repository root unless a different directory is specified.

### 1. Install dependencies

```sh
npm --prefix backend install
npm --prefix frontend install
```

### 2. Initialize the database

Open a MySQL client from the repository root:

```sh
mysql -u root -p
```

Then execute:

```sql
SOURCE database/edukation.sql;
```

The script creates the edukation database with User, pomodoro, and cornell tables. It also drops the legacy timeline, module, activities, theme, and category tables, so run it against a dedicated development database.

### 3. Configure the backend

Create backend/.env with your local credentials:

```dotenv
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=edukation
PORT=3000
```

### 4. Start the API

```sh
cd backend
npm run dev
```

The API runs at http://localhost:3000/api. The development script uses npx tsx watch; npx may download tsx on its first run.

### 5. Start the frontend

In a second terminal, from the repository root:

```sh
cd frontend
npm run dev
```

Open the URL printed by Vite, usually http://localhost:5173. The frontend API address is defined in [api.js](frontend/src/services/api.js); update it if you change the backend port.

## API overview

All endpoints are mounted under /api. The main study workflow uses:

```text
POST /api/users                    Register a user
POST /api/login                    Check credentials and return public user data
POST /api/pomodoro                 Save a Pomodoro notebook
GET  /api/pomodoro/user/:userId     List that user’s Pomodoro notebooks
POST /api/cornell                  Save a Cornell notebook
GET  /api/cornell/user/:userId      List that user’s Cornell notebooks
```

Notebook lists are returned with the most recently inserted record first. Additional user endpoints are defined in [UserRoutes.ts](backend/routes/UserRoutes.ts).

Example body for POST /api/cornell, using the ID returned for your registered user:

```json
{
  "userId": 1,
  "title": "Photosynthesis",
  "description": "How does light influence the process?",
  "noteClass": "Class notes and examples from the lesson.",
  "resume": "A short summary written in my own words."
}
```

For Cornell, description stores questions and keywords, noteClass stores class notes, and resume stores the summary. For Pomodoro, the payload contains userId, title, and resume, with resume holding the study notes.

## Tests and checks

From the repository root:

```sh
npm --prefix backend test
npm --prefix frontend run lint
npm --prefix frontend run build
```

The backend suite contains **21 automated tests**. It exercises the real routes, controllers, services, and infrastructure query calls with isolated database stubs, plus the frontend API services. A running MySQL instance is not required for these tests.

Coverage includes input validation, password hashing and verification, partial user updates, duplicate-account handling, notebook field mapping, filtering by user, empty results, and database-error responses. This suite does not provide browser end-to-end coverage.

## Current scope

- Notebook saves create new records. Saving edits to an existing notebook currently creates another record; notebook update and delete endpoints are not implemented.
- Login checks credentials and stores public user data in browser sessionStorage. Server-side sessions or tokens and ownership authorization are not implemented; notebook endpoints currently accept a supplied user ID.
- Timer progress and loaded video links belong to the current browser view and are not saved with the notebook. Notes are persisted when Save is clicked.
- YouTube playback depends on the selected video allowing embedding.

## Author and license

Built by **Kléber Amaro**.

Released under the [MIT License](LICENSE).
