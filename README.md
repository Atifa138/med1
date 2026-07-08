

# 🩺 MediGuide AI – Medical Report Navigator

An AI-powered Medical Report Analysis platform built using **FastAPI, React, CrewAI, RAG, ChromaDB, and Groq LLM**.

Users can upload medical reports in PDF format and receive AI-generated explanations, risk assessment, medical term explanations, lifestyle recommendations, and report summaries using multiple AI agents.

---

# 🚀 Live Demo

## Frontend
https://med1-jpzrpbn84-atifa138s-projects.vercel.app

## Backend
https://med1-production.up.railway.app

---

# 📌 Problem Statement

Medical reports are difficult for patients to understand because they contain complex medical terminology and technical laboratory values.

MediGuide AI simplifies these reports using Retrieval-Augmented Generation (RAG) and multiple AI agents, providing clear explanations and personalized insights.

---

# ✨ Features

- User Registration & Login
- Secure Authentication
- Upload Medical Reports (PDF)
- AI-powered Medical Report Analysis
- Risk Assessment
- Medical Terminology Explanation
- Lifestyle Recommendations
- Medical Report Summary
- Dashboard & Report History
- Retrieval-Augmented Generation (RAG)
- Multi-Agent AI System

---

# 🤖 AI Agents

The application uses multiple specialized AI agents:

### Medical Report Analyst
Analyzes the uploaded report and generates a detailed explanation.

### Risk Assessment Specialist
Identifies abnormalities and predicts possible health risks.

### Medical Terminology Expert
Explains complex medical terms in simple language.

### Lifestyle Advisor
Suggests diet, exercise, and lifestyle improvements.

### Medical Summary Generator
Creates a concise summary of the report.

---

# 🧠 RAG (Retrieval-Augmented Generation)

The application uses RAG to improve AI accuracy.

Workflow:

1. Upload PDF
2. Extract text
3. Split into chunks
4. Generate embeddings
5. Store embeddings in ChromaDB
6. Retrieve relevant chunks
7. Send retrieved context to AI agents
8. Generate final response

Knowledge Source:

- Uploaded Medical Reports (PDF)
- ChromaDB Vector Database

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS

## Backend
- FastAPI
- SQLAlchemy
- SQLite

## AI
- CrewAI
- Groq Llama 3.3 70B
- LangChain

## RAG
- ChromaDB
- HuggingFace Embeddings
- Sentence Transformers

## Deployment
- Railway (Backend)
- Vercel (Frontend)

---

# 📂 Project Structure

```
med1/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Atifa138/med1.git
```

## Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
GROQ_API_KEY=YOUR_GROQ_KEY
GROQ_MODEL=llama-3.3-70b-versatile

DATABASE_URL=sqlite:///./mediguide.db

UPLOAD_DIR=uploads
```

---

# 🏗️ System Architecture

```
React Frontend (Vercel)
            │
            ▼
FastAPI Backend (Railway)
            │
     ┌──────┴────────┐
     │               │
 SQLite         ChromaDB
     │               │
     └──────┬────────┘
            │
         CrewAI
            │
 ┌──────────┼──────────┐
 │          │          │
Medical   Risk     Lifestyle
Agent     Agent      Agent
 │
 ▼
Groq Llama 3.3 70B
```

---

# 📸 Screenshots

- Login Page
- Dashboard
- Upload Report
- AI Analysis
- Report History

(Add screenshots here.)

---

# 🎯 Future Enhancements

- Blockchain Integration
- Multi-language Support
- OCR for Scanned Reports
- Doctor Portal
- Patient Portal
- Appointment Booking

---

# 👨‍💻 Developer

**Mohammed Idris**

---

# ⭐ If you like this project

Please give this repository a ⭐ on GitHub.