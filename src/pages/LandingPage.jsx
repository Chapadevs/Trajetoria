import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import TemplatesSection from '../components/TemplatesSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TemplatesSection />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage

