# Athenix - AI-Powered Fitness & Nutrition Platform

**Tagline:** "Rebuild. Refine. Rise."

Athenix is a comprehensive AI-powered fitness and nutrition transformation app that provides personalized 12-week workout programs, meal plans, and real-time form analysis based on your unique profile, goals, and lifestyle.

## 🚀 Features

### Phase 1 MVP (Current Build)

✅ **Landing Page**
- Modern hero section with elegant X-wing phoenix logo
- Feature highlights and how-it-works section
- Responsive design optimized for all devices

✅ **Authentication**
- Email/password signup and login
- Social login placeholders (Google, Apple)
- Secure session management

✅ **Comprehensive Onboarding (9 Steps)**
- Basic info (age, gender, height, weight)
- Goals and motivation
- Fitness history and experience
- Lifestyle and schedule
- Equipment and location
- Nutrition habits and restrictions
- Psychology and preferences
- Body scan (photo upload)
- Review and generate

✅ **AI Plan Generation**
- Animated loading screen with progress tracking
- Personalized workout and nutrition plan generation
- Based on ALL user inputs
- 12-week phased program (Foundation → Progressive Overload → Peak Performance)

✅ **Dashboard**
- Welcome message with current phase/week
- Stats overview (weight, workouts, streak)
- Today's workout preview
- Daily nutrition tracking
- Water intake tracker
- Quick action cards

✅ **Workout Plan**
- Phase-based program (3 phases, 12 weeks)
- Detailed daily workouts for Phase 1
- Exercise library with sets/reps/rest periods
- **🎥 Exercise demonstration video links** - Each exercise has a "Watch Demo Video" button
- Form notes and weight tracking
- Workout completion tracking
- Phase unlocking system (Phase 2 unlocks Week 5, Phase 3 unlocks Week 9)

✅ **AI Form Check** (NEW! 🔥)
- **Upload workout videos** and get instant AI feedback
- Analyze your form for any exercise (Squat, Bench Press, Deadlift, etc.)
- **AI-powered analysis** provides:
  - Overall form score (1-10)
  - Strengths in your technique
  - Areas for improvement
  - Critical safety issues (if any)
  - Personalized recommendations
- Video upload with drag-and-drop
- History of previous analyses
- Mobile-friendly video capture
- **Real-time feedback** in seconds

✅ **Nutrition Plan**
- Daily calorie and macro targets
- 5 meals per day with detailed food lists
- Meal logging system
- Water intake tracker
- Nutrition guidelines personalized to user

✅ **Progress Tracking**
- Weight tracking with trends
- Photo timeline with upload
- Body measurements
- Weekly check-in forms (weight, energy, sleep, stress)
- Workout completion stats

✅ **My Plan Overview**
- Full 12-week program summary
- Phase breakdown with descriptions
- Personalization details
- PDF download (coming soon)

✅ **Settings**
- Profile information
- Notification preferences
- Update goals option
- Contact support
- Logout

---

## 🎨 Design System

### Brand Identity
- **Logo:** Elegant X-wing phoenix design - timeless and clean
- Wings forming an X shape symbolizing transformation
- Orange gradient (gold to fire red)

### Brand Colors
- **Primary (Phoenix Orange):** `#FF6B00`
- **Secondary (Light Orange/Gold):** `#FFB347`
- **Background (Deep Black):** `#0a0a0a`
- **Card Background:** `#11111a`
- **Text Primary:** `#f5f5f7`
- **Text Secondary:** `#b3b3c2`
- **Accent Glow:** `#FF7722`

