# School Website + Admin CMS (MVP)

A production-ready **School Website and School Admin CMS** built with Vanilla HTML5/CSS3/JavaScript, Node.js, Express.js, and MySQL.

---

## Technical Stack

- **Frontend**: HTML5, CSS3 (Custom Design Tokens), Vanilla JavaScript (No React/Vue/Angular).
- **Backend**: Node.js, Express.js (REST API).
- **Database**: MySQL using `mysql2/promise` connection pool.
- **Authentication**: HTTP-only session cookies with `express-session` & `bcryptjs` password hashing.
- **File Storage**: Abstracted Storage Driver (Default `LocalStorageProvider` uploading to `/backend/uploads/`; swappable to S3/Cloud storage for production).
- **Security**: Rate limiting, Helmet security headers, input sanitization, file type & size validation (max 5MB).

---

## Directory Structure

```
demo/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection pool (db.js) & Env validation (env.js)
│   │   ├── controllers/        # Request controllers (auth, public, admin)
│   │   ├── middleware/         # Auth session check, error handler, Multer upload
│   │   ├── models/             # MySQL query models (prepared statements)
│   │   ├── routes/             # Public (/api/public/*) & Admin (/api/admin/*) REST routes
│   │   └── storage/            # Replaceable storage abstraction (localStorage.js)
│   ├── uploads/                # Local dev media storage directory
│   ├── schema.sql              # MySQL schema & initial seed data
│   ├── seedAdmin.js            # Admin user creation & db seed script
│   ├── server.js               # Express HTTP server entry point
│   └── .env.example
├── frontend/
│   ├── css/                    # Custom CSS variables, public styling & admin dashboard layout
│   ├── js/                     # API fetch client wrapper, public binding, and admin CMS controller
│   ├── admin/                  # Multi-page Admin CMS HTML interface (login, dashboard, content editors)
│   └── *.html                  # 11 Public Web pages (Home, About, Principal, Academics, etc.)
└── README.md
```

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server (or MySQL Workbench) running locally

### 2. Environment Configuration
Copy `.env.example` to `.env` inside the `backend` directory and adjust MySQL credentials if needed:

```bash
cd backend
cp .env.example .env
```

Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_cms
SESSION_SECRET=school_admin_secret_key_2026
STORAGE_DRIVER=local
```

### 3. Install Dependencies & Seed Database
```bash
cd backend
npm install
npm run seed
```

Running `npm run seed`:
- Creates the `school_cms` database and tables.
- Inserts initial demo school settings, notices, facilities, faculty, events, and gallery items.
- Creates the default admin account:
  - **Username**: `admin`
  - **Password**: `admin123`

### 4. Start Server
```bash
npm start
```
Or for development watching:
```bash
npm run dev
```

---

## Accessing the Website & Admin Panel

- **Public Website**: [http://localhost:5000/index.html](http://localhost:5000/index.html)
- **Admin CMS Login**: [http://localhost:5000/admin/login.html](http://localhost:5000/admin/login.html)
  - **Username**: `admin`
  - **Password**: `admin123`

---

## Features

### Public Website
- Dynamic data binding for all 11 core sections:
  - **Home**, **About School**, **Principal's Message**, **Academics**, **Facilities**, **Faculty Directory**, **Notice Board**, **Events**, **Photo Gallery**, **Admissions**, **Contact Us**.
- Interactive **Admission Enquiry** and **Contact Enquiry** submission forms stored directly in MySQL.
- Downloadable Prospectus & Notice attachments (PDF/Doc).

### Admin CMS (`/admin/`)
- Multi-page secure administrative portal:
  - **School Settings**: Update name, logo, address, phone, email, timings, map embed, social links.
  - **Pages Content**: Update About sections, Principal's Message & photo, Academic info, and Admissions schedule.
  - **Facilities Management**: Create, edit, delete, reorder, and toggle visibility.
  - **Faculty Management**: Create, edit, delete, assign departments, and reorder.
  - **Notices Management**: Post announcements, set publish/expiry dates, attach files, toggle publish status.
  - **Events Management**: Schedule events, upload posters, set locations & times.
  - **Gallery Management**: Upload photos, assign categories, reorder.
  - **Enquiries Inbox**: Read, mark read/unread, filter, and delete Contact & Admission applications.

---

## Replacing File Storage for Production

To replace the local development file storage with cloud storage (e.g. AWS S3 or Cloudinary):
1. Implement a new class inheriting from `BaseStorageProvider` in `backend/src/storage/`.
2. Implement `uploadFile(file)` and `deleteFile(fileUrl)`.
3. Export the new driver based on `process.env.STORAGE_DRIVER`.
No database schema or controller changes are required.
