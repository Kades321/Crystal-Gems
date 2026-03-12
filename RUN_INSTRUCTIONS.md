# Crystal Gems - Run Instructions

This guide provides step-by-step instructions to get the Crystal Gems application running locally and deploying to production.

## Prerequisites

- **Python 3.14+** (ensure it's in your PATH)
- **Node.js & npm** (modern versions)
- **PostgreSQL** (local or via [Supabase](https://supabase.com))

---

## 1. Backend Setup (FastAPI)

Open a terminal in the root directory (`Crystal-Gems`).

### Configure Environment Variables
Copy the example environment file and fill in your own credentials:
```powershell
cp backend/.env.example backend/.env
```
Then edit `backend/.env` with your Supabase/PostgreSQL connection string and (optionally) SMTP settings:
```dotenv
DATABASE_URL=postgresql://postgres.xxxx:yourpassword@aws-0-region.pooler.supabase.com:6543/postgres
FRONTEND_URL=http://localhost:5173
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
BUSINESS_EMAIL=your_email@gmail.com
```

> **Note:** The `.env` file is gitignored — each developer maintains their own local copy. Never commit credentials to the repo.

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

> For local development, the frontend defaults to `http://localhost:8000` as the API URL. To override, set `VITE_API_URL` in a `frontend/.env` file.

---

## 3. Deployment

### Database — Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings > Database > Connection string > URI** and copy the connection string
3. Use this as your `DATABASE_URL` in your deployment environment variables

### Backend — Render
1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your repo and set the **Root Directory** to `backend`
3. Set **Build Command**: `pip install -r requirements.txt`
4. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `DATABASE_URL`, `FRONTEND_URL`, `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `BUSINESS_EMAIL`
6. Set `FRONTEND_URL` to your Vercel frontend URL (e.g. `https://your-app.vercel.app`)

### Frontend — Vercel
1. Import your repo on [vercel.com](https://vercel.com)
2. Set the **Root Directory** to `frontend`
3. Set **Framework Preset** to `Vite`
4. Add environment variable: `VITE_API_URL` = your Render backend URL (e.g. `https://your-app.onrender.com`)

---

## Troubleshooting

- **"password authentication failed"**: Your PostgreSQL password in `backend/.env` is incorrect. Double-check your Supabase connection string.
- **"no such table: services"**: Run `py seed.py` from the `backend/` directory to create tables and seed data.
- **CORS errors in browser**: Make sure `FRONTEND_URL` on the backend matches your actual frontend URL (including `https://`).
- **Port Conflicts**: Ensure ports `8000` and `5173` are not being used by other applications.
- **Missing `.env`**: Copy `backend/.env.example` to `backend/.env` and fill in your credentials. The app won't start without a valid `DATABASE_URL`.

