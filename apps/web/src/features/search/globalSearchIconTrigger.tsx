import { Search } from "lucide-react";
import { Spotlight } from "@mantine/spotlight";
import { ActionIcon } from "@mantine/core";

export function GlobalSearchIconTrigger(props: { className?: string }) {
  return (
    <ActionIcon
      type="button"
      variant="subtle"
      size={44}
      radius="sm"
      className={`
        cursor-pointer
        text-(color:--color-text-primary)!
        hover:bg-(color:--color-surface-hover)!
        active:bg-(color:--color-selected)!
        ${props.className ?? ''}
      `}
      aria-label="Search tasks and notes"
      onClick={() => Spotlight.open()}
    >
      <Search aria-hidden="true" size={24} strokeWidth={1.8} />
    </ActionIcon>
  );
}