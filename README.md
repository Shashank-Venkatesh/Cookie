# 🍪 Cookies in Web Development

## 📌 Overview
Cookies are small pieces of data stored in a user's browser by a website. They help websites remember **user preferences, login sessions,** and other browsing activities. Cookies are mainly used for **authentication, tracking user sessions,** and storing **user-specific information**.

## 🔍 How Do Cookies Work?
1. When a user visits a website, the **server sends a cookie** along with the HTTP response.
2. The **browser stores the cookie** and sends it back to the server with every subsequent request.
3. The **server reads the cookie** to retrieve user information and provide a **personalized experience**.

🔹 **Types of Cookies:**
- **Session-based cookies** 🕒 *(deleted when the browser is closed)*
- **Persistent cookies** 📁 *(stored for a specific time)*
- **HTTP-only cookies** 🔒 *(not accessible via JavaScript for security purposes)*

---

## 🚀 Features
✅ **Stores user session data**  
✅ **Secure authentication with HTTP-only cookies**  
✅ **Persistent and session-based cookies support**  
✅ **Prevents unauthorized JavaScript access**  

---

## 🛠 Tech Stack
🖥️ **Backend**: Node.js, Express.js  
🔧 **Middleware**: cookie-parser  

---

## ⚙️ Setting Up a Basic Cookie Project
### 📦 Packages to Install
To create a basic **Node.js** project handling cookies, install the following packages:

```sh
📌 npm init -y  # Initialize Node.js project
📌 npm install express cookie-parser
📌 npm install --save-dev nodemon  # Optional for development
