import './App.css'
import Quiz from './Components/Quiz'
import { useState } from 'react'

export default function Quizzical() {

  const [page, setPage] = useState('intro')

  function startQuiz() {
    setPage('quiz')
  }

  return (
    <main>
      {page === 'intro' && (
        <section className='intro-page'>
          <h1>Quizzical</h1>
          <p>Press start to test your knowledge!</p>
          <button onClick={startQuiz}>Start quiz</button>
        </section>
      )}

      {page === 'quiz' && (
        <Quiz />
      )}
    </main>
  )
}