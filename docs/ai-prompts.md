# AI disclosure, prompt appendix, and corrections

## Tool and extent

ChatGPT provided project guidance and generated most of the prototype code, styling, and documentation. The student executed the Windows setup steps and confirmed the initial interface locally. The assistant later inspected the uploaded repository, replaced the static interface with functional code, and performed the checks documented in qa-checklist.md. Do not present assistant checks as tests personally performed by the student.

## Selected exact user prompts

These are actual prompts from the conversation, not reconstructed detailed prompts. The short prompts depended on the surrounding conversation.

1. `tell me step by step how to start this assignment`
2. `ok it's open`
3. `ok nice i see it now`
4. `can you just give me stuff to copy and paste thanks`
5. `ok next step`
6. `ok lets finish up the minimum atleast`

The original assignment text was also supplied in full. It requested an existing-system analysis, AI-assisted prototype, verification, deployment, README, and a 5–7 minute video with live QA and webcam.

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

The initial architecture draft identified Ember, Rails, PostgreSQL, Redis, Sidekiq, and Nginx, and classified the backend as monolithic with a separate browser frontend. It explicitly left detailed post routes and jobs unverified. The official README and INSTALL guide were checked by the assistant. Classification is an inference, while documented component names/roles are source-supported.

| Finding | Evidence | Correction or qualification |
|---|---|---|
| Uploaded starter retained unused imports for a hook, images, and App.css | Original src/App.tsx at commit cdab03c8e40d2edf56f8555db22a01b5aa868aac | Replaced with only the imports actually used; final build/lint checked separately |
| Static cards do not demonstrate a functioning discussion subsystem | Original generated App.tsx above | Added posting, replies, filters, search, validation, and persistence |
| Redis must not be described as the main permanent discussion database | README identifies PostgreSQL as main store; Redis as cache/transient data | Kept their responsibilities distinct; this is a verified distinction, not an invented hallucination |
| Official Ruby minimums differ | README: 3.4+; INSTALL: 3.2+ | Avoided an unsupported universal version claim; no Discourse installation attempted |
| Browser storage is not a shared community database | Prototype saves directly to localStorage | Added visible scope notice and documented no multi-user synchronization |

## Final generated output and customizations

The response to prompt 6 produced the functional implementation now in src/App.tsx and src/index.css, deployment-ready output in docs/, README documentation, and a recording guide. The initial and final implementations can be compared using Git history.

The code adds whitespace-only validation, input length limits, browser storage error feedback, malformed saved-data handling, accessible labels, visible focus styling, responsive cards, an architecture overview, and an honest storage limitation notice.

## Record limitations

This appendix includes selected exact prompts, the complete initial App.tsx, an architecture-output summary, and the correction record. It is not a full export of every conversational message. The full project conversation can be appended before submission if the instructor requires a complete transcript. Do not label paraphrases as exact prompts or summaries as verbatim output.
