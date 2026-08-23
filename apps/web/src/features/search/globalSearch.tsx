import { Spotlight, type SpotlightActionData } from '@mantine/spotlight';

import { mockSearchItems } from './mockSearchItems';
import { InputBase } from '@mantine/core';
import { Search } from 'lucide-react';

const groupNames = {
  task: 'Tasks',
  note: 'Notes',
  page: 'Pages',
};

type GlobalSearchProps = {
  className?: string;
};

export function GlobalSearch(props: GlobalSearchProps) {
  const actions: SpotlightActionData[] = mockSearchItems.map((item) => ({
    id: item.id,
    label: item.label,
    description: item.description,
    group: groupNames[item.kind],
  }));

  return (
    <>
      <InputBase
        className={props.className}
        component="button"
        onClick={() => Spotlight.open()}
        // rightSection={<Kbd size="xs">Ctrl + K</Kbd>}
        // rightSectionWidth={76}
        // rightSectionPointerEvents="none"
        classNames={{
          input: 'bg-(color:--color-background-panel)! border-1 border-(color:--color-border-default)! rounded text-(color:--color-text-primary)! hover:bg-(color:--color-surface-hover)! focus-visible:outline-2 focus-visible:outline-(color:--color-focus-ring)!',
        }}
      >
        <div className="flex items-center gap-2">
          <Search size={16} strokeWidth={1.8} className="mr-2 inline" />
          <span>Search tasks, notes…</span>
        </div>
      </InputBase>

      <Spotlight
        actions={actions}
        highlightQuery
        nothingFound="No matches found"
        searchProps={{
          placeholder: 'Search tasks, notes, or anything…',
        }}
        classNames={{
          content: 'bg-(color:--color-background-panel)! border-1 border-(color:--color-border-default)! rounded text-(color:--color-text-primary)!',
          action: 'bg-(color:--color-background-panel)! text-(color:--color-text-primary)! hover:bg-(color:--color-surface-hover)!',
        }}
      />
    </>
  );
}