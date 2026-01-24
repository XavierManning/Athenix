'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Lock, Download } from 'lucide-react'

export default function PlanPage() {
  const router = useRouter()
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [userData, setUserData] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(1)

  useEffect(() => {
    const plan = localStorage.getItem('athenix_workout_plan')
    if (plan) {
      setWorkoutPlan(JSON.parse(plan))
    }
    const data = localStorage.getItem('athenix_onboarding_data')
    if (data) {
      setUserData(JSON.parse(data))
    }
    setCurrentWeek(parseInt(localStorage.getItem('athenix_current_week')) || 1)
  }, [])

  const handleDownloadPDF = () => {
    alert('PDF download coming soon! This will generate a branded PDF of your complete 12-week plan.')
  }

  if (!workoutPlan || !userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PhoenixLogo className="w-20 h-20 animate-pulse-glow" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/dashboard')} className="hover:text-primary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <PhoenixLogo className="w-8 h-8" />
                <div>
                  <h1 className="text-lg font-bold">My Plan</h1>
                  <p className="text-xs text-text-secondary">12-Week Transformation</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24 max-w-4xl">
        {/* Plan Overview */}
        <div className="card mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Personalized Plan</h2>
          <p className="text-text-secondary mb-6">
            This 12-week program has been custom-built based on your goals, experience, schedule, and preferences.
            Your plan adapts as you progress through three distinct phases.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-text-secondary mb-1">Total Duration</p>
              <p className="text-2xl font-bold">12 Weeks</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-text-secondary mb-1">Current Phase</p>
              <p className="text-2xl font-bold">Phase {Math.ceil(currentWeek / 4)}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-text-secondary mb-1">Current Week</p>
              <p className="text-2xl font-bold">Week {currentWeek}</p>
            </div>
          </div>
        </div>

        {/* Personalization Summary */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">🎯 Your Plan Was Built For:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-primary font-semibold min-w-[120px]">Goal:</span>
              <span className="text-text-secondary">{userData.primaryGoal}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-semibold min-w-[120px]">Experience:</span>
              <span className="text-text-secondary">{userData.fitnessHistory}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-semibold min-w-[120px]">Schedule:</span>
              <span className="text-text-secondary">{userData.daysPerWeek} days/week, {userData.workoutLength} sessions</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-semibold min-w-[120px]">Location:</span>
              <span className="text-text-secondary">{userData.workoutPreference}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-semibold min-w-[120px]">Equipment:</span>
              <span className="text-text-secondary">{userData.equipment.join(', ')}</span>
            </div>
            {userData.injuries && (
              <div className="flex gap-3">
                <span className="text-primary font-semibold min-w-[120px]">Considerations:</span>
                <span className="text-text-secondary">{userData.injuries}</span>
              </div>
            )}
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Phase Breakdown</h3>
          
          {workoutPlan.phases.map((phase) => {
            const isLocked = phase.phase > 1 && ((phase.phase === 2 && currentWeek < 5) || (phase.phase === 3 && currentWeek < 9))
            const isCurrent = Math.ceil(currentWeek / 4) === phase.phase

            return (
              <div
                key={phase.phase}
                className={`card ${
                  isCurrent ? 'border-primary bg-primary/5' : ''
                } ${isLocked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold">Phase {phase.phase}</h4>
                      {isCurrent && (
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                          CURRENT
                        </span>
                      )}
                      {isLocked && (
                        <span className="flex items-center gap-1 text-xs text-text-secondary">
                          <Lock className="w-3 h-3" />
                          Unlocks Week {phase.weeks[0]}
                        </span>
                      )}
                    </div>
                    <h5 className="text-xl font-semibold text-primary mb-2">{phase.name}</h5>
                    <p className="text-sm text-text-secondary">Weeks {phase.weeks[0]}-{phase.weeks[phase.weeks.length - 1]}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-text-secondary mb-2">FOCUS:</p>
                    <p className="text-sm">{phase.focus}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-text-secondary mb-2">APPROACH:</p>
                    <p className="text-sm">{phase.description}</p>
                  </div>

                  {phase.weeks_detail && (
                    <div className="pt-4 border-t border-border">
                      <button
                        onClick={() => router.push('/dashboard/workouts')}
                        className="btn-primary text-sm"
                      >
                        View Detailed Workouts
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tips */}
        <div className="card mt-8">
          <h3 className="text-xl font-bold mb-4">💡 Tips for Success</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Track your workouts consistently to see progressive overload in action</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Take progress photos every 2 weeks - visual changes happen gradually</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Don't skip the warm-up and cool-down - they prevent injury and improve recovery</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Rest days are when your body grows - respect the recovery process</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Week 4, 8, and 12 are deload weeks - embrace the lighter loads</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
