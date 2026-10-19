# The Archives

A movie-and-TV discussion proof of concept and companion architecture overview for a study of [Discourse](https://github.com/discourse/discourse).

## Features

Create discussions, filter Movies/Shows, search titles and messages, open discussions, and post replies. Input is bounded and validated, including whitespace-only input. Data is saved to browser localStorage and survives refresh. Corrupt or unavailable storage produces feedback.

**Scope:** a single-browser subsystem simulation, not a deployed multi-user community. No authentication, backend API, database server, moderation, or cross-device synchronization. Local data is origin-specific and can be removed by clearing browser storage. The prototype does not connect to Discourse or reuse its implementation.

The **Architecture & AI audit** navigation button presents the target architecture, this prototype's smaller design, and AI verification findings. It can be used as the visual aid in the required video.

## Setup and run

Use Node 22.18+ (Node 22 recommended) and npm. No environment variables, API keys, or external services are required.

```sh
git clone https://github.com/Elenimulu789/The-Archives.git
cd The-Archives
npm ci
npm run dev
```

Open the local URL printed by Vite. To validate and preview a production build:

```sh
npm run lint
npm run build
npm run preview
```

## Deployment

A prebuilt static copy is included in `docs/` for GitHub Pages. In repository **Settings → Pages**, choose **Deploy from a branch**, **main**, and **/docs**, then Save.

Expected URL after Pages is enabled and its deployment succeeds:
https://elenimulu789.github.io/The-Archives/

This expected address is not a claim that deployment has already succeeded. Check Pages/Actions and open the URL before submission.

After future source changes, run `npm run build`, copy the contents of `dist/` into `docs/` without deleting the Markdown documentation, and commit the updated source and static output. The relative Vite base supports the repository subpath. No client-side URL routing is used.

## Architectural analysis and AI disclosure

- [Architecture and source verification](docs/architecture.md)
- [AI prompt appendix and correction audit](docs/ai-prompts.md)
- [QA checklist and current evidence](docs/qa-checklist.md)
- [Six-minute recording guide](docs/video-guide.md)

ChatGPT generated setup guidance, the original static page/CSS, and most of the final prototype implementation and documentation. Assistance was substantial. The student must review the code, conduct the live QA demonstration, and explain the trade-offs in their own words. Source-level checks performed by the assistant are distinguished from checks the student still needs to perform.

## Submission checklist

- Confirm the live URL loads.
- Review the official sources and code.
- Perform the live-site QA checks in Chrome and Firefox.
- Record a 5–7 minute screen-and-webcam video.
- Upload the recording and submit the website, repository, and video URLs in the LMS.
