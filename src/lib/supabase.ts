
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yagxplxxzttmgayenrst.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3hwbHh4enR0bWdheWVucnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjU5NzUsImV4cCI6MjA2NDEwMTk3NX0.4FAxxAZrXACJpj5D7Mf522iJBhzUrVCnLrOT6fDH18o"

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
