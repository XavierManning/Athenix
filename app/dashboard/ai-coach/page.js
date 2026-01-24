'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Send, Sparkles, Lightbulb, Dumbbell, UtensilsCrossed } from 'lucide-react'

export default function AICoachPage() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Load user data for context
    const user = localStorage.getItem('athenix_onboarding_data')
    if (user) {
      setUserData(JSON.parse(user))
    }

    // Load chat history
    const history = localStorage.getItem('athenix_chat_history')
    if (history) {
      setMessages(JSON.parse(history))
    } else {
      // Welcome message
      setMessages([{
        id: 1,
        type: 'ai',
        text: `Hey! 👋 I'm your Athenix AI Coach. I'm here to answer any questions about fitness, nutrition, your workout plan, or anything health-related. What's on your mind?`,
        timestamp: new Date().toISOString()
      }])
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Save chat history
    if (messages.length > 1) {
      localStorage.setItem('athenix_chat_history', JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const quickQuestions = [
    { icon: <Dumbbell className="w-4 h-4" />, text: "How can I improve my squat form?" },
    { icon: <UtensilsCrossed className="w-4 h-4" />, text: "What should I eat before a workout?" },
    { icon: <Lightbulb className="w-4 h-4" />, text: "Why am I not seeing progress?" },
    { icon: <Sparkles className="w-4 h-4" />, text: "How much protein do I need?" }
  ]

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, userData)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date().toISOString()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (question, userData) => {
    const lowerQ = question.toLowerCase()

    // Context-aware responses based on user data
    if (lowerQ.includes('progress') || lowerQ.includes('result') || lowerQ.includes('seeing')) {
      return `Great question! Progress takes time, typically 4-6 weeks for noticeable changes. Based on your goal (${userData?.primaryGoal || 'fitness improvement'}), here's what to focus on:\n\n✓ Consistency: Hit ${userData?.daysPerWeek || '3-4'} workouts per week\n✓ Progressive overload: Gradually increase weight/reps\n✓ Nutrition: Make sure you're eating ${userData?.primaryGoal?.includes('muscle') ? 'in a slight surplus' : 'at your target calories'}\n✓ Sleep: Aim for 7-8 hours\n✓ Photos: Take progress pics every 2 weeks\n\nWhat specific area feels stuck?`
    }

    if (lowerQ.includes('protein')) {
      const weight = userData?.weight || 150
      const proteinTarget = Math.round(weight * 0.8)
      return `Based on your weight (${weight} lbs) and goals, you should aim for around ${proteinTarget}g of protein per day.\n\n💪 Good protein sources:\n• Chicken breast (31g per 4oz)\n• Greek yogurt (20g per cup)\n• Eggs (6g per egg)\n• Protein powder (20-25g per scoop)\n• Fish (20-25g per 4oz)\n• Lean beef (25g per 4oz)\n\nSpread it across ${userData?.dietaryRestrictions?.includes('None') ? '4-5 meals' : 'your meals'} for best absorption!`
    }

    if (lowerQ.includes('squat') || lowerQ.includes('form')) {
      return `Improving squat form is all about the fundamentals! Here's what to focus on:\n\n🎯 Key points:\n1. Feet shoulder-width apart, toes slightly out\n2. Break at hips AND knees simultaneously\n3. Keep chest up, core braced\n4. Knees track over toes (not caving in)\n5. Descend until thighs are parallel or below\n6. Drive through heels to stand\n\n📹 Pro tip: Use our Form Check feature to upload a video and get AI analysis of your technique!\n\n🔧 Common fixes:\n• Tight ankles? Elevate heels or work on mobility\n• Forward lean? Strengthen core and upper back\n• Knee cave? Add hip abductor work\n\nWant me to explain any of these in more detail?`
    }

    if (lowerQ.includes('eat before') || lowerQ.includes('pre-workout') || lowerQ.includes('pre workout')) {
      return `Pre-workout nutrition depends on timing! Here's the breakdown:\n\n⏰ 2-3 hours before:\n• Complex carbs + lean protein\n• Example: Chicken & rice, oatmeal with protein, sandwich\n\n⏰ 30-60 mins before:\n• Quick carbs for energy\n• Example: Banana, rice cakes with honey, fruit\n\n💡 General rules:\n• Avoid heavy fats (slow digestion)\n• Stay hydrated (16-20oz water)\n• ${userData?.nutritionChallenge?.includes('No time') ? 'Keep it simple - even a banana works!' : 'Match it to your schedule'}\n\nYour workout time: ${userData?.preferredTime || 'Not specified'}\nBest for you: ${userData?.preferredTime === 'Morning' ? 'Light carbs or fasted with BCAAs' : 'Balanced meal 2-3 hours before'}`
    }

    if (lowerQ.includes('diet') || lowerQ.includes('nutrition') || lowerQ.includes('calories')) {
      return `Nutrition is 70% of the battle! Here's your personalized advice:\n\n📊 Based on your profile:\n• Goal: ${userData?.primaryGoal || 'General fitness'}\n• Challenge: ${userData?.nutritionChallenge || 'Staying consistent'}\n\n💡 Key strategies:\n1. Track your food for 1 week to understand patterns\n2. Meal prep on ${userData?.daysPerWeek === '6+' ? 'Sundays' : 'weekends'}\n3. ${userData?.dietaryRestrictions?.includes('Vegetarian') || userData?.dietaryRestrictions?.includes('Vegan') ? 'Focus on plant-based protein sources' : 'Include protein at every meal'}\n4. Drink water before meals (helps with portion control)\n\nCheck your Nutrition Plan in the app for specific meal ideas! Need help with meal prep?`
    }

    if (lowerQ.includes('injury') || lowerQ.includes('pain') || lowerQ.includes('hurt')) {
      return `⚠️ Important: If you're experiencing pain, here's what to do:\n\n1. Stop the exercise immediately\n2. Rest and ice if there's swelling\n3. Distinguish between:\n   • Muscle soreness (normal, dull ache)\n   • Sharp pain (concerning, see a doctor)\n\n🔧 Prevention tips:\n• Always warm up (5-10 min)\n• Focus on form over weight\n• Progressive overload (don't jump weight too fast)\n• Listen to your body\n\n${userData?.injuries ? `I see you noted: "${userData.injuries}". Make sure to:\n• Avoid exercises that aggravate it\n• Work around it with modifications\n• Consider seeing a physical therapist` : 'Always consult a healthcare professional for persistent pain!'}\n\nWant exercise modifications?`
    }

    if (lowerQ.includes('cardio') || lowerQ.includes('running') || lowerQ.includes('hiit')) {
      return `Cardio is great for heart health and fat loss! Here's how to incorporate it:\n\n🏃 Options:\n• LISS (Low intensity): 30-45 min walks/bike\n• HIIT: 15-20 min intervals\n• Steady state: 20-30 min moderate pace\n\n📅 When to do it:\n• ${userData?.primaryGoal?.includes('Build muscle') ? 'After weights or separate days (2-3x/week max)' : '3-4x per week, morning fasted is great for fat loss'}\n• ${userData?.daysPerWeek === '2' || userData?.daysPerWeek === '3' ? 'Add 2 cardio-only days' : 'Include it after lifting'}\n\n⚡ Best for your goal (${userData?.primaryGoal}):\n${userData?.primaryGoal?.includes('Lose fat') ? '• HIIT 3x/week + daily walks' : userData?.primaryGoal?.includes('Build muscle') ? '• Keep minimal (2x/week LISS)' : '• Mix it up for variety'}\n\nNeed a cardio workout plan?`
    }

    if (lowerQ.includes('supplement') || lowerQ.includes('creatine') || lowerQ.includes('bcaa')) {
      return `Supplements can help, but they're not magic! Here's what's actually worth it:\n\n✅ Proven & Safe:\n1. Protein powder - Convenient protein source\n2. Creatine (5g/day) - Strength & muscle gains\n3. Vitamin D3 - Especially if low sun exposure\n4. Omega-3 - Heart health & inflammation\n\n❓ Situational:\n• Pre-workout: If you need energy boost\n• BCAAs: Only if training fasted\n• Multivitamin: If diet is lacking\n\n❌ Skip:\n• Fat burners (waste of money)\n• Testosterone boosters (don't work)\n• "Proprietary blends" (unknown ingredients)\n\n💡 Priority: Get your diet right first! Supplements are 5% of the equation. Focus on:\n1. Hitting protein target (${userData?.weight ? Math.round(userData.weight * 0.8) + 'g' : '120-150g'})\n2. Whole foods\n3. Consistency\n\nWant specific supplement recommendations?`
    }

    if (lowerQ.includes('sleep') || lowerQ.includes('recovery') || lowerQ.includes('rest')) {
      return `Recovery is where you actually grow! Here's what matters:\n\n😴 Sleep (Most important!):\n• Aim for 7-9 hours\n• Current: ${userData?.sleepHours || 'Not specified'}\n• ${userData?.sleepHours === '<5' || userData?.sleepHours === '5-6' ? '⚠️ This is limiting your gains! Try to add 1-2 more hours' : 'Great! Keep it up'}\n\n🔧 Recovery tactics:\n• Active recovery: Light walks on rest days\n• Stretching: 10 min daily\n• Hydration: Half your bodyweight in oz\n• Stress management: ${userData?.stressLevel === 'High' || userData?.stressLevel === 'Extremely high' ? 'Try meditation/breathing exercises' : 'Keep stress in check'}\n\n📅 Rest days: You need ${userData?.daysPerWeek === '6+' ? '1-2 per week' : '2-3 per week'}\n\nFeeling overtrained?`
    }

    // Default responses
    const defaultResponses = [
      `That's a great question! Let me help you with that.\n\nBased on your profile and goals, here's what I recommend:\n\n1. Stay consistent with your current plan\n2. Focus on progressive overload\n3. Track your progress weekly\n\nCan you give me more details about what specifically you're asking about? That way I can provide more targeted advice!`,
      
      `I'd love to help! Here are some general tips:\n\n💪 Training:\n• Follow your personalized workout plan\n• Focus on form before adding weight\n• Rest 60-90 seconds between sets\n\n🥗 Nutrition:\n• Hit your protein target daily\n• Stay hydrated (8+ glasses water)\n• Prep meals in advance\n\nWhat specific area do you want to dive deeper into?`,
      
      `Great to hear from you! Remember:\n\n✓ You're on Week ${localStorage.getItem('athenix_current_week') || '1'} of your plan\n✓ Your goal: ${userData?.primaryGoal || 'Building a stronger you'}\n✓ Workout frequency: ${userData?.daysPerWeek || '3-4'} days per week\n\nHow can I support your journey today?`
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const clearChat = () => {
    if (confirm('Clear all chat history?')) {
      setMessages([{
        id: 1,
        type: 'ai',
        text: `Chat cleared! 🧹 What would you like to know?`,
        timestamp: new Date().toISOString()
      }])
      localStorage.removeItem('athenix_chat_history')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/dashboard')} className="hover:text-primary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <PhoenixLogo className="w-8 h-8" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold flex items-center gap-2">
                    AI Coach
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h1>
                  <p className="text-xs text-text-secondary">Always here to help</p>
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 mb-6 animate-slide-up ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'order-2' : ''}`}>
                {message.type === 'ai' ? (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <PhoenixLogo className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg">
                    {userData?.name?.charAt(0) || '👤'}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                <div
                  className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-white/60' : 'text-text-secondary'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <PhoenixLogo className="w-6 h-6" />
              </div>
              <div className="bg-card border border-border p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Questions (shown when chat is empty) */}
      {messages.length <= 1 && !isTyping && (
        <div className="container mx-auto px-6 pb-32 max-w-4xl">
          <div className="grid grid-cols-2 gap-3">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q.text)}
                className="card hover:border-primary/50 transition-all hover:scale-105 text-left p-4 flex items-start gap-3"
              >
                <div className="text-primary">{q.icon}</div>
                <span className="text-sm">{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container mx-auto px-6 py-4 max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about fitness, nutrition, or your plan..."
              className="input-field flex-1"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <p className="text-xs text-text-secondary text-center mt-2">
            💡 Tip: Be specific in your questions for better answers!
          </p>
        </div>
      </div>
    </div>
  )
}
