'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ChevronLeft, ChevronRight, Camera, Upload } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 9
  
  // Initialize form data from localStorage or default values
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('athenix_onboarding_data')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return {
      // Step 1: Basic Info
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      
      // Step 2: Goals & Motivation
      primaryGoal: '',
      motivation: '',
      timeline: '',
      
      // Step 3: Experience & Activity
      fitnessHistory: '',
      exerciseTypes: [],
      pastSuccess: '',
      pastStruggles: [],
      
      // Step 4: Lifestyle & Schedule
      daysPerWeek: '',
      workoutLength: '',
      preferredTime: '',
      jobType: '',
      sleepHours: '',
      stressLevel: '',
      
      // Step 5: Equipment & Location
      workoutPreference: '',
      equipment: [],
      
      // Step 6: Nutrition
      eatingHabits: '',
      nutritionChallenge: '',
      dietaryRestrictions: [],
      waterIntake: '',
      
      // Step 7: Psychology & Preferences
      biggestObstacle: '',
      motivationFactors: [],
      trackingPreference: [],
      communicationStyle: '',
      structurePreference: 5,
      
      // Step 8: Body Scan
      bodyPhoto: null,
      measurements: {
        chest: '',
        waist: '',
        arms: '',
        thighs: ''
      },
      injuries: '',
      
      // Step 9: Review
      reviewed: false
    }
  })

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('athenix_onboarding_data', JSON.stringify(formData))
  }, [formData])

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleGeneratePlan = () => {
    // Store user's name from formData if not already stored
    const user = JSON.parse(localStorage.getItem('athenix_user') || '{}')
    user.name = formData.name
    localStorage.setItem('athenix_user', JSON.stringify(user))
    
    // Redirect to generation screen
    router.push('/generate-plan')
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData('bodyPhoto', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.age && formData.gender && formData.height && formData.weight
      case 2:
        return formData.primaryGoal && formData.motivation && formData.timeline
      case 3:
        return formData.fitnessHistory && formData.exerciseTypes.length > 0
      case 4:
        return formData.daysPerWeek && formData.workoutLength && formData.preferredTime && formData.jobType && formData.sleepHours && formData.stressLevel
      case 5:
        return formData.workoutPreference && formData.equipment.length > 0
      case 6:
        return formData.eatingHabits && formData.nutritionChallenge && formData.dietaryRestrictions.length > 0 && formData.waterIntake
      case 7:
        return formData.biggestObstacle && formData.motivationFactors.length > 0 && formData.communicationStyle
      case 8:
        return true // Body scan is optional
      case 9:
        return true
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Let's Get Started</h2>
            <p className="text-text-secondary mb-8">Tell us about yourself</p>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  className="input-field"
                  placeholder="25"
                  min="13"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Height *</label>
              <select
                value={formData.height}
                onChange={(e) => updateFormData('height', e.target.value)}
                className="input-field"
              >
                <option value="">Select height</option>
                {Array.from({ length: 36 }, (_, i) => {
                  const feet = Math.floor((i + 48) / 12)
                  const inches = (i + 48) % 12
                  const cm = Math.round((i + 48) * 2.54)
                  return (
                    <option key={i} value={`${feet}'${inches}"`}>
                      {feet}'{inches}" ({cm} cm)
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Weight (lbs) *</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => updateFormData('weight', e.target.value)}
                className="input-field"
                placeholder="150"
                min="50"
                max="500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Your Goals</h2>
            <p className="text-text-secondary mb-8">What drives you?</p>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Fitness Goal *</label>
              <div className="space-y-2">
                {[
                  'Lose fat and see muscle definition',
                  'Build noticeable muscle mass',
                  'Get stronger',
                  'Improve athletic performance',
                  'Feel more confident',
                  'Have more energy',
                  'Get back in shape after break',
                  'Maintain fitness efficiently'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => updateFormData('primaryGoal', goal)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.primaryGoal === goal
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What's driving this goal? *</label>
              <div className="space-y-2">
                {[
                  'Upcoming event',
                  'Tired of feeling weak/out of shape',
                  'Keep up with friends/family',
                  'Health recommendation',
                  'Dating/relationship confidence',
                  'Competition',
                  'Feel like myself again',
                  'Personal challenge'
                ].map((motivation) => (
                  <button
                    key={motivation}
                    onClick={() => updateFormData('motivation', motivation)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.motivation === motivation
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {motivation}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timeline Expectations *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  '4-6 weeks',
                  '2-3 months',
                  '6+ months',
                  'No rush, lifestyle change'
                ].map((timeline) => (
                  <button
                    key={timeline}
                    onClick={() => updateFormData('timeline', timeline)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.timeline === timeline
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Your Experience</h2>
            <p className="text-text-secondary mb-8">Help us understand your fitness background</p>

            <div>
              <label className="block text-sm font-medium mb-2">Fitness History *</label>
              <div className="space-y-2">
                {[
                  'Complete beginner',
                  'Used to be fit (6+ months break)',
                  'Sporadic (1-2x/month)',
                  'Fairly consistent (1-2x/week, few months)',
                  'Regular (3+ times/week, 6+ months)',
                  'Very experienced (years of training)'
                ].map((history) => (
                  <button
                    key={history}
                    onClick={() => updateFormData('fitnessHistory', history)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.fitnessHistory === history
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {history}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Types of Exercise Tried * (Select all that apply)</label>
              <div className="space-y-2">
                {[
                  'Gym weight training',
                  'Home bodyweight workouts',
                  'Running/cardio machines',
                  'Group fitness classes',
                  'Sports',
                  'Yoga/pilates',
                  'Dance/martial arts',
                  'None'
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleArrayItem('exerciseTypes', type)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.exerciseTypes.includes(type)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{type}</span>
                      {formData.exerciseTypes.includes(type) && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What made you quit/struggle in the past? (Select top 2)</label>
              <div className="space-y-2">
                {[
                  'Too time-consuming',
                  'Got bored',
                  'No results',
                  'Too hard/intense',
                  'Injury',
                  'Life got busy',
                  'No accountability',
                  'Didn\'t enjoy it'
                ].map((struggle) => (
                  <button
                    key={struggle}
                    onClick={() => {
                      if (formData.pastStruggles.includes(struggle)) {
                        setFormData(prev => ({
                          ...prev,
                          pastStruggles: prev.pastStruggles.filter(s => s !== struggle)
                        }))
                      } else if (formData.pastStruggles.length < 2) {
                        toggleArrayItem('pastStruggles', struggle)
                      }
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.pastStruggles.includes(struggle)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    } ${
                      formData.pastStruggles.length >= 2 && !formData.pastStruggles.includes(struggle)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{struggle}</span>
                      {formData.pastStruggles.includes(struggle) && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {formData.pastStruggles.length > 0 && (
                <p className="text-sm text-text-secondary mt-2">
                  Selected {formData.pastStruggles.length} of 2
                </p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Your Schedule</h2>
            <p className="text-text-secondary mb-8">Let's fit training into your life</p>

            <div>
              <label className="block text-sm font-medium mb-2">Days Per Week Available *</label>
              <div className="grid grid-cols-4 gap-3">
                {['2', '3', '4-5', '6+'].map((days) => (
                  <button
                    key={days}
                    onClick={() => updateFormData('daysPerWeek', days)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.daysPerWeek === days
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {days}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Typical Workout Length *</label>
              <div className="grid grid-cols-2 gap-3">
                {['20-30 min', '45 min', '60+ min', 'Varies'].map((length) => (
                  <button
                    key={length}
                    onClick={() => updateFormData('workoutLength', length)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.workoutLength === length
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Workout Time *</label>
              <div className="grid grid-cols-3 gap-3">
                {['Morning', 'Lunch', 'Afternoon', 'Evening', 'Night', 'Flexible'].map((time) => (
                  <button
                    key={time}
                    onClick={() => updateFormData('preferredTime', time)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.preferredTime === time
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job/Lifestyle Type *</label>
              <div className="space-y-2">
                {[
                  'Desk job (mostly sitting)',
                  'Physical job (on feet, lifting)',
                  'Mixed (some sitting, some moving)',
                  'Student',
                  'Parent (stay-at-home)',
                  'Retired',
                  'Shift work'
                ].map((job) => (
                  <button
                    key={job}
                    onClick={() => updateFormData('jobType', job)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.jobType === job
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {job}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Average Sleep Hours *</label>
              <div className="grid grid-cols-4 gap-3">
                {['<5', '5-6', '7-8', '8+'].map((sleep) => (
                  <button
                    key={sleep}
                    onClick={() => updateFormData('sleepHours', sleep)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.sleepHours === sleep
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {sleep}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Stress Level *</label>
              <div className="grid grid-cols-2 gap-3">
                {['Very low', 'Moderate', 'High', 'Extremely high'].map((stress) => (
                  <button
                    key={stress}
                    onClick={() => updateFormData('stressLevel', stress)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.stressLevel === stress
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {stress}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Equipment & Location</h2>
            <p className="text-text-secondary mb-8">Where will you train?</p>

            <div>
              <label className="block text-sm font-medium mb-2">Workout Preference *</label>
              <div className="space-y-2">
                {[
                  'Home only',
                  'Gym only',
                  'Outdoors',
                  'Mix of all',
                  'Whatever\'s convenient'
                ].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => updateFormData('workoutPreference', pref)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.workoutPreference === pref
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Equipment Access * (Select all that apply)</label>
              <div className="space-y-2">
                {[
                  'Full gym membership',
                  'Home gym with weights',
                  'Basic equipment (dumbbells, bands)',
                  'Just bodyweight',
                  'Willing to buy basic equipment',
                  'Outdoor spaces (park, track)'
                ].map((equip) => (
                  <button
                    key={equip}
                    onClick={() => toggleArrayItem('equipment', equip)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.equipment.includes(equip)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{equip}</span>
                      {formData.equipment.includes(equip) && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Nutrition</h2>
            <p className="text-text-secondary mb-8">Fuel your transformation</p>

            <div>
              <label className="block text-sm font-medium mb-2">Current Eating Habits *</label>
              <div className="space-y-2">
                {[
                  'Very healthy (track macros, cook)',
                  'Decent (try to eat well)',
                  'Inconsistent (good days, bad days)',
                  'Poor (fast food, skip meals)',
                  'Random (no real pattern)'
                ].map((habit) => (
                  <button
                    key={habit}
                    onClick={() => updateFormData('eatingHabits', habit)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.eatingHabits === habit
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {habit}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Biggest Nutrition Challenge *</label>
              <div className="space-y-2">
                {[
                  'Don\'t know what to eat',
                  'No time to cook',
                  'Portion control',
                  'Eating out too much',
                  'Emotional eating',
                  'Sweet cravings',
                  'Skipping meals',
                  'Actually eat pretty well'
                ].map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() => updateFormData('nutritionChallenge', challenge)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.nutritionChallenge === challenge
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {challenge}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Dietary Restrictions * (Select all that apply)</label>
              <div className="space-y-2">
                {[
                  'None',
                  'Vegetarian',
                  'Vegan',
                  'Keto/low-carb',
                  'Gluten-free',
                  'Dairy-free',
                  'Hate cooking',
                  'Love to cook'
                ].map((restriction) => (
                  <button
                    key={restriction}
                    onClick={() => toggleArrayItem('dietaryRestrictions', restriction)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.dietaryRestrictions.includes(restriction)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{restriction}</span>
                      {formData.dietaryRestrictions.includes(restriction) && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Daily Water Intake *</label>
              <div className="grid grid-cols-2 gap-3">
                {['<3 glasses', '3-5 glasses', '6-8 glasses', '8+ glasses', 'No idea'].map((water) => (
                  <button
                    key={water}
                    onClick={() => updateFormData('waterIntake', water)}
                    className={`p-4 rounded-lg border transition-all ${
                      formData.waterIntake === water
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {water}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Your Psychology</h2>
            <p className="text-text-secondary mb-8">Let's understand what drives you</p>

            <div>
              <label className="block text-sm font-medium mb-2">Biggest Obstacle to Consistency *</label>
              <div className="space-y-2">
                {[
                  'Motivation fades fast',
                  'Too busy/no time',
                  'Don\'t see quick results',
                  'No one to keep me accountable',
                  'Get injured easily',
                  'Travel/schedule changes',
                  'Perfectionism (all or nothing)',
                  'Just hate working out'
                ].map((obstacle) => (
                  <button
                    key={obstacle}
                    onClick={() => updateFormData('biggestObstacle', obstacle)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.biggestObstacle === obstacle
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {obstacle}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What Keeps You Motivated? * (Select top 2)</label>
              <div className="space-y-2">
                {[
                  'Seeing visible changes',
                  'Hitting strength goals',
                  'Feeling energized',
                  'Compliments from others',
                  'Tracking data/progress',
                  'Competing with myself',
                  'Community/accountability',
                  'Routine/habit building'
                ].map((factor) => (
                  <button
                    key={factor}
                    onClick={() => {
                      if (formData.motivationFactors.includes(factor)) {
                        setFormData(prev => ({
                          ...prev,
                          motivationFactors: prev.motivationFactors.filter(f => f !== factor)
                        }))
                      } else if (formData.motivationFactors.length < 2) {
                        toggleArrayItem('motivationFactors', factor)
                      }
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.motivationFactors.includes(factor)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    } ${
                      formData.motivationFactors.length >= 2 && !formData.motivationFactors.includes(factor)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{factor}</span>
                      {formData.motivationFactors.includes(factor) && (
                        <span className="text-primary">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {formData.motivationFactors.length > 0 && (
                <p className="text-sm text-text-secondary mt-2">
                  Selected {formData.motivationFactors.length} of 2
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Communication Style Preference *</label>
              <div className="space-y-2">
                {[
                  'Direct and to the point',
                  'Encouraging and supportive',
                  'Educational (explain the why)',
                  'Tough love (push me)',
                  'Just give me the plan'
                ].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateFormData('communicationStyle', style)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      formData.communicationStyle === style
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Structure vs Flexibility (1 = Need exact plan, 10 = Prefer variety)
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.structurePreference}
                  onChange={(e) => updateFormData('structurePreference', parseInt(e.target.value))}
                  className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Structured</span>
                  <span className="text-primary font-bold">{formData.structurePreference}</span>
                  <span>Flexible</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Body Scan (Optional)</h2>
            <p className="text-text-secondary mb-8">Track your starting point</p>

            <div>
              <label className="block text-sm font-medium mb-4">Upload Body Photo (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {formData.bodyPhoto ? (
                  <div className="space-y-4">
                    <img
                      src={formData.bodyPhoto}
                      alt="Body photo"
                      className="max-w-xs mx-auto rounded-lg"
                    />
                    <button
                      onClick={() => updateFormData('bodyPhoto', null)}
                      className="text-sm text-red-500 hover:text-red-400"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-text-secondary" />
                    <div>
                      <label className="btn-primary cursor-pointer">
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Front, side, or back view. Keep for progress comparison.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Body Measurements (Optional)</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Chest (inches)</label>
                  <input
                    type="number"
                    value={formData.measurements.chest}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, chest: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Waist (inches)</label>
                  <input
                    type="number"
                    value={formData.measurements.waist}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="32"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Arms (inches)</label>
                  <input
                    type="number"
                    value={formData.measurements.arms}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, arms: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="14"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Thighs (inches)</label>
                  <input
                    type="number"
                    value={formData.measurements.thighs}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, thighs: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="22"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Injuries or Limitations (Optional)</label>
              <textarea
                value={formData.injuries}
                onChange={(e) => updateFormData('injuries', e.target.value)}
                className="input-field min-h-[100px]"
                placeholder="Any injuries, pain, or physical limitations we should know about..."
              />
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Review Your Profile</h2>
            <p className="text-text-secondary mb-8">Make sure everything looks good</p>

            <div className="space-y-4">
              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Basic Info</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Name:</span> {formData.name}</p>
                  <p><span className="text-text-secondary">Age:</span> {formData.age}</p>
                  <p><span className="text-text-secondary">Gender:</span> {formData.gender}</p>
                  <p><span className="text-text-secondary">Height:</span> {formData.height}</p>
                  <p><span className="text-text-secondary">Weight:</span> {formData.weight} lbs</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Goals</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Primary Goal:</span> {formData.primaryGoal}</p>
                  <p><span className="text-text-secondary">Motivation:</span> {formData.motivation}</p>
                  <p><span className="text-text-secondary">Timeline:</span> {formData.timeline}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Experience</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Fitness History:</span> {formData.fitnessHistory}</p>
                  <p><span className="text-text-secondary">Exercise Types:</span> {formData.exerciseTypes.join(', ')}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Schedule</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Days Per Week:</span> {formData.daysPerWeek}</p>
                  <p><span className="text-text-secondary">Workout Length:</span> {formData.workoutLength}</p>
                  <p><span className="text-text-secondary">Preferred Time:</span> {formData.preferredTime}</p>
                  <p><span className="text-text-secondary">Job Type:</span> {formData.jobType}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Equipment</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Location:</span> {formData.workoutPreference}</p>
                  <p><span className="text-text-secondary">Equipment:</span> {formData.equipment.join(', ')}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-3 text-primary">Nutrition</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary">Eating Habits:</span> {formData.eatingHabits}</p>
                  <p><span className="text-text-secondary">Challenge:</span> {formData.nutritionChallenge}</p>
                  <p><span className="text-text-secondary">Restrictions:</span> {formData.dietaryRestrictions.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleGeneratePlan}
                className="w-full btn-primary text-lg py-6 flex items-center justify-center gap-3 group"
              >
                <span>Generate My Personalized Plan</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <PhoenixLogo className="w-10 h-10" />
            <span className="text-xl font-bold text-gradient">ATHENIX</span>
          </div>
          <span className="text-sm text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] w-full z-40 bg-background border-b border-border">
        <div className="h-2 bg-card">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="card animate-fade-in">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < totalSteps && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
