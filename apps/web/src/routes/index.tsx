import { createFileRoute, Link } from '@tanstack/react-router'
import { LandingComponent } from './(pre-auth)/-landing'

export const Route = createFileRoute('/')({
  component: () => {
    return (
        !isAuthenticated() ? <LandingComponent /> : <TodayComponent />
    );
  }
})

function isAuthenticated() {
  return false;
}

function TodayComponent() {
  return (
    <>
      <header>
        <Link
          to="/"
        >HomeOps Today</Link>
        <div></div>
      </header>
    </>
  )
}
