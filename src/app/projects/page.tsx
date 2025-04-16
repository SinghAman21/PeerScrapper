import { Suspense } from 'react'
import { getProjects } from '@/services/projectService'
import { ProjectCard } from '@/components/project-card'
import { ProjectSkeleton } from '@/components/project-skeleton'

async function Projects() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <Projects />
    </Suspense>
  )
}