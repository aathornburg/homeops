import { Link } from "@tanstack/react-router";
import { PreAuthHeader } from "../../shared/layout/preAuthHeader";

export function LandingComponent() {
  return (
    <>
      <PreAuthHeader />
      <main className="ml-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl w-2/4">Keep the house running, together</h1>
      </main>
    </>
  )
}