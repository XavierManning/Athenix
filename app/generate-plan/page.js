'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'

export default function GeneratePlanPage() {
  const router = useRouter()
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  const messages = [
    'Analyzing your profile...',
    'Calculating your baseline metrics...',
    'Designing your workout structure...',
    'Optimizing exercise selection...',
    'Calculating nutrition needs...',
    'Creating meal templates...',
    'Customizing your plan...',
    'Finalizing your transformation roadmap...'
  ]

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 80) // 8 seconds total (80ms * 100)

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < messages.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1000) // Change message every 1 second

    // Generate plan after animation completes
    const generationTimeout = setTimeout(async () => {
      await generatePlan()
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }, 8500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(generationTimeout)
    }
  }, [])

  const generatePlan = async () => {
    try {
      const onboardingData = JSON.parse(localStorage.getItem('athenix_onboarding_data') || '{}')
      
      // In production, this would call the OpenAI API
      // For now, generate mock personalized plan
      const workoutPlan = generateWorkoutPlan(onboardingData)
      const nutritionPlan = generateNutritionPlan(onboardingData)
      
      // Store the generated plans
      localStorage.setItem('athenix_workout_plan', JSON.stringify(workoutPlan))
      localStorage.setItem('athenix_nutrition_plan', JSON.stringify(nutritionPlan))
      localStorage.setItem('athenix_onboarding_complete', 'true')
      localStorage.setItem('athenix_current_week', '1')
      localStorage.setItem('athenix_current_phase', '1')
      
      // Store initial progress data
      localStorage.setItem('athenix_progress', JSON.stringify({
        startWeight: onboardingData.weight,
        currentWeight: onboardingData.weight,
        startDate: new Date().toISOString(),
        workoutsCompleted: 0,
        currentStreak: 0,
        photos: onboardingData.bodyPhoto ? [{
          url: onboardingData.bodyPhoto,
          date: new Date().toISOString()
        }] : []
      }))
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
      
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Error generating plan. Please try again.')
      router.push('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse-glow">
          <PhoenixLogo className="w-32 h-32 mx-auto" />
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold mb-4">
          Creating Your Plan
        </h1>

        {/* Current Status */}
        <p className="text-xl text-text-secondary mb-8 min-h-[60px] flex items-center justify-center">
          {messages[currentMessage]}
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-text-secondary mt-2">{progress}%</p>
        </div>

        {/* Additional Info */}
        <div className="card text-left">
          <p className="text-sm text-text-secondary">
            <span className="text-primary font-semibold">✨ AI is analyzing:</span>
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>• Your fitness history and experience level</li>
            <li>• Available time and equipment</li>
            <li>• Nutrition preferences and restrictions</li>
            <li>• Goals, motivation, and obstacles</li>
            <li>• Lifestyle and schedule constraints</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Mock AI Plan Generation Functions
function generateWorkoutPlan(userData) {
  const daysPerWeek = parseInt(userData.daysPerWeek) || 3
  
  return {
    id: 'plan_' + Date.now(),
    userId: 'user_' + Date.now(),
    generatedAt: new Date().toISOString(),
    currentPhase: 1,
    currentWeek: 1,
    totalPhases: 3,
    totalWeeks: 12,
    phases: [
      {
        phase: 1,
        name: 'Foundation Building',
        weeks: [1, 2, 3, 4],
        focus: 'Learning proper form, building base strength, establishing consistency',
        description: `This phase focuses on mastering fundamental movement patterns and building a solid foundation. We'll progressively increase volume while ensuring you're comfortable with each exercise.`,
        weeks_detail: generatePhase1Workouts(userData, daysPerWeek)
      },
      {
        phase: 2,
        name: 'Progressive Overload',
        weeks: [5, 6, 7, 8],
        focus: 'Increasing intensity, building muscle, improving work capacity',
        description: `Now that you've built a foundation, we'll progressively increase weights and introduce advanced techniques like supersets and drop sets. This phase is where you'll see significant strength and muscle gains.`,
        unlocked: false
      },
      {
        phase: 3,
        name: 'Peak Performance',
        weeks: [9, 10, 11, 12],
        focus: 'Maximizing results, fine-tuning physique, peak conditioning',
        description: `The final phase focuses on maximizing your results with advanced training techniques, higher intensity, and strategic deloads. This is where your transformation becomes undeniable.`,
        unlocked: false
      }
    ]
  }
}

function generatePhase1Workouts(userData, daysPerWeek) {
  const hasGym = userData.equipment.some(e => e.includes('gym') || e.includes('weights'))
  
  const week1 = []
  for (let day = 1; day <= daysPerWeek; day++) {
    week1.push({
      day: day,
      name: getDayName(day, daysPerWeek),
      targetMuscles: getTargetMuscles(day, daysPerWeek),
      estimatedTime: userData.workoutLength || '45 min',
      warmup: [
        '5-10 min light cardio (walk, bike, or row)',
        'Dynamic stretches: arm circles, leg swings, torso twists',
        'Light activation exercises for target muscles'
      ],
      exercises: generateExercises(day, daysPerWeek, hasGym, 1),
      cooldown: [
        '5 min light cardio cooldown',
        'Static stretches for worked muscles (hold 30 sec each)',
        'Deep breathing exercises'
      ],
      notes: `Focus on form over weight. Rest 60-90 seconds between sets. ${userData.injuries ? 'Note: Modify exercises as needed for your limitations.' : ''}`
    })
  }
  
  // Generate weeks 2-4 with progressive overload
  return {
    week1,
    week2: week1.map(day => ({ ...day, notes: 'Increase weight by 5-10% if exercises felt easy last week.' })),
    week3: week1.map(day => ({ ...day, notes: 'Continue progressive overload. Focus on mind-muscle connection.' })),
    week4: week1.map(day => ({ ...day, notes: 'Deload week - reduce weight by 20% to recover and prepare for Phase 2.' }))
  }
}

function getDayName(day, totalDays) {
  if (totalDays <= 3) {
    return ['Full Body A', 'Full Body B', 'Full Body C'][day - 1]
  } else if (totalDays === 4) {
    return ['Upper Body', 'Lower Body', 'Upper Body', 'Lower Body'][day - 1]
  } else {
    return ['Push', 'Pull', 'Legs', 'Upper Body', 'Lower Body', 'Full Body'][day - 1]
  }
}

function getTargetMuscles(day, totalDays) {
  if (totalDays <= 3) {
    return ['Chest, Back, Legs, Arms', 'Shoulders, Back, Legs, Core', 'Full Body'][day - 1]
  } else if (totalDays === 4) {
    return ['Chest, Back, Shoulders, Arms', 'Quads, Hamstrings, Glutes, Calves'][day % 2 === 1 ? 0 : 1]
  } else {
    return ['Chest, Shoulders, Triceps', 'Back, Biceps', 'Quads, Hamstrings, Glutes', 'Upper Body', 'Lower Body', 'Full Body'][day - 1]
  }
}

function generateExercises(day, totalDays, hasGym, week) {
  // This is a simplified version - in production, this would be much more sophisticated
  const exercises = []
  
  if (hasGym) {
    if (totalDays <= 3 || day === 1) {
      exercises.push(
        { name: 'Barbell Squat', sets: 3, reps: '10-12', rest: '90s', weight: '', notes: 'Core lower body exercise' },
        { name: 'Bench Press', sets: 3, reps: '10-12', rest: '90s', weight: '', notes: 'Primary chest builder' },
        { name: 'Bent-Over Row', sets: 3, reps: '10-12', rest: '90s', weight: '', notes: 'Back thickness' },
        { name: 'Overhead Press', sets: 3, reps: '8-10', rest: '90s', weight: '', notes: 'Shoulder development' },
        { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', weight: '', notes: 'Hamstrings and glutes' },
        { name: 'Plank', sets: 3, reps: '30-60s hold', rest: '60s', weight: 'Bodyweight', notes: 'Core stability' }
      )
    }
  } else {
    exercises.push(
      { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s', weight: 'Bodyweight', notes: 'Chest, shoulders, triceps' },
      { name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: '60s', weight: 'Bodyweight', notes: 'Legs and glutes' },
      { name: 'Dumbbell Rows', sets: 3, reps: '12-15', rest: '60s', weight: 'Light dumbbells', notes: 'Back and biceps' },
      { name: 'Lunges', sets: 3, reps: '10-12 each leg', rest: '60s', weight: 'Bodyweight', notes: 'Legs and balance' },
      { name: 'Plank', sets: 3, reps: '30-60s hold', rest: '60s', weight: 'Bodyweight', notes: 'Core' },
      { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '60s', weight: 'Bodyweight', notes: 'Glutes and hamstrings' }
    )
  }
  
  return exercises
}

function generateNutritionPlan(userData) {
  // Calculate basic macros based on user data
  const weight = parseFloat(userData.weight) || 150
  const age = parseInt(userData.age) || 25
  const isMale = userData.gender === 'male'
  
  // Simplified BMR calculation
  let bmr = isMale ? (10 * weight * 0.453592 + 6.25 * 175 - 5 * age + 5) : (10 * weight * 0.453592 + 6.25 * 165 - 5 * age - 161)
  
  // Activity multiplier based on workout frequency
  const activityMultiplier = userData.daysPerWeek === '2' ? 1.375 : userData.daysPerWeek === '3' ? 1.55 : 1.725
  let tdee = Math.round(bmr * activityMultiplier)
  
  // Adjust for goal
  let calories = tdee
  if (userData.primaryGoal?.includes('Lose fat')) {
    calories = Math.round(tdee * 0.85) // 15% deficit
  } else if (userData.primaryGoal?.includes('Build muscle')) {
    calories = Math.round(tdee * 1.1) // 10% surplus
  }
  
  // Calculate macros
  const protein = Math.round(weight * 0.8) // 0.8g per lb
  const fat = Math.round((calories * 0.25) / 9) // 25% of calories from fat
  const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4)
  
  return {
    id: 'nutrition_' + Date.now(),
    userId: 'user_' + Date.now(),
    dailyCalories: calories,
    protein: protein,
    carbs: carbs,
    fats: fat,
    waterGoal: 8, // glasses
    meals: generateMealPlan(calories, protein, carbs, fat, userData),
    guidelines: [
      `Your daily calorie target is ${calories} calories to support your goal: ${userData.primaryGoal}`,
      `Aim for ${protein}g protein daily to support muscle recovery and growth`,
      `Spread meals throughout the day to maintain energy and support metabolism`,
      `Drink at least 8 glasses of water daily, more on workout days`,
      userData.nutritionChallenge?.includes('time') ? 'Meal prep on weekends to save time during the week' : '',
      userData.dietaryRestrictions?.includes('Vegetarian') || userData.dietaryRestrictions?.includes('Vegan') ? 'Include protein-rich plant sources like legumes, tofu, and quinoa' : ''
    ].filter(Boolean)
  }
}

function generateMealPlan(calories, protein, carbs, fat, userData) {
  const isVegetarian = userData.dietaryRestrictions?.includes('Vegetarian')
  const isVegan = userData.dietaryRestrictions?.includes('Vegan')
  const loveCooking = userData.dietaryRestrictions?.includes('Love to cook')
  
  return [
    {
      name: 'Breakfast',
      time: '7:00 AM',
      calories: Math.round(calories * 0.25),
      protein: Math.round(protein * 0.25),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fat * 0.25),
      foods: isVegan
        ? ['Oatmeal with banana and almond butter', 'Chia seeds', 'Plant-based protein shake', 'Mixed berries']
        : ['Scrambled eggs (3 whole)', 'Whole grain toast', 'Avocado', 'Greek yogurt with berries']
    },
    {
      name: 'Mid-Morning Snack',
      time: '10:00 AM',
      calories: Math.round(calories * 0.1),
      protein: Math.round(protein * 0.15),
      carbs: Math.round(carbs * 0.1),
      fats: Math.round(fat * 0.15),
      foods: ['Protein bar or shake', 'Apple or banana', 'Handful of almonds']
    },
    {
      name: 'Lunch',
      time: '12:30 PM',
      calories: Math.round(calories * 0.3),
      protein: Math.round(protein * 0.3),
      carbs: Math.round(carbs * 0.3),
      fats: Math.round(fat * 0.25),
      foods: isVegetarian
        ? ['Quinoa bowl with chickpeas', 'Mixed vegetables', 'Tahini dressing', 'Side salad']
        : ['Grilled chicken breast (6oz)', 'Brown rice (1 cup)', 'Steamed broccoli', 'Mixed greens salad']
    },
    {
      name: 'Pre-Workout Snack',
      time: '3:00 PM',
      calories: Math.round(calories * 0.1),
      protein: Math.round(protein * 0.1),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fat * 0.05),
      foods: ['Banana', 'Rice cakes with almond butter', 'Small protein shake']
    },
    {
      name: 'Dinner',
      time: '6:30 PM',
      calories: Math.round(calories * 0.25),
      protein: Math.round(protein * 0.3),
      carbs: Math.round(carbs * 0.15),
      fats: Math.round(fat * 0.3),
      foods: isVegan
        ? ['Tofu stir-fry with vegetables', 'Quinoa or brown rice', 'Mixed nuts', 'Leafy greens']
        : ['Salmon or lean beef (6oz)', 'Sweet potato', 'Asparagus', 'Olive oil drizzle']
    }
  ]
}