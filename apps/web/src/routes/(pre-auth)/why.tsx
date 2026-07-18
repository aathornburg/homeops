import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pre-auth)/why')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/why"!</div>
}
