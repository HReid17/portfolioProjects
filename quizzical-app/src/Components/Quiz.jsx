import { fetchTriviaQuestions } from "../Services/api"
import { useState, useEffect, useRef } from "react"
import "../Quiz.css"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submittedAnswers, setSubmittedAnswers] = useState(false)
  const [score, setScore] = useState(0)

  async function loadQuestions() {
    setLoading(true)
    try {
      const data = await fetchTriviaQuestions()
      const formatted = data.map(q => {
        const allAnswers = [...q.incorrect_answers]
        const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1))
        allAnswers.splice(randomIndex, 0, q.correct_answer)
        return {
          ...q,
          allAnswers
        }
      })
      setQuestions(formatted)
    } catch (error) {
      console.error('Could not load questions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  function chooseAnswer(questionIndex, answer) {
    if (submittedAnswers) return

    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answer
    }))
  }

  function checkAnswers() {
    let count = 0

    questions.forEach((question, index) => {
      const selected = selectedAnswers[index]
      if (selected === question.correct_answer) {
        count += 1
      }
    })

    setScore(count)
    setSubmittedAnswers(true)
  }

  function restartQuiz() {
    setSelectedAnswers({})
    setSubmittedAnswers(false)
    setScore(0)
    loadQuestions()
  }

  if (loading || !questions || questions.length === 0) {
    return <p>Questions are loading...</p>
  }

  return (
    <section className="quiz-page">
      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <h1 className="question" dangerouslySetInnerHTML={{ __html: q.question }} />
          <div className="answers-container">
            {q.allAnswers.map((a, i) => (
              <button
                onClick={() => chooseAnswer(index, a)}
                key={i}
                className={`answer
                  ${selectedAnswers[index] === a ? "selected" : ""}
                  ${submittedAnswers && a === q.correct_answer ? "correct" : ""}
                  ${submittedAnswers && selectedAnswers[index] === a && a !== q.correct_answer ? "incorrect" : ""}
                `}
                dangerouslySetInnerHTML={{ __html: a }}
              />
            ))}
          </div>
        </div>
      ))}

      {!submittedAnswers ? (
        <button onClick={checkAnswers} className="check-btn">Check Answers</button>
      ) : (
        <div className="score-container">
          <p className="score">You scored {score}/5 correct answers</p>
          <button onClick={restartQuiz} className="check-btn">Play Again</button>
        </div>
      )}
    </section>
  )
}