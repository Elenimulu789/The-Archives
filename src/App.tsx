import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

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