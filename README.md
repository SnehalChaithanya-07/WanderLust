# WanderLUST 🌍

A full-stack rental property listing platform inspired by modern travel and accommodation marketplaces.

Built with Node.js, Express, MongoDB Atlas, and Cloudinary, this project demonstrates production-level backend architecture including authentication, authorization, validation, cloud storage integration, and session management.

---

## 🚀 Live Demo

🔗 https://wanderlust-8emq.onrender.com/listings

⚠️ Note: Hosted on Render (Free Tier). Initial load may take 30–60 seconds due to cold start.

---


## Features

- User authentication (Signup/Login/Logout)
- Session-based authentication using Passport.js
- MongoDB session persistence (connect-mongo)
- Create, edit, delete property listings
- Ownership-based authorization
- Image upload using Cloudinary
- Review system with 1–5 star ratings
- Review author protection
- Search listings by country (case-insensitive)
- Flash messaging for feedback
- Server-side validation using Joi
- MVC architecture
- RESTful routing
- Cascading delete of associated reviews

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport.js (Local Strategy)
- Express Session
- Connect-Mongo
- Joi
- Method-Override

### Frontend
- EJS templating
- Bootstrap 5
- Custom CSS
- Font Awesome

### Cloud Integration
- Cloudinary (Image hosting)
- Multer + Cloudinary Storage

---

## Project Structure

```
WanderLUST/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── error.ejs
│
├── public/
│   ├── CSS/
│   └── JS/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── cloudConfig.js
├── middleware.js
├── schema.js
├── app.js
├── package.json
└── README.md
```

---

## Database Schema

### User
- username
- email
- password (hashed using passport-local-mongoose)

### Listing
- title
- description
- image (url, filename)
- price
- location
- country
- owner (User reference)
- reviews (Array of Review references)

### Review
- comment
- rating (1–5)
- author (User reference)
- createdAt

---

## Environment Variables

Create a `.env` file in the root directory:

```
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

## Installation

1. Clone the repository

```
git clone https://github.com/your-username/WanderLUST.git
cd WanderLUST
```

2. Install dependencies

```
npm install
```

3. Add `.env` file with required credentials

4. Start the server

```
node app.js
```

Server runs on:

```
http://localhost:8080
```

---

## Security Implementation

- Password hashing via passport-local-mongoose
- Session persistence using MongoDB
- HTTP-only cookies
- Joi validation for:
  - Listings
  - Reviews
- Ownership checks before edit/delete
- Review author authorization checks
- Centralized error handling using custom ExpressError class
- Async error handling wrapper

---

## Middleware Used

- isLoggedIn
- isOwner
- isReviewAuthor
- validateListing
- validateReview
- saveRedirectUrl
- wrapAsync
- ExpressError

---

## Search Functionality

Implements case-insensitive country search using MongoDB regex:

```js
Listing.find({
  country: { $regex: new RegExp(country.trim(), "i") }
});
```

---

## Key Architectural Decisions

- MVC structure for separation of concerns
- Modular routing
- Reference-based MongoDB relations
- Cloud storage abstraction via cloudConfig.js
- Session store configured with MongoStore
- Flash messages integrated into layout
- EJS templating with reusable partials

---

## Known Limitations

- No pagination
- No booking workflow
- No payment gateway integration
- No rate limiting
- No production deployment configuration
- No automated testing

---

## Possible Enhancements

- Pagination for listings
- Booking system with date availability
- Payment integration (Stripe)
- Map integration (Mapbox / Google Maps)
- Admin dashboard
- REST API version
- React frontend migration
- Rate limiting and security hardening
- Unit and integration tests
- Production deployment

---

## License

This project is built for educational and portfolio purposes.