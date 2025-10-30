import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AnamneseInicialForm from './pages/AnamneseInicialForm'
import DiscPersonalityTest from './pages/DiscPersonalityTest'
import MultipleIntelligencesTest from './pages/MultipleIntelligencesTest'
import RiasecTest from './pages/RiasecTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forms/anamnese-inicial" element={<AnamneseInicialForm />} />
        <Route path="/forms/disc-personality" element={<DiscPersonalityTest />} />
        <Route path="/forms/multiple-intelligences" element={<MultipleIntelligencesTest />} />
        <Route path="/forms/riasec" element={<RiasecTest />} />
      </Routes>
    </Router>
  )
}

export default App

