## Multi-Authentication System 🚀

This project is a multi-authentication system that includes features such as user registration, login, logout, and authentication via Google and GitHub OAuth. Additionally, it provides a user dashboard

## 🌟 Features

- 🔒 **User Registration and Login**
  - Traditional email and password authentication using Passport.js.
- 🌐 **OAuth Integration**
  - Google and GitHub authentication support.
- 📧 **Forget Password Flow**
  - Reset your password securely via email.
- 🛠️ **Dashboard**
  - A protected route accessible only to authenticated users.
- 🎨  **Responsive Design**
  - UI built with EJS and Bootstrap.

## 🚀 Tech Stack

| Technology        | Description                 |
| ----------------- | --------------------------- |
| 📦 **NPM**        | Dependency management       |
| ⚛️ **EJS**   | Frontend library            |
| 🟢 **Node.js**    | Backend runtime environment |
| ⚡ **Express.js** | Backend web framework       |
| 🔑 **Passport.js**        | Authentication middleware  |
| ✉️ **Nodemailer**        | Email Service for password reset  |
| 🗄️ **MongoDB**    | NoSQL Database for user data           |

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ajaykumar2pp/Multi-Authentication-NodeJS
   ```
2. Navigate to the project directory:
   ```bash
    cd multi-authentication
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   DATABASE_URL=mongodb+srv://<username>:<password>mongodb.net/USER_AUTH?retryWrites=true&w=majority
   JWT_SECRET=themyscret
   GOOGLE_CLIENT_ID=**6444762183-***************************.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-VGOKmLZdJx2oJ2WxON_***********
   EMAIL_USER=abc@gmail.com
   EMAIL_PASS=tsqp **** **** jeym
   GOOGLE_CALLBACK_URL=https://abc-coder-in.onrender.com/auth/google/callback
   GITHUB_CLIENT_ID=Ov23li8zO2Uw8c7******
   GITHUB_CLIENT_SECRET=ab882befa44617**********56695388fd7d1b07
   GITHUB_CALLBACK_URL=https://abc-coder-in.onrender.com/auth/github/callback
   ```
5. Start the development server:
   ```bash
   npm start
   ```


## 📁 Project Structure

```
Multi-Authentication/
src/
├── config/                  # Configuration files
│   └── db.config.js         # Database connection configuration
│   └── nodemailer.js        # Email service setup
├── controllers/             # Route controllers
│   └── userController.js    # Controller for authentication-related logic
├── middlewares/             # Custom middleware
│   └── auth.middleware.js   # Middleware for authentication and authorization
├── models/                  # Database models
│   └── user.model.js        # User schema and model definition
├── passport/                # Passport.js strategies
│   └── passport.js          # Passport-Local, Google & GitHub strategies
├── routes/                  # Application routes
│   └── userRoutes.js        # Routes related to authentication
├── views/                   # EJS templates
├── .env.example             # Sample environment file
├── index.js                 # Main entry point for the server
├── package.json             # Project configuration
├── README.md                # Documentation
```

## 🚦 API Endpoints

| http method | Endpoint                  | Description                                    |
|--------------|---------------------------|------------------------------------------------|
| `GET`        | `/register`                | Displays the registration page.               |
| `POST`       | `/register`                | Registers a new user.                         |
| `GET`        | `/login`                   | Displays the login page.                      |
| `POST`       | `/login`                   | Logs in the user.                             |
| `GET`        | `/auth/google`             | Initiates Google OAuth.                       |
| `GET`        | `/auth/google/callback`    | Google OAuth callback.                        |
| `GET`        | `/auth/github`             | Initiates GitHub OAuth.                       |
| `GET`        | `/auth/github/callback`    | GitHub OAuth callback.                        |
| `GET`        | `/dashboard`               | Displays the dashboard for logged-in users.   |
| `GET`        | `/forget-password`         | Displays the forget password page.            |
| `POST`       | `/forget-password`         | Sends reset password email.                   |
| `GET`        | `/check-email`             | Prompts user to check email for reset link.   |
| `GET`        | `/reset-password/:token`   | Displays the reset password page.             |
| `POST`       | `/reset-password/:token`   | Resets the user password.                     |
| `GET`        | `/success`                 | Displays success page.                        |
| `GET`        | `/logout`                  | Logs the user out.                            |



## 📷 Screenshots

## 🛡️ Security

- Encrypted passwords using bcrypt 🔒.
- Secure OAuth flows with Google and GitHub.
- Environment variables stored securely with dotenv.

## 📞 Contact

- 👤 Author: Ajay Kumar Prajapati
- 📧 Email: ajay2kumarpp@gmail.com
- 🌐 Github: https://github.com/ajaykumar2pp
