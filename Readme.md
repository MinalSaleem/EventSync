# EventSync — Event Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse and register for events, while admins manage events and track registrations through a dedicated dashboard.

Built as a final course project to demonstrate core MERN stack concepts including REST APIs, JWT authentication, role-based authorization, and CRUD operations.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)

---

## ✨ Features

### User Features
- User registration and login with JWT-based authentication
- Browse all available events
- Search events by title/description
- Filter events by category
- View complete event details
- Register for an event (with real-time seat availability)
- View and cancel own event registrations ("My Events")
- View personal profile

### Admin Features
- Role-based admin dashboard (Total Events, Upcoming Events, Total Registrations)
- Create, edit, and delete events
- View all events in a manageable table
- View the list of users registered for any specific event

### System Features
- Secure password hashing with bcrypt
- JWT-based stateless authentication
- Protected routes on both frontend and backend
- Prevents duplicate event registrations
- Prevents registration once an event is fully booked
- Automatic seat count management (increments/decrements on register/cancel)
- Responsive, clean UI built with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Context API (for auth state management)

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- JSON Web Token (JWT)
- bcryptjs

---

## 📁 Project Structure

```
event-management-system/
│
├── backend/
│   ├── server.js
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   └── utils/
│       └── generateToken.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── EventCard.jsx
        │   ├── EventForm.jsx
        │   ├── AdminLayout.jsx
        │   ├── PrivateRoute.jsx
        │   └── AdminRoute.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Events.jsx
        │   ├── EventDetails.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── MyEvents.jsx
        │   ├── Profile.jsx
        │   └── admin/
        │       ├── AdminDashboard.jsx
        │       ├── AddEvent.jsx
        │       ├── EditEvent.jsx
        │       ├── ManageEvents.jsx
        │       └── EventRegistrations.jsx
        ├── services/
        │   └── api.js
        ├── context/
        │   └── AuthContext.jsx
        ├── App.jsx
        └── main.jsx
```

---

## 🗄 Database Schema

**Users**
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique |
| password | String | required, hashed via bcrypt |
| role | String | `user` \| `admin`, default `user` |
| createdAt | Date | auto |

**Events**
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| description | String | required |
| category | String | required |
| date | Date | required |
| time | String | required |
| location | String | required |
| organizer | String | required |
| maxParticipants | Number | required |
| availableSeats | Number | auto-managed |
| image | String | optional URL |
| createdAt | Date | auto |

**Registrations**
| Field | Type | Notes |
|---|---|---|
| user | ObjectId | ref: `User` |
| event | ObjectId | ref: `Event` |
| registrationDate | Date | default: now |
| status | String | `confirmed` \| `cancelled` |

**Relationship:** `User (1) —< Registration >— (1) Event` — Registration acts as a junction collection linking users to the events they've registered for.

---

## 🚀 Usage

1. **Register/Login** as a user to browse and register for events.
2. **Browse events** on the Events page — search by keyword or filter by category.
3. **Register for an event** from its details page (subject to seat availability).
4. **View your registrations** and cancel them anytime from "My Events."
5. **Log in as an admin** to access the dashboard, manage events (create/edit/delete), and view who has registered for each event.

---

## 📸 Screenshots

> Add screenshots of your Home page, Events page, Event Details, and Admin Dashboard here before submission.

---

## 🔮 Future Improvements

- Email notifications for registration confirmation/cancellation
- Event image upload (instead of external URL)
- Pagination for events and registration lists
- Edit profile functionality
- Separate admin sign-up flow with invite codes

---