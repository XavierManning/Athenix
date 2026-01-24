# Athenix - AI-Powered Fitness & Nutrition Platform

**Tagline:** "Rebuild. Refine. Rise."

Athenix is a comprehensive AI-powered fitness and nutrition transformation app that provides personalized 12-week workout programs and meal plans based on your unique profile, goals, and lifestyle.

## 🚀 Features

### Phase 1 MVP (Current Build)

✅ **Landing Page**
- Modern hero section with animated Athenix phoenix logo
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
- Mock AI-powered workout and nutrition plan generation
- Personalized based on ALL user inputs
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
- Form notes and weight tracking
- Workout completion tracking
- Phase unlocking system (Phase 2 unlocks Week 5, Phase 3 unlocks Week 9)

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

### Logo
- Custom SVG phoenix wings with crossed "X" design
- Gradient from orange to red
- Glowing drop shadow effect

---

## 📦 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State:** React Context + LocalStorage
- **Authentication:** Mock (ready for Supabase)
- **Database:** Mock (ready for Supabase PostgreSQL)
- **AI Generation:** Mock (ready for OpenAI GPT-4)
- **Deployment:** Vercel

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Yarn or npm package manager

### Installation

1. **Clone the repository** (if applicable)
```bash
git clone <your-repo-url>
cd athenix
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Set up environment variables**

The app comes with a `.env.local` file containing placeholder values. For development, the app works with mock data (set `NEXT_PUBLIC_DEV_MODE=true`).

To use real integrations:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-real-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Set to 'false' to use real APIs
NEXT_PUBLIC_DEV_MODE=false
```

4. **Run the development server**
```bash
yarn dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting Required API Keys

### Supabase Setup

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details
5. Once created, go to **Settings → API**
6. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

**Database Tables to Create:**
```sql
-- Users table (handled by Supabase Auth)

-- User Profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  age INTEGER,
  gender TEXT,
  height TEXT,
  weight DECIMAL,
  primary_goal TEXT,
  -- ... add all other fields from onboarding
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workout Programs
CREATE TABLE workout_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  generated_at TIMESTAMP DEFAULT NOW(),
  current_phase INTEGER,
  current_week INTEGER,
  phases JSONB
);

-- Progress Tracking
CREATE TABLE progress_check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  week_number INTEGER,
  date TIMESTAMP DEFAULT NOW(),
  weight DECIMAL,
  photos TEXT[],
  measurements JSONB,
  energy_level INTEGER,
  sleep_quality INTEGER,
  stress_level INTEGER,
  notes TEXT
);
```

### OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Name your key (e.g., "Athenix App")
5. Copy the key → `OPENAI_API_KEY`
6. **Note:** You need GPT-4 API access for best results

**Cost Estimate:**
- Generating one complete workout + nutrition plan: ~$0.10-0.30 per user
- Using GPT-4-turbo is more cost-effective than GPT-4

---

## 📱 App Flow

### New User Journey
1. Land on homepage → Click "Begin Your Transformation"
2. Sign up with email/password
3. Complete 9-step onboarding assessment (~5-10 minutes)
4. Watch AI generate personalized plan (8-second animation)
5. Arrive at dashboard
6. View today's workout and nutrition plan
7. Start tracking progress

### Returning User Journey
1. Log in
2. Dashboard shows current week and phase
3. View today's workout
4. Log meals and water intake
5. Complete workouts and mark exercises
6. Submit weekly check-ins
7. Track progress with photos and measurements

---

## 🔧 Development Notes

### File Structure
```
/app
├── /app                    # Next.js app directory
│   ├── page.js            # Landing page
│   ├── layout.js          # Root layout
│   ├── globals.css        # Global styles
│   ├── /login             # Login page
│   ├── /signup            # Signup page
│   ├── /onboarding        # 9-step assessment
│   ├── /generate-plan     # AI generation loading
│   └── /dashboard         # User dashboard
│       ├── page.js        # Main dashboard
│       ├── /workouts      # Workout plan view
│       ├── /nutrition     # Nutrition plan view
│       ├── /progress      # Progress tracking
│       ├── /plan          # Full plan overview
│       └── /settings      # Settings page
├── /components
│   └── PhoenixLogo.js     # Athenix logo component
├── .env.local             # Environment variables
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

### Mock Data System

