function MobileHeader({ onMenuClick }) {
  return (
    <div className="mobile-header">
      <div className="mobile-header__left">
        <div className="mobile-header__avatar">KK</div>
        <span className="mobile-header__name">Kunal Kishore</span>
      </div>
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  )
}

export default MobileHeader
