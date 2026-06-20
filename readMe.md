# Eventful Backend

Eventful is a simple event ticketing backend built with Node.js, Express, MongoDB, and Paystack.

The platform allows creators to create and manage events, while event attendees can purchase tickets, receive QR-coded tickets, and check into events.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control

Roles:

- Creator
- Eventee

---

### Event Management

Creators can:

- Create events
- Update events
- Delete events
- View their events

Eventees can:

- View all events
- View event details

---

### Payments

Integrated with Paystack.

Features:

- Initialize payment
- Verify payment
- Automatic ticket generation after successful payment

---

### Ticketing

- QR code ticket generation
- View purchased tickets
- Verify tickets
- Check-in attendees
- Prevent duplicate ticket usage

---

### Analytics

Creators can view:

- Total events created
- Total tickets sold
- Total attendees checked in
- Revenue per event

---

### Social Sharing

Generate event share links for:

- WhatsApp
- Facebook
- X (Twitter)

---

### API Documentation

Swagger documentation is available for testing and exploring API endpoints.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Paystack
- Swagger

---

## Project Structure

```text
src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── swagger/
├── utils/
│
├── app.js
└── server.js
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd eventful-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI

JWT_SECRET

PAYSTACK_SECRET_KEY
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

## API Documentation

Swagger documentation is available at:

```text
http://localhost:5000/api-docs
```

---

## Main API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Events

```http
POST   /api/events
GET    /api/events
GET    /api/events/:id
PUT    /api/events/:id
DELETE /api/events/:id
GET    /api/events/my-events
```

### Payments

```http
POST /api/payments/initialize
POST /api/payments/verify
```

### Tickets

```http
GET  /api/tickets/my-tickets
POST /api/tickets/verify
POST /api/tickets/check-in
```

### Analytics

```http
GET /api/analytics/dashboard
GET /api/analytics/events
GET /api/analytics/event/:eventId
```

---

## Future Improvements

- Paystack Webhooks
- Email Notifications
- Event Categories
- Event Search & Filtering
- Pagination
- Cloud Storage for QR Codes
- Reminder Scheduling
- Admin Dashboard

---

## Author

Built as an MVP Event Ticketing Backend using Node.js, Express, MongoDB, and Paystack.
