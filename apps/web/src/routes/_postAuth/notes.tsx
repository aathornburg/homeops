import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_postAuth/notes')({
  component: NotesComponent,
})

function NotesComponent() {
  return <div>Hello "/_postAuth/notes"!</div>
}
