# Bike Rental Reservation System API

## Introduction

This API serves as the backend for a bike rental service in Cox's Bazar, allowing users to rent bikes online seamlessly.

## API Endpoints

### User Routes

- **Sign Up**
  - **Route:** `/api/auth/signup` (POST)
  
- **User Login**
  - **Route:** `/api/auth/login` (POST)
  
- **Get Profile**
  - **Route:** `/api/users/me` (GET)
  
- **Update Profile**
  - **Route:** `/api/users/me` (PUT)

### Bike Routes

- **Create Bike** (Admin Only)
  - **Route:** `/api/bikes` (POST)

- **Get All Bikes**
  - **Route:** `/api/bikes` (GET)

- **Update Bike** (Admin Only)
  - **Route:** `/api/bikes/:id` (PUT)

- **Delete Bike** (Admin Only)
  - **Route:** `/api/bikes/:id` (DELETE)

### Rental Routes

- **Create Rental**
  - **Route:** `/api/rentals` (POST)

- **Return Bike** (Admin Only)
  - **Route:** `/api/rentals/:id/return` (PUT)

- **Get All Rentals for User**
  - **Route:** `/api/rentals` (GET)

## Setup Instructions

To set up the server locally, clone the repository and run the following commands:

```bash
# Install dependencies
npm install

# Start the server
npm start
