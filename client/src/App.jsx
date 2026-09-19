import { useEffect, useState } from 'react'
import './App.css'
import domains from './data/domains'

function App() {
  const [page, setPage] = useState('login')
  const [previousPage, setPreviousPage] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [backendStatus, setBackendStatus] = useState('Checking backend connection...')

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('/api')
        const data = await response.json()
        setBackendStatus(data.message || 'Backend connected')
      } catch (error) {
        setBackendStatus('Backend not connected yet')
      }
    }

    checkBackend()
  }, [])

  const domainInfo = domains.find(
    (domain) => domain.name === selectedDomain
  )

  const goToPage = (newPage) => {
    setPreviousPage(page)
    setPage(newPage)
  }

  const goHome = () => {
    setPage('landing')
    setPreviousPage('')
  }

  const goBack = () => {
    if (previousPage) {
      setPage(previousPage)
      setPreviousPage('')
    } else {
      setPage('landing')
    }
  }

  const selectDomain = (domainName) => {
    setSelectedDomain(domainName)
    setSelectedSkills([])
    goToPage('overview')
  }

  const selectSkill = (skill) => {
    if (selectedSkills.includes('None of the above')) {
      return
    }

    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([
        ...selectedSkills,
        skill
      ])
    }
  }

  const selectNone = () => {
    setSelectedSkills(['None of the above'])
  }

  const handleLogin = () => {
    if (!email || !password) {
      setLoginMessage(
        'Please enter your email and password.'
      )
      return
    }

    setLoginMessage('')
    goToPage('landing')
  }

  return (
    <div className="app">

      {page !== 'login' && (
        <nav className="topbar">

          <div
            className="logo"
            onClick={goHome}
          >
            AAROHA
          </div>

          <div className="nav-actions">

            {page !== 'landing' && (
              <button
                className="nav-button"
                onClick={goBack}
              >
                ← Back
              </button>
            )}

            <button
              className="nav-button home"
              onClick={goHome}
            >
              Home
            </button>

          </div>

        </nav>
      )}

      {/* LOGIN PAGE */}

      {page === 'login' && (
        <section className="login">

          <div className="login-box">

            <div className="login-logo">
              AAROHA
            </div>

            <div className="login-tagline">
              Learn • Grow • Become
            </div>

            <p>
              Your personalized learning journey starts here.
            </p>

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

            <button onClick={handleLogin}>
              Login →
            </button>

            <p className="login-message">
              {backendStatus}
            </p>

            {loginMessage && (
              <p className="login-message">
                {loginMessage}
              </p>
            )}

          </div>

        </section>
      )}

      {/* LANDING PAGE */}

      {page === 'landing' && (
        <section className="landing">

          <div className="landing-content">

            <h1>AAROHA</h1>

            <h2>
              Your Personalized Learning Journey
            </h2>

            <p>
              Discover what you want to become,
              understand your skills, and build a
              personalized path forward.
            </p>

            <button
              onClick={() => goToPage('profile')}
            >
              Start Your Journey →
            </button>

          </div>

        </section>
      )}

      {/* PROFILE PAGE */}

      {page === 'profile' && (
        <section className="profile">

          <h1>
            Do you know what you want to become?
          </h1>

          <p>
            Tell us what you already have in mind
            so we can guide your learning journey.
          </p>

          <div className="profile-buttons">

            <button
              onClick={() => goToPage('domains')}
            >
              Yes, I know
            </button>

            <button
              onClick={() => goToPage('domains')}
            >
              No, help me explore
            </button>

          </div>

        </section>
      )}

      {/* DOMAIN SELECTION */}

      {page === 'domains' && (
        <section className="domains">

          <h1>
            Choose Your Domain
          </h1>

          <p>
            Select the area you want to explore
            and build your skills in.
          </p>

          <div className="domain-list">

            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => selectDomain(domain.name)}
              >

                <h2>
                  {domain.name}
                </h2>

                <span>
                  {domain.description}
                </span>

              </button>
            ))}

          </div>

        </section>
      )}

      {/* DOMAIN OVERVIEW */}

      {page === 'overview' && domainInfo && (
        <section className="overview">

          <h1>
            {domainInfo.name}
          </h1>

          <p>
            {domainInfo.description}
          </p>

          <div className="overview-section">

            <h2>
              Career Opportunities
            </h2>

            <ul>

              {domainInfo.opportunities.map(
                (opportunity) => (
                  <li key={opportunity}>
                    {opportunity}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="overview-section">

            <h2>
              Required Skills
            </h2>

            <ul>

              {domainInfo.skills.map(
                (skill) => (
                  <li key={skill}>
                    {skill}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="overview-section">

            <h2>
              Career Path
            </h2>

            <ol>

              {domainInfo.careerPath.map(
                (step) => (
                  <li key={step}>
                    {step}
                  </li>
                )
              )}

            </ol>

          </div>

          <button
            onClick={() => goToPage('skills')}
          >
            Choose This Domain →
          </button>

        </section>
      )}

      {/* SKILLS PAGE */}

      {page === 'skills' && domainInfo && (
        <section className="skills">

          <h1>
            What skills do you already know?
          </h1>

          <p>
            Select the skills you are familiar with
            in {domainInfo.name}.
          </p>

          <div className="skill-list">

            {domainInfo.skills.map((skill) => (
              <button
                key={skill}
                className={
                  selectedSkills.includes(skill)
                    ? 'selected-skill'
                    : ''
                }
                onClick={() => selectSkill(skill)}
              >
                {skill}
              </button>
            ))}

            <button
              className={
                selectedSkills.includes(
                  'None of the above'
                )
                  ? 'selected-skill'
                  : ''
              }
              onClick={selectNone}
            >
              None of the above
            </button>

          </div>

          <p>
            Selected skills:{' '}

            {selectedSkills.length > 0
              ? selectedSkills.join(', ')
              : 'None selected'}
          </p>

          <button
            onClick={() => goToPage('assessment')}
          >
            Continue →
          </button>

        </section>
      )}

      {/* ASSESSMENT PLACEHOLDER */}

      {page === 'assessment' && domainInfo && (
        <section className="skills">

          <h1>
            {domainInfo.name} Assessment
          </h1>

          <p>
            Your personalized assessment will
            appear here.
          </p>

          <p>
            Selected skills:{' '}

            {selectedSkills.length > 0
              ? selectedSkills.join(', ')
              : 'None selected'}
          </p>

          <p>
            Assessment module coming soon 🚀
          </p>

        </section>
      )}

    </div>
  )
}

export default App