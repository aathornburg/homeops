import { PreAuthHeader } from "../../shared/layout/preAuthHeader";
import { LinkButton } from "../../shared/ui/linkButton";

export function LandingComponent() {
  return (
    <>
      <PreAuthHeader />
      <main className="">
        <div className="flex items-center justify-between bg-[url('/hero-light.png')] dark:bg-[url('/hero-dark.png')] bg-cover bg-center h-fit">
          <div className="w-3/5 p-20 text-left bg-gradient-to-r from-(color:--color-background-canvas) to-transparent">
            <h1 className="text-7xl mb-5">Keep the house running, together.</h1>
            <p className="text-2xl">Track chores, maintenance, and shared household work in one calm place.</p>
            <div className="mt-5">
              <LinkButton 
                to="/"
                className="rounded font-bold bg-(color:--color-action-primary) px-4 py-2.5 text-(color:--color-background-panel) hover:bg-(color:--color-action-primary-hover)"
              >Start free</LinkButton>
              <LinkButton 
                to="/"
                className="ml-5 rounded font-bold bg-(color:--color-background-canvas) color px-4 py-2.5 text-(color:--color-text-primary) hover:bg-(color:--color-background-panel) border-2 border-(color:--color-border-default)"
              >Log in</LinkButton>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}