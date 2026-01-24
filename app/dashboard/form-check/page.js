'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhoenixLogo from '@/components/PhoenixLogo'
import { ArrowLeft, Upload, Video, Camera, Check, AlertCircle, Sparkles } from 'lucide-react'

export default function FormCheckPage() {
  const router = useRouter()
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState('')
  const [videoHistory, setVideoHistory] = useState([])

  useEffect(() => {
    // Load previous analyses
    const history = localStorage.getItem('athenix_form_check_history')
    if (history) {
      setVideoHistory(JSON.parse(history))
    }
  }, [])

  const exercises = [
    'Squat',
    'Bench Press',
    'Deadlift',
    'Overhead Press',
    'Barbell Row',
    'Pull-up',
    'Push-up',
    'Lunge',
    'Plank',
    'Other'
  ]

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedVideo({
          file: file,
          url: reader.result,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        })
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please upload a valid video file')
    }
  }

  const analyzeForm = async () => {
    if (!uploadedVideo || !selectedExercise) {
      alert('Please upload a video and select an exercise')
      return
    }

    setIsAnalyzing(true)

    // Simulate AI analysis (in production, this would call OpenAI Vision API)
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis(selectedExercise)
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)

      // Save to history
      const newHistory = [
        {
          id: Date.now(),
          exercise: selectedExercise,
          date: new Date().toISOString(),
          score: mockAnalysis.overallScore,
          videoName: uploadedVideo.name
        },
        ...videoHistory
      ].slice(0, 10) // Keep last 10

      setVideoHistory(newHistory)
      localStorage.setItem('athenix_form_check_history', JSON.stringify(newHistory))
    }, 3000)
  }

  const generateMockAnalysis = (exercise) => {
    // Mock AI analysis - in production, use OpenAI GPT-4 Vision
    const analyses = {
      'Squat': {
        overallScore: 8.5,
        strengths: [
          'Good depth - breaking parallel consistently',
          'Knees tracking properly over toes',
          'Maintaining neutral spine throughout the movement'
        ],
        improvements: [
          'Keep chest more upright at the bottom position',
          'Drive through heels more explosively on the way up'
        ],
        criticalIssues: [],
        recommendations: [
          'Practice box squats to improve depth consistency',
          'Add pause squats to work on bottom position strength',
          'Consider adding mobility work for hip flexors'
        ]
      },
      'Bench Press': {
        overallScore: 7.5,
        strengths: [
          'Good bar path - straight up and down',
          'Shoulders retracted and stable',
          'Feet planted firmly on the ground'
        ],
        improvements: [
          'Create more arch in your lower back for better leverage',
          'Touch the bar slightly lower on your chest (nipple line)'
        ],
        criticalIssues: [
          '⚠️ Elbows flaring too much - risk of shoulder impingement'
        ],
        recommendations: [
          'Keep elbows at 45-75 degree angle from body',
          'Practice with lighter weight focusing on tucked elbows',
          'Add rotator cuff strengthening exercises'
        ]
      },
      'Deadlift': {
        overallScore: 9.0,
        strengths: [
          'Excellent hip hinge pattern',
          'Bar staying close to shins and thighs',
          'Neutral spine maintained throughout lift',
          'Good lockout at the top'
        ],
        improvements: [
          'Reset breath and brace before each rep',
          'Slightly faster pull off the floor'
        ],
        criticalIssues: [],
        recommendations: [
          'Great form! Keep progressing with current technique',
          'Consider adding deficit deadlifts for off-the-floor strength',
          'RDLs would complement your pulling strength'
        ]
      }
    }

    return analyses[exercise] || {
      overallScore: 8.0,
      strengths: [
        'Good overall movement pattern',
        'Consistent tempo and control'
      ],
      improvements: [
        'Focus on full range of motion',
        'Maintain proper breathing pattern'
      ],
      criticalIssues: [],
      recommendations: [
        'Practice the movement with lighter weight',
        'Film from multiple angles for better assessment'
      ]
    }
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
                <h1 className="text-lg font-bold">AI Form Check</h1>
                <p className="text-xs text-text-secondary">Get instant feedback on your form</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pb-24 max-w-6xl">
        {/* Info Banner */}
        <div className="card mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">AI-Powered Form Analysis</h3>
              <p className="text-sm text-text-secondary">
                Upload a video of your workout and our AI will analyze your form, identify areas for improvement, 
                and help prevent injuries. Get personalized feedback in seconds!
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Upload Your Video</h2>

              {/* Exercise Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Exercise *</label>
                <select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  className="input-field"
                >
                  <option value="">Choose an exercise...</option>
                  {exercises.map(ex => (
                    <option key={ex} value={ex}>{ex}</option>
                  ))}
                </select>
              </div>

              {/* Video Upload Area */}
              <div className="mb-6">
                {!uploadedVideo ? (
                  <label className="block">
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-all cursor-pointer">
                      <Video className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                      <p className="text-lg font-semibold mb-2">Upload Workout Video</p>
                      <p className="text-sm text-text-secondary mb-4">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-xs text-text-secondary">
                        Supports: MP4, MOV, AVI (Max 100MB)
                      </p>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </div>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <video
                        src={uploadedVideo.url}
                        controls
                        className="w-full rounded-lg mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{uploadedVideo.name}</p>
                          <p className="text-xs text-text-secondary">{uploadedVideo.size}</p>
                        </div>
                        <button
                          onClick={() => setUploadedVideo(null)}
                          className="text-sm text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={analyzeForm}
                      disabled={isAnalyzing || !selectedExercise}
                      className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="inline-block animate-spin mr-2">⚙️</span>
                          Analyzing Form...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 inline mr-2" />
                          Analyze My Form
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-background rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-3">📹 Video Tips:</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Film from the side for best analysis</li>
                  <li>• Ensure good lighting</li>
                  <li>• Capture full body in frame</li>
                  <li>• Perform 3-5 reps for better analysis</li>
                  <li>• Keep camera stable (use tripod if possible)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div>
            {isAnalyzing && (
              <div className="card text-center py-12">
                <div className="animate-pulse-glow mb-4">
                  <PhoenixLogo className="w-24 h-24 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analyzing Your Form...</h3>
                <p className="text-text-secondary">Our AI is reviewing your video</p>
              </div>
            )}

            {analysis && !isAnalyzing && (
              <div className="card">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Form Analysis</h2>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{analysis.overallScore}/10</div>
                      <p className="text-xs text-text-secondary">Overall Score</p>
                    </div>
                  </div>
                </div>

                {/* Critical Issues */}
                {analysis.criticalIssues.length > 0 && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-500 mb-2">Critical Issues</h4>
                        <ul className="space-y-1 text-sm">
                          {analysis.criticalIssues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Strengths */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-green-500">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-secondary" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-secondary">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">💡 Recommendations</h3>
                  <ul className="space-y-2 text-sm">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setUploadedVideo(null)
                    setAnalysis(null)
                    setSelectedExercise('')
                  }}
                  className="w-full btn-secondary mt-6"
                >
                  Analyze Another Video
                </button>
              </div>
            )}

            {!analysis && !isAnalyzing && (
              <div className="card text-center py-12">
                <Camera className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                <h3 className="text-xl font-bold mb-2">No Analysis Yet</h3>
                <p className="text-text-secondary">
                  Upload a video to get AI-powered form feedback
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {videoHistory.length > 0 && (
          <div className="card mt-8">
            <h2 className="text-2xl font-bold mb-6">Recent Analyses</h2>
            <div className="space-y-3">
              {videoHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">{item.exercise}</p>
                    <p className="text-sm text-text-secondary">
                      {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{item.score}/10</p>
                    <p className="text-xs text-text-secondary">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
