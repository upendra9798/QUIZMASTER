# 🧠 QuizMaster - AI-Powered Learning Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-blue.svg)](https://tailwindcss.com/)

> **QuizMaster** is a modern, full-stack web application that leverages AI to transform your study materials into interactive quizzes. Upload PDFs or images, generate personalized questions, track your learning progress, and achieve your educational goals with intelligent insights.

---

## 🌟 **Project Overview**

QuizMaster addresses the common challenge of creating effective study materials by automating quiz generation from various file formats. The platform uses AI to extract content, generate relevant questions, and provides comprehensive learning analytics to help students study more efficiently.

### **Key Problems Solved:**
- ⏱️ **Time-consuming quiz creation** → Automated AI-powered question generation
- 📚 **Limited study material interaction** → Convert static files into interactive quizzes
- 📊 **Lack of progress tracking** → Comprehensive performance analytics
- 🎯 **Generic study approach** → Personalized learning recommendations

---

## ✨ **Key Features**

### 🚀 **Core Functionality**
- **🤖 AI Quiz Generation**: Upload PDFs/images and automatically generate MCQs, True/False, and Short Answer questions
- **📁 File Processing**: Support for PDF, JPG, PNG files up to 10MB with intelligent text extraction
- **🧪 Interactive Testing**: Real-time quiz interface with timer, progress tracking, and instant feedback
- **📈 Performance Analytics**: Detailed statistics, progress charts, and learning recommendations

### 🔐 **User Management**
- **🔑 Secure Authentication**: JWT-based auth with bcrypt password hashing
- **👤 Profile Management**: Customizable user profiles with preferences
- **🎨 Personalization**: Theme selection, notification settings, and learning preferences

### 📊 **Analytics & Tracking**
- **📋 Study History**: Complete record of all tests, uploads, and study sessions
- **🎯 Performance Metrics**: Average scores, improvement trends, and subject-wise analysis
- **🔍 Weak Area Identification**: AI-powered recommendations for improvement areas
- **📅 Study Streaks**: Gamified learning with streak tracking and achievements

### 💻 **Technical Features**
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **⚡ Real-time Updates**: Instant feedback and live progress tracking
- **🔍 Advanced Search & Filtering**: Smart search across history and content
- **📄 Pagination**: Efficient data loading with pagination support

---

## 🛠️ **Tech Stack**

### **Frontend**
- **⚛️ React 19.1.1** - Latest React with modern hooks and features
- **🎨 TailwindCSS 4.1.11** - Utility-first CSS framework for rapid styling
- **🧭 React Router 7.8.0** - Client-side routing and navigation
- **🎯 Lucide React** - Beautiful, customizable icon library
- **📱 Material-UI** - React component library for enhanced UI elements
- **⚡ Vite 7.1.2** - Lightning-fast build tool and dev server

### **Backend**
- **🟢 Node.js** - JavaScript runtime environment
- **🚀 Express.js 5.1.0** - Fast, unopinionated web framework
- **🍃 MongoDB** - NoSQL database for flexible data storage
- **🔗 Mongoose 8.17.1** - Elegant MongoDB object modeling
- **🔐 JWT + bcryptjs** - Secure authentication and password hashing
- **📤 Multer** - File upload handling middleware
- **🌐 CORS** - Cross-origin resource sharing configuration

### **Development Tools**
- **📦 npm/Node Package Manager** - Dependency management
- **🔧 Nodemon** - Auto-restarting development server
- **🎯 ESLint** - Code linting and formatting
- **🐛 Development Environment** - Hot reload and debugging setup

---

## 🏗️ **Architecture & Design Patterns**

### **Frontend Architecture**
```
src/
├── components/          # Reusable UI components
│   ├── header/         # Navigation and user menu
│   ├── profile/        # User profile management
│   ├── GeneratedQuestionsPreview.jsx
│   ├── HistorySection.jsx
│   ├── PerformanceSection.jsx
│   ├── TestInterface.jsx
│   └── UploadSection.jsx
├── pages/
│   ├── auth/           # Authentication pages
│   └── home/           # Main application dashboard
└── assets/             # Static resources
```

