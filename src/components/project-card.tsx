import { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="p-4 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={project.image_url}
          alt={project.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span key={category} className="text-xs bg-secondary px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">👍 {project.upvotes}</span>
          <Button asChild variant="outline" size="sm">
            <a href={project.direct_link} target="_blank" rel="noopener noreferrer">
              Visit Project
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}