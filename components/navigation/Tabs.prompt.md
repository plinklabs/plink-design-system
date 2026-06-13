Mono-label tabs on a hairline baseline; the active tab gets a magenta underline.

```jsx
const [tab, setTab] = React.useState('apps');
<Tabs value={tab} onChange={setTab} tabs={[
  { value: 'apps', label: 'Apps' },
  { value: 'mission', label: 'Mission' },
]} />
```

Controlled via `value` / `onChange`.
