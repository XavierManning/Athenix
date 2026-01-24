'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Check, Droplet, ChevronDown, ChevronUp } from 'lucide-react'

export default function NutritionPage() {
  const router = useRouter()
  const [nutritionPlan, setNutritionPlan] = useState(null)
  const [waterIntake, setWaterIntake] = useState(0)
  const [loggedMeals, setLoggedMeals] = useState([])
  const [expandedMeal, setExpandedMeal] = useState(null)

  useEffect(() => {
    const plan = localStorage.getItem('athenix_nutrition_plan')
    if (plan) {
      setNutritionPlan(JSON.parse(plan))
    }

    // Load water intake for today
    const waterLog = localStorage.getItem('athenix_water_today')
    if (waterLog) {
      const log = JSON.parse(waterLog)
      if (log.date === new Date().toDateString()) {
        setWaterIntake(log.count)
      }
    }

    // Load logged meals
    const meals = localStorage.getItem('athenix_logged_meals_today')
    if (meals) {
      const log = JSON.parse(meals)
      if (log.date === new Date().toDateString()) {
        setLoggedMeals(log.meals)
      }
    }
  }, [])

  const handleWaterClick = () => {
    const newCount = waterIntake < 8 ? waterIntake + 1 : 0
    setWaterIntake(newCount)
    localStorage.setItem('athenix_water_today', JSON.stringify({
      date: new Date().toDateString(),
      count: newCount
    }))
  }

  const toggleMeal = (mealIndex) => {
    setLoggedMeals(prev => {
      const updated = prev.includes(mealIndex)
        ? prev.filter(i => i !== mealIndex)
        : [...prev, mealIndex]
      localStorage.setItem('athenix_logged_meals_today', JSON.stringify({
        date: new Date().toDateString(),
        meals: updated
      }))
      return updated
    })
  }

  if (!nutritionPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PhoenixLogo className="w-20 h-20 animate-pulse-glow" />
      </div>
    )
  }

  const totalLoggedCalories = loggedMeals.reduce((sum, mealIndex) => {
    return sum + (nutritionPlan.meals[mealIndex]?.calories || 0)
  }, 0)

  const totalLoggedProtein = loggedMeals.reduce((sum, mealIndex) => {
    return sum + (nutritionPlan.meals[mealIndex]?.protein || 0)
  }, 0)

  const calorieProgress = (totalLoggedCalories / nutritionPlan.dailyCalories) * 100
  const proteinProgress = (totalLoggedProtein / nutritionPlan.protein) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="hover:text-primary transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <PhoenixLogo className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">Nutrition Plan</h1>
                <p className="text-xs text-text-secondary">Today's Meals</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24 max-w-4xl">
        {/* Daily Overview */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Calories */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">Daily Calories</span>
              <span className="text-lg font-bold">
                {totalLoggedCalories} / {nutritionPlan.dailyCalories}
              </span>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              {nutritionPlan.dailyCalories - totalLoggedCalories} kcal remaining
            </p>
          </div>

          {/* Protein */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">Protein</span>
              <span className="text-lg font-bold">
                {totalLoggedProtein}g / {nutritionPlan.protein}g
              </span>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${Math.min(proteinProgress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              {nutritionPlan.protein - totalLoggedProtein}g remaining
            </p>
          </div>
        </div>

        {/* Water Intake */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Droplet className="w-5 h-5 text-primary" />
              Water Intake
            </h3>
            <span className="text-sm text-text-secondary">{waterIntake} / 8 glasses</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={handleWaterClick}
                className={`flex-1 h-12 rounded-lg transition-all ${
                  i < waterIntake
                    ? 'bg-primary hover:bg-accent'
                    : 'bg-background border border-border hover:border-primary'
                }`}
              >
                <Droplet className={`w-5 h-5 mx-auto ${i < waterIntake ? 'text-white' : 'text-text-secondary'}`} />
              </button>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-3 text-center">
            Tap to log a glass. Tap last glass to reset.
          </p>
        </div>

        {/* Macros Summary */}
        <div className="card mb-6">
          <h3 className="text-lg font-bold mb-4">Today's Macro Targets</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{nutritionPlan.protein}g</p>
              <p className="text-sm text-text-secondary">Protein</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{nutritionPlan.carbs}g</p>
              <p className="text-sm text-text-secondary">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">{nutritionPlan.fats}g</p>
              <p className="text-sm text-text-secondary">Fats</p>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-bold">Meal Plan</h3>
          {nutritionPlan.meals.map((meal, index) => {
            const isLogged = loggedMeals.includes(index)
            const isExpanded = expandedMeal === index

            return (
              <div key={index} className={`card ${isLogged ? 'border-primary/50 bg-primary/5' : ''}`}>
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleMeal(index)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isLogged ? 'bg-primary border-primary' : 'border-border hover:border-primary'
                    }`}
                  >
                    {isLogged && <Check className="w-4 h-4 text-white" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className={`text-lg font-bold ${isLogged ? 'text-text-secondary' : ''}`}>
                          {meal.name}
                        </h4>
                        <p className="text-sm text-text-secondary">{meal.time}</p>
                      </div>
                      <button
                        onClick={() => setExpandedMeal(isExpanded ? null : index)}
                        className="text-text-secondary hover:text-primary"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="flex gap-4 text-sm text-text-secondary mb-3">
                      <span>{meal.calories} cal</span>
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>F: {meal.fats}g</span>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm font-semibold mb-2">Foods:</p>
                        <ul className="space-y-1">
                          {meal.foods.map((food, foodIndex) => (
                            <li key={foodIndex} className="text-sm text-text-secondary flex gap-2">
                              <span>•</span>
                              <span>{food}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!isLogged && (
                      <button
                        onClick={() => toggleMeal(index)}
                        className="btn-secondary text-sm py-2 mt-3 w-full"
                      >
                        Log as Eaten
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Guidelines */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4">📝 Nutrition Guidelines</h3>
          <ul className="space-y-3">
            {nutritionPlan.guidelines.map((guideline, index) => (
              <li key={index} className="flex gap-3 text-sm text-text-secondary">
                <span className="text-primary">•</span>
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
