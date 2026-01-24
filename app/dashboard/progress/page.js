'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Upload, Camera, TrendingUp, TrendingDown } from 'lucide-react'

export default function ProgressPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(null)
  const [userData, setUserData] = useState(null)
  const [checkInData, setCheckInData] = useState({
    weight: '',
    energyLevel: 5,
    sleepQuality: 5,
    stressLevel: 5,
    notes: ''
  })

  useEffect(() => {
    const prog = localStorage.getItem('athenix_progress')
    if (prog) {
      setProgress(JSON.parse(prog))
    }
    const user = localStorage.getItem('athenix_onboarding_data')
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [])

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedProgress = {
          ...progress,
          photos: [...(progress.photos || []), {
            url: reader.result,
            date: new Date().toISOString()
          }]
        }
        setProgress(updatedProgress)
        localStorage.setItem('athenix_progress', JSON.stringify(updatedProgress))
        alert('Photo uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }

  const submitCheckIn = () => {
    if (!checkInData.weight) {
      alert('Please enter your current weight')
      return
    }

    const updatedProgress = {
      ...progress,
      currentWeight: parseFloat(checkInData.weight),
      checkIns: [...(progress.checkIns || []), {
        date: new Date().toISOString(),
        weight: parseFloat(checkInData.weight),
        energyLevel: checkInData.energyLevel,
        sleepQuality: checkInData.sleepQuality,
        stressLevel: checkInData.stressLevel,
        notes: checkInData.notes
      }]
    }

    setProgress(updatedProgress)
    localStorage.setItem('athenix_progress', JSON.stringify(updatedProgress))
    
    setCheckInData({
      weight: '',
      energyLevel: 5,
      sleepQuality: 5,
      stressLevel: 5,
      notes: ''
    })

    alert('Check-in submitted successfully! 🎉')
  }

  if (!progress || !userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PhoenixLogo className="w-20 h-20 animate-pulse-glow" />
      </div>
    )
  }

  const weightChange = progress.startWeight - progress.currentWeight
  const weightChangePercent = ((weightChange / progress.startWeight) * 100).toFixed(1)

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
                <h1 className="text-lg font-bold">Progress Tracker</h1>
                <p className="text-xs text-text-secondary">Track your transformation</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24 max-w-6xl">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Weight Progress */}
          <div className="card">
            <h3 className="text-sm text-text-secondary mb-2">Weight Progress</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">{progress.currentWeight}</span>
              <span className="text-xl text-text-secondary mb-1">lbs</span>
            </div>
            <div className="flex items-center gap-2">
              {weightChange > 0 ? (
                <TrendingDown className="w-4 h-4 text-primary" />
              ) : weightChange < 0 ? (
                <TrendingUp className="w-4 h-4 text-secondary" />
              ) : null}
              <span className={`text-sm font-semibold ${
                weightChange > 0 ? 'text-primary' : weightChange < 0 ? 'text-secondary' : 'text-text-secondary'
              }`}>
                {Math.abs(weightChange).toFixed(1)} lbs ({weightChangePercent}%)
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-2">Started at {progress.startWeight} lbs</p>
          </div>

          {/* Workouts */}
          <div className="card">
            <h3 className="text-sm text-text-secondary mb-2">Workouts Completed</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">{progress.workoutsCompleted || 0}</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">Keep pushing!</p>
          </div>

          {/* Streak */}
          <div className="card">
            <h3 className="text-sm text-text-secondary mb-2">Current Streak</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">{progress.currentStreak || 0}</span>
              <span className="text-2xl mb-1">🔥</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">Days in a row</p>
          </div>
        </div>

        {/* Photo Timeline */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Photo Timeline</h2>
            <label className="btn-primary cursor-pointer text-sm flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {progress.photos && progress.photos.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {progress.photos.map((photo, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
                    <img
                      src={photo.url}
                      alt={`Progress photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-text-secondary text-center">
                    {new Date(photo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <Camera className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <p className="text-text-secondary mb-4">No photos yet</p>
              <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Your First Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Body Measurements */}
        {userData.measurements && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6">Body Measurements</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {Object.entries(userData.measurements).map(([key, value]) => (
                value && (
                  <div key={key}>
                    <p className="text-sm text-text-secondary mb-1 capitalize">{key}</p>
                    <p className="text-2xl font-bold">{value}"</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Weekly Check-In Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Weekly Check-In</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Current Weight (lbs) *</label>
              <input
                type="number"
                step="0.1"
                value={checkInData.weight}
                onChange={(e) => setCheckInData({ ...checkInData, weight: e.target.value })}
                className="input-field"
                placeholder={progress.currentWeight.toString()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Energy Level: {checkInData.energyLevel}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.energyLevel}
                onChange={(e) => setCheckInData({ ...checkInData, energyLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Sleep Quality: {checkInData.sleepQuality}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.sleepQuality}
                onChange={(e) => setCheckInData({ ...checkInData, sleepQuality: parseInt(e.target.value) })}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stress Level: {checkInData.stressLevel}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.stressLevel}
                onChange={(e) => setCheckInData({ ...checkInData, stressLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes / Feedback (Optional)</label>
              <textarea
                value={checkInData.notes}
                onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="How are you feeling? Any challenges? Victories?"
              />
            </div>

            <button
              onClick={submitCheckIn}
              className="w-full btn-primary py-4"
            >
              Submit Check-In
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
