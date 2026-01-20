# Blog Platform – Frontend (React + TypeScript)

This project is the frontend of a blog platform built with **React** and **TypeScript**.  
The main goal of this project was **learning real-world frontend architecture**, not just making features work.

It focuses on authentication flows, error handling, API integration, and user experience decisions that mirror production applications.

---

## Tech Stack

- **React**
- **TypeScript**
- **Axios**
- **React Router**
- **Mantine UI**
- **JWT-based Authentication**

---

## Core Features

- User authentication (login / register)
- Create, update, delete posts
- Draft & publish workflow
- Category & tag management
- Protected routes
- Global API error handling
- User-friendly notifications

---

## What I Focused On (Learning Goals)

### 1. Authentication & Authorization Flow

- JWT-based authentication
- Global Axios response interceptor
- Clear separation between:
  - **401 Unauthorized** → session expired / not logged in
  - **403 Forbidden** → logged in but not allowed
- Avoided frontend-based authorization logic
- Backend is the final authority for permissions

**Key takeaway:**  
Frontend should *never* assume security — it should react to backend responses.

---

### 2. Global Error Handling Strategy

- Implemented a global Axios response interceptor
- Centralized handling for:
  - expired sessions
  - authentication failures
- Avoided overhandling errors at API-call level
- Used local error handling only where user feedback matters

**Key takeaway:**  
Not every API needs a custom error handler — clarity beats overengineering.

---

### 3. UX-Oriented Error Feedback

- Used notifications for:
  - success states
  - failure states
  - authentication issues
- Disabled actions when the user is not authenticated
- Prevented silent failures (e.g., failed delete actions)

**Key takeaway:**  
Good UX is about *clear communication*, not just correct behavior.

---

### 4. API Integration & Responsibility Boundaries

- Frontend never validates business rules
- Backend controls:
  - ownership checks
  - permission checks
  - validation errors
- Frontend reacts to API responses only

**Key takeaway:**  
Frontend logic should reflect backend contracts, not duplicate them.

---

### 5. Routing & Protected Pages

- Used protected routes for authenticated-only pages
- Allowed navigation where appropriate, but relied on backend enforcement
- Handled edge cases like:
  - accessing deleted posts
  - navigating to non-existent resources

---

### 6. Avoiding Overengineering (Intentional Design Decisions)

Examples of **intentional non-features**:
- No `/me` endpoint for user info
- No client-side author checks
- No duplicated validation logic

These were consciously skipped to keep the project focused and realistic.

**Key takeaway:**  
Knowing *what not to build* is as important as knowing what to build.

---

## Project Structure (Simplified)

src/
├── api/ # API calls
├── auth/ # Auth context & utilities
├── pages/ # Route pages
├── components/ # Reusable UI components
├── utils/ # Helpers (error handling, etc.)
├── axiosInstance.ts # Global Axios config

## What This Project Represents

This project represents my transition from:
> “Making frontend features work”

to:
> “Building frontend systems that cooperate correctly with backend logic”

It reflects how frontend behaves in **real production environments**, not just tutorials.

---

## Status

✅ **Completed as a learning project**  
Further improvements are intentionally paused to move on to a portfolio-grade project.

---

## Future Improvements (Optional)

- User profile endpoint (`/me`)
- Improved UI polish
- Optimistic UI updates
- Better accessibility

---

## Summary

This project helped me gain confidence in:
- React + TypeScript
- Authentication flows
- Error handling design
- Frontend–backend responsibility separation
- Building maintainable frontend architecture

---

**Author:** Leon
