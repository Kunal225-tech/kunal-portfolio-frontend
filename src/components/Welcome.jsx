function Welcome() {
  return (
    <div className="welcome" id="welcome-section">
      <div className="welcome__logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h1 className="welcome__title">Ask me anything</h1>
      <p className="welcome__desc">
        Learn about Kunal's skills, projects, education, achievements, and more.
      </p>
    </div>
  )
}

export default Welcome
