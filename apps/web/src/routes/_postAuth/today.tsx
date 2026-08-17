import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_postAuth/today')({
  component: TodayComponent,
})

function TodayComponent() {
  return <div>Hello "/(post-auth)/today"!</div>
}