The app currently uses LocalStorage for data persistence:
- `athenix_user` - User account info
- `athenix_onboarding_data` - Assessment responses
- `athenix_onboarding_complete` - Completion flag
- `athenix_workout_plan` - Generated workout program
- `athenix_nutrition_plan` - Generated meal plan
- `athenix_progress` - Weight, photos, check-ins
- `athenix_current_week` - Current program week
- `athenix_current_phase` - Current program phase
- `athenix_completed_workouts` - Workout completion tracking
- `athenix_water_today` - Daily water intake
- `athenix_logged_meals_today` - Daily meal logging

### AI Integration (Ready to Implement)

The file `/app/app/generate-plan/page.js` contains mock AI generation functions. To integrate real OpenAI:

```javascript
// Example OpenAI integration
const response = await fetch('/api/generate-plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userData: onboardingData })
})

const { workoutPlan, nutritionPlan } = await response.json()
```

Backend API route would call OpenAI:
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const completion = await openai.chat.completions.create({
  model: "gpt-4-turbo",
  messages: [
    {
      role: "system",
      content: "You are Athenix, an advanced AI fitness coach..."
    },
    {
      role: "user",
      content: `Create a 12-week workout program for: ${JSON.stringify(userData)}`
    }
  ],
  response_format: { type: "json_object" }
})
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL)
6. Click "Deploy"

Vercel will automatically:
- Build your Next.js app
- Deploy to global CDN
- Provide HTTPS
- Enable automatic deployments on git push

### Custom Domain
1. In Vercel dashboard, go to "Settings → Domains"
2. Add your domain (e.g., athenix.team)
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning (~24 hours)

---

## 🧪 Testing

### Manual Testing Checklist

**Landing Page**
- [ ] Logo displays correctly
- [ ] Animations work smoothly
- [ ] CTA buttons navigate to signup
- [ ] Responsive on mobile/tablet/desktop

**Authentication**
- [ ] Signup creates user account
- [ ] Login redirects to dashboard (if onboarding complete)
- [ ] Login redirects to onboarding (if incomplete)
- [ ] Validation messages display correctly

**Onboarding**
- [ ] All 9 steps load without errors
- [ ] Progress bar updates correctly
- [ ] Form validation works
- [ ] Data persists between steps
- [ ] Photo upload works
- [ ] Generate plan button triggers loading screen

**AI Generation**
- [ ] Loading animation displays
- [ ] Progress messages rotate
- [ ] Redirects to dashboard after completion
- [ ] Plans are generated and stored

**Dashboard**
- [ ] Stats display correctly
- [ ] Today's workout shows
- [ ] Nutrition macros display
- [ ] Water tracker works
- [ ] Navigation works

**Workout Plan**
- [ ] Phase selector works
- [ ] Week selector works
- [ ] Phase 2 and 3 are locked initially
- [ ] Workout detail view displays exercises
- [ ] Exercise completion tracking works

**Nutrition Plan**
- [ ] Macro progress bars work
- [ ] Meal logging works
- [ ] Water intake tracker works
- [ ] Guidelines display

**Progress Tracking**
- [ ] Photo upload works
- [ ] Check-in form submits
- [ ] Stats update correctly

---

## 🐛 Known Issues / Future Enhancements

### Current Limitations (MVP)
- Authentication uses mock data (needs Supabase integration)
- AI generation uses mock data (needs OpenAI integration)
- Social login buttons are placeholders
- PDF download is placeholder
- Chat with coach is disabled (coming soon)
- No email notifications yet
- No payment/subscription system yet

### Phase 2 Features (Planned)
- Real Supabase authentication and database
- Real OpenAI GPT-4 integration
- Exercise video library
- Rest timer with sound alerts
- Social sharing of progress
- Achievement badges system
- Community feed
- Email notifications
- Referral system

### Phase 3 Features (Future)
- Chat with real trainers
- Stripe subscription system
- Wearable device integration (Fitbit, Apple Watch)
- Meal prep shopping list
- Recipe suggestions
- Workout music integration (Spotify)
- Advanced analytics dashboard

---

## 💻 Development Commands

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint
```

---

## 📞 Support

For issues or questions:
- Email: support@athenix.team (placeholder)
- GitHub Issues: [Create an issue](your-repo-url)

---

## 📄 License

Copyright © 2025 Athenix. All rights reserved.

---

## 🙏 Credits

- **Design:** Custom Athenix brand identity
- **Fonts:** Poppins by Google Fonts
- **Icons:** Lucide React
- **Framework:** Next.js by Vercel
- **AI:** OpenAI GPT-4 (when integrated)

---

**Built with 🔥 by the Athenix team**

*Rebuild. Refine. Rise.*
