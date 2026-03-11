# Crystal Gems - Run Instructions

This guide provides step-by-step instructions to get the Crystal Gems application (FastAPI backend and Vite/React frontend) running on your local machine.

## Prerequisites

- **Python 3.14+** (ensure it's in your PATH)
- **Node.js & npm** (modern versions)

---

## 1. Backend Setup (FastAPI)

Open a terminal in the root directory (`Crystal-Gems`).

### Install Dependencies
```powershell
pip install -r backend/requirements.txt
```

### Seed the Database (Optional)
This will create the database file and populate it with initial service data.
```powershell
py backend/seed.py
```

### Run the Backend
Navigate to the `backend` directory and start the server.
```powershell
cd backend
uvicorn app.main:app --reload
```
The backend will be available at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

---

## 2. Frontend Setup (Vite / React)

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

- **"no such table: services"**: This occurs if you try to run the frontend or seed script without initializing the database. I have updated `backend/seed.py` to automatically create tables now.
- **Port Conflicts**: Ensure ports `8000` and `5173` are not being used by other applications.
