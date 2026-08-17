import { createFileRoute } from '@tanstack/react-router'
import { LandingComponent } from './(pre-auth)/-landing'

export const Route = createFileRoute('/')({
  component: LandingComponent
})
