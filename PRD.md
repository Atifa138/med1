# MediGuide AI – Multi-Agent Medical Report Navigator

## Project Objective

Build a Full Stack AI Agent application that helps users understand their medical reports using RAG and multiple AI agents.

The application should assist users by explaining medical reports, identifying abnormal values, explaining medical terminology, preparing doctor visit questions, suggesting general lifestyle guidance from trusted sources, emailing the report summary, and maintaining analysis history.

This application is for educational purposes only and must not provide medical diagnosis.

---

## Target Users

* Patients
* Elderly users
* Family members
* Students wanting to understand reports before consulting a doctor

---

## Core Features

* User Registration
* User Login
* Upload Medical Report (PDF)
* Ask Questions about the Report
* AI Analysis
* Email Analysis
* History Dashboard
* Download Analysis

---

## Tech Stack

Frontend:

* React
* Vite
* Tailwind CSS

Backend:

* FastAPI

Authentication:

* Firebase Authentication

AI Framework:

* CrewAI

RAG:

* LangChain
* ChromaDB

Deployment:

* Vercel (Frontend)
* Railway (Backend)

---

## AI Agent Requirements

Minimum 6 AI agents.

Retriever, Researcher and Summarizer agents must NOT be counted.

Each agent must use at least one real tool.

---

## RAG Knowledge Sources

* Uploaded Medical Reports
* Medical Reference PDFs
* WHO Guidelines
* Trusted Patient Education Documents

---

## Expected Workflow

Login

↓

Upload PDF

↓

RAG retrieves relevant medical knowledge

↓

CrewAI agents collaborate

↓

Generate structured report

↓

Email report

↓

Save history

↓

Display results

---

## Safety

The application must clearly state that it does not diagnose diseases and is not a replacement for professional medical advice.
********************************
# AI Agents

## Agent 1: Medical Report Interpreter

**Role:** Reads the uploaded medical report and explains the report in simple language.

**Tool Used:**

* PDF Parser Tool

**Task:**
Extract and explain important findings from the uploaded report.

---

## Agent 2: Medical Terminology Explainer

**Role:** Explains difficult medical terms in plain English.

**Tool Used:**

* Medical Knowledge RAG Search Tool

**Task:**
Find trusted explanations for medical terms using the RAG knowledge base.

---

## Agent 3: Abnormal Value Analysis Agent

**Role:** Identifies values that are outside the normal reference range and highlights them.

**Tool Used:**

* Report Analysis Tool

**Task:**
Compare report values with reference ranges and identify items that may require discussion with a healthcare professional.

---

## Agent 4: Doctor Visit Preparation Agent

**Role:** Helps the user prepare for a doctor's appointment.

**Tool Used:**

* Checklist Generator Tool

**Task:**
Generate useful questions and a checklist to discuss with the doctor.

---

## Agent 5: Lifestyle Guidance Agent

**Role:** Suggests general lifestyle recommendations based only on trusted medical references.

**Tool Used:**

* RAG Knowledge Search Tool

**Task:**
Provide general educational guidance such as healthy eating, hydration, exercise, and follow-up recommendations without diagnosing or prescribing treatment.

---

## Agent 6: Notification & Record Agent

**Role:** Creates the final report, emails it to the user, and stores the analysis history.

**Tools Used:**

* Gmail Tool
* Database Tool

**Task:**
Prepare the final report, send an acknowledgement email, and save the analysis for future reference.
***************************************************
# Tools

## Tool 1: PDF Parser Tool

**Purpose:**
Extract text from uploaded medical report PDFs.

**Used By:**
Medical Report Interpreter Agent

---

## Tool 2: RAG Knowledge Search Tool

**Purpose:**
Search the vector database (ChromaDB) using LangChain and retrieve relevant medical information from uploaded reports and trusted medical reference PDFs.

**Used By:**

* Medical Terminology Explainer Agent
* Lifestyle Guidance Agent

---

## Tool 3: Clinical Report Analysis Tool

**Purpose:**
Analyze extracted report values, compare them with the report's reference ranges (when available), and highlight values that should be discussed with a healthcare professional.

**Used By:**
Clinical Insight Agent

---

## Tool 4: Checklist Generator Tool

**Purpose:**
Generate a personalized doctor visit checklist and suggested discussion questions.

**Used By:**
Doctor Visit Preparation Agent

---

## Tool 5: Gmail Email Tool

**Purpose:**
Send the completed analysis report to the user's registered email.

**Used By:**
Notification & Record Agent

---

## Tool 6: Database Tool

**Purpose:**
Store uploaded reports, analysis history, timestamps, and previous results.

**Used By:**
Notification & Record Agent
