import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pre-auth)/pricing')({
  component: PricingComponent,
});

function PricingComponent() {
  return <div>Hello "/pricing"!</div>
}
