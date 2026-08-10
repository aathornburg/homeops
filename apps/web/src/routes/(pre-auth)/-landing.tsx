import { CalendarDays, CircleCheckBig, House, UsersRound } from "lucide-react";
import { PreAuthHeader } from "../../shared/layout/preAuthHeader";
import { LinkButton } from "../../shared/ui/linkButton";

function BenefitItem(props: { title: string, icon: React.ReactNode }) {
  return (
    <div className="relative flex items-center text-left p-4">
      {props.icon}
      <span className="ml-4">{props.title}</span>
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-2 top-1/2
          h-4/5 w-px -translate-y-1/2
          bg-(color:--color-border-subtle)
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-2 left-1/2
          h-px w-4/5 -translate-x-1/2
          bg-(color:--color-border-subtle)
        "
      />
    </div>
  );
}

export function LandingComponent() {
  return (
    <>
      <PreAuthHeader />
      <main className="">
        <div className="relative">
          <div
            aria-hidden="true"
            className="
              absolute inset-0 -z-10
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
            <picture className="w-full h-full">
              <source srcSet="/hero-responsive-dark.png" media="(prefers-color-scheme: dark)" />
              <img src="/hero-responsive-light.png" alt="" className="w-full h-full object-cover" />
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
          </div>
          <div className="px-20 py-15">
            <div
              className="
                grid gap-4 grid-cols-4 max-[1100px]:grid-cols-2
                leading-5 overflow-hidden
                bg-(color:--color-border-subtle)/50 rounded border-1 border-(color:--color-border-subtle)
              "
            >
              <BenefitItem icon={<CircleCheckBig size={36} />} title="Stay on top of daily tasks" />
              <BenefitItem icon={<CalendarDays size={36} />} title="Plan ahead for what matters" />
              <BenefitItem icon={<UsersRound size={36} />} title="Share the load, see progress" />
              <BenefitItem icon={<House size={36} color="var(--color-status-warning)" />} title="Keep your home running smoothly" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}