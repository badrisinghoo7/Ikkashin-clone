# Ikkashin LMS

A modern, clean, and responsive Learning Management System for students to manage assignments, submissions, and academic progress.  
Built with **React**, **Node.js**, **Express**, **MongoDB**, **Multer**, **Cloudinary**, **TailwindCSS**, and **JWT authentication**.

---

## 🚀 Live Demo

- **Frontend:** [https://ikkashin-lms.vercel.app/login](https://ikkashin-lms.vercel.app/login)
- **Backend:** [https://ikkashin-lms.onrender.com/](https://ikkashin-lms.onrender.com/)

---

## ✨ Features

- **User Authentication:** Secure login and signup using JWT.
- **Assignment Submission:** Upload assignments with title, description, file (PDF/image), student name, and student ID.
- **View Submissions:** See all your submissions in a beautiful card layout.
- **Responsive UI:** Looks great on all devices, powered by TailwindCSS.
- **Role-based Navigation:** Assignment upload only visible to logged-in users.
- **Logout:** Securely log out and clear your session.
- **MongoDB Database:** Robust and scalable data storage.
- **File Uploads:** Handled with Multer and stored on Cloudinary.

---

## 🖼️ Screenshots

### Login Page
[![ikkashin-login.png](https://i.postimg.cc/9MMS31Bb/ikkashin-login.png)](https://postimg.cc/Ny3bm6S2)

### Signup Page
[![ikkashin-signup.png](https://i.postimg.cc/W4bj3GnF/ikkashin-signup.png)](https://postimg.cc/cvjPk8P0)

### Home Page (After Login)
[![ikkashin-home-after-login.png](https://i.postimg.cc/VsbwdLjR/ikkashin-home-after-login.png)](https://postimg.cc/kD9zHCY6)

### Upload Assignment Page
[![ikkashin-assignment-upload-page.png](https://i.postimg.cc/J4VLJVxW/ikkashin-assignment-upload-page.png)](https://postimg.cc/mhwJfnKd)

### Submissions Page
[![ikkashin-submission-page.png](https://i.postimg.cc/cJHyZsxf/ikkashin-submission-page.png)](https://postimg.cc/w1SbQYsB)

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **File Uploads:** Multer (for handling file uploads), Cloudinary (for file storage)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Folder Structure

```
Ikkashin-LMS/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── submissionModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   └── submissionRoutes.js
│   │   └── userRoutes.js
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SubmissionCard.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── SubmissionForm.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
```

---

## 📦 Submission Model

```js
{
  title: String,           // Assignment title
  description: String,     // Assignment description
  fileUrl: String,         // Uploaded file (PDF/image) URL
  studentName: String,     // Name of the student
  studentId: String,       // Student ID
  submittedBy: ObjectId    // Reference to User
}
```

---

## 🔐 Authentication Flow

- **Registration & Login:**  
  - Students register and log in using `/api/users/register` and `/api/users/login`.
  - On successful login, a JWT is stored in `localStorage`.

- **Protected Routes:**  
  - Backend uses `authMiddleware` to protect sensitive routes.
  - Only authenticated users can upload assignments or view submissions.

- **Logout:**  
  - Logging out clears the JWT token from `localStorage`.

---

### 📚 API Endpoints

| Method | Route                        | Description                |
|--------|----------------------------- |----------------------------|
| POST   | `/api/users/register`        | Register new student       |
| POST   | `/api/users/login`           | Login & get JWT            |
| POST   | `/api/submissions/submit`    | Submit assignment          |
| GET    | `/api/submissions/all`       | View all submissions       |

---

## 📝 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Ikkashin-LMS.git
   cd Ikkashin-LMS
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

   **Create a `.env` file in the backend directory with the following content:**
    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.frdj16f.mongodb.net/ikkashin-lms?retryWrites=true&w=majority&appName=Cluster0
    PORT=5000
    JWT_SECRET=your_jwt_secret

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   ```bash
   npm run dev 
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Visit:**  
   - Frontend: [https://ikkashin-lms.vercel.app/login](https://ikkashin-lms.vercel.app/login)
   - Backend: [https://ikkashin-lms.onrender.com/](https://ikkashin-lms.onrender.com/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 Contact

For any queries or feedback, please contact [badri.singh8090@gmail.com](mailto:badri.singh8090@gmail.com).

---

**Made with ❤️ using React, Node.js, MongoDB,multer,cloudnary and TailwindCSS**