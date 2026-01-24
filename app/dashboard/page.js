'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { Dumbbell, UtensilsCrossed, TrendingUp, Calendar, Settings, LogOut, Flame, Droplet } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [nutritionPlan, setNutritionPlan] = useState(null)
  const [progress, setProgress] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [waterIntake, setWaterIntake] = useState(0)
  const [todayWorkout, setTodayWorkout] = useState(null)

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('athenix_user')
    const onboardingComplete = localStorage.getItem('athenix_onboarding_complete')
    
    if (!user) {
      router.push('/login')
      return
    }
    
    if (!onboardingComplete) {
      router.push('/onboarding')
      return
    }

    // Load data
    setUserData(JSON.parse(user))
    setWorkoutPlan(JSON.parse(localStorage.getItem('athenix_workout_plan')))
    setNutritionPlan(JSON.parse(localStorage.getItem('athenix_nutrition_plan')))
    setProgress(JSON.parse(localStorage.getItem('athenix_progress')))
    setCurrentWeek(parseInt(localStorage.getItem('athenix_current_week')) || 1)
    setCurrentPhase(parseInt(localStorage.getItem('athenix_current_phase')) || 1)
    
    // Get today's workout
    const plan = JSON.parse(localStorage.getItem('athenix_workout_plan'))
    if (plan && plan.phases[0]?.weeks_detail?.week1) {
      // For demo, show the first workout
      setTodayWorkout(plan.phases[0].weeks_detail.week1[0])
    }

    // Load water intake for today
    const waterLog = localStorage.getItem('athenix_water_today')
    if (waterLog) {
      const log = JSON.parse(waterLog)
      if (log.date === new Date().toDateString()) {
        setWaterIntake(log.count)
      }
    }
  }, [router])

  const handleWaterClick = () => {
    const newCount = waterIntake + 1
    if (newCount <= 8) {
      setWaterIntake(newCount)
      localStorage.setItem('athenix_water_today', JSON.stringify({
        date: new Date().toDateString(),
        count: newCount
      }))
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.push('/')
    }
  }

  if (!userData || !workoutPlan || !nutritionPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PhoenixLogo className="w-20 h-20 animate-pulse-glow" />
      </div>
    )
  }

  const phaseInfo = workoutPlan.phases[currentPhase - 1]
  const daysIntoProgram = (currentWeek - 1) * 7 + 3 // Mock: 3 days into current week
  const daysUntilNextPhase = currentPhase === 1 ? (28 - daysIntoProgram) : (currentPhase === 2 ? (56 - daysIntoProgram) : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <PhoenixLogo className="w-10 h-10" />
              <span className="text-xl font-bold text-gradient">ATHENIX</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => router.push('/dashboard')} className="text-primary font-semibold">
                Dashboard
              </button>
              <button onClick={() => router.push('/dashboard/workouts')} className="text-text-secondary hover:text-primary transition-colors">
                Workouts
              </button>
              <button onClick={() => router.push('/dashboard/nutrition')} className="text-text-secondary hover:text-primary transition-colors">
                Nutrition
              </button>
              <button onClick={() => router.push('/dashboard/progress')} className="text-text-secondary hover:text-primary transition-colors">
                Progress
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-card rounded-lg transition-colors text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            {phaseInfo.name} • Week {currentWeek} of {workoutPlan.totalWeeks}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Weight Progress */}
          <div className="card hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Weight</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">{progress?.currentWeight || 0} lbs</p>
            <p className="text-sm text-text-secondary">
              {progress?.startWeight && progress?.currentWeight 
                ? `${(progress.startWeight - progress.currentWeight).toFixed(1)} lbs lost`
                : 'Track your progress'}
            </p>
          </div>

          {/* Workouts This Week */}
          <div className="card hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">This Week</span>
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">4<span className="text-xl text-text-secondary">/5</span></p>
            <p className="text-sm text-text-secondary">Workouts completed</p>
          </div>

          {/* Days Until Next Phase */}
          <div className="card hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Next Phase</span>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">{daysUntilNextPhase}</p>
            <p className="text-sm text-text-secondary">Days remaining</p>
          </div>

          {/* Streak */}
          <div className="card hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Streak</span>
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">{progress?.currentStreak || 0}</p>
            <p className="text-sm text-text-secondary">Day streak</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Workout - Large Card */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Workout</h2>
              <button 
                onClick={() => router.push('/dashboard/workouts')}
                className="text-primary hover:text-accent text-sm font-semibold"
              >
                View Full Plan →
              </button>
            </div>

            {todayWorkout ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{todayWorkout.name}</h3>
                  <div className="flex gap-4 text-sm text-text-secondary">
                    <span>🎯 {todayWorkout.targetMuscles}</span>
                    <span>⏱️ {todayWorkout.estimatedTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-text-secondary">KEY EXERCISES:</p>
                  {todayWorkout.exercises.slice(0, 4).map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-text-secondary">{exercise.sets} sets × {exercise.reps}</p>
                      </div>
                      <span className="text-xs text-text-secondary">{exercise.rest} rest</span>
                    </div>
                  ))}
                  {todayWorkout.exercises.length > 4 && (
                    <p className="text-sm text-text-secondary text-center">
                      + {todayWorkout.exercises.length - 4} more exercises
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => router.push('/dashboard/workouts')}
                  className="w-full btn-primary mt-6"
                >
                  Start Workout
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                <p className="text-text-secondary">No workout scheduled for today</p>
                <button 
                  onClick={() => router.push('/dashboard/workouts')}
                  className="btn-primary mt-4"
                >
                  View Workout Plan
                </button>
              </div>
            )}
          </div>

          {/* Daily Nutrition */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Today's Nutrition</h2>
              <button 
                onClick={() => router.push('/dashboard/nutrition')}
                className="text-primary hover:text-accent text-sm font-semibold"
              >
                View →
              </button>
            </div>

            {/* Macro Circles */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-secondary">Calories</span>
                  <span className="text-sm font-semibold">{nutritionPlan.dailyCalories} kcal</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-secondary">Protein</span>
                  <span className="text-sm font-semibold">{nutritionPlan.protein}g</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-secondary">Carbs</span>
                  <span className="text-sm font-semibold">{nutritionPlan.carbs}g</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-text-secondary">Fats</span>
                  <span className="text-sm font-semibold">{nutritionPlan.fats}g</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            {/* Water Intake */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Water Intake</span>
                <span className="text-sm text-text-secondary">{waterIntake}/8 glasses</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={handleWaterClick}
                    className={`flex-1 h-8 rounded transition-all ${
                      i < waterIntake 
                        ? 'bg-primary' 
                        : 'bg-background border border-border hover:border-primary'
                    }`}
                  >
                    {i < waterIntake && <Droplet className="w-4 h-4 mx-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => router.push('/dashboard/nutrition')}
              className="w-full btn-secondary mt-6"
            >
              View Meal Plan
            </button>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <button 
            onClick={() => router.push('/dashboard/progress')}
            className="card hover:border-primary/50 transition-all hover:scale-105 text-left"
          >
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold mb-2">Progress Tracker</h3>
            <p className="text-sm text-text-secondary">View photos, measurements, and stats</p>
          </button>

          <button 
            onClick={() => router.push('/dashboard/plan')}
            className="card hover:border-primary/50 transition-all hover:scale-105 text-left"
          >
            <Calendar className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold mb-2">My Plan</h3>
            <p className="text-sm text-text-secondary">View full 12-week program overview</p>
          </button>

          <button 
            onClick={() => router.push('/dashboard/form-check')}
            className="card hover:border-primary/50 transition-all hover:scale-105 text-left"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎥</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-semibold">AI Powered</span>
            </div>
            <h3 className="text-lg font-bold mb-2">AI Form Check</h3>
            <p className="text-sm text-text-secondary">Upload videos and get instant feedback on your form</p>
          </button>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-card border-t border-border">
        <div className="flex justify-around py-3">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center gap-1 text-primary">
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button onClick={() => router.push('/dashboard/workouts')} className="flex flex-col items-center gap-1 text-text-secondary">
            <Flame className="w-5 h-5" />
            <span className="text-xs">Workouts</span>
          </button>
          <button onClick={() => router.push('/dashboard/nutrition')} className="flex flex-col items-center gap-1 text-text-secondary">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Nutrition</span>
          </button>
          <button onClick={() => router.push('/dashboard/progress')} className="flex flex-col items-center gap-1 text-text-secondary">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Progress</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
