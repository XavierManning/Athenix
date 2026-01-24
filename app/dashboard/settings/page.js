'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, User, Mail, Lock, Bell, HelpCircle, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('athenix_user')
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.push('/')
    }
  }

  const handleResetOnboarding = () => {
    if (confirm('This will clear your current plan and restart the onboarding. Continue?')) {
      localStorage.removeItem('athenix_workout_plan')
      localStorage.removeItem('athenix_nutrition_plan')
      localStorage.removeItem('athenix_onboarding_complete')
      localStorage.removeItem('athenix_onboarding_data')
      router.push('/onboarding')
    }
  }

  if (!userData) {
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
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="hover:text-primary transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <PhoenixLogo className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">Settings</h1>
                <p className="text-xs text-text-secondary">Manage your account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24 max-w-3xl">
        {/* Profile Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Name</label>
              <input
                type="text"
                value={userData.name}
                disabled
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-text-secondary">
              To update your profile information, please restart the onboarding process.
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Workout Reminders</p>
                <p className="text-sm text-text-secondary">Get notified before scheduled workouts</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                <span className="absolute cursor-pointer inset-0 bg-card border-2 border-border rounded-full transition-all peer-checked:bg-primary peer-checked:border-primary"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Check-ins</p>
                <p className="text-sm text-text-secondary">Reminder to log your progress</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                <span className="absolute cursor-pointer inset-0 bg-card border-2 border-border rounded-full transition-all peer-checked:bg-primary peer-checked:border-primary"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Achievement Alerts</p>
                <p className="text-sm text-text-secondary">Celebrate milestones and streaks</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                <span className="absolute cursor-pointer inset-0 bg-card border-2 border-border rounded-full transition-all peer-checked:bg-primary peer-checked:border-primary"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-6">Account Actions</h2>
          <div className="space-y-3">
            <button
              onClick={handleResetOnboarding}
              className="w-full btn-secondary text-left flex items-center justify-between"
            >
              <span>Update Goals & Preferences</span>
              <span className="text-xs text-text-secondary">Restart onboarding</span>
            </button>
            <button
              className="w-full btn-secondary text-left flex items-center justify-between opacity-50 cursor-not-allowed"
              disabled
            >
              <span>Change Password</span>
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support & Info
          </h2>
          <div className="space-y-3">
            <button className="w-full btn-secondary text-left">
              Contact Support
            </button>
            <button className="w-full btn-secondary text-left">
              Privacy Policy
            </button>
            <button className="w-full btn-secondary text-left">
              Terms of Service
            </button>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-secondary">App Version: 1.0.0 (Beta)</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full btn-secondary text-red-500 hover:bg-red-500/10 hover:border-red-500 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </main>
    </div>
  )
}