### **Backend Architecture**
```
backend/
├── controllers/        # Business logic layer
│   ├── auth.controller.js
│   ├── quiz.controller.js
│   └── user.controller.js
├── models/            # Database schemas
│   ├── user.model.js
│   ├── quiz.model.js
│   ├── quizHistory.model.js
│   └── uploadedFile.model.js
├── routes/            # API endpoints
├── middleware/        # Authentication & validation
└── lib/utils/         # Helper functions
```

### **Design Patterns Used**
- **🏗️ MVC Pattern**: Separation of concerns with Models, Views, Controllers
- **🛡️ Middleware Pattern**: Authentication, validation, and error handling
- **📦 Component-Based Architecture**: Reusable React components
- **🎣 Custom Hooks**: State management and side effects
- **🔄 Repository Pattern**: Data access abstraction layer

---

## 🔧 **Installation & Setup**

### **Prerequisites**
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your environment variables
MONGO_URI=mongodb://localhost:27017/quizmaster
PORT=7000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Start development server
npm run dev
```

### **Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
VITE_API_URL=http://localhost:7000/api
VITE_NODE_ENV=development

# Start development server
npm run dev
```

### **Production Deployment**
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd backend
npm start
```

---

## 🌐 **API Documentation**

### **Authentication Endpoints**
```http
POST /api/auth/signup     # User registration
POST /api/auth/login      # User login
POST /api/auth/logout     # User logout
GET  /api/auth/me         # Get current user
```

### **Quiz Management**
```http
POST /api/quiz/upload     # Upload study material
POST /api/quiz/generate   # Generate questions from file
GET  /api/quiz/           # Get user's quizzes
GET  /api/quiz/:id        # Get specific quiz
POST /api/quiz/:id/submit # Submit quiz answers
```

### **User Analytics**
```http
GET  /api/user/stats      # Get user statistics
GET  /api/user/history    # Get study history
POST /api/user/history    # Save quiz results
```

---

## 📊 **Database Schema**

### **User Model**
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  agreeToTerms: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Quiz Model**
```javascript
{
  title: String,
  description: String,
  createdBy: ObjectId (User),
  questions: [QuestionSchema],
  difficulty: String,
  timeLimit: Number,
  attempts: Number,
  averageScore: Number
}
```

### **Quiz Statistics**
```javascript
{
  user: ObjectId (User),
  testsCompleted: Number,
  averageScore: Number,
  totalTimeSpent: Number,
  studyStreak: Number,
  subjectStats: [SubjectStatSchema]
}
```

---

## 🎯 **Key Features Showcase**

### **1. Intelligent File Processing**
- **Multi-format Support**: PDF, JPG, PNG files
- **Text Extraction**: Advanced parsing for content extraction
- **File Validation**: Size limits and type checking
- **Progress Tracking**: Upload and processing status

### **2. AI Question Generation**
```javascript
// Question Types Supported:
- Multiple Choice Questions (MCQ)
- True/False Questions
- Short Answer Questions
- Mixed Question Sets

// Difficulty Levels:
- Easy, Medium, Hard, Mixed

