# Project Structure

This document explains each folder and file in the project and its purpose.

---

## Root

```
Backend1-Project/
├── PROJECT.md
├── STRUCTURE.md
└── Backend/
```

- **PROJECT.md** — Project overview and notes.
- **STRUCTURE.md** — This file. Describes the folder/file structure.

---

## `Backend/`

The main application directory. Contains all server-side source code.

| File | Purpose |
|------|---------|
| `app.js` | Entry point of the application. Sets up Express, connects to the database, registers middleware (EJS, method-override, static files), and mounts routes. |
| `package.json` | Project metadata and npm dependencies (Express, Mongoose, EJS, dotenv, etc.). |

---

## `Backend/Controllers/`

Contains **controller functions** that handle the business logic for each route. Controllers are imported by the router and keep route files clean.

| File | Purpose |
|------|---------|
| `listing.controller.js` | Exports async functions for all listing operations: fetching all listings, fetching a single listing by ID, rendering the new-listing form, saving a new listing, rendering the edit form, updating a listing, and deleting a listing. |

---

## `Backend/DB/`

Handles **database connectivity**.

| File | Purpose |
|------|---------|
| `db.js` | Exports a `connectDB` function that uses Mongoose to connect to MongoDB using the `MONGO_URL` environment variable. Called once at app startup. |

---

## `Backend/init/`

Contains **seed/initialization scripts** used to populate the database with default data during development.

| File | Purpose |
|------|---------|
| `data.js` | Exports sample listing data (seed data) used to pre-populate the database. |
| `index.js` | Runs the seed operation — connects to MongoDB, clears existing listings, and inserts the sample data from `data.js`. |

---

## `Backend/models/`

Contains **Mongoose schema and model definitions** that represent the structure of documents stored in MongoDB.

| File | Purpose |
|------|---------|
| `listing.model.js` | Defines the `Listing` schema with fields: `title`, `description`, `image` (filename + url with a default), `price`, `location`, and `country`. Exports the compiled Mongoose model. |

---

## `Backend/public/`

Holds **static assets** served directly to the browser. Express is configured to serve this folder via `express.static`.

```
public/
└── css/
    └── style.css
```

| File | Purpose |
|------|---------|
| `css/style.css` | Custom CSS styles applied globally across all EJS views. |

---

## `Backend/Routes/`

Contains **Express router files** that map HTTP methods and URL paths to controller functions.

| File | Purpose |
|------|---------|
| `listing.route.js` | Defines all `/listing` routes: `GET /` (index), `GET /:id` (show), `GET /new` (new form), `POST /` (create), `GET /:id/edit` (edit form), `PUT /:id` (update), `DELETE /:id` (delete). |

---

## `Backend/views/`

Contains all **EJS templates** rendered by the server. Organized into sub-folders by concern.

```
views/
├── home/
│   └── home.ejs
├── includes/
│   ├── navbar.ejs
│   └── footer.ejs
├── layouts/
│   └── boilerplate.ejs
└── listings/
    ├── index.ejs
    ├── show.ejs
    ├── new.ejs
    └── edit.ejs
```

### `views/home/`
| File | Purpose |
|------|---------|
| `home.ejs` | Landing page rendered at the root route `/`. |

### `views/includes/`
Reusable partial templates injected into other views.

| File | Purpose |
|------|---------|
| `navbar.ejs` | Navigation bar partial included in the layout. |
| `footer.ejs` | Footer partial included in the layout. |

### `views/layouts/`
| File | Purpose |
|------|---------|
| `boilerplate.ejs` | Master layout template powered by `ejs-mate`. Wraps all other views with the common HTML shell (head, navbar, footer). |

### `views/listings/`
Templates for CRUD operations on listings.

| File | Purpose |
|------|---------|
| `index.ejs` | Displays all listings in a grid/list. |
| `show.ejs` | Displays the full details of a single listing. |
| `new.ejs` | Form to create a new listing. |
| `edit.ejs` | Form to edit an existing listing. |

---

## Tech Stack Summary

| Technology | Role |
|------------|------|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB + Mongoose** | Database and ODM |
| **EJS + ejs-mate** | Templating engine with layout support |
| **dotenv** | Environment variable management |
| **method-override** | Enables PUT/DELETE from HTML forms |
| **nodemon** | Auto-restarts server during development |
