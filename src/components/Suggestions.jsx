const suggestions = [
  'What are his technical skills?',
  'Tell me about his projects',
  'Educational background',
  'Quick summary',
]

function Suggestions({ onSelect }) {
  return (
    <div className="suggestions" id="suggestions-grid">
      {suggestions.map((text, i) => (
        <button
          key={i}
          className="suggestion-btn"
          id={`suggestion-${i}`}
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export default Suggestions
