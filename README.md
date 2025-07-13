# SecondBrain

A full-stack personal content management system that helps users save, organize, and share their favorite links and content from various platforms like Twitter, YouTube, Medium, and Reddit.

## 🚀 Features

- 🔐 **User Authentication** - Secure signup/signin with JWT tokens
- 📱 **Responsive Dashboard** - Modern UI with Tailwind CSS
- 📝 **Content Management** - Add, view, and delete content with ease
- 🔗 **Brain Sharing** - Share your curated content with others
- 🏷️ **Content Filtering** - Filter by platform (Twitter, YouTube, Medium, Reddit)
- 📊 **Content Cards** - Visual content display with platform icons
- 🎯 **Modal-based Creation** - Intuitive content addition workflow
- 📱 **Mobile-friendly** - Fully responsive design

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Language**: TypeScript
- **ODM**: Mongoose

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting**: ESLint

## 📁 Project Structure

```
SecondBrain/
├── Backened/                    # Backend API
│   ├── src/
│   │   ├── config.ts           # Configuration settings
│   │   ├── db.ts               # Database models and connection
│   │   ├── index.ts            # Main server file
│   │   ├── middleware.ts       # Authentication middleware
│   │   ├── utils.ts            # Utility functions
│   │   └── override.d.ts       # Type definitions
│   ├── package.json
│   └── tsconfig.json
├── Frontend_SecindBrain/        # Frontend React app
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CreateContentModal.tsx
│   │   │   ├── DottedButton.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── SidebarItem.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useContent.tsx
│   │   ├── icons/              # SVG icon components
│   │   │   ├── CrossIcon.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── Medium.tsx
│   │   │   ├── PlusIcon.tsx
│   │   │   ├── Reddit.tsx
│   │   │   ├── ShareIcon.tsx
│   │   │   ├── TwitterIcon.tsx
│   │   │   └── YoutubeIcon.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── dashboard.tsx
│   │   │   ├── ShareDbrain.tsx
│   │   │   ├── Signin.tsx
│   │   │   └── Signup.tsx
│   │   ├── assets/             # Static assets
│   │   ├── App.tsx            # Main application component
│   │   ├── config.ts          # Configuration settings
│   │   ├── index.css          # Global styles
│   │   └── main.tsx           # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backened
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   JWT_PASSWORD=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend_SecindBrain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login

### Content Management Endpoints
- `POST /api/v1/content` - Add new content (requires authentication)
- `GET /api/v1/content` - Get user's content (requires authentication)
- `DELETE /api/v1/content` - Delete content (requires authentication)

### Brain Sharing Endpoints
- `POST /api/v1/brain/share` - Generate/toggle shareable link (requires authentication)
- `GET /api/v1/brain/:shareLink` - Access shared brain content (public)

## 🗄️ Database Schema

### User Model
```typescript
{
  username: String (unique),
  password: String
}
```

### Content Model
```typescript
{
  title: String,
  link: String,
  type: String, // twitter, youtube, medium, reddit
  userId: ObjectId (ref to User),
  tags: Array
}
```

### Link Model
```typescript
{
  hash: String (unique),
  userId: ObjectId (ref to User)
}
```

## 🎨 Frontend Pages & Components

### Pages
- **Signin** (`/signin`) - User login page
- **Signup** (`/signup`) - User registration page
- **Dashboard** (`/dashboard`) - Main content management interface
- **ShareDbrain** (`/ShareDbrain`) - Shared brain viewing page

### Key Components
- **Card** - Content display card with actions
- **CreateContentModal** - Modal for adding new content
- **Sidebar** - Navigation sidebar with filtering options
- **Button/DottedButton** - Reusable button components
- **Input** - Form input component

### Custom Hooks
- **useContent** - Content state management and API integration

## 🔧 Development Scripts

### Backend
```bash
npm run build    # Compile TypeScript
npm start        # Start production server
npm run dev      # Build and start in development mode
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌟 Supported Content Types

- **Twitter** - Twitter posts and threads
- **YouTube** - YouTube videos
- **Medium** - Medium articles
- **Reddit** - Reddit posts

## 🔐 Authentication Flow

1. User registers/signs in through the frontend
2. Backend validates credentials and returns JWT token
3. Frontend stores token and includes it in subsequent requests
4. Backend middleware validates token for protected routes
5. User can access dashboard and manage content

## 🚀 Deployment

### Backend Deployment
1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Deploy the `dist` folder
4. Ensure MongoDB connection is properly configured

### Frontend Deployment
1. Update `VITE_BACKEND_URL` in `.env` to your deployed backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 🔮 Future Enhancements

### Backend
- [ ] Password hashing with bcrypt
- [ ] Input validation with Zod
- [ ] Rate limiting
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Advanced search and filtering
- [ ] File upload support

### Frontend
- [ ] Content search functionality
- [ ] Tag management system
- [ ] Bulk operations
- [ ] Content export/import
- [ ] Dark mode support
- [ ] Offline functionality
- [ ] Content preview
- [ ] Advanced filtering options
- [ ] User profile management
- [ ] Social sharing features

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**ShlokGarg22** - [GitHub Profile](https://github.com/ShlokGarg22)

## 🙏 Acknowledgments

- Thanks to all contributors who helped shape this project
- Inspiration from various content management systems
- Community feedback and suggestions

---

**Happy Coding! 🎉**
