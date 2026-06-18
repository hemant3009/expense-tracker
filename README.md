# 💰 Expense Tracker - Full Stack MERN Application

## Your First Complete Full Stack Project! 🎉

A comprehensive expense tracking application built with **MERN Stack** (MongoDB, Express, React, Node.js) that you can understand completely and deploy to production.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start Guide](#quick-start-guide)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Deployment Guide](#deployment-guide)
- [Key Concepts Learned](#key-concepts-learned)

---

## 🎯 Project Overview

**Expense Tracker** is a web application that helps users manage their daily expenses. Users can:

✅ **Create an account** with secure authentication  
✅ **Add expenses** with amount, category, date, and description  
✅ **View all expenses** in an organized list  
✅ **Filter expenses** by category and date range  
✅ **Edit expenses** to correct or update information  
✅ **Delete expenses** when no longer needed  
✅ **View statistics** showing total spent, average expense, and category breakdown  
✅ **See visual charts** displaying spending patterns  

---

## ⭐ Features

### Authentication
- User registration with email and password
- Secure login using JWT (JSON Web Tokens)
- Password hashing with bcryptjs
- Protected routes only accessible to authenticated users

### Expense Management
- Add new expenses with validation
- Edit existing expenses
- Delete expenses with confirmation
- View complete expense history

### Filtering & Sorting
- Filter by category (Food, Travel, Entertainment, etc.)
- Filter by date range (start date to end date)
- Automatically sort by newest first

### Statistics & Analytics
- Total spending amount
- Average expense calculation
- Breakdown by category
- Visual pie chart representation
- Category-wise spending percentage

### User Experience
- Clean, modern interface
- Responsive design (works on desktop and mobile)
- Real-time updates without page refresh
- Error handling and validation messages
- Loading states and confirmations

---

## 🛠️ Technology Stack

### Frontend
- **React** - UI library for building components
- **React Router** - Navigation between pages
- **Fetch API** - Making HTTP requests to backend
- **CSS** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime for server
- **Express** - Web framework for building API
- **MongoDB** - NoSQL database for storing data
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password encryption

### Development Tools
- **npm** - Package manager
- **nodemon** - Auto-restart server during development
- **Git** - Version control

---

## 📦 Prerequisites

Before starting, install these on your computer:

### 1. Node.js (includes npm)
Download from: https://nodejs.org/ (LTS version)

Verify installation:
```bash
node --version
npm --version
```

### 2. Git (Version Control)
Download from: https://git-scm.com/

### 3. Code Editor
Recommended: **VS Code** - https://code.visualstudio.com/

### 4. MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a database cluster
4. Get connection string (MongoDB URI)

### 5. Postman (Optional - for testing API)
Download from: https://www.postman.com/downloads/

---

## 🚀 Quick Start Guide

### STEP 1: Create Project Folder
```bash
mkdir expense-tracker
cd expense-tracker
```

### STEP 2: Setup Backend

```bash
mkdir backend
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
npm install --save-dev nodemon

# Create folder structure
mkdir models routes middleware
touch server.js .env
```

### STEP 3: Add Backend Code Files

Create these files with the code provided:
- `server.js`
- `models/User.js`
- `models/Expense.js`
- `routes/auth.js`
- `routes/expenses.js`
- `middleware/auth.js`
- `.env` (see below)

### STEP 4: Configure .env File

Create `.env` file in backend folder:
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_key_make_it_long_and_random
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
```

Replace `USERNAME` and `PASSWORD` with your MongoDB credentials.

### STEP 5: Start Backend

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
✨ Expense Tracker Server Running!
🌐 URL: http://localhost:5000
```

### STEP 6: Setup Frontend (in new terminal)

```bash
# Go back to main folder
cd ..

# Create React app
npx create-react-app frontend

# Go into frontend
cd frontend

# Install router
npm install react-router-dom

# Create folders
mkdir src/pages src/components src/styles
```

### STEP 7: Add Frontend Code Files

Create these files with the code provided:
- `src/App.js`
- `src/pages/LoginPage.js`
- `src/pages/DashboardPage.js`
- `src/components/Navbar.js`
- `src/components/ExpenseForm.js`
- `src/components/ExpenseList.js`
- `src/components/ExpenseStats.js`
- CSS files in `src/styles/` folder

### STEP 8: Create Frontend .env File

Create `.env` in frontend folder:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### STEP 9: Start Frontend

```bash
npm start
```

Open browser: http://localhost:3000

---

## 📁 Project Structure

```
expense-tracker/
├── backend/                          # Node.js + Express server
│   ├── models/
│   │   ├── User.js                   # User schema & password hashing
│   │   └── Expense.js                # Expense schema
│   ├── routes/
│   │   ├── auth.js                   # Login & register endpoints
│   │   └── expenses.js               # CRUD endpoints for expenses
│   ├── middleware/
│   │   └── auth.js                   # JWT verification middleware
│   ├── server.js                     # Main server file
│   ├── .env                          # Environment variables
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.js          # Register & login forms
│   │   │   └── DashboardPage.js      # Main dashboard
│   │   ├── components/
│   │   │   ├── Navbar.js             # Top navigation bar
│   │   │   ├── ExpenseForm.js        # Add/edit expense form
│   │   │   ├── ExpenseList.js        # List of expenses
│   │   │   └── ExpenseStats.js       # Statistics & charts
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── LoginPage.css
│   │   │   ├── Dashboard.css
│   │   │   ├── ExpenseForm.css
│   │   │   ├── ExpenseList.css
│   │   │   └── ExpenseStats.css
│   │   ├── App.js                    # Main app component
│   │   └── index.js                  # Entry point
│   ├── .env                          # Frontend environment variables
│   └── package.json                  # Frontend dependencies
│
└── README.md                         # This file
```

---

## 🔄 How It Works

### User Registration Flow
```
User fills form
    ↓
Frontend validates
    ↓
Sends POST to /api/auth/register
    ↓
Backend creates user (hashes password)
    ↓
Backend creates JWT token
    ↓
Frontend saves token in localStorage
    ↓
Redirects to dashboard
```

### Adding Expense Flow
```
User fills expense form
    ↓
Frontend validates
    ↓
Sends POST to /api/expenses with token in header
    ↓
Backend verifies token (who is the user?)
    ↓
Backend saves expense to MongoDB (with user ID)
    ↓
Backend returns success response
    ↓
Frontend updates expense list
    ↓
User sees new expense in list
```

### Filtering Expenses Flow
```
User selects category filter
    ↓
Frontend sends GET request with query parameters
    ↓
Example: /api/expenses?category=Food&startDate=2024-01-01
    ↓
Backend queries MongoDB with filters
    ↓
Returns filtered expenses for that user
    ↓
Frontend displays filtered results
```

---

## 🔌 API Endpoints

### Authentication Routes

**Register User**
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

**Login User**
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Expense Routes (All require Authorization header)

**Get All Expenses**
```
GET /api/expenses?category=Food&startDate=2024-01-01&endDate=2024-12-31
Headers: { Authorization: "Bearer <token>" }
Response: { expenses: [...] }
```

**Create Expense**
```
POST /api/expenses
Headers: { Authorization: "Bearer <token>" }
Body: { amount, category, description, date }
Response: { expense }
```

**Update Expense**
```
PUT /api/expenses/:id
Headers: { Authorization: "Bearer <token>" }
Body: { amount, category, description, date }
Response: { expense }
```

**Delete Expense**
```
DELETE /api/expenses/:id
Headers: { Authorization: "Bearer <token>" }
Response: { success: true }
```

**Get Statistics**
```
GET /api/expenses/stats
Headers: { Authorization: "Bearer <token>" }
Response: { totalSpent, categoryBreakdown, averageExpense }
```

---

## 🌐 Deployment Guide

### Deploy Backend to Render.com

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables from .env
6. Deploy!

You'll get a URL like: `https://expense-tracker-backend.onrender.com`

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import your frontend GitHub repository
3. Add environment variable:
```
REACT_APP_API_BASE_URL=https://expense-tracker-backend.onrender.com/api
```
4. Deploy!

You'll get a URL like: `https://expense-tracker.vercel.app`

Now anyone can use your app! 🎉

---

## 📚 Key Concepts Learned

### 1. REST API
- **GET**: Fetch data from server
- **POST**: Send new data to server
- **PUT**: Update existing data
- **DELETE**: Remove data

### 2. Authentication & Authorization
- **JWT**: Secure token proving user identity
- **Middleware**: Checks token before allowing access
- **Password Hashing**: Never store plain text passwords

### 3. Database Design
- **Schema**: Blueprint for data structure
- **Relationships**: Users have many expenses
- **Indexing**: Makes queries faster

### 4. State Management
- **Frontend State**: React hooks (useState)
- **Backend State**: MongoDB
- **Syncing**: Fetch API communicates between them

### 5. Form Validation
- **Frontend**: Quick user feedback
- **Backend**: Security and data integrity

### 6. CRUD Operations
- **Create**: POST - Add new data
- **Read**: GET - Retrieve data
- **Update**: PUT - Modify existing data
- **Delete**: DELETE - Remove data

### 7. Error Handling
- Try-catch blocks prevent crashes
- User-friendly error messages
- HTTP status codes indicate success/failure

---

## 🎓 Next Steps - Improve Your Project

Add these features to level up:

1. **CSV Export** - Download expenses as CSV file
2. **Monthly Reports** - See spending trends
3. **Budget Setting** - Set limits per category
4. **Email Notifications** - Alert on high spending
5. **Dark Mode** - Toggle between light/dark theme
6. **Mobile App** - Convert to React Native
7. **Receipt Photos** - Upload receipt images
8. **Bill Splitting** - Share expenses with friends
9. **Multi-currency** - Support different currencies
10. **Analytics Dashboard** - Advanced charts and insights

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem**: "MongoNetworkError"
**Solution**: 
- Check connection string in .env
- Add your IP to MongoDB Atlas whitelist

### CORS Error
**Problem**: "No 'Access-Control-Allow-Origin' header"
**Solution**: 
- Ensure `app.use(cors());` is in server.js

### Token Not Working
**Problem**: "Not authorized to access this route"
**Solution**: 
- Check token is in Authorization header
- Format: `"Bearer <token>"`
- Check JWT_SECRET matches

### Frontend Can't Connect
**Problem**: "Failed to fetch from localhost:5000"
**Solution**: 
- Ensure backend is running
- Check PORT in .env
- Check REACT_APP_API_BASE_URL in frontend .env

---

## 💡 Tips for Learning

1. **Read the comments** - Every file has detailed explanations
2. **Understand before copying** - Don't just copy-paste, understand why
3. **Test each step** - Test after each feature
4. **Use DevTools** - Chrome DevTools helps debug issues
5. **Experiment** - Try changing things and see what breaks
6. **Ask questions** - If stuck, search the error message

---

## 📖 Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **JWT.io**: https://jwt.io/ (understand tokens)
- **REST API**: https://developer.mozilla.org/en-US/docs/Glossary/REST

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎉 Congratulations!

You've built a complete MERN application from scratch! 

This project covers:
- ✅ Frontend development with React
- ✅ Backend API with Express
- ✅ Database design with MongoDB
- ✅ Authentication & security
- ✅ CRUD operations
- ✅ State management
- ✅ Deployment to production

**You're now a full-stack developer!** 💪

---

**Happy Coding! 🚀**

*If you found this helpful, star ⭐ the repository!*
