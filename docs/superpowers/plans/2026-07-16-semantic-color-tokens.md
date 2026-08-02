# Semantic Color Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite starter colors in `index.css` with a complete, accessible two-layer HomeOps light/dark color-token system.

**Architecture:** Literal light and dark palette primitives coexist in `:root`. Semantic tokens map to light primitives by default, and the existing dark-mode media query remaps only semantic tokens. Global selectors consume semantic tokens exclusively.

**Tech Stack:** CSS custom properties, Vite 8, React 19, Node.js verification scripts

---

### Task 1: Replace starter colors with the HomeOps token contract

**Files:**
- Modify: `apps/web/src/index.css:3-52`

- [ ] **Step 1: Run a token-contract check and verify the current stylesheet fails**

Run from `apps/web`:

```powershell
node -e "const fs=require('node:fs');const css=fs.readFileSync('src/index.css','utf8');const required=['--palette-light-canvas','--palette-dark-worktop','--color-background-canvas','--color-action-primary','--color-status-danger-surface','--color-premium'];const missing=required.filter(token=>!css.includes(token+':'));if(missing.length){console.error('Missing:',missing.join(', '));process.exit(1)}"
```

Expected: exit code 1 and all six required tokens reported as missing.

- [ ] **Step 2: Replace the existing color declarations in `:root` with immutable palette primitives and light semantic mappings**

Keep the existing font declarations and rendering properties. Insert the following declarations at the start of `:root`:

```css
  /* Light palette primitives */
  --palette-light-canvas: #fafaf8;
  --palette-light-surface: #ffffff;
  --palette-light-panel: #f2f5f1;
  --palette-light-surface-muted: #e8ece9;
  --palette-light-border: #dde4de;
  --palette-light-border-strong: #82948b;
  --palette-light-ink: #1f2523;
  --palette-light-text: #4f5d58;
  --palette-light-text-muted: #68746e;
  --palette-light-text-disabled: #87938d;
  --palette-light-green: #2f6f5e;
  --palette-light-green-hover: #285f51;
  --palette-light-green-active: #214f44;
  --palette-light-green-soft: #e5f1ec;
  --palette-light-green-soft-hover: #d6e9e1;
  --palette-light-green-border: #b8d4c8;
  --palette-light-ochre: #7a5c2e;
  --palette-light-ochre-hover: #674c26;
  --palette-light-ochre-active: #553f20;
  --palette-light-ochre-soft: #f6f0e4;
  --palette-light-ochre-border: #e4d5b7;
  --palette-light-violet: #6f55a3;
  --palette-light-violet-hover: #5d4789;
  --palette-light-violet-active: #4e3b73;
  --palette-light-violet-soft: #f1edf7;
  --palette-light-violet-border: #d9cfe8;
  --palette-light-info: #4267a3;
  --palette-light-info-hover: #355385;
  --palette-light-info-soft: #eaf0f8;
  --palette-light-info-border: #c9d7eb;
  --palette-light-danger: #a8423d;
  --palette-light-danger-hover: #8d3733;
  --palette-light-danger-soft: #f8ebea;
  --palette-light-danger-border: #ebc7c4;
  --palette-light-overlay: rgb(31 37 35 / 60%);

  /* Dark palette primitives */
  --palette-dark-worktop: #101614;
  --palette-dark-panel: #151e1b;
  --palette-dark-surface: #1b2622;
  --palette-dark-surface-soft: #22302b;
  --palette-dark-border: #31443d;
  --palette-dark-border-strong: #58766b;
  --palette-dark-text: #f1f5f2;
  --palette-dark-text-secondary: #b8c4be;
  --palette-dark-text-muted: #8e9d96;
  --palette-dark-text-disabled: #61736a;
  --palette-dark-mint: #72ac9b;
  --palette-dark-mint-hover: #86b9aa;
  --palette-dark-mint-active: #5e9787;
  --palette-dark-mint-wash: #203a34;
  --palette-dark-mint-wash-hover: #29483f;
  --palette-dark-mint-border: #3f6e60;
  --palette-dark-ochre: #c2a36b;
  --palette-dark-ochre-hover: #d0b581;
  --palette-dark-ochre-active: #a98c59;
  --palette-dark-ochre-soft: #352d20;
  --palette-dark-ochre-border: #665437;
  --palette-dark-violet: #b29ed6;
  --palette-dark-violet-hover: #c1afe0;
  --palette-dark-violet-active: #9985bd;
  --palette-dark-violet-soft: #30283c;
  --palette-dark-violet-border: #65547d;
  --palette-dark-info: #8fafdc;
  --palette-dark-info-hover: #a3bde2;
  --palette-dark-info-soft: #1e2b3d;
  --palette-dark-info-border: #405a7d;
  --palette-dark-danger: #e08c87;
  --palette-dark-danger-hover: #e9a09c;
  --palette-dark-danger-soft: #3a2322;
  --palette-dark-danger-border: #75413e;
  --palette-dark-overlay: rgb(0 0 0 / 64%);

  /* Light semantic theme */
  --color-background-canvas: var(--palette-light-canvas);
  --color-background-panel: var(--palette-light-panel);
  --color-surface: var(--palette-light-surface);
  --color-surface-raised: var(--palette-light-surface);
  --color-surface-muted: var(--palette-light-panel);
  --color-surface-hover: var(--palette-light-surface-muted);
  --color-overlay: var(--palette-light-overlay);
  --color-text-primary: var(--palette-light-ink);
  --color-text-secondary: var(--palette-light-text);
  --color-text-muted: var(--palette-light-text-muted);
  --color-text-inverse: var(--palette-light-surface);
  --color-text-disabled: var(--palette-light-text-disabled);
  --color-text-link: var(--palette-light-green);
  --color-text-link-hover: var(--palette-light-green-hover);
  --color-border-subtle: var(--palette-light-surface-muted);
  --color-border-default: var(--palette-light-border);
  --color-border-strong: var(--palette-light-border-strong);
  --color-border-disabled: var(--palette-light-border);
  --color-focus-ring: var(--palette-light-green);
  --color-action-primary: var(--palette-light-green);
  --color-action-primary-hover: var(--palette-light-green-hover);
  --color-action-primary-active: var(--palette-light-green-active);
  --color-action-primary-disabled: var(--palette-light-surface-muted);
  --color-action-on-primary: var(--palette-light-surface);
  --color-action-subtle: var(--palette-light-green-soft);
  --color-action-subtle-hover: var(--palette-light-green-soft-hover);
  --color-selected: var(--palette-light-green-soft);
  --color-selected-hover: var(--palette-light-green-soft-hover);
  --color-on-selected: var(--palette-light-green);
  --color-status-success: var(--palette-light-green);
  --color-status-success-surface: var(--palette-light-green-soft);
  --color-status-success-border: var(--palette-light-green-border);
  --color-status-warning: var(--palette-light-ochre);
  --color-status-warning-surface: var(--palette-light-ochre-soft);
  --color-status-warning-border: var(--palette-light-ochre-border);
  --color-status-danger: var(--palette-light-danger);
  --color-status-danger-surface: var(--palette-light-danger-soft);
  --color-status-danger-border: var(--palette-light-danger-border);
  --color-status-info: var(--palette-light-info);
  --color-status-info-surface: var(--palette-light-info-soft);
  --color-status-info-border: var(--palette-light-info-border);
  --color-status-neutral: var(--palette-light-text);
  --color-status-neutral-surface: var(--palette-light-panel);
  --color-status-neutral-border: var(--palette-light-border);
  --color-premium: var(--palette-light-violet);
  --color-premium-hover: var(--palette-light-violet-hover);
  --color-premium-active: var(--palette-light-violet-active);
  --color-premium-surface: var(--palette-light-violet-soft);
  --color-premium-border: var(--palette-light-violet-border);
```

