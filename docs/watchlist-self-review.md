# Watchlist self-review and manual QA guide

## Scope

This guide covers the watchlist implementation in [PR #3](https://github.com/Elenimulu789/The-Archives/pull/3), on [feature/week04-watchlist](https://github.com/Elenimulu789/The-Archives/tree/feature/week04-watchlist). It does not mean the feature is already merged into main or published on GitHub Pages.

Approximately **2 hours** were reported for this week's project work. The project has one developer; the review process below is self-review, rather than independent peer approval.

## Run the feature branch

From the existing local repository, check for uncommitted changes before switching branches:

```powershell
git status
git fetch origin
git switch feature/week04-watchlist
npm ci
npm run lint
npm run build
npm run dev
```

If the feature branch does not exist locally, use `git switch -c feature/week04-watchlist --track origin/feature/week04-watchlist` instead of the switch command above. Preserve any unfinished local work before changing branches.

Open the URL printed by Vite and select **My Watchlist**. Test this branch rather than assuming the main-branch deployment includes the feature.

## Checks to execute and record

The expected results below were checked against the source code. Their browser outcomes remain **Pending** until actually observed.

| ID | Action | Expected result | Actual result |
| --- | --- | --- | --- |
| W1 | Add a Movie titled Arrival | One Movie card appears; count increases; title input clears | Pending |
| W2 | Add a Show titled Severance | A separate Show card appears with the correct type | Pending |
| W3 | Try adding arrival, then Arrival with surrounding spaces | Neither creates a duplicate; duplicate feedback appears | Pending |
| W4 | Try adding the same title with a different Movie/Show type | Still rejected: duplicate detection is title-based across both types | Pending |
| W5 | Submit an empty title, then a title containing only spaces | Empty input is blocked by browser validation; spaces receive application validation feedback | Pending |
| W6 | Refresh, then navigate Community to My Watchlist | Saved items return in the same browser and origin | Pending |
| W7 | Remove one saved title and refresh | Only the selected title is removed; the removal persists | Pending |
| W8 | Remove the final title | Count is zero and the empty-state message appears | Pending |
| W9 | Use Tab, Enter, and the type selector; inspect a narrow viewport | Controls are usable and the page remains readable | Pending |
| W10 | Open a Community discussion and verify its existing workflow | Watchlist navigation does not prevent discussion access | Pending |
| W11 | Check Console and Network while using the feature | No uncaught application errors or failed application assets | Pending |

### Storage checks in an isolated test profile

The watchlist uses `the-archives-watchlist-v1`; discussions use a separate storage key. Do not clear important browser data to run a test.

- Invalid saved watchlist JSON should fall back to an empty list without crashing. The current implementation does not display a corruption warning.
- If saving fails because browser storage is unavailable, expect “Could not save. Check browser storage settings.” The displayed items should remain at their previous saved state.
- Browser storage is local to the browser and origin. This feature does not provide accounts, a server database, or cross-device synchronization.

These are expected behaviors from source inspection, not recorded fault-injection passes.

## Evidence and review record

For each completed check, record:

- Branch and commit SHA.
- Browser/version and viewport.
- Actual observations and pass/fail status.
- Screenshot or recording path.
- Any issue found and the next step.

For a screenshot, capture the populated watchlist with both Movie and Show items. For a recording, show adding a title, rejecting a duplicate, refreshing, and removing a title.

Build and lint passes recorded in PR #3 are historical results; record a fresh run separately. No new build, lint, or browser pass is claimed by this documentation change.

## Documentation check

This adds repository documentation. No separate GitHub Wiki edit is claimed. The guide complements [the existing QA checklist](qa-checklist.md) and the evidence-template proposal in [PR #2](https://github.com/Elenimulu789/The-Archives/pull/2).

AI assistance was used to prepare this guide and check its expected behavior against the watchlist source. Manual execution and evidence collection remain separate steps.
