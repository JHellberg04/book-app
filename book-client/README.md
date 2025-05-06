# 💗 Book Client

Frontend for the **Book App**, built with **Vue 3** and **TypeScript**.
This SPA interfaces with the Book API to manage users, books, and reviews.

---

## ⚙️ Planned Features

* 🔐 Login & registration forms
* 🛠 Admin panel for managing users and books
* 📚 Public book list with search and filters
* 📖 Individual book view with reviews
* ✍️ Form to submit reviews (logged-in users)

---

## 🛠 Tech Stack

| Tech       | Purpose                   |
| ---------- | ------------------------- |
| Vue 3      | JavaScript framework      |
| TypeScript | Typed JavaScript          |
| Pinia      | State management          |
| SCSS       | Styling                   |
| Vite       | Development/build tooling |

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

Runs at: `http://localhost:5173`

Make sure `book-api` is also running on port `3000`.

---

## 📁 Project Structure (planned)

```bash
book-client/
├── src/
│   ├── components/     # Vue components
│   ├── pages/          # View-level pages
│   ├── store/          # Pinia stores
│   ├── assets/         # Styles and images
│   └── main.ts         # App entry
├── index.html
└── README.md
```

---

> API base URL: `http://localhost:3000`

---

## 📚 Related Documentation

- 🔙 Project overview: [`../README.md`](../README.md)
- 🌐 Backend: [`../book-api/README.md`](../book-api/README.md)
