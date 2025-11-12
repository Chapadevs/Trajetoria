import React from 'react'
import SiteHeader from '../components/layout/SiteHeader'
import HeroIntroSection from '../components/sections/Hero/HeroIntroSection'
import AssessmentJourneySection from '../components/sections/AssessmentJourney/AssessmentJourneySection'
import ReportDownloadSection from '../components/sections/ReportDownload/ReportDownloadSection'
import SiteFooter from '../components/layout/SiteFooter'

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <SiteHeader />
      <main className="flex-1">
        <HeroIntroSection />
        <AssessmentJourneySection />
        <ReportDownloadSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default LandingPage