- [ ] **Step 3: Replace the dark-mode starter overrides with dark semantic mappings**

Use the following complete dark semantic block:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background-canvas: var(--palette-dark-worktop);
    --color-background-panel: var(--palette-dark-panel);
    --color-surface: var(--palette-dark-surface);
    --color-surface-raised: var(--palette-dark-surface-soft);
    --color-surface-muted: var(--palette-dark-panel);
    --color-surface-hover: var(--palette-dark-surface-soft);
    --color-overlay: var(--palette-dark-overlay);
    --color-text-primary: var(--palette-dark-text);
    --color-text-secondary: var(--palette-dark-text-secondary);
    --color-text-muted: var(--palette-dark-text-muted);
    --color-text-inverse: var(--palette-dark-worktop);
    --color-text-disabled: var(--palette-dark-text-disabled);
    --color-text-link: var(--palette-dark-mint);
    --color-text-link-hover: var(--palette-dark-mint-hover);
    --color-border-subtle: var(--palette-dark-surface-soft);
    --color-border-default: var(--palette-dark-border);
    --color-border-strong: var(--palette-dark-border-strong);
    --color-border-disabled: var(--palette-dark-border);
    --color-focus-ring: var(--palette-dark-mint);
    --color-action-primary: var(--palette-dark-mint);
    --color-action-primary-hover: var(--palette-dark-mint-hover);
    --color-action-primary-active: var(--palette-dark-mint-active);
    --color-action-primary-disabled: var(--palette-dark-surface-soft);
    --color-action-on-primary: var(--palette-dark-worktop);
    --color-action-subtle: var(--palette-dark-mint-wash);
    --color-action-subtle-hover: var(--palette-dark-mint-wash-hover);
    --color-selected: var(--palette-dark-mint-wash);
    --color-selected-hover: var(--palette-dark-mint-wash-hover);
    --color-on-selected: var(--palette-dark-mint);
    --color-status-success: var(--palette-dark-mint);
    --color-status-success-surface: var(--palette-dark-mint-wash);
    --color-status-success-border: var(--palette-dark-mint-border);
    --color-status-warning: var(--palette-dark-ochre);
    --color-status-warning-surface: var(--palette-dark-ochre-soft);
    --color-status-warning-border: var(--palette-dark-ochre-border);
    --color-status-danger: var(--palette-dark-danger);
    --color-status-danger-surface: var(--palette-dark-danger-soft);
    --color-status-danger-border: var(--palette-dark-danger-border);
    --color-status-info: var(--palette-dark-info);
    --color-status-info-surface: var(--palette-dark-info-soft);
    --color-status-info-border: var(--palette-dark-info-border);
    --color-status-neutral: var(--palette-dark-text-secondary);
    --color-status-neutral-surface: var(--palette-dark-surface-soft);
    --color-status-neutral-border: var(--palette-dark-border);
    --color-premium: var(--palette-dark-violet);
    --color-premium-hover: var(--palette-dark-violet-hover);
    --color-premium-active: var(--palette-dark-violet-active);
    --color-premium-surface: var(--palette-dark-violet-soft);
    --color-premium-border: var(--palette-dark-violet-border);
  }
}
```

- [ ] **Step 4: Migrate the global selectors to semantic tokens**

Change the root foreground/background and the two existing selector references:

```css
  color: var(--color-text-secondary);
  background: var(--color-background-canvas);
