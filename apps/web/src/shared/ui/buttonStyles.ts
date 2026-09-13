export const baseActionClassName = `
  inline-flex h-min items-center justify-center gap-2
  cursor-pointer rounded
  px-4 py-2.5 font-bold!
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-(--color-focus-ring)
`;

export const primaryActionClassName = `
  bg-(color:--color-action-primary)
  text-(color:--color-background-panel)
  hover:bg-(color:--color-action-primary-hover)
`;

export const secondaryActionClassName = `
  bg-(color:--color-background-canvas)
  text-(color:--color-text-primary)
  hover:bg-(color:--color-background-panel)
  border-2 border-(color:--color-border-default)
`;