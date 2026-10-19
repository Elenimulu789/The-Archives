import { useState } from 'react'
import type { FormEvent } from 'react'

type Reply = { id: string; body: string }
type Topic = { id: string; title: string; category: string; body: string; replies: Reply[] }
const KEY = 'the-archives-discussions-v1'
const samples: Topic[] = [
  { id: 'movie', title: 'What movie could you watch over and over?', category: 'Movies', body: 'Share your favorite comfort movie and tell us why.', replies: [] },
  { id: 'show', title: 'What show are you watching right now?', category: 'Shows', body: 'What deserves a spot on our watchlist? Keep replies spoiler-free!', replies: [] },
]
function load(): { topics: Topic[]; warning: string } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === null) return { topics: samples, warning: '' }
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data) || !data.every(t => t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.body === 'string' && ['Movies', 'Shows'].includes(t.category) && Array.isArray(t.replies) && t.replies.every((r: { id?: unknown; body?: unknown } | null) => r && typeof r.id === 'string' && typeof r.body === 'string'))) throw new Error('Invalid storage')
    return { topics: data, warning: '' }
  } catch {
    return { topics: samples, warning: 'Saved data could not be loaded. Sample discussions are shown. Posting will attempt to save a new local copy.' }
  }
}
function App() {
  const [initial] = useState(load)
  const [topics, setTopics] = useState(initial.topics)
  const [notice, setNotice] = useState(initial.warning)
  const [page, setPage] = useState('community')
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Movies')
  const [body, setBody] = useState('')
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')
  const active = topics.find(t => t.id === selected)
  const visible = topics.filter(t => (filter === 'All' || t.category === filter) && `${t.title} ${t.body}`.toLowerCase().includes(search.trim().toLowerCase()))
  function save(next: Topic[], message: string) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
      setTopics(next); setNotice(message); setError('')
      return true
    } catch {
      setError('Could not save. Browser storage may be blocked or full. Your input is still here; please try again.')
      return false
    }
  }
  function post(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !body.trim()) { setError('Enter a title and message. Spaces alone are not accepted.'); return }
    if (title.trim().length > 120 || body.trim().length > 2000) { setError('Use at most 120 characters for the title and 2,000 for the message.'); return }
    const topic: Topic = { id: crypto.randomUUID(), title: title.trim(), category, body: body.trim(), replies: [] }
    if (save([topic, ...topics], 'Discussion saved in this browser.')) { setTitle(''); setBody(''); setSearch(''); setFilter('All') }
  }
  function addReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!active) return
    if (!reply.trim() || reply.trim().length > 1000) { setError('Enter a reply of 1–1,000 characters. Spaces alone are not accepted.'); return }
    const next = topics.map(t => t.id === active.id ? { ...t, replies: [...t.replies, { id: crypto.randomUUID(), body: reply.trim() }] } : t)
    if (save(next, 'Reply saved in this browser.')) setReply('')
  }
  return <main>
    <header><p className="eyebrow">MOVIES · SHOWS · CONVERSATION</p><h1>The Archives</h1><p>Your next favorite conversation starts here.</p></header>
    <nav aria-label="Main navigation">
      <button aria-pressed={page === 'community'} onClick={() => { setPage('community'); setError('') }}>Community</button>
      <button aria-pressed={page === 'architecture'} onClick={() => { setPage('architecture'); setError('') }}>Architecture & AI audit</button>
    </nav>
    <p className="note">Classroom prototype · Discussions stay in this browser. No accounts, server, or shared community database.</p>
    <p role="status">{notice}</p>
    {error && <p role="alert" className="error">{error}</p>}
    {page === 'architecture' ? <section aria-labelledby="architecture-heading">
      <h2 id="architecture-heading">From Discourse to a focused prototype</h2>
      <article><h3>1. Existing system: Discourse</h3><p>Working classification: a monolithic Rails backend with a browser frontend and supporting services. This is an interpretation of the documented structure. Separate infrastructure processes do not automatically make an application microservices.</p>
        <div className="table-wrap"><table><caption>Discourse component map</caption><thead><tr><th>Component</th><th>Role</th></tr></thead><tbody>
          <tr><td>Ember.js</td><td>Browser interface; calls the Rails API</td></tr><tr><td>Ruby on Rails</td><td>Application API returning JSON</td></tr><tr><td>PostgreSQL</td><td>Main persistent data store</td></tr><tr><td>Redis</td><td>Cache and transient data</td></tr><tr><td>Sidekiq</td><td>Background worker processes</td></tr><tr><td>Nginx</td><td>Web server / reverse proxy in the deployment stack</td></tr>
        </tbody></table></div>
        <p>Boundaries: browser to API over HTTP; server to data services; background workers run separately from web requests. Specific discussion routes and job paths have not been traced.</p>
        <p>Sources: <a href="https://github.com/discourse/discourse/blob/main/README.md">official README, Built With</a> and <a href="https://github.com/discourse/discourse/blob/main/docs/INSTALL.md">installation guide</a>.</p>
      </article>
      <article><h3>2. The Archives: browser-only discussion subsystem</h3><p>React forms pass input to validation handlers. Valid discussions and replies are serialized as JSON into localStorage, then React state updates the interface. On reload, the app checks and restores stored data.</p><p>Trade-off: static hosting needs no database credentials. Data stays in this browser and origin, without authentication or multi-user synchronization. Clearing browser storage removes it.</p></article>
      <article><h3>3. AI verification and customization</h3><p>ChatGPT generated setup instructions, code, and documentation. Official documentation supports the frontend, API, database, and cache roles. The installation guide names Rails, Sidekiq, and Nginx processes. The architectural classification is an interpretation.</p><p>A concrete starter issue: unused imports remained in App.tsx, including a state hook and logo assets. These were removed. Forms, whitespace validation, bounded inputs, replies, search, storage handling, and responsive styles were added.</p><p>Build, lint, and browser results are recorded separately. This screen does not certify that QA has passed.</p></article>
    </section> : active ? <section aria-labelledby="topic-heading">
      <button onClick={() => { setSelected(null); setReply(''); setError('') }}>← All discussions</button>
      <article><span className="badge">{active.category}</span><h2 id="topic-heading">{active.title}</h2><p className="user-text">{active.body}</p></article>
      <h3>Replies ({active.replies.length})</h3>
      {active.replies.length === 0 && <p>No replies yet. Start the conversation.</p>}
      {active.replies.map(r => <article key={r.id}><p className="user-text">{r.body}</p></article>)}
      <form onSubmit={addReply}><label htmlFor="reply">Your reply</label><textarea id="reply" required maxLength={1000} value={reply} onChange={e => setReply(e.target.value)} /><p className="hint">{reply.length}/1,000 characters</p><button type="submit">Post reply</button></form>
    </section> : <>
      <section aria-labelledby="create-heading"><h2 id="create-heading">Start a discussion</h2><form onSubmit={post}>
        <label htmlFor="title">Discussion title</label><input id="title" required maxLength={120} value={title} onChange={e => setTitle(e.target.value)} /><p className="hint">{title.length}/120 characters</p>
        <label htmlFor="category">Category</label><select id="category" value={category} onChange={e => setCategory(e.target.value)}><option>Movies</option><option>Shows</option></select>
        <label htmlFor="body">Message</label><textarea id="body" required maxLength={2000} value={body} onChange={e => setBody(e.target.value)} /><p className="hint">{body.length}/2,000 characters · Please avoid spoilers.</p><button type="submit">Post discussion</button>
      </form></section>
      <section aria-labelledby="discussions-heading"><h2 id="discussions-heading">Recent discussions</h2>
        <div className="filters"><div><label htmlFor="search">Search discussions</label><input id="search" type="search" maxLength={200} value={search} onChange={e => setSearch(e.target.value)} /></div><div><label htmlFor="filter">Filter category</label><select id="filter" value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Movies</option><option>Shows</option></select></div></div>
        <p>{visible.length} discussion{visible.length === 1 ? '' : 's'} found</p>
        {visible.length === 0 && <p>No discussions match. Try another search or category.</p>}
        {visible.map(t => <article key={t.id}><span className="badge">{t.category}</span><h3>{t.title}</h3><p className="user-text">{t.body}</p><button onClick={() => { setSelected(t.id); setError(''); setNotice('') }}>Open discussion ({t.replies.length} replies)<span className="sr-only">: {t.title}</span></button></article>)}
      </section>
    </>}
    <footer>The Archives · Software architecture proof of concept</footer>
  </main>
}
export default App