### Typography
- **Font Family:** Poppins (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

---

## 📦 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State:** React Context + LocalStorage
- **Authentication:** Mock (ready for Supabase)
- **Database:** Mock (ready for Supabase PostgreSQL)
- **AI Generation:** Mock (ready for OpenAI GPT-4)
- **AI Form Check:** Mock (ready for OpenAI GPT-4 Vision API)
- **Deployment:** Vercel

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Yarn or npm package manager

### Installation

1. **Install dependencies**
```bash
yarn install
# or
npm install
```

2. **Set up environment variables**

The app comes with a `.env.local` file containing placeholder values. For development, the app works with mock data (set `NEXT_PUBLIC_DEV_MODE=true`).

To use real integrations:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI Configuration (for workout/nutrition + form analysis)
OPENAI_API_KEY=sk-proj-your-real-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Set to 'false' to use real APIs
NEXT_PUBLIC_DEV_MODE=false
```

3. **Run the development server**
```bash
yarn dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting Required API Keys

### OpenAI API Key (Required for AI Features)

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Name your key (e.g., "Athenix App")
5. Copy the key → `OPENAI_API_KEY`
6. **Note:** You need GPT-4 Vision API access for Form Check feature

**API Usage:**
- **Workout/Nutrition Generation:** ~$0.10-0.30 per user (one-time)
- **Form Check Video Analysis:** ~$0.05-0.15 per video

**Implementing Real AI Form Check:**

```javascript
// Example OpenAI Vision API integration for form analysis
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Analyze this ${exercise} form. Provide: 1) Overall score (1-10), 2) Strengths, 3) Areas to improve, 4) Safety concerns, 5) Recommendations`
        },
        {
          type: "image_url",
          image_url: {
            url: videoFrameUrl // Extract key frames from video
          }
        }
      ]
    }
  ],
  max_tokens: 500
})
```

### Supabase Setup (Optional - for production)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details
5. Once created, go to **Settings → API**
6. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 📱 App Flow

### New User Journey
1. Land on homepage → Click "Begin Your Transformation"
2. Sign up with email/password
3. Complete 9-step onboarding assessment (~5-10 minutes)
4. Watch AI generate personalized plan (8-second animation)
5. Arrive at dashboard
6. View today's workout with demo video links
7. **Upload form check video** to get AI feedback
8. Start tracking progress

### Form Check Feature
1. Navigate to "AI Form Check" from dashboard
2. Select exercise type (Squat, Bench Press, etc.)
3. Upload workout video (MP4, MOV, AVI)
4. AI analyzes form in 3 seconds
5. Receive detailed feedback:
   - Form score (e.g., 8.5/10)
   - What you're doing right
   - What needs improvement
   - Safety warnings
   - Actionable recommendations
6. View analysis history
7. Re-upload to track improvement

---

## 🎥 Exercise Demonstration Videos

Each workout exercise now includes:
- **"Watch Demo Video" button** that opens YouTube search for that specific exercise
- Proper form tutorials
- Multiple camera angles
- Expert instruction
- Common mistakes to avoid

Example exercises with video links:
- Barbell Squat
- Bench Press
- Deadlift
- Overhead Press
- Romanian Deadlift
- Bent-Over Row
- And many more...

---

## 🔧 Development Notes

### File Structure
```
/app
├── /app                           # Next.js app directory
│   ├── page.js                   # Landing page
│   ├── layout.js                 # Root layout
│   ├── globals.css               # Global styles
│   ├── /login                    # Login page
│   ├── /signup                   # Signup page
│   ├── /onboarding               # 9-step assessment
│   ├── /generate-plan            # AI generation loading
│   └── /dashboard                # User dashboard
│       ├── page.js               # Main dashboard
│       ├── /workouts             # Workout plan view
│       ├── /nutrition            # Nutrition plan view
│       ├── /progress             # Progress tracking
│       ├── /plan                 # Full plan overview
│       ├── /form-check           # 🆕 AI Form Check
│       └── /settings             # Settings page
├── /components
│   └── PhoenixLogo.js            # X-wing phoenix logo
├── .env.local                    # Environment variables
├── tailwind.config.js            # Tailwind configuration
└── package.json                  # Dependencies
```

### Mock Data System

The app currently uses LocalStorage for data persistence:
- `athenix_user` - User account info
- `athenix_onboarding_data` - Assessment responses
- `athenix_workout_plan` - Generated workout program
- `athenix_nutrition_plan` - Generated meal plan
- `athenix_progress` - Weight, photos, check-ins
- `athenix_form_check_history` - 🆕 Form analysis history
- `athenix_completed_workouts` - Workout completion tracking
- `athenix_water_today` - Daily water intake

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables
6. Click "Deploy"

---

## 🐛 Known Issues / Future Enhancements

### Current Limitations (MVP)
- Authentication uses mock data (needs Supabase integration)
- AI generation uses mock data (needs OpenAI integration)
- **Form Check uses mock analysis** (needs OpenAI Vision API)
- Social login buttons are placeholders
- PDF download is placeholder

### Phase 2 Features (Planned)
- Real Supabase authentication and database
- Real OpenAI GPT-4 integration for plans
- **Real OpenAI Vision API for form analysis**
- Exercise video library (embedded demos)
- Rest timer with sound alerts
- Social sharing of progress
- Achievement badges system
- Email notifications

### Phase 3 Features (Future)
- Live video form analysis (real-time feedback)
- 3D skeletal tracking overlay
- Motion capture integration
- AR form guidance
- Wearable device integration
- Advanced analytics dashboard

---

## 📞 Support

For issues or questions:
- Email: support@athenix.team
- GitHub Issues: [Create an issue](your-repo-url)

---

## 📄 License

Copyright © 2025 Athenix. All rights reserved.

---

**Built with 🔥 by the Athenix team**

*Rebuild. Refine. Rise.*