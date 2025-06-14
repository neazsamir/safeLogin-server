This API is a **real-world user authentication system** using JWT (JSON Web Tokens) with cookies. You can use it to **register, log in, get user data, and log out**.

---

## 🌐 Base URL

```
http://localhost:3000/api/auth
```

_(Make sure your frontend is running at `http://localhost:8158` or `http://localhost:5173`, since the backend allows requests only from there.)_

---

## 📦 1. Register New User

**POST** `/register`

### 🔸 Request Body (JSON)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 🔸 Response Example
```json
{
  "success": true,
  "msg": "Account created",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "__v": 0
  }
}
```
👉 You can use the msg field value as toast message.

📌 **Note**: A cookie named `jwt` will be sent automatically by the server. You don’t need to store the token manually.

**So add this line in your request (fetch())**:
```json
credentials: 'include'
```

---

## 🔐 2. Login User

**POST** `/login`

### 🔸 Request Body (JSON)
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 🔸 Response Example
```json
{
  "success": true,
  "msg": "Welcome back John Doe",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

👉 This also sets the `jwt` cookie for authentication.

---

## 👤 3. Get User Data (Protected)

**GET** `/userData`

📌 This route requires the `jwt` cookie sent from previous login.

### 🔸 Headers to Send
```http
credentials: include
```

If you're using `fetch`, write:
```js
fetch('/api/auth/userData', {
  method: 'GET',
  credentials: 'include'
})
```

### 🔸 Response Example
```json
{
  "success": true,
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🚪 4. Logout

**POST** `/logout`

### 🔸 Request Example
```js
fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
})
```

### 🔸 Response Example
```json
{
  "success": true,
  "msg": "Logged out"
}
```

📌 The `jwt` cookie will be cleared on logout.

---

## 🧠 Things to Know

- This API uses **cookies** to store the JWT token (you don’t have to store it manually in localStorage).
- Always send `credentials: "include"` when using `fetch()` for protected routes.
- You don’t need to worry about hashing passwords or token generation — it’s handled by the backend.
- Validation is strict: invalid email, short name/password will throw errors.

---

## ✅ Test Quickly with Postman or Thunder Client

Make `POST`/`GET` requests using those tools. Check that cookies are being sent back by the server.

---

## 💡 Example Frontend Fetch Code

```js
// Register
await fetch("http://localhost:3000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John",
    email: "john@example.com",
    password: "password123"
  }),
  credentials: "include"
})

// Get User Data
await fetch("http://localhost:3000/api/auth/userData", {
  method: "GET",
  credentials: "include"
})
```

---

## 🧪 Debug Tips

- If you’re getting `Unauthorized`, check if your cookie is being sent.
- Always set `credentials: "include"` in `fetch()`.
- Register/Login before accessing protected routes.