// Customizable Parameters:
- Question Count (5, 10, 15, 20)
- Subject-specific generation
- Difficulty adjustment
```

### **3. Advanced Analytics Dashboard**
- **📈 Performance Trends**: Visual charts and graphs
- **🎯 Subject Analysis**: Performance by topic
- **⏱️ Time Management**: Study time tracking
- **🏆 Achievement System**: Streaks and milestones
- **🤖 AI Recommendations**: Personalized study suggestions

### **4. Interactive Quiz Interface**
- **⏲️ Real-time Timer**: Countdown and time tracking
- **📊 Progress Indicators**: Visual progress bars
- **💾 Auto-save**: Automatic answer preservation
- **📱 Mobile Responsive**: Touch-friendly interface
- **🔄 Question Navigation**: Easy movement between questions

---

## 🔒 **Security Features**

- **🔐 JWT Authentication**: Stateless token-based auth
- **🛡️ Password Hashing**: bcrypt with salt rounds
- **🚫 Route Protection**: Middleware-based access control
- **🍪 Secure Cookies**: HttpOnly and Secure flags
- **✅ Input Validation**: Sanitization and validation
- **🔒 CORS Configuration**: Controlled cross-origin requests

---

## 📈 **Performance Optimizations**

- **⚡ Code Splitting**: Dynamic imports for reduced bundle size
- **🗃️ Database Indexing**: Optimized queries with proper indexing
- **📄 Pagination**: Efficient data loading
- **🎨 CSS Optimization**: TailwindCSS utility classes
- **🔄 Caching**: Strategic caching for improved performance
- **📱 Responsive Images**: Optimized image loading

---

## 🚀 **Deployment Guide**

### **Environment Configuration**
```bash
# Production Environment Variables
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizmaster
JWT_SECRET=secure_jwt_secret_key
FRONTEND_URL=https://yourdomain.com
PORT=7000
```

### **Docker Deployment** (Optional)
```dockerfile
# Example Docker configuration
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 7000
CMD ["npm", "start"]
```

---

## 🧪 **Testing Strategy**

### **Frontend Testing**
- **Component Testing**: React Testing Library
- **Integration Testing**: API integration tests
- **E2E Testing**: User journey testing
- **Performance Testing**: Core Web Vitals monitoring

### **Backend Testing**
- **Unit Testing**: Controller and model testing
- **API Testing**: Endpoint functionality testing
- **Database Testing**: CRUD operation validation
- **Security Testing**: Auth and validation testing

---

## 🌟 **Future Enhancements**

### **Phase 1: AI Integration**
- **🤖 Advanced AI Models**: GPT integration for better question generation
- **📝 Natural Language Processing**: Improved text extraction
- **🎯 Adaptive Learning**: AI-powered difficulty adjustment
- **💬 Chatbot Assistant**: Study helper and Q&A support

### **Phase 2: Social Features**
- **👥 Study Groups**: Collaborative learning spaces
- **🏆 Leaderboards**: Competitive elements
- **📊 Peer Comparisons**: Anonymous performance benchmarks
- **💬 Discussion Forums**: Subject-specific discussions

### **Phase 3: Advanced Analytics**
- **📈 Predictive Analytics**: Performance forecasting
- **🧠 Learning Path Optimization**: Personalized study routes
- **📊 Advanced Reporting**: Detailed progress reports
- **🎯 Goal Setting**: SMART goals and tracking

---

## 👨‍💻 **Developer Information**

**Developed by:** Upendra Kushwaha  
**Role:** Full-Stack Developer  
**Contact:** [Your Email]  
**LinkedIn:** [Your LinkedIn]  
**GitHub:** [Your GitHub]

### **Development Timeline**
- **Planning & Design**: 1 week
- **Backend Development**: 2 weeks
- **Frontend Development**: 2 weeks
- **Integration & Testing**: 1 week
- **Deployment & Polish**: 1 week

---

## 📝 **Learning Outcomes**

### **Technical Skills Developed**
- **Full-Stack Development**: End-to-end application development
- **Modern React**: Hooks, context, routing, and state management
- **Node.js & Express**: RESTful API development
- **Database Design**: MongoDB schema design and optimization
- **Authentication Systems**: JWT implementation and security
- **File Processing**: Upload handling and text extraction
- **Responsive Design**: Mobile-first development approach

### **Soft Skills Enhanced**
- **Problem Solving**: Complex feature implementation
- **Project Management**: Feature prioritization and timeline management
- **User Experience**: UI/UX design considerations
- **Code Quality**: Best practices and clean code principles

---

## 🎨 **UI/UX Highlights**

- **🎨 Modern Design**: Clean, professional interface
- **📱 Mobile-First**: Responsive across all devices
- **♿ Accessibility**: ARIA labels and keyboard navigation
- **🌈 Visual Hierarchy**: Clear information architecture
- **🎯 User-Centric**: Intuitive navigation and workflows
- **⚡ Performance**: Fast loading and smooth interactions

---

## 🛠️ **Development Commands**

### **Backend Commands**
```bash
npm run dev      # Start development server
npm start        # Start production server
npm run lint     # Run code linting
```

### **Frontend Commands**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📜 **License**

This project is developed for educational and portfolio purposes. Feel free to explore, learn, and provide feedback!

---

## 🤝 **Contributing**

While this is primarily a portfolio project, feedback and suggestions are always welcome! If you'd like to discuss the project or have questions about the implementation, feel free to reach out.

---

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **MongoDB** for the flexible database solution
- **TailwindCSS** for the utility-first approach
- **Lucide** for the beautiful icon set
- **Open Source Community** for the countless resources and inspiration

---

*This README demonstrates comprehensive documentation skills, technical understanding, and attention to detail - essential qualities for any development role.*

