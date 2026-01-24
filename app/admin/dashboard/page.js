'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Users, TrendingUp, DollarSign, Activity, Download, Calendar, Mail } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalWorkouts: 0,
    totalRevenue: 0,
    conversionRate: 0
  })

  // ADMIN PASSWORD - Change this!
  const ADMIN_PASSWORD = 'athenix2025'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('athenix_admin_auth')
      if (isAdmin === 'true') {
        setIsAuthenticated(true)
        loadDashboardData()
      }
    }
  }, [])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('athenix_admin_auth', 'true')
      loadDashboardData()
    } else {
      alert('Incorrect password!')
    }
  }

  const loadDashboardData = () => {
    // In production, this would fetch from your database
    // For now, we'll scan localStorage for demo users
    
    const allUsers = []
    const keys = Object.keys(localStorage)
    
    // This is a simplified example - in production you'd have a proper database
    keys.forEach(key => {
      if (key.startsWith('athenix_user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key))
          allUsers.push(userData)
        } catch (e) {}
      }
    })

    // Mock data for demonstration
    const mockUsers = [
      {
        id: 'user_001',
        name: 'John Doe',
        email: 'john@example.com',
        signupDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        plan: 'Beta',
        status: 'Active',
        workoutsCompleted: 12,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user_002',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        signupDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        plan: 'Beta',
        status: 'Active',
        workoutsCompleted: 28,
        lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user_003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        signupDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        plan: 'Beta',
        status: 'Active',
        workoutsCompleted: 5,
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    setUsers([...mockUsers, ...allUsers])
    
    setAnalytics({
      totalUsers: mockUsers.length + allUsers.length,
      activeUsers: Math.floor((mockUsers.length + allUsers.length) * 0.75),
      totalWorkouts: 45 + (allUsers.length * 3),
      totalRevenue: 0, // Beta is free
      conversionRate: 0 // Will be used post-beta
    })
  }

  const exportUserData = () => {
    const csv = [
      ['Name', 'Email', 'Signup Date', 'Plan', 'Status', 'Workouts', 'Last Active'],
      ...users.map(u => [
        u.name,
        u.email,
        new Date(u.signupDate).toLocaleDateString(),
        u.plan,
        u.status,
        u.workoutsCompleted || 0,
        new Date(u.lastActive).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `athenix-users-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <PhoenixLogo className="w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary text-center">Enter password to access</p>
          </div>

          <div className="card">
            <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Admin Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
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
              <button onClick={() => {
                localStorage.removeItem('athenix_admin_auth')
                router.push('/')
              }} className="hover:text-primary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <PhoenixLogo className="w-8 h-8" />
                <div>
                  <h1 className="text-lg font-bold">Admin Dashboard</h1>
                  <p className="text-xs text-text-secondary">Owner Portal</p>
                </div>
              </div>
            </div>
            <button
              onClick={exportUserData}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Total Users</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-bold mb-1">{analytics.totalUsers}</p>
            <p className="text-sm text-text-secondary">All signups</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Active Users</span>
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-4xl font-bold mb-1">{analytics.activeUsers}</p>
            <p className="text-sm text-text-secondary">Last 7 days</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Total Workouts</span>
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-4xl font-bold mb-1">{analytics.totalWorkouts}</p>
            <p className="text-sm text-text-secondary">Completed</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm">Revenue</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-bold mb-1">${analytics.totalRevenue}</p>
            <p className="text-sm text-text-secondary">Beta phase (free)</p>
          </div>
        </div>

        {/* Billing Information */}
        <div className="card mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <h2 className="text-xl font-bold mb-4">💳 Stripe Integration (Post-Beta)</h2>
          <p className="text-text-secondary mb-4">
            To start charging users after beta, follow these steps:
          </p>
          <ol className="space-y-2 text-sm text-text-secondary mb-4">
            <li>1. Create a Stripe account at <a href="https://stripe.com" target="_blank" className="text-primary hover:underline">stripe.com</a></li>
            <li>2. Get your API keys from the Stripe Dashboard</li>
            <li>3. Add <code className="bg-background px-2 py-1 rounded">STRIPE_SECRET_KEY</code> to .env</li>
            <li>4. Create pricing plans (e.g., $29.99/month)</li>
            <li>5. Implement checkout flow (guide in README)</li>
          </ol>
          <div className="flex gap-3">
            <a
              href="https://stripe.com/docs"
              target="_blank"
              className="btn-primary text-sm"
            >
              View Stripe Docs
            </a>
            <a
              href="https://stripe.com/pricing"
              target="_blank"
              className="btn-secondary text-sm"
            >
              See Stripe Pricing
            </a>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">User List</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">
                {users.length} total users
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Signup Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Workouts</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Last Active</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-background/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <span className="font-medium">{user.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-text-secondary">
                      <a href={`mailto:${user.email}`} className="hover:text-primary flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.signupDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                        {user.plan || 'Beta'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-center">{user.workoutsCompleted || 0}</td>
                    <td className="py-4 px-4 text-sm text-text-secondary">
                      {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <p className="text-text-secondary">No users yet</p>
            </div>
          )}
        </div>

        {/* Analytics Tips */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">📊 Analytics Recommendations</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Use <strong className="text-text-primary">Google Analytics 4</strong> for detailed tracking</li>
              <li>• Implement <strong className="text-text-primary">Mixpanel</strong> or <strong className="text-text-primary">Amplitude</strong> for user behavior</li>
              <li>• Add <strong className="text-text-primary">Hotjar</strong> for heatmaps and session recordings</li>
              <li>• Set up <strong className="text-text-primary">conversion funnels</strong> to track signup → paid</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">🚀 Growth Metrics to Track</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• <strong className="text-text-primary">DAU/MAU ratio</strong> (Daily/Monthly Active Users)</li>
              <li>• <strong className="text-text-primary">Retention rate</strong> (7-day, 30-day)</li>
              <li>• <strong className="text-text-primary">Churn rate</strong> (users who cancel)</li>
              <li>• <strong className="text-text-primary">LTV/CAC</strong> (Lifetime Value / Customer Acquisition Cost)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
