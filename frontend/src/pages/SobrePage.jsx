import React from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../components/layout/SiteHeader'
import SiteFooter from '../components/layout/SiteFooter'
import heroBg from '../assets/capa site.jpg'

const SobrePage = () => {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light text-slate-800 dark:bg-background-dark dark:text-slate-200">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt="Trajetória - caminhos em perspectiva"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#6152BD]/80 mix-blend-multiply" />
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6 py-24 sm:px-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white">
              <span className="material-symbols-outlined text-base">explore</span>
              {t('about.badge')}
            </span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              {t('about.titleLine1')} <br /> {t('about.titleLine2')}
            </h1>
            <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
              {t('about.intro')}
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              {t('about.p1')}
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              {t('about.p2')}
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              {t('about.p3')}
            </p>
            <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-white/90 backdrop-blur-md sm:max-w-xl">
              <span className="material-symbols-outlined text-3xl text-secondary">auto_awesome</span>
              <p className="text-base sm:text-lg">
                {t('about.callout')}
              </p>
            </div>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              {t('about.lastLine')}
            </p>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
            <div className="flex items-center gap-3 text-secondary">
              <span className="material-symbols-outlined text-3xl">lightbulb</span>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('about.sectionTitle')}</h2>
            </div>

            <article className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              <p>
                {t('about.sectionIntroTitle')}
              </p>
              <p>
                {t('about.sectionP1')}
              </p>
              <p>
                {t('about.sectionP2')}
              </p>
              <p>
                {t('about.sectionP3')}
              </p>
              <p>
                {t('about.sectionP4')}
              </p>
              <p>
                {t('about.sectionP5')}
              </p>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default SobrePage