```

```css
#root {
  border-inline: 1px solid var(--color-border-default);
}
```

```css
h1,
h2 {
  color: var(--color-text-primary);
}
```

Remove the obsolete commented `code`/`.counter` block so it cannot preserve references to deleted starter tokens.

- [ ] **Step 5: Re-run the token-contract check**

Run the command from Step 1.

Expected: exit code 0 with no output.

- [ ] **Step 6: Confirm no starter color tokens remain**

Run from the repository root:

```powershell
rg -n -e "--text:" -e "--text-h:" -e "--bg:" -e "--border:" -e "--code-bg:" -e "--accent:" -e "--accent-bg:" -e "--accent-border:" -e "--social-bg:" apps/web/src/index.css
```

Expected: exit code 1 with no matches.

### Task 2: Verify accessibility and build integrity

**Files:**
- Verify: `apps/web/src/index.css`

- [ ] **Step 1: Run contrast assertions for both themes**

Run from `apps/web`:

```powershell
node -e "const pairs=[['light primary','#1f2523','#fafaf8',4.5],['light secondary','#4f5d58','#fafaf8',4.5],['light muted','#68746e','#fafaf8',4.5],['light action','#ffffff','#2f6f5e',4.5],['light warning','#7a5c2e','#f6f0e4',4.5],['light danger','#a8423d','#f8ebea',4.5],['light info','#4267a3','#eaf0f8',4.5],['light premium','#6f55a3','#f1edf7',4.5],['dark primary','#f1f5f2','#101614',4.5],['dark secondary','#b8c4be','#101614',4.5],['dark muted','#8e9d96','#101614',4.5],['dark action','#101614','#72ac9b',4.5],['dark warning','#c2a36b','#352d20',4.5],['dark danger','#e08c87','#3a2322',4.5],['dark info','#8fafdc','#1e2b3d',4.5],['dark premium','#b29ed6','#30283c',4.5],['light strong border','#82948b','#fafaf8',3],['dark strong border','#58766b','#1b2622',3]];const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);const lum=h=>rgb(h).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((n,c,i)=>n+c*[.2126,.7152,.0722][i],0);let failed=false;for(const [name,a,b,min] of pairs){const x=lum(a),y=lum(b),ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);console.log(name,ratio.toFixed(2));if(ratio<min)failed=true}process.exit(failed?1:0)"
```

Expected: exit code 0; every text pairing is at least 4.5 and each strong border pairing is at least 3.0.

- [ ] **Step 2: Run the production build**

Run from `apps/web`:

```powershell
npm.cmd run build
```

Expected: TypeScript and Vite complete successfully and emit `dist`.

- [ ] **Step 3: Review the focused diff**

Run from the repository root:

```powershell
git diff -- apps/web/src/index.css
```

Expected: only the intended token definitions, theme mappings, migrated references, and obsolete commented starter block removal appear.
