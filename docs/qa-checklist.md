# QA checklist and evidence

## Assistant checks completed against the final source

| Check | Result | Evidence |
|---|---|---|
| Reproducible dependency install | PASS | npm ci completed |
| TypeScript and production bundle | PASS | npm run build: TypeScript succeeded; Vite 8.3.4 built 16 modules |
| ESLint | PASS | npm run lint exited 0 with no lint diagnostics |
| Browser automation availability | BLOCKED | Chromium/Firefox executables absent; browser download failed. No browser acceptance tests are reported as passed. |

Production output: approximately 229.46 kB JavaScript (71.79 kB gzip), 2.09 kB CSS (0.97 kB gzip). This is bundle-size evidence, not a measured page-load time or a performance score.

## Student live-site checks — perform before recording

Update Pending only after you actually run a check. Record browser versions and actual observations. Tests on localhost do not establish that deployment works.

| ID | Steps | Expected result | Actual result |
|---|---|---|---|
| F1 | Post a title, category, and message | Discussion appears; success feedback; form clears | Pending |
| F2 | Open discussion and submit reply | Reply appears and count increases | Pending |
| F3 | Reload and reopen discussion | Discussion and reply remain in same browser | Pending |
| F4 | Submit empty form | Browser blocks missing required field | Pending |
| F5 | Enter only spaces in title/message | Visible validation feedback, no discussion created | Pending |
| F6 | Enter 121+ title characters, 2001+ message characters, 1001+ reply characters | Input is limited to 120/2000/1000 respectively | Pending |
| F7 | Search nonsense; filter Movies then Shows | Empty-state feedback and correct category filtering | Pending |
| F8 | Repeatedly open/back; switch Community/Architecture | Controls work without runtime errors | Pending |
| R1 | Desktop viewport 1920×1080 | No clipping, overlapping text, or horizontal page overflow | Pending |
| R2 | Tablet width 768; mobile width 390 | Forms and cards fit; filters stack on mobile | Pending |
| R3 | Repeat with a long unbroken title/message | Text wraps inside the card | Pending |
| B1 | Chrome: create, reply, reload, navigate | Core workflow works | Pending |
| B2 | Firefox: repeat same workflow | Core workflow works independently; data is local to Firefox | Pending |
| C1 | Open Console, clear it, reload and use features | Zero uncaught JS errors | Pending |
| C2 | Network panel: reload | No failed assets or 404s | Pending |
| A1 | Press Tab through navigation and form; activate buttons with keyboard | Visible focus and logical order | Pending |
| A2 | Inspect form labels | Inputs have associated labels | Pending |
| P1 | Network/performance panel on deployment | Record actual load observation; no prolonged blocking | Pending |

## Optional storage robustness checks

Use a test browser profile with no important prototype data.

- In DevTools Application/Storage, change `the-archives-discussions-v1` to invalid JSON and reload. Expect a warning and sample discussions.
- Simulate blocked storage in a test context. Expect save-error feedback and retained form input. These fault-injection checks have not been executed here.

## Recording evidence

Show validation, responsiveness, Console, and the second browser in the screen-and-webcam video. Automated/static checks do not replace the assignment's live demonstration.
