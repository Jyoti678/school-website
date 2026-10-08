# School Website & Admin CMS

A full-stack school website and content management system built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

The platform combines a responsive public-facing website with a protected admin CMS for managing school content, notices, events, faculty, gallery items, admissions, and enquiries.

**Live Demo:** https://school-cms-backend-1ql5.onrender.com/

---

## Technical Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL with `mysql2/promise` connection pooling
* **Authentication:** HTTP-only session cookies with `express-session` and `bcryptjs`
* **API:** RESTful API architecture
* **File Storage:** Replaceable storage abstraction with local storage for development
* **Security:** Rate limiting, Helmet security headers, input sanitization, and file type/size validation
* **Deployment:** Render
* **Development:** Git, npm

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      Browser        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ HTML / CSS / JS     │
                    │ Public + Admin UI   │
                    └──────────┬──────────┘
                               │
                         REST API Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express.js      │
                    │    REST API        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
          Controllers     Middleware       Routes
                │
                ▼
             Models
                │
                ▼
          MySQL Database

         File Uploads
              │
              ▼
       Storage Abstraction
              │
              ▼
        Local Storage*
```

`*` The current implementation uses local storage for development. The storage layer is designed to be replaceable with cloud/object storage.

---

## Key Engineering Work

* Designed a structured Express.js backend using routes, controllers, middleware, and database models.
* Built REST APIs for public content and protected administrative operations.
* Implemented session-based authentication with HTTP-only cookies and bcrypt password hashing.
* Added MySQL connection pooling and prepared database queries.
* Implemented validation for user input and uploaded files.
* Added security middleware including Helmet and rate limiting.
* Built a replaceable storage abstraction to allow future cloud-storage integration.
* Developed separate public and administrative interfaces for content management.

---

## Features

### Public Website

* Responsive school website with multiple content sections.
* Dynamic school information retrieved from MySQL.
* Principal's message and faculty information.
* Academics and facilities sections.
* Notice board and events.
* Photo gallery.
* Admission enquiry form.
* Contact enquiry form.
* Prospectus and notice attachment downloads.

### Admin CMS

Protected administrative interface for managing:

* **School Settings:** Name, logo, address, phone, email, timings, map embed, and social links.
* **Page Content:** About section, Principal's Message, academics, and admission information.
* **Facilities:** Create, edit, delete, reorder, and control visibility.
* **Faculty:** Create, edit, delete, assign departments, and reorder.
* **Notices:** Create announcements, set publish/expiry dates, attach files, and control publishing status.
* **Events:** Schedule events, upload posters, and manage locations and times.
* **Gallery:** Upload photos, assign categories, and reorder items.
* **Enquiries:** View, filter, mark as read/unread, and delete admission and contact enquiries.

---

## Project Structure

```text
school-website/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── storage/
│   ├── uploads/
│   ├── schema.sql
│   ├── seedAdmin.js
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── admin/
│   └── *.html
│
└── README.md
```

---

## Running Locally

### Prerequisites

* Node.js 18+
* MySQL Server
* npm

### 1. Clone the repository

```bash
git clone https://github.com/Jyoti678/school-website.git
cd school-website
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_cms
SESSION_SECRET=replace_with_a_secure_random_value
STORAGE_DRIVER=local
```

**Never commit your `.env` file or real credentials to GitHub.**

### 3. Initialize the database

```bash
npm run seed
```

The seed process creates the required database tables and development data.

### 4. Start the application

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The application runs locally at:

```text
http://localhost:5000
```

---

## Authentication

The admin area is protected using session-based authentication.

For local development, create an administrator through the project's seed/configuration workflow.

**Do not use default or shared credentials in production.**

Production secrets such as database passwords and session secrets should be provided through environment variables.

---

## Storage Architecture

The application uses a storage abstraction so that the underlying file-storage implementation can be changed without rewriting the controllers or database layer.

Current implementation:

```text
Upload
   ↓
Storage Interface
   ↓
Local Storage Provider
   ↓
backend/uploads/
```

The abstraction can later be extended to providers such as object/cloud storage.

To add another provider:

1. Implement the storage interface in `backend/src/storage/`.
2. Implement file upload and deletion operations.
3. Register the provider through the storage configuration.
4. Select the provider through the environment configuration.

---

## Security Considerations

The application includes several security-focused measures:

* HTTP-only session cookies
* Password hashing with bcrypt
* Prepared database queries
* Helmet security headers
* Rate limiting
* Input sanitization
* File type validation
* File size limits
* Environment-based configuration for secrets
* Protected administrative routes

This is a personal/educational project and should undergo additional security review, monitoring, deployment hardening, and testing before being used for sensitive production workloads.

---

## Known Limitations

* Current file storage uses local/server storage rather than persistent cloud object storage.
* The authentication workflow is currently designed around the project's administrative use case.
* Automated test coverage can be expanded.
* Production deployment would benefit from additional monitoring, logging, backup, and security hardening.

---

## Future Improvements

* Cloud object storage integration.
* Automated test coverage for API and authentication flows.
* Improved admin dashboard UX.
* Role-based access control for multiple administrators.
* Database migration tooling.
* Automated CI/CD checks.
* Centralized logging and monitoring.

---

## Project Links

**Repository:** https://github.com/Jyoti678/school-website

**Live Demo:** https://school-cms-backend-1ql5.onrender.com/
