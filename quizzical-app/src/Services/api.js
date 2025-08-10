// API Request to Trivia Database

export async function fetchTriviaQuestions() {
    const url = 'https://opentdb.com/api.php?amount=5&difficulty=easy'

    try {
        const response = await fetch(url)
        const data = await response.json()

        console.log('Full API response:', data)
        console.log('Questions:', data.results)

        return data.results

    } catch (error) {
        console.log('Error fetching quiz questions:', error)
        throw error
    }
}