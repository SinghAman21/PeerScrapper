import { supabase } from '@/lib/supabase'
import { Project } from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  try {
    console.log('Fetching projects...') // Debug log
    let { data , error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Supabase error:', error.message, error.details)
      throw new Error(`Failed to fetch projects: ${error.message}`)
    }

    if (!data) {
      console.warn('No projects found')
      return []
    }

    console.log('Raw data from Supabase:', data) // Debug log

    return data.map(project => {
      // Create a copy of all project properties
      const mappedProject = {
        ...project,
        id: BigInt(project.id),
        upvotes: Number(project.upvotes),
        title: project.title || '',
        description: project.description || '',
        url: project.url || '',
        image_url: project.image_url || '',
        github_url: project.github_url || '',
        created_at: project.created_at || '',
        updated_at: project.updated_at || '',
        categories: typeof project.categories === 'string' 
          ? project.categories.split(',').map((c:string) => c.trim())
          : Array.isArray(project.categories) 
            ? project.categories 
            : []
      }
      
      return mappedProject
    })
  } catch (error) {
    console.error('Error in getProjects:', error)
    throw error
  }
}