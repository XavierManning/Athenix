'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Check, Clock, Dumbbell, Play, ChevronDown, ChevronUp } from 'lucide-react'

export default function WorkoutsPage() {
  const router = useRouter()
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [selectedDay, setSelectedDay] = useState(null)
  const [expandedExercise, setExpandedExercise] = useState(null)
  const [completedExercises, setCompletedExercises] = useState([])

  useEffect(() => {
    const plan = localStorage.getItem('athenix_workout_plan')
    if (plan) {
      setWorkoutPlan(JSON.parse(plan))
    }
    setCurrentPhase(parseInt(localStorage.getItem('athenix_current_phase')) || 1)
    setCurrentWeek(parseInt(localStorage.getItem('athenix_current_week')) || 1)
    
    // Load completed workouts
    const completed = localStorage.getItem('athenix_completed_workouts')
    if (completed) {
      setCompletedExercises(JSON.parse(completed))
    }
  }, [])

  const toggleExercise = (exerciseId) => {
    setCompletedExercises(prev => {
      const updated = prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
      localStorage.setItem('athenix_completed_workouts', JSON.stringify(updated))
      return updated
    })
  }

  const completeWorkout = () => {
    if (confirm('Mark this workout as complete?')) {
      alert('Workout completed! Great job! 🎉')
      setSelectedDay(null)
      // Update progress
      const progress = JSON.parse(localStorage.getItem('athenix_progress') || '{}')
      progress.workoutsCompleted = (progress.workoutsCompleted || 0) + 1
      localStorage.setItem('athenix_progress', JSON.stringify(progress))
    }
  }

  if (!workoutPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PhoenixLogo className="w-20 h-20 animate-pulse-glow" />
      </div>
    )
  }

  const phase = workoutPlan.phases[currentPhase - 1]
  const weekWorkouts = phase.weeks_detail?.[`week${currentWeek}`] || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => selectedDay ? setSelectedDay(null) : router.push('/dashboard')} className="hover:text-primary transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <PhoenixLogo className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">Workout Plan</h1>
                <p className="text-xs text-text-secondary">{phase.name} • Week {currentWeek}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24">
        {!selectedDay ? (
          <>
            {/* Phase Selector */}
            <div className="flex gap-3 mb-6 overflow-x-auto">
              {workoutPlan.phases.map((p) => (
                <button
                  key={p.phase}
                  onClick={() => {
                    if (p.phase === 1 || (p.phase === 2 && currentWeek >= 5) || (p.phase === 3 && currentWeek >= 9)) {
                      setCurrentPhase(p.phase)
                      setCurrentWeek(p.weeks[0])
                    }
                  }}
                  disabled={p.phase > 1 && ((p.phase === 2 && currentWeek < 5) || (p.phase === 3 && currentWeek < 9))}
                  className={`px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${
                    currentPhase === p.phase
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : p.phase > 1 && ((p.phase === 2 && currentWeek < 5) || (p.phase === 3 && currentWeek < 9))
                      ? 'border-border bg-card/50 text-text-secondary/50 cursor-not-allowed'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="text-sm">Phase {p.phase}</div>
                  <div className="text-xs opacity-75">{p.name}</div>
                  {p.phase > 1 && ((p.phase === 2 && currentWeek < 5) || (p.phase === 3 && currentWeek < 9)) && (
                    <div className="text-xs mt-1">🔒 Unlocks Week {p.weeks[0]}</div>
                  )}
                </button>
              ))}
            </div>

            {/* Phase Info Card */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-2">{phase.name}</h2>
              <p className="text-text-secondary mb-4">{phase.description}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-primary font-semibold">Focus: {phase.focus}</span>
              </div>
            </div>

            {/* Week Selector */}
            {phase.weeks_detail && (
              <>
                <div className="flex gap-3 mb-6 overflow-x-auto">
                  {phase.weeks.map((week) => (
                    <button
                      key={week}
                      onClick={() => setCurrentWeek(week)}
                      className={`px-6 py-3 rounded-lg border transition-all ${
                        currentWeek === week
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      Week {week}
                    </button>
                  ))}
                </div>

                {/* Workout Calendar */}
                <div className="grid md:grid-cols-2 gap-4">
                  {weekWorkouts.map((workout, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(workout)}
                      className="card text-left hover:border-primary/50 transition-all hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold mb-1">Day {workout.day}: {workout.name}</h3>
                          <p className="text-sm text-text-secondary">{workout.targetMuscles}</p>
                        </div>
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {workout.estimatedTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                        <Dumbbell className="w-4 h-4" />
                        <span>{workout.exercises.length} exercises</span>
                      </div>

                      <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        <Play className="w-4 h-4" />
                        <span>Start Workout</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {!phase.weeks_detail && (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Phase {phase.phase} Locked</h3>
                <p className="text-text-secondary mb-4">
                  This phase will unlock when you reach Week {phase.weeks[0]}
                </p>
                <p className="text-sm text-text-secondary">{phase.description}</p>
              </div>
            )}
          </>
        ) : (
          /* Workout Detail View */
          <div className="max-w-3xl mx-auto">
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-2">Day {selectedDay.day}: {selectedDay.name}</h2>
              <div className="flex gap-4 text-sm text-text-secondary mb-4">
                <span>🎯 {selectedDay.targetMuscles}</span>
                <span>⏱️ {selectedDay.estimatedTime}</span>
                <span>💪 {selectedDay.exercises.length} exercises</span>
              </div>
              {selectedDay.notes && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm">
                  <p className="text-primary font-semibold mb-1">📝 Notes:</p>
                  <p className="text-text-secondary">{selectedDay.notes}</p>
                </div>
              )}
            </div>

            {/* Warmup */}
            <div className="card mb-4">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔥</span> Warm-up
              </h3>
              <ul className="space-y-2">
                {selectedDay.warmup.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm text-text-secondary">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exercises */}
            <div className="space-y-4 mb-4">
              <h3 className="text-lg font-bold">Exercises</h3>
              {selectedDay.exercises.map((exercise, index) => {
                const exerciseId = `${selectedDay.day}-${index}`
                const isCompleted = completedExercises.includes(exerciseId)
                const isExpanded = expandedExercise === exerciseId

                return (
                  <div key={index} className={`card ${isCompleted ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleExercise(exerciseId)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-primary border-primary' : 'border-border hover:border-primary'
                        }`}
                      >
                        {isCompleted && <Check className="w-4 h-4 text-white" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className={`font-bold ${isCompleted ? 'line-through text-text-secondary' : ''}`}>
                              {index + 1}. {exercise.name}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {exercise.sets} sets × {exercise.reps} | Rest: {exercise.rest}
                            </p>
                          </div>
                          <button
                            onClick={() => setExpandedExercise(isExpanded ? null : exerciseId)}
                            className="text-text-secondary hover:text-primary"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-border space-y-3">
                            <p className="text-sm text-text-secondary">{exercise.notes}</p>
                            
                            {/* Demo Video Link */}
                            <button
                              onClick={() => window.open(`https://www.youtube.com/results?search_query=how+to+${encodeURIComponent(exercise.name)}+form+tutorial`, '_blank')}
                              className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span>Watch Demo Video</span>
                            </button>
                            
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="Weight (lbs)"
                                className="input-field text-sm py-2 flex-1"
                              />
                              <button className="btn-secondary text-sm py-2 px-4">Log</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cooldown */}
            <div className="card mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">❄️</span> Cool-down
              </h3>
              <ul className="space-y-2">
                {selectedDay.cooldown.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm text-text-secondary">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Button */}
            <button
              onClick={completeWorkout}
              className="w-full btn-primary py-4 text-lg"
            >
              Complete Workout 🎉
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
