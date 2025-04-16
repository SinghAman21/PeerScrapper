// Remove 'use client' and useEffect since we want server-side rendering
import { Suspense } from 'react'
import { getProjects } from '@/services/projectService'
import { ProjectCard } from '@/components/project-card'
import { ProjectSkeleton } from '@/components/project-skeleton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

async function Projects() {
  try {
    const projects = await getProjects()
    console.log('Fetched projects:', projects) // Debug log

    if (!projects || projects.length === 0) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Projects Found</AlertTitle>
          <AlertDescription>
            There are currently no projects available.
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Featured Projects</h1>
            <p className="text-muted-foreground mt-2">
              Discover amazing projects from the community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id.toString()} project={project} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in Projects component:', error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load projects. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <Projects />
    </Suspense>
  )
}

function ProjectsLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Featured Projects</h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing projects from the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}