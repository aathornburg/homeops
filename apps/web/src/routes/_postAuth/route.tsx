import { CalendarDays, House, SquareCheck, Sun, UserRoundPlus } from "lucide-react";
import { AppShell, Burger, Combobox, Divider, Group, InputBase, NavLink, Stack, Text, ThemeIcon, useCombobox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/_postAuth')({
  component: PostAuthShell,
})

function PostAuthShell() {
  const [opened, { open, close }] = useDisclosure();
  const households = [
    { id: '1', name: 'Household 1' },
    { id: '2', name: 'Household 2' },
    { id: '3', name: 'Household 3' },
  ];
  const ALL_HOUSEHOLDS = { id: 'all', name: 'All households' };
  const [householdId, setHouseholdId] = useState<string>('1');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const selectedHousehold = householdId === ALL_HOUSEHOLDS.id ? ALL_HOUSEHOLDS : households.find((household) => household.id === householdId);

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header style={{ backgroundColor: 'var(--color-background-canvas)', borderBottom: '1px solid var(--color-border-default)', borderBottomWidth: '1.5px' }}>
        <Group h="100%" px="md">
          <Burger opened={false} onClick={open} hiddenFrom="lg" size="sm" aria-label="Open menu" aria-expanded={opened} aria-controls="post-auth-navbar" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        id="post-auth-navbar"
        p="md"
        style={{ backgroundColor: 'var(--color-background-canvas)', borderRight: '1px solid var(--color-border-default)', borderRightWidth: '1.5px', textAlign: 'left', overflowY: 'auto' }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="font-(family-name:--heading) text-3xl p-2"
            >
              HomeOps
            </Link>
            <Burger opened={true} onClick={close} hiddenFrom="lg" size="sm" aria-label="Close menu" aria-expanded={opened} aria-controls="post-auth-navbar" />
          </div>
          <Combobox
            store={combobox}
            onOptionSubmit={(value) => {
              setHouseholdId(value);
              combobox.closeDropdown();
            }}
            classNames={{
              dropdown: "bg-(color:--color-background-panel)! border-1 border-(color:--color-border-default)! rounded mt-1",
              option: "px-4 py-2 mb-1 hover:bg-(color:--color-surface-hover)! aria-selected:bg-(color:--color-selected)! aria-selected:text-(color:--color-text-primary)!",
            }}
          >
            <Combobox.Target targetType="button">
              <InputBase
                component="button"
                type="button"
                multiline
                pointer
                className="mt-8"
                classNames={{
                  input: "py-3! bg-(color:--color-background-panel)! border-1 border-(color:--color-border-default)! rounded text-(color:--color-text-primary)! hover:bg-(color:--color-surface-hover)! focus-visible:outline-2 focus-visible:outline-(color:--color-focus-ring)!",
                }}
                onClick={() => combobox.toggleDropdown()}
              >
                <Group>
                  <ThemeIcon
                    size={30}
                    color="var(--color-selected)"
                  >
                    <House size={16} strokeWidth={1.8} />
                  </ThemeIcon>
                  <Stack component="span" gap={0}>
                    <Text span size="xs" className="text-(--color-text-secondary)!">
                      Household
                    </Text>
                    <Text span size="sm">{selectedHousehold?.name}</Text>
                  </Stack>
                </Group>
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {households.map((household) => {
                  const selected = household.id === householdId;

                  return (
                    <Combobox.Option
                      key={household.id}
                      value={household.id}
                      active={selected}
                      aria-selected={selected}
                    >
                      {household.name}
                    </Combobox.Option>
                  );
                })}
                <Divider my="xs" aria-hidden="true" color="var(--color-border-subtle)" />
                <Combobox.Option
                  value={ALL_HOUSEHOLDS.id}
                  active={ALL_HOUSEHOLDS.id === householdId}
                  aria-selected={ALL_HOUSEHOLDS.id === householdId}
                >
                  {ALL_HOUSEHOLDS.name}
                </Combobox.Option>
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <div className="mt-4 [&>*]:mb-2! [&>*]:rounded [&>*]:p-4! text-xl!">
            <NavLink label="Today" component={Link} to="/today" onClick={close} leftSection={ <Sun /> } classNames={{ label: "text-base!" }} className="text-(--color-text-secondary)! aria-[current=page]:bg-(--color-selected)! aria-[current=page]:[&_svg]:text-(--color-status-warning)! hover:bg-(--color-surface-hover)!" />
            <NavLink label="Tasks" component={Link} to="/tasks" onClick={close} leftSection={ <SquareCheck /> } classNames={{ label: "text-base!" }} className="text-(--color-text-secondary)! aria-[current=page]:bg-(--color-selected)! aria-[current=page]:[&_svg]:text-(--color-status-warning)! hover:bg-(--color-surface-hover)!" />
            <NavLink label="Calendar" component={Link} to="/calendar" onClick={close} leftSection={ <CalendarDays /> } classNames={{ label: "text-base!" }} className="text-(--color-text-secondary)! aria-[current=page]:bg-(--color-selected)! aria-[current=page]:[&_svg]:text-(--color-status-warning)! hover:bg-(--color-surface-hover)!" />
            <NavLink label="Household" component={Link} to="/household" onClick={close} leftSection={ <House /> } classNames={{ label: "text-base!" }} className="text-(--color-text-secondary)! aria-[current=page]:bg-(--color-selected)! aria-[current=page]:[&_svg]:text-(--color-status-warning)! hover:bg-(--color-surface-hover)!" />
          </div>
        </div>
        <Link
          to="/household"
          className="mt-auto p-5 bg-(color:--color-background-panel) rounded flex items-center justify-center cursor-pointer hover:bg-(color:--color-surface-hover) border-1 border-(color:--color-border-subtle)"
          onClick={close}
        >
          <UserRoundPlus size={36}/>
          <div className="ml-2">
            <div className="ml-2 text-(color:--color-action-primary)">Invite household</div>
            <div className="ml-2 text-sm text-(color:--color-text-secondary)">Share and stay in sync.</div>
          </div>
        </Link>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}