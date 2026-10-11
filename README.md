# EduKation

A full-stack study application for focused sessions, structured notes, and video lessons.

EduKation combines the Pomodoro technique and the Cornell note-taking method with a personal notebook collection. Students can watch a YouTube lesson, take notes, save their work, and return later to review, edit, or delete it.

The application uses a React frontend, a TypeScript REST API built with Express, and MySQL persistence. The interface is in Brazilian Portuguese; this documentation is in English.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Local setup](#local-setup)
- [Using the application](#using-the-application)
- [API reference](#api-reference)
- [Database and validation](#database-and-validation)
- [Architecture](#architecture)
- [Tests and development commands](#tests-and-development-commands)
- [Environment files and Git](#environment-files-and-git)
- [Troubleshooting](#troubleshooting)
- [Current limitations](#current-limitations)
- [Contributing](#contributing)
- [Author and license](#author-and-license)

## Features

### Pomodoro workspace

- 25-minute focus sessions, 5-minute short breaks, and a 15-minute long break after four completed focus cycles.
- Start, pause, resume, reset, or skip the current session.
- View the countdown, progress, and completed focus cycles.
- Create a notebook or reopen an existing Pomodoro notebook.
- Write and save a title and study notes.
- Load a YouTube lesson alongside the notebook.

### Cornell workspace

- Organize notes into questions and keywords, class notes, and a summary.
- Create a notebook or continue working on a saved Cornell notebook.
- View a word count and the save status.
- Watch an embedded YouTube lesson while taking notes.

### Notebook management

Both study methods support a complete notebook CRUD workflow:

- **Create:** save a new notebook associated with a user.
- **Read:** list saved notebooks and expand their contents on the Cadernos page.
- **Update:** reopen a notebook and save changes to the same record without creating a duplicate.
- **Delete:** remove a notebook after confirming the action in the interface.

The notebook panel loads both collections independently, displays loading and error feedback, and provides Edit and Delete actions. Buttons include hover feedback and visible keyboard focus states.

### Accounts

- Register with a name, email, password, and optional phone number through the API.
- Sign in with email and password.
- Store public user information in browser session storage.
- Search, update, and delete users through the API.
- Hash new passwords with Node.js scrypt and a random salt.

## Technology stack

**Frontend:** React 19, JavaScript, React Router, React Icons, CSS, Vite, and Oxlint.

**Backend:** Node.js, TypeScript, Express 5, mysql2, dotenv, and cors. Development runs through tsx; automated tests use the Node.js test runner.

**Database:** MySQL, with foreign keys linking Cornell and Pomodoro notebooks to their users.

## Project structure

```text
ProjetoEducacao/
├── backend/
│   ├── config/          MySQL connection pool
│   ├── controller/      HTTP handlers and responses
│   ├── infrastructure/  Parameterized SQL queries
│   ├── models/
│   │   ├── dto/         Request and data contracts
│   │   ├── entities/    User and notebook entities
│   │   └── valuesObject/ Email and password value objects
│   ├── repository/      Persistence interfaces
│   ├── routes/          API route definitions
│   ├── services/        Validation and application logic
│   ├── tests/           API and service tests
│   ├── .env.example     Configuration template without real credentials
│   ├── package.json
│   └── Server.ts        Express entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/      Images
│   │   ├── components/  Shared UI and notebook selection
│   │   ├── pages/       Login, registration, Home, and study workspaces
│   │   ├── painel/      Saved-notebook panel
│   │   ├── services/    API requests, timer helpers, and YouTube parsing
│   │   └── App.jsx      Browser routes
│   └── package.json
├── database/
│   ├── edukation.sql    Complete database initialization
│   ├── cornell.sql      Individual Cornell table script
│   └── pomodoro.sql     Individual Pomodoro table script
├── .gitignore
├── LICENSE
└── README.md
```

## Local setup

### Prerequisites

- **Node.js 24 and npm.** The tests use native TypeScript stripping and module hooks; Node.js 24.19.0 was used for verification.
- **A running MySQL server.** Your local account must be able to create the development database and its tables.
- **Git**, if you are cloning the repository.
- Internet access to install dependencies and play YouTube videos.

Open a terminal in the project root. The examples below assume the repository has already been cloned or downloaded.

### 1. Install dependencies

```sh
npm --prefix backend ci
npm --prefix frontend ci
```

Use npm install instead when intentionally updating dependencies and their lockfiles.

The backend development command uses npx tsx. Since tsx is not declared in the backend package dependencies, npx may download it on the first run.

### 2. Initialize MySQL

Open a MySQL client from the project root:

```sh
mysql -u root -p
```

Run the initialization script inside the MySQL client:

```sql
SOURCE database/edukation.sql;
```

This creates the edukation database and the User, pomodoro, and cornell tables if they do not already exist. The script also drops the legacy timeline, module, activities, theme, and category tables. Use a dedicated development database and review the script before running it against existing data.

If your MySQL client cannot locate the script, use its absolute path with forward slashes.

### 3. Configure environment variables

Copy [backend/.env.example](backend/.env.example) to backend/.env.

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

On macOS or Linux:

```sh
cp backend/.env.example backend/.env
```

Set your local credentials in backend/.env:

```dotenv
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=edukation
PORT=3000
```

- **DB_HOST:** MySQL hostname or IP address; defaults to 127.0.0.1.
- **DB_USER:** MySQL username; defaults to root.
- **DB_PASSWORD:** MySQL password; defaults to an empty string.
- **DB_NAME:** Database name; defaults to edukation.
- **PORT:** HTTP port for the API; defaults to 3000.

Use one KEY=value assignment per line. Do not add JavaScript-style commas. Keep real credentials in your local .env file.

### 4. Start the backend

In one terminal:

```sh
cd backend
npm run dev
```

The API listens on http://localhost:3000 by default, with routes under /api. A successful startup prints the HTTP port and the database connection result.

Start the backend from its own directory so dotenv can locate backend/.env.

### 5. Start the frontend

In another terminal, starting from the project root:

```sh
cd frontend
npm run dev
```

Open the URL printed by Vite, usually http://localhost:5173.

The API address is currently defined in [frontend/src/services/api.js](frontend/src/services/api.js) as http://localhost:3000/. Update this address if you change the backend host or port.

## Using the application

1. Open the registration page and create an account.
2. Sign in using your email and password.
3. Choose Pomodoro or Cornell from Home.
4. Select **Criar novo caderno** (Create new notebook), or choose a saved notebook.
5. Add a title and notes. Optionally paste a YouTube URL and select **Carregar vídeo** (Load video).
6. Select **Salvar caderno** (Save notebook). A new notebook redirects to **Cadernos** (Notebooks) after saving.
7. Expand a notebook title in Cadernos to read its contents.
8. Select **Editar** (Edit), change its contents, and select **Atualizar caderno** (Update notebook). The notebook keeps its original ID.
9. Select **Excluir** (Delete) and confirm to remove a notebook.

You can also reopen a saved notebook from the study method's notebook selector. **Trocar caderno** (Switch notebook) returns to that selector. Unsaved edits are not persisted automatically.

### Frontend routes

- / and /login — sign in.
- /cadastrar and /cadastrarUsuario — register an account.
- /home — choose a study method.
- /pomodoro — Pomodoro workspace.
- /cornell — Cornell workspace.
- /cadernos — saved notebooks.

Edit links use /pomodoro?notebook=:id or /cornell?notebook=:id to open the selected record.

## API reference

All routes use the /api prefix and JSON request/response bodies. Send Content-Type: application/json for requests with a JSON body.

### User endpoints

```text
POST   /api/users                 Register a user
POST   /api/login                 Validate credentials
GET    /api/users/list            List users
GET    /api/users/:id             Find a user by ID
GET    /api/users/email/:email    Search users by email
GET    /api/users/name/:name      Search users by name
PUT    /api/users/:id             Update supplied user fields
DELETE /api/users/:id             Delete a user
```

Name and email searches perform substring matching. Encode values included in URL paths. User search responses are arrays, including the lookup by ID. Public user responses exclude passwords.

Example registration body:

```json
{
  "name": "Alex Student",
  "email": "alex@example.com",
  "password": "replace-with-a-local-password",
  "phone": null
}
```

Registration returns HTTP 201 with the created ID. The phone field is optional.

Example login body:

```json
{
  "email": "alex@example.com",
  "password": "replace-with-a-local-password"
}
```

Successful login returns success: true and public user data. Incorrect credentials return HTTP 401. Login does not issue an authentication token.

User updates accept one or more of name, email, password, and phone. Omitted fields are preserved; phone can be cleared with null or an empty string. Although the route uses PUT, user updates are partial.

### Pomodoro endpoints

```text
POST   /api/pomodoro                  Create a notebook
GET    /api/pomodoro/user/:userId     List a user's notebooks
PUT    /api/pomodoro/:id              Update a notebook
DELETE /api/pomodoro/:id?userId=1     Delete a notebook
```

Use this complete body for both creation and update, replacing userId with an existing user's ID:

```json
{
  "userId": 1,
  "title": "Biology study session",
  "resume": "Main concepts, examples, and questions from the lesson."
}
```

The resume field stores the study notes.

### Cornell endpoints

```text
POST   /api/cornell                   Create a notebook
GET    /api/cornell/user/:userId      List a user's notebooks
PUT    /api/cornell/:id               Update a notebook
DELETE /api/cornell/:id?userId=1      Delete a notebook
```

Use this complete body for both creation and update:

```json
{
  "userId": 1,
  "title": "Photosynthesis",
  "description": "How does light influence the process?",
  "noteClass": "Class notes, definitions, and examples.",
  "resume": "A summary written in my own words."
}
```

- description stores questions and keywords.
- noteClass stores class notes.
- resume stores the summary.

### Notebook behavior and responses

- Creation returns HTTP 201 with the saved notebook, including id and userId.
- Listing returns HTTP 200 with an array ordered by ID descending. An existing user with no notebooks receives an empty array.
- Updates require the complete notebook payload and return HTTP 200 with the updated notebook and its original ID.
- Deletion requires userId in the query string and returns HTTP 200 with a confirmation message.
- Update and delete queries filter by both notebook ID and the supplied user ID. A missing matching notebook returns HTTP 404.

These user-ID filters do not authenticate the caller. See [Current limitations](#current-limitations).

Typical error statuses:

- **400:** missing fields, invalid IDs, or invalid field values.
- **401:** incorrect login credentials.
- **404:** a requested user or matching notebook does not exist.
- **409:** a duplicate email or phone number during user creation or update.
- **500:** an unexpected operation or database error.

Errors generally return a message property. Login errors also include success: false. Messages are currently in Portuguese.

## Database and validation

The complete schema is in [database/edukation.sql](database/edukation.sql).

- **User:** id, name, password, email, and optional phone. Email and non-null phone values are unique.
- **pomodoro:** id, userId, title, and resume.
- **cornell:** id, userId, title, description, resume, and noteClass.

Both notebook tables reference User(id) with ON DELETE CASCADE and ON UPDATE CASCADE. Deleting a user also deletes their notebooks.

Notebook titles must contain non-whitespace text and cannot exceed 255 characters after trimming. Notes must be strings, may be empty, and cannot exceed 65,535 UTF-8 bytes per field. IDs must be positive safe integers.

SQL statements use placeholders for supplied values. Password hashes are stored as binary data in the existing VARBINARY(50) column. New credentials use salted scrypt hashes; the login service also supports legacy plaintext credentials already stored in the database.

## Architecture

The backend separates request handling from application logic and persistence:

```text
HTTP request → Router → Controller → Service → Infrastructure → MySQL
                                       │             │
                                  DTOs / Entities   Repository contract
```

- Routes map URLs and HTTP methods to controllers.
- Controllers select response statuses and translate errors into JSON.
- Services validate input, check referenced users, and coordinate CRUD operations.
- Repository interfaces describe the available persistence operations.
- Infrastructure classes execute parameterized queries through a shared MySQL pool.

On the frontend, a shared fetch wrapper handles JSON and API errors. Method-specific services call notebook endpoints, and the shared notebook selector handles creating or reopening a notebook. The panel uses Promise.allSettled so one collection can remain visible if the other fails to load.

The Pomodoro countdown calculates remaining time from a deadline and synchronizes when the tab becomes visible again. YouTube URL parsing is shared by both workspaces.

## Tests and development commands

From the project root:

```sh
npm --prefix backend test
npm --prefix frontend run lint
npm --prefix frontend run build
```

The backend suite currently has **27 automated tests**. It exercises the actual routes, controllers, services, and SQL query calls using isolated database stubs, and also tests frontend API service integration. MySQL is not required to run the suite.

Coverage includes registration validation, password hashing and login, user searches and partial updates, duplicate-account handling, notebook field mapping, listing by user, updates without duplication, unchanged updates, deletion, invalid IDs, supplied user-ID filtering, and database error responses.

The frontend build writes generated files to frontend/dist. To preview a completed build locally:

```sh
npm --prefix frontend run preview
```

Preview serves the frontend build; it does not start the backend. The automated checks do not provide browser end-to-end coverage or verify a live MySQL connection. There is currently no backend production build/start script.

## Environment files and Git

The root .gitignore excludes .env and .env.* files at any directory depth, while allowing .env.example templates. It also excludes node_modules, build output, logs, and coverage artifacts.

- Keep your local credentials in backend/.env.
- Commit backend/.env.example as the configuration template.
- Never replace example values with real credentials in documentation or templates.

Before committing, verify the local environment file is ignored:

```sh
git check-ignore backend/.env
git ls-files -- backend/.env
```

The first command should print backend/.env. The second should produce no output. Ignore rules do not remove files already tracked by Git. If the file is tracked in your checkout, remove it from the index while preserving your local copy:

```sh
git rm --cached -- backend/.env
```

This removes the file from future commits, not from existing Git history. Replace any credentials that have already been published.

## Troubleshooting

### ENOTFOUND when connecting to MySQL

Check DB_HOST in backend/.env. It should contain a hostname or IP address, such as DB_HOST=127.0.0.1. A trailing comma becomes part of the value and can trigger DNS lookup failures. Restart the backend after changing environment variables.

### ECONNREFUSED

Confirm MySQL is running and accepting connections on the configured host. The current pool uses mysql2's default MySQL port; no DB_PORT setting is wired into the code.

### Access denied or unknown database

Verify the MySQL username, password, permissions, and DB_NAME. Run the initialization script if the database does not exist.

### Missing tables or table-name casing errors

Initialize the full schema instead of only an individual notebook script. The SQL schema creates User with an uppercase U, while backend queries use user. On systems with case-sensitive MySQL table names, align those names before running the application.

### Frontend requests fail

Keep the API running and confirm the URL in frontend/src/services/api.js matches its host and port. Check the browser Network panel and backend terminal for the response or connection error.

### YouTube video does not play

Use a valid video URL. The selected video must allow embedding; age restrictions, regional availability, or browser settings may prevent playback.

### Tests fail on an older Node.js release

Use Node.js 24. The test harness depends on native module hooks and TypeScript stripping.

## Current limitations

- Login validates credentials and stores public user data in sessionStorage. Server-side sessions, tokens, authorization middleware, and route protection are not implemented. Supplied user IDs are not verified against an authenticated identity.
- Timer progress and loaded video URLs are local to the current browser view and are not stored in MySQL.
- Notes are saved only when the save/update action succeeds; there is no autosave.
- The frontend API URL is hardcoded and must be changed manually for another environment.
- The backend enables cors without a restricted origin configuration.
- The project provides a local development workflow. Production configuration and deployment automation are not included.

## Contributing

1. Create a branch for your change.
2. Follow the existing separation between routes, controllers, services, repository contracts, and infrastructure.
3. Add meaningful tests when changing API behavior.
4. Run backend tests, frontend lint, and the frontend build.
5. Update this README when routes, setup steps, or behavior change.
6. Check that your commit excludes credentials, dependencies, and generated build output.

## Author and license

Created by **Kléber Amaro**.

This project is licensed under the [MIT License](LICENSE).
