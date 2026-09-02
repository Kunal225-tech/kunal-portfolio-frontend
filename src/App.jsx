import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import Welcome from './components/Welcome'
import Suggestions from './components/Suggestions'
import ChatArea from './components/ChatArea'
import InputBar from './components/InputBar'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = useCallback(async (question) => {
    if (!question.trim() || isStreaming) return

    setMessages(prev => [...prev, { role: 'user', content: question.trim() }])

    const aiId = Date.now()
    setMessages(prev => [...prev, { role: 'ai', content: '', id: aiId, streaming: true }])
    setIsStreaming(true)

    try {
      const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
      const res = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      })

      if (!res.ok) throw new Error(res.status)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages(prev =>
          prev.map(m => m.id === aiId ? { ...m, content: m.content + text } : m)
        )
      }

      setMessages(prev =>
        prev.map(m => m.id === aiId ? { ...m, streaming: false } : m)
      )
    } catch {
      setMessages(prev =>
        prev.map(m => m.id === aiId
          ? { ...m, content: 'Could not connect to the server.', streaming: false }
          : m
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }, [isStreaming])

  const newChat = () => {
    if (!isStreaming) setMessages([])
  }

  const hasMessages = messages.length > 0

  return (
    <div className="app">
      <Sidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        onNewChat={newChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <div className="sidebar-overlay sidebar-overlay--open" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="main">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        {!hasMessages && (
          <>
            <Welcome />
            <Suggestions onSelect={sendMessage} />
          </>
        )}
        <ChatArea ref={chatRef} messages={messages} hasMessages={hasMessages} />
        <InputBar onSend={sendMessage} disabled={isStreaming} />
      </div>
    </div>
  )
}

export default App
