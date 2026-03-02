export interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  xp_points: number;
  current_level: number;
}

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: number;
  problem_type: 'paper_analysis' | 'experiment_design' | 'replication' | 'pipeline';
  description: string;
  topic?: string;
  content_json: ProblemContent;
  created_at: string;
}

export interface ProblemContent {
  type: string;
  paper_excerpt?: string;
  description?: string;
  scenario?: string;
  paper_reference?: string;
  starter_code?: string;
  test_cases?: TestCase[];
  hints?: string[];
  questions?: Question[];
  steps?: ProblemStep[];
}

export interface Question {
  id: number;
  type: 'multiple_choice' | 'free_response';
  question: string;
  options?: string[];
  correct?: string;
  rubric?: string[];
}

export interface TestCase {
  input: string;
  expected: unknown;
}

export interface ProblemStep {
  step_number: number;
  step_type: string;
  title: string;
  description: string;
}

export interface Submission {
  id: number;
  user_id: number;
  problem_id: number;
  step_id?: number;
  submission_type: string;
  content: string;
  score?: number;
  feedback?: SubmissionFeedback;
  status: string;
  created_at: string;
}

export interface SubmissionFeedback {
  passed?: number;
  failed?: number;
  total?: number;
  details?: FeedbackDetail[];
  correct?: number;
  earned_points?: number;
  total_points?: number;
  error?: string;
}

export interface FeedbackDetail {
  test_case?: number;
  question_id?: string;
  passed?: boolean;
  correct?: boolean;
  input?: string;
  expected?: string;
  actual?: string;
  your_answer?: string;
  correct_answer?: string;
  matched_criteria?: string[];
  missing_criteria?: string[];
}

export interface UserProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  best_score?: number;
  attempts: number;
  completed_at?: string;
}

export interface UserStats {
  total_problems: number;
  completed: number;
  in_progress: number;
  not_started: number;
  xp_points: number;
  level: number;
  completed_by_difficulty: Record<string, number>;
  completed_by_type: Record<string, number>;
}
