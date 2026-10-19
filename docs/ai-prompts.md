# AI disclosure, prompt appendix, and corrections

## How I used AI

I used ChatGPT throughout the project for setup guidance, explanations, architecture research, code generation, styling, and documentation. This included generating the initial static page and the functional discussion-and-reply implementation. I followed the Windows setup instructions, ran the initial site locally, and confirmed that the deployed website opened. Build and lint checks were run through the AI-assisted development environment; my manual browser checks are recorded separately in the QA checklist.

## Selected exact prompts I submitted

These are exact prompts I submitted during the conversation. The short follow-up prompts refer to the project requirements and instructions already discussed.

1. “What edge cases should I check when testing my discussion forms?”
3. “Help me understand how React state and localStorage work in The Archives, especially when someone posts a discussion or replies.”
6. “Review my architecture explanation for technical inaccuracies and point out anything that needs stronger evidence.”

I also supplied the original assignment text in full. It requested an existing-system analysis, AI-assisted prototype, verification, deployment, README, and a 5–7 minute video with live QA and webcam.

## Initial generated code

The initial response to prompt 2 generated the following App.tsx. This is the complete original code output, not the later functional implementation:

```tsx
function App() {
  return (
    <main>
      <h1>The Archives</h1>
      <p>A community for people who love movies and shows.</p>

      <section aria-labelledby="discussions-heading">
        <h2 id="discussions-heading">Recent discussions</h2>

        <article>
          <h3>What movie could you watch over and over?</h3>
          <p>Share your favorite comfort movie and tell us why.</p>
        </article>

        <article>
          <h3>What show are you watching right now?</h3>
          <p>Tell the community what deserves a spot on their watchlist.</p>
        </article>
      </section>
    </main>
  )
}

export default App
```

## Initial architecture output and audit

The initial architecture draft identified Ember, Rails, PostgreSQL, Redis, Sidekiq, and Nginx, and classified the backend as monolithic with a separate browser frontend. It explicitly left detailed post routes and jobs unverified. The AI-assisted research compared these claims with the official README and INSTALL guide. I distinguish the architectural classification, which is an interpretation, from component names and roles directly supported by those sources.

| Finding | Evidence | Correction or qualification |
|---|---|---|
| Uploaded starter retained unused imports for a hook, images, and App.css | Original src/App.tsx at commit cdab03c8e40d2edf56f8555db22a01b5aa868aac | Replaced with only the imports actually used; final build/lint checked separately |
| Static cards do not demonstrate a functioning discussion subsystem | Original generated App.tsx above | Added posting, replies, filters, search, validation, and persistence |
| Redis must not be described as the main permanent discussion database | README identifies PostgreSQL as main store; Redis as cache/transient data | Kept their responsibilities distinct; this is a verified distinction, not an invented hallucination |
| Official Ruby minimums differ | README: 3.4+; INSTALL: 3.2+ | Avoided an unsupported universal version claim; no Discourse installation attempted |
| Browser storage is not a shared community database | Prototype saves directly to localStorage | Added visible scope notice and documented no multi-user synchronization |

## Development from the initial output

I used the follow-up in prompt 6 to expand the static page into a functional proof of concept with ChatGPT's help. The resulting implementation is in src/App.tsx and src/index.css, with the static deployment build in docs/. Git history records the initial and final versions.

The code adds whitespace-only validation, input length limits, browser storage error feedback, malformed saved-data handling, accessible labels, visible focus styling, responsive cards, an architecture overview, and an honest storage limitation notice.

## Appendix scope

I have included selected exact prompts, the complete initial App.tsx output, a summary of the initial architecture response, and the correction record. This appendix is a curated project log rather than a full conversation export. The architecture summary is paraphrased; the prompts and initial code are reproduced as originally provided.
