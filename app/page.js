'use client'

import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowRight, Zap, Users, Apple, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <PhoenixLogo className="w-10 h-10" />
            <span className="text-2xl font-bold text-gradient">ATHENIX</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-text-secondary">Rebuild. Refine. Rise.</span>
            <button 
              onClick={() => router.push('/login')}
              className="text-text-primary hover:text-primary transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => router.push('/signup')}
              className="btn-primary text-sm py-2 px-6"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 bg-card border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-text-secondary">Now in Beta</span>
            </div>

            {/* Main Logo */}
            <div className="mb-8 animate-slide-up">
              <PhoenixLogo className="w-32 h-32 mx-auto" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Rise to Your
              <span className="block text-gradient mt-2">Strongest Self</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              AI-powered personalized fitness, nutrition, and transformation coaching tailored just for you
            </p>

            {/* CTA Button */}
            <button 
              onClick={() => router.push('/signup')}
              className="btn-primary text-lg flex items-center gap-3 animate-slide-up group"
              style={{ animationDelay: '0.3s' }}
            >
              Begin Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 mt-12 text-text-secondary text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1,000+ Transformations</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>AI-Powered Plans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
            Four simple steps to your personalized transformation
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Capture',
                description: 'Tell us about your goals, experience, lifestyle, and challenges',
                icon: '📸'
              },
              {
                step: '02',
                title: 'Define',
                description: 'Our AI analyzes your profile to understand your unique needs',
                icon: '🎯'
              },
              {
                step: '03',
                title: 'Generate',
                description: 'Get your personalized 12-week workout and nutrition plan',
                icon: '⚡'
              },
              {
                step: '04',
                title: 'Adapt',
                description: 'Track progress and adjust your plan as you evolve',
                icon: '📈'
              }
            ].map((item, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-primary font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Platform Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'AI Precision',
                description: 'GPT-4 powered plans customized to your exact profile',
                icon: '🤖'
              },
              {
                title: 'Real Coaches',
                description: 'Human expertise behind every AI recommendation',
                icon: '👥'
              },
              {
                title: 'Smart Nutrition',
                description: 'Personalized meal plans that fit your lifestyle',
                icon: '🥗'
              },
              {
                title: 'Supplement Sync',
                description: 'Optimized recommendations based on your goals',
                icon: '💊'
              }
            ].map((feature, index) => (
              <div key={index} className="card hover:border-primary/50 transition-colors">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands who are already rebuilding, refining, and rising with Athenix
          </p>
          <button 
            onClick={() => router.push('/signup')}
            className="btn-primary text-lg flex items-center gap-3 mx-auto group"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <PhoenixLogo className="w-8 h-8" />
              <span className="text-xl font-bold text-gradient">ATHENIX</span>
            </div>
            <p className="text-text-secondary text-sm">
              Rebuild. Refine. Rise.
            </p>
            <div className="flex gap-6 text-text-secondary text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}