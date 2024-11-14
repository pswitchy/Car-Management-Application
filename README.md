# Car Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing car listings. Users can create, view, edit, and delete car listings with multiple images and search functionality.

## Features

### User Authentication
- User registration with email and password
- Secure login system
- JWT-based authentication
- Protected routes for authenticated users

### Car Management
- Create car listings with up to 10 images
- Add detailed information including title, description
- Tag cars with attributes (car type, company, dealer)
- View all personal car listings
- Search functionality across all fields
- Update car information and images
- Delete car listings

### Technical Features
- RESTful API architecture
- Image upload handling
- Search functionality with MongoDB
- Responsive design
- Protected routes
- Token-based authentication

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS for cross-origin requests

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Context API for state management
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/car-management-system.git
cd car-management-system
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env file with your configurations
# Example .env contents:
MONGODB_URI=mongodb://localhost:27017/car-management
JWT_SECRET=your_jwt_secret
PORT=5000

# Create uploads directory
mkdir uploads

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env file with your configurations
# Example .env contents:
REACT_APP_API_URL=http://localhost:5000/api

# Start the application
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Car Endpoints

#### Create Car
```http
POST /api/cars
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "tags": {
    "car_type": "string",
    "company": "string",
    "dealer": "string"
  },
  "images": [File] (up to 10 images)
}
```

#### Get All Cars
```http
GET /api/cars
Authorization: Bearer {token}
Query Parameters:
  search: string (optional)
```

#### Get Single Car
```http
GET /api/cars/:id
Authorization: Bearer {token}
```

#### Update Car
```http
PUT /api/cars/:id
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "string" (optional),
  "description": "string" (optional),
  "tags": {
    "car_type": "string",
    "company": "string",
    "dealer": "string"
  } (optional),
  "images": [File] (optional, up to 10 images)
}
```

#### Delete Car
```http
DELETE /api/cars/:id
Authorization: Bearer {token}
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
car-management-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Car.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── carRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── uploads/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── public/
│   └── .env
└── README.md
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MongoDB documentation
- Express.js documentation
- React.js documentation
- Node.js documentation
- JWT documentation
- Multer documentation
