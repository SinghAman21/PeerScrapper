import { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { ExternalLink, ThumbsUp } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={project.image_url}
          alt={project.name}
          layout="fill"
          className="object-cover"
          priority
        />
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          <Button variant="ghost" size="icon" asChild>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`https://avatar.vercel.sh/${project.publisher}.png`} />
            <AvatarFallback>{project.publisher[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">{project.publisher}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.detail_description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">{project.upvotes}</span>
        </div>
        <Button asChild>
          <a href={project.direct_link} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}