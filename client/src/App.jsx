import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('landing')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loginMessage, setLoginMessage] = useState('')
  return (
  <div className="app">
    {page === 'landing' && (
      <section className="landing">
        <h1>AAROHA</h1>

        <h2>Your Personalized Learning Journey</h2>

        <p>
          Discover what you want to become, understand your skills,
          and build your path forward.
        </p>

        <button onClick={() => setPage('login')}>
          Get Started
        </button>
      </section>
    )}
    {page === 'login' && (
  <section className="login">
    <h1>Welcome Back</h1>

    <p>Login to continue your learning journey.</p>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

   <button
  onClick={() => {
    if (!email || !password) {
      setLoginMessage('Please enter your email and password.')
      return
    }

    setPage('profile')
  }}
>
  Login
</button>

    {loginMessage && <p>{loginMessage}</p>}
  </section>
)}
    {page === 'profile' && (
  <section className="profile">
    <h1>Do you know what you want to become?</h1>

    <p>
      Choose an option so we can guide your learning journey.
    </p>

    <div className="profile-buttons">
      <button onClick={() => setPage('domains')}>
        Yes
      </button>

      <button onClick={() => setPage('domains')}>
        No
      </button>
    </div>
  </section>
)}
 {page === 'domains' && (
  <section className="domains">
    <h1>Choose Your Domain</h1>

    <p>
      Select the area you want to explore and build your skills in.
    </p>

    <div className="domain-list">
      <button
        onClick={() => {
          setSelectedDomain('Web Development')
          setPage('overview')
        }}
      >
      Web Development
      </button>
      <button
        onClick={() => {
          setSelectedDomain('Data Science')
          setPage('overview')
        }}
      >
        Data Science
      </button>
      <button
        onClick={() => {
          setSelectedDomain('Cybersecurity')
          setPage('overview')
        }}
      >
        Cybersecurity
      </button>
      <button
        onClick={() => {
          setSelectedDomain('UI/UX Design')
          setPage('overview')
        }}
      >
        UI/UX Design
      </button>
    </div>
  </section>
 )}
 {page === 'overview' && (
  <section className="overview">
    <h1>{selectedDomain}</h1>

    <p>
      Learn about this domain, the skills required, and possible career paths.
    </p>

    <button>Choose This Domain</button>
  </section>
)}
  </div>
)
}

export default App