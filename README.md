# The Archives

The Archives is my movie-and-TV discussion proof of concept, accompanied by an architecture study of [Discourse](https://github.com/discourse/discourse).

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

Live website:
https://elenimulu789.github.io/The-Archives/

I confirmed that the deployed website opens. Detailed functional and cross-browser results are tracked separately in the QA checklist.

After future source changes, run `npm run build`, copy the contents of `dist/` into `docs/` without deleting the Markdown documentation, and commit the updated source and static output. The relative Vite base supports the repository subpath. No client-side URL routing is used.

## Architectural analysis and AI disclosure

- [Architecture and source verification](docs/architecture.md)
- [AI prompt appendix and correction audit](docs/ai-prompts.md)
- [QA checklist and current evidence](docs/qa-checklist.md)
- [Six-minute recording guide](docs/video-guide.md)

I used ChatGPT for setup guidance, architecture research, generating the initial and functional prototype code, styling, and documentation. The prompt appendix records sample prompts, initial output, and corrections. Build and lint results from the AI-assisted development environment are listed separately from manual browser testing.
## My final submission checklist

- Confirm the live URL loads.
- Review the official sources and code.
- Perform the live-site QA checks in Chrome and Firefox.
- Record a 5–7 minute screen-and-webcam video.
- Upload the recording and submit the website, repository, and video URLs in the LMS.
