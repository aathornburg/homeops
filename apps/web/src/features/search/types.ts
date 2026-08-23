export type SearchItemKind = 'task' | 'note' | 'page';

export type SearchItem = {
  kind: SearchItemKind
  id: string
  label: string
  description: string
  keywords: string[]
  meta?: string
  to: string
}