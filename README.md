## 🔧 Backend Architecture (Pabuyan)

Instead of a generic monolithic approach, the backend was designed for data integrity and secure administrative control.

### Key Engineering Decisions:
* **State Machine Management:** Integrated a custom flow to handle order statuses (Pending -> Confirmed -> Shipped) using **Prisma** to ensure database consistency.
* **Security First (JWT):** Implemented a stateless authentication system for the Admin Dashboard. This ensures that only the business owner can manage sensitive customer data, while keeping the client-side lightweight and session-free.
* **Scalability Migration:** Successfully refactored the legacy **Strapi** implementation into a custom **Express + Node.js** engine. 
    * *Why?* To gain full control over the database schema and optimize query performance for high-traffic wishlist creation.
* **Containerization (Docker):** Standardized the backend environment to ensure seamless deployment between local development (macOS) and production (Linux/Render).
