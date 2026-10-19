# Six-minute screen-and-webcam recording guide

Keep your face visible throughout. Use your own words; these are talking points, not a script to read verbatim. Open the live site, GitHub, official Discourse README, and browser DevTools before recording.

## 0:00–2:00 — Architecture and AI audit

Open the site's Architecture & AI audit screen. Explain that Discourse is the analyzed real system and The Archives is a small discussion-subsystem prototype. Walk through Ember, Rails, PostgreSQL, Redis, Sidekiq, and Nginx using the component table. Explain HTTP/JSON frontend/API communication and server-side persistence. Call the monolithic classification your interpretation of the documented structure.

Show the official README's Built With section. Explain how you distinguished PostgreSQL persistence from Redis caching. Mention the Ruby-version discrepancy between README and INSTALL if useful, without claiming to have run Discourse. Show the unused-import correction in Git history or AI appendix. Then explain your prototype's simpler React → validation → localStorage flow and its single-browser limitation.

## 2:00–4:00 — Functionality

Open Community. Create a discussion such as “Which movie has your favorite ending?” Choose a category and enter a message. Open the new discussion, post a reply, reload, reopen it, and show that the reply remains. Demonstrate search and the Movies/Shows filter. Explain that another browser will have its own separate local data.

## 4:00–5:40 — Live QA

Show DevTools Console and Network after a reload. Demonstrate submitting an empty form, then whitespace-only input. Show character limits. Search for nonsense to demonstrate the empty state. Use responsive mode at 1920×1080, 768px, and 390px; check that cards and forms fit. Press Tab to show visible focus and form order. Open the live site in Firefox as well as Chrome and repeat a basic create/reply check. Show the actual QA record; do not claim a check passed if you skipped it.

## 5:40–6:15 — Retrospective

Explain the trade-off: local browser storage made a deployable proof of concept possible with little infrastructure, but a real community needs a shared backend and authentication. Explain that AI accelerated scaffolding but documentation review, build/lint checks, and browser tests were still necessary. Briefly show the repository and live URL.

## Before submitting

Confirm the recording is 5–7 minutes, audio is audible, and webcam is visible. Upload to YouTube unlisted, Loom, or Panopto. Verify the sharing permissions. Submit the live website URL, public GitHub repository URL, and video link. README is in the repository.
