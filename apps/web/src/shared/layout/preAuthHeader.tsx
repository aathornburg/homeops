import { Link } from "@tanstack/react-router";
import { LinkButton } from "../ui/linkButton";
import { Burger, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


export function PreAuthHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="flex items-center border-b-1 border-(color:--color-border-subtle)">
      <Link
        to="/"
        className="font-(family-name:--heading) text-3xl p-4"
      >HomeOps</Link>
      <div className="max-[900px]:hidden ml-4 grow flex items-center justify-between">
        <div className="*:ml-6">
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
      </div>
      <div className="min-[900px]:hidden grow flex justify-end items-center p-4">
        <Burger color="currentColor" onClick={open} aria-label="Open menu" />
        <Drawer position="right" title="Menu" size="xs" opened={opened} onClose={close} closeButtonProps={{ 'aria-label': 'Close menu' }}
          classNames={{
            'content': 'flex! flex-col bg-(color:--color-background-panel)!',
            'body': 'flex grow flex-col',
            'title': "font-bold!",
            'header': "border-b border-(color:--color-border-default) bg-(color:--color-background-panel)!",
          }}>
          <nav className="
            [&>*]:block [&>*]:mt-3 [&>*]:p-2 [&>*]:text-md [&>*]:font-semibold [&>*]:text-(color:--color-text-primary)
            [&>*]:rounded [&>*]:p-3
            [&>*]:hover:text-(color:--color-action-primary-hover)
            [&>*]:active:bg-(color:--color-action-subtle)
            [&>*]:focus-visible:outline-2
            [&>*]:focus-visible:outline-(color:--color-focus-ring)
            [&>*]:hover:bg-(color:--color-action-subtle)
          ">
            <Link to="/why">Why HomeOps</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/resources">Resources</Link>
          </nav>
          <div className="mt-auto text-center border-t-1 border-(color:--color-border-subtle) py-4">
            <Button fullWidth color="transparent" size="md" className="mb-3 hover:bg-(color:--color-border-subtle)!">Log in</Button>
            <Button fullWidth color="var(--color-action-primary)" size="md" className="text-(color:--color-background-panel)! font-bold! mb-2">Start free</Button>
            <span className="font-light text-sm text-(color:--color-text-secondary)">Free to get started. No credit card.</span>
          </div>
        </Drawer>
      </div>
    </header>
  )
}