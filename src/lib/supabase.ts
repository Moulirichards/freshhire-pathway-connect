
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  description: string
  skills: string[]
  logo: string
  is_remote: boolean
  is_urgent: boolean
  experience_level: string
  created_at: string
}

export interface JobApplication {
  id: string
  job_id: string
  user_id: string
  resume_url: string
  cover_letter?: string
  applied_at: string
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired'
}
