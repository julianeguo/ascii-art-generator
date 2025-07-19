# 🎨 ASCII Art Generator

Turn images and live webcam feeds into ASCII art :-D
Made with 💻 by [Juliane Guo](https://github.com/julianeguo)

🔗 **Live App**: [ascii-art-generator](https://julianeguo.github.io/ascii-art-generator/#/)  
💻 Built with React + Flask + OpenCV

---

## ✨ Features

- 🖼️ **Image Upload** — Select any image and convert it into ASCII instantly.
- 🎥 **Live Webcam to ASCII** — See yourself in real-time ASCII using your webcam.
- 🚀 **Deployed Frontend** — Hosted on GitHub Pages for easy access.
- 🔧 **Flask Backend** — Image processing powered by Python and OpenCV.
- 🌐 **CORS Enabled** — Seamless interaction between frontend and backend.

---

## 📦 Tech Stack

| Frontend            | Backend             |
|---------------------|---------------------|
| React (Vite)        | Flask (Python)      |
| Tailwind CSS        | OpenCV              |
| GitHub Pages        | Render              |
| react-webcam        | flask-cors          |


## 🚀 Running Locally

### 1. Clone the Repository
- git clone https://github.com/julianeguo/ascii-art-generator.git
- cd ascii-art-generator

### 2. Start Backend
- cd back-end
- pip install -r requirements.txt
- python server.py

### 3. Start Frontend
- cd front-end-react
- npm install
- npm run dev
- Then visit http://localhost:5173

## 🧪 Deployment Info

### Frontend deployed with GitHub Pages
- Ensure vite.config.js has the correct base: '/ascii-art-generator/'
- Deployed from front-end-react directory
### Backend deployed on Render
- Host set to 0.0.0.0, port 5000
- flask-cors handles CORS between frontend/backend
- Add all dependencies in requirements.txt

## ⚠️ Known Issues

### If ASCII output isn’t loading:
- Try Incognito Mode (browsers may cache localhost)
- Confirm backend is live on Render
- Render free tier may take time to wake up on first access
