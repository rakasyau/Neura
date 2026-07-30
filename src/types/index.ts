export interface Module {
  id: string
  number: number
  title: string
  description: string
  icon: string
  chapters: Chapter[]
  totalDuration: number
}

export interface Chapter {
  id: string
  title: string
  duration: number
  completed?: boolean
}

export interface Algorithm {
  id: string
  number: number
  name: string
  nameId: string
  category: "supervised" | "unsupervised" | "reinforcement"
  taskType: string
  complexity: string
  minData: string
  summary: string
  analogy: string
  icon: string
  pros: string[]
  cons: string[]
  applications: string[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  category: string
}

export interface UserProgress {
  moduleId: string
  chapterId: string
  completed: boolean
  quizScore?: number
}
