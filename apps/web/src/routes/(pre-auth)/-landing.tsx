import { CalendarDays, CircleCheckBig, House, UsersRound } from "lucide-react";
import { PreAuthHeader } from "../../shared/layout/preAuthHeader";
import { LinkButton } from "../../shared/ui/linkButton";

export function LandingComponent() {
  return (
    <>
      <PreAuthHeader />
      <main className="">
        <div className="flex items-center justify-between relative [--hero-start:30%]">
          <div
            aria-hidden="true"
            className="
              absolute -right-0 -top-0 -bottom-0 -z-10
              bg-center h-full
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute inset-0 -left-0.5 z-10
                bg-center
                bg-gradient-to-r
                from-(color:--color-background-canvas)
                to-transparent
              "
            />
            <picture>
              <source srcSet="/hero-dark.png" media="(prefers-color-scheme: dark)" />
              <img src="/hero-light.png" alt="" className="h-full" />
            </picture>
          </div>
          <div className="w-3/5 p-20 text-left">
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
            <div className="flex mt-15 p-4 rounded border-1 border-(color:--color-border-subtle) [&>*:not(:last-child)]:border-r-1 [&>*:not(:last-child)]:border-(color:--color-border-subtle) [&>*]:px-4 [&>*]:py-2">
              <div className="flex items-center">
                <CircleCheckBig />
                <span className="ml-2">Stay on top of daily tasks</span>
              </div>
              <div className="flex items-center">
                <CalendarDays />
                <span className="ml-2">Plan ahead for what matters</span>
              </div>
              <div className="flex items-center">
                <UsersRound />
                <span className="ml-2">Share the load, see progress</span>
              </div>
              <div className="flex items-center">
                <House color="var(--color-status-warning)" />
                <span className="ml-2">Keep your home running smoothly</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}