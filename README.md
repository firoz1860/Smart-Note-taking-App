# Smart Note-taking App 📝

A full-featured AI-powered note-taking application built with Next.js, featuring intelligent note refinement, automatic title generation, and secure cloud storage.

![Smart Note App](https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🤖 AI-Powered Writing Assistant
- **Note Refinement**: Enhance your writing with AI that improves clarity, structure, and readability
- **Smart Title Generation**: Automatically generate relevant, engaging titles for your notes
- **Accept/Decline Workflow**: Review and edit AI suggestions before saving

### 💾 Secure Cloud Storage
- **Firebase Integration**: Secure authentication and real-time data synchronization
- **Personal Notes**: All notes are private and tied to your account
- **Real-time Updates**: Changes sync instantly across all your devices

### 🎨 Modern User Experience
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Rich Text Editor**: Comfortable writing experience with word count and formatting
- **Visual Comparisons**: Side-by-side view of original vs AI-enhanced content

### 🔐 Authentication & Security
- **Email/Password Authentication**: Secure login with Firebase Auth
- **Protected Routes**: Dashboard access only for authenticated users
- **Data Privacy**: Notes are encrypted and stored securely

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key
- Firebase project setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd smart-note-app
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# OpenAI API Key for LangChain
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Setup
1. Create a new [Firebase project](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Add your web app and copy the config values to `.env.local`

### 4. OpenAI Setup
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add the key to your `.env.local` file

### 5. Run the Application
```bash
npm run dev
```

Visit `http://localhost:3000` to start using the app!

## 📁 Project Structure

```
smart-note-app/
├── app/                          # Next.js App Router
│   ├── layout.jsx               # Root layout with theme provider
│   ├── page.jsx                 # Homepage with features showcase
│   ├── dashboard/               # Protected dashboard area
│   │   ├── page.jsx            # Main dashboard layout
│   │   └── NoteEditor.jsx      # Core note editing component
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.jsx      # Login form
│   │   └── signup/page.jsx     # Registration form
│   └── api/                     # API routes for AI processing
│       ├── refine/route.js     # Note refinement endpoint
│       └── title/route.js      # Title generation endpoint
├── components/                   # Reusable UI components
│   ├── Editor.jsx              # Rich text editor with word count
│   ├── NoteActions.jsx         # AI action buttons
│   ├── RefinedOutput.jsx       # AI suggestions display
│   ├── ThemeToggle.jsx         # Dark/light mode switcher
│   └── ui/                     # Shadcn/ui components
├── lib/                         # Core libraries and utilities
│   ├── firebase.js             # Firebase configuration
│   ├── langchain/              # AI processing chains
│   │   ├── refineNote.js       # Note refinement logic
│   │   └── generateTitle.js    # Title generation logic
│   └── utils.js                # Utility functions
├── utils/                       # Helper functions
│   └── auth.js                 # Authentication utilities
├── docs/                        # Documentation
│   └── RAG_Explained.md        # RAG implementation guide
└── styles/                      # Global styles
    └── globals.css             # Tailwind CSS with custom variables
```

## 🎯 Core Functionality

### Note Writing Flow
1. **Write**: Use the rich text editor to capture your thoughts
2. **Refine**: Click "Refine with AI" to enhance your writing
3. **Title**: Generate smart titles based on your content
4. **Review**: Compare original vs AI-enhanced versions
5. **Save**: Accept suggestions and save to your personal library

### AI Integration
- **LangChain Framework**: Robust AI workflow management
- **OpenAI GPT-3.5**: High-quality text refinement and generation
- **Streaming Support**: Real-time AI processing feedback
- **Error Handling**: Graceful fallbacks and user feedback

### Data Management
- **Firestore Integration**: NoSQL document storage
- **Real-time Sync**: Live updates across devices
- **User Isolation**: Notes are scoped to individual users
- **Offline Support**: Basic offline functionality with sync on reconnect

## 🛠️ Technology Stack

### Frontend
- **Next.js 13+**: React framework with App Router
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Modern component library
- **Lucide React**: Consistent iconography
- **Next Themes**: Theme management

### Backend & AI
- **Next.js API Routes**: Serverless backend functions
- **LangChain**: AI workflow orchestration
- **OpenAI API**: GPT-3.5 for text processing
- **Firebase**: Authentication and database

### Development
- **JavaScript**: Modern ES6+ syntax
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Actions and branding
- **Secondary**: Emerald (#10B981) - Success states
- **Accent**: Purple (#8B5CF6) - Special features
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Inter Font**: Clean, readable typeface
- **Font Weights**: Regular (400), Medium (500), Bold (700)
- **Line Heights**: 1.5 for body text, 1.2 for headings

### Spacing System
- **8px Grid**: Consistent spacing throughout the app
- **Responsive Breakpoints**: Mobile-first design approach

## 🔧 Configuration

### Firebase Rules
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase project API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads
- **Code Splitting**: Automatic bundle optimization
- **Image Optimization**: Next.js Image component
- **Caching**: API response caching for better performance
- **Lazy Loading**: Components loaded on demand

## 🛡️ Security Features

- **Environment Variables**: Sensitive keys never exposed to client
- **Firebase Rules**: Database-level access control
- **Input Validation**: API endpoints validate all inputs
- **XSS Protection**: Sanitized user content
- **CSRF Protection**: Built-in Next.js security

## 🔮 Future Enhancements

### Planned Features
- **RAG Implementation**: Context-aware note suggestions
- **Voice Notes**: Audio recording and transcription
- **Collaborative Editing**: Real-time multi-user editing
- **Export Options**: PDF, Markdown, and other formats
- **Advanced Search**: Full-text search with filters
- **Note Templates**: Pre-designed note structures
- **Offline Mode**: Full offline functionality with sync

### AI Improvements
- **Fine-tuned Models**: Custom models for better note refinement
- **Multi-language Support**: Notes in different languages
- **Sentiment Analysis**: Mood tracking in notes
- **Auto-categorization**: Smart note organization

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:
- Code standards and formatting
- Pull request process
- Issue reporting
- Development setup

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact support for urgent issues

## 🙏 Acknowledgments

- **OpenAI**: For providing excellent AI capabilities
- **Firebase**: For robust backend infrastructure
- **Vercel**: For seamless deployment platform
- **LangChain**: For AI workflow management
- **Shadcn/ui**: For beautiful UI components

---

Built with ❤️ using Next.js, AI, and modern web technologies.

**Start writing smarter today!** 🚀