# 🌱 PlantState - AI-Powered Plant Classification  

🚀 **Live Demo:** [YouTube Presentation](https://www.youtube.com/watch?v=df5gjoeFsWk)  
📂 **GitHub Repository:** [PlantState on GitHub](https://github.com/DavidAjest/College-Project-PlantState-rep)  

---

## 📌 Overview  
**PlantState** is a web application that uses **Convolutional Neural Networks (CNNs) and Machine Learning** to classify plants based on user-uploaded images. Built with **React, Python, and Firebase Firestore**, it provides real-time classification feedback, role-based user access, and graphical reports for monitoring plant health.  

This project was developed as part of our **BSc in Information Systems** by **David Etin & Liron Michael**.  

---

## 🌟 Key Features  
- ✅ **AI-Based Plant Classification** – Uses a trained CNN model for accurate predictions  
- ✅ **Real-Time Feedback System** – Users can confirm or correct classifications to improve accuracy  
- ✅ **Role-Based Access Control** – Admins, researchers, and general users have different permissions  
- ✅ **Graphical Reports & Analytics** – View classification trends over time  
- ✅ **Firestore Database** – Stores user data, classification history, and feedback  
- ✅ **User Authentication** – Secure login and registration system  

---

## 🛠️ Technologies Used  
### **Frontend**  
- React.js (Hooks, Context API)  
- Material-UI for UI components  

### **Backend**  
- Python (Flask API)  
- TensorFlow & Keras (for CNN model)  
- Firebase Firestore (real-time database)  

### **Other Services**  
- Google Firebase Authentication  
- Chart.js for data visualization  

---



## 🚀 Installation & Setup  

### 1️⃣ Clone the Repository  


2️⃣ Install Dependencies

cd client
npm install


3️⃣ Setup Environment Variables
Create a .env file in both client and server directories.

Frontend (.env)
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>



FIRESTORE_PROJECT_ID=<Your Firestore Project ID>
CNN_MODEL_PATH=./model/plant_classifier.h5
SECRET_KEY=<Your Flask Secret Key>


4️⃣ Start the Application
Run Backend (Python Flask API)
cd server
python app.py

Run Frontend (React Client)
cd client
npm run dev


🔬 How It Works
The user uploads an image of a plant.
The CNN model processes the image and predicts the plant species.
The result is displayed along with confidence levels.
Users can confirm or correct the classification, improving model accuracy over time.
Data is stored in Firebase Firestore, and users can track classification history.


🤝 Collaboration & Credits
This project was developed by:
👨‍💻 David Etin – Machine Learning Model, Frontend improvment, Backend Database Integration
👨‍💻 Liron  –  Frontend Development, Backend API

