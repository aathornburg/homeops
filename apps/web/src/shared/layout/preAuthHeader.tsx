import { Link } from "@tanstack/react-router";
import { LinkButton } from "../ui/linkButton";

export function PreAuthHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b-1 border-(color:--color-border-subtle)">
      <div className="flex items-center">
        <Link
          to="/"
          className="font-(family-name:--heading) text-3xl"
        >HomeOps</Link>
        <div className="ml-4 *:ml-6">
          <Link
            to="/why"
          >Why HomeOps</Link>
          <Link
            to="/pricing"
          >Pricing</Link>
          <Link
            to="/resources"
          >Resources</Link>
        </div>
      </div>
      <div className="flex items-center *:mr-6">
        <Link
          to="/"
          className="underline"
        >Log In</Link>
        <LinkButton
          to="/"
          className="ml-4 rounded font-bold bg-(color:--color-action-primary) px-4 py-2.5 text-(color:--color-background-panel) hover:bg-(color:--color-action-primary-hover)"
        >Start free</LinkButton>
      </div>
    </header>
  )
}