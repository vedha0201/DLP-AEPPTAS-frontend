# Run AepttasShield DLP locally in VS Code

## Steps

```text
1. Extract this ZIP and open the folder in VS Code
2. Open a terminal in VS Code and run:  npm install
3. Then run:  npm run dev
4. Open the printed URL in your browser (usually http://localhost:5173)
```

Requires Node.js 18 or newer. If you prefer Bun, `bun install` and `bun run dev` also work.

## Notes

- No sign-in is required — the app opens straight into the dashboard.
- Everything runs fully offline on built-in sample data (classifications, incidents, endpoints, discovery scans, lineage events).
- Buttons that would change real systems (quarantine, block destination, etc.) only show a confirmation in the browser — nothing is enforced.
- To connect a real backend later, create a `.env` file with `VITE_API_URL=http://localhost:4000` (or your backend URL) and restart `npm run dev`.
