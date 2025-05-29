
import { supabase, Job } from '@/lib/supabase'

export const jobService = {
  // Fetch all jobs with optional filters
  async getJobs(filters?: {
    location?: string
    industry?: string
    jobType?: string
    minSalary?: number
    search?: string
  }) {
    let query = supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.location && filters.location !== 'all') {
      query = query.eq('location', filters.location)
    }

    if (filters?.jobType && filters.jobType !== 'all') {
      query = query.eq('type', filters.jobType)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Job[]
  },

  // Get a single job by ID
  async getJobById(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Job
  },

  // Apply to a job
  async applyToJob(jobId: string, resumeFile: File, coverLetter?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Upload resume to Supabase Storage
    const fileExt = resumeFile.name.split('.').pop()
    const fileName = `${user.id}/${jobId}_${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, resumeFile)

    if (uploadError) throw uploadError

    // Get public URL for the resume
    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName)

    // Save application to database
    const { error: applicationError } = await supabase
      .from('job_applications')
      .insert({
        job_id: jobId,
        user_id: user.id,
        resume_url: urlData.publicUrl,
        cover_letter: coverLetter,
        status: 'pending'
      })

    if (applicationError) throw applicationError
    return true
  },

  // Get user's applications
  async getUserApplications() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        jobs (
          title,
          company,
          location
        )
      `)
      .eq('user_id', user.id)
      .order('applied_at', { ascending: false })

    if (error) throw error
    return data
  }
}
