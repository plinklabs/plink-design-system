The signature concentric-ring pulse — loading, success, bullets, accents.

```jsx
<Ping size={32} />              {/* animated pulse — loading/success */}
<Ping mode="static" size={14} /> {/* quiet ring bullet */}
<Ping onInk size={40} />         {/* on the ink section */}
```

`mode`: `pulse` | `static`. Respects `prefers-reduced-motion`.
