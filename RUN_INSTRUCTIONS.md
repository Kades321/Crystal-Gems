# Crystal Gems - Run Instructions

This guide provides step-by-step instructions to get the Crystal Gems application (FastAPI backend and Vite frontend) running on your local machine.

## Prerequisites

- **Python 3.14+** (ensure it's in your PATH)
- **Node.js & npm** (modern versions)
- **MySQL** (running locally on port 3306)

---

## 1. Backend Setup (FastAPI)

Open a terminal in the root directory (`Crystal-Gems`).

### Configure Environment Variables
Copy the example environment file and fill in your own credentials:
```powershell
cp backend/.env.example backend/.env
```
Then edit `backend/.env` with your MySQL credentials and (optionally) SMTP settings:
```dotenv
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/crystal_gems
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
BUSINESS_EMAIL=your_email@gmail.com
```

> **Note:** The `.env` file is gitignored — each developer maintains their own local copy. Never commit credentials to the repo.

### Create the MySQL Database
Open a MySQL shell and run:
```sql
CREATE DATABASE IF NOT EXISTS crystal_gems;
```

### Install Dependencies
```powershell
pip install -r backend/requirements.txt
```

### Seed the Database
This will create the tables and populate them with initial service data.
```powershell
cd backend
py seed.py
```

### Run the Backend
```powershell
cd backend
uvicorn app.main:app --reload
```
The backend will be available at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

---

## 2. Frontend Setup (Vite)

Open a **separate** terminal in the root directory.

### Install Dependencies
```powershell
cd frontend
npm install
```

### Run the Frontend
```powershell
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## Troubleshooting

- **"Access denied for user 'root'@'localhost'"**: Your MySQL password in `backend/.env` doesn't match. Double-check your `DATABASE_URL`.
- **"Unknown database 'crystal_gems'"**: You need to create the database first — see step 1 above.
- **"no such table: services"**: Run `py seed.py` from the `backend/` directory to create tables and seed data.
- **Port Conflicts**: Ensure ports `8000` and `5173` are not being used by other applications.
- **Missing `.env`**: Copy `backend/.env.example` to `backend/.env` and fill in your credentials. The app won't start without a valid `DATABASE_URL`.
