import React from 'react'
import SiteHeader from '../components/layout/SiteHeader'
import SiteFooter from '../components/layout/SiteFooter'
import heroBg from '../assets/capa site.jpg'

const SobrePage = () => {
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
              Sobre a Trajetória
            </span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Descubra o seu caminho. <br /> Construa a sua trajetória.
            </h1>
            <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
              Mais do que uma plataforma, um espaço de descoberta.
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              A Trajetória conecta autoconhecimento, tecnologia e design para ajudar jovens a
              encontrarem propósito, direção e confiança em meio às mudanças do mundo contemporâneo.
              Por meio de testes de personalidade, trilhas de aprendizado e relatórios
              personalizados, você compreende suas forças, valores e habilidades — passo a passo.
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              Entenda quem você é e onde quer chegar. O site é composto por ferramentas baseadas em
              metodologias reconhecidas que ajudam a mapear seus potenciais e alinhar suas escolhas
              com seu propósito.
            </p>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              Cada jornada é única. A sua começa aqui. Receba um relatório visual e completo sobre
              sua personalidade, estilo de aprendizado e áreas de afinidade profissional. Transforme
              informações em direção.
            </p>
            <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-white/90 backdrop-blur-md sm:max-w-xl">
              <span className="material-symbols-outlined text-3xl text-secondary">auto_awesome</span>
              <p className="text-base sm:text-lg">
                Acreditamos no poder do autoconhecimento como semente do futuro. Cada jovem carrega
                dentro de si uma energia única — o éther, sua força vital. A Trajetória existe para
                nutrir essa energia e guiá-la rumo ao seu propósito de vida e carreira.
              </p>
            </div>
            <p className="max-w-3xl text-base text-white/80 sm:text-lg">
              O próximo passo é seu.
            </p>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
            <div className="flex items-center gap-3 text-secondary">
              <span className="material-symbols-outlined text-3xl">lightbulb</span>
              <h2 className="text-2xl font-bold sm:text-3xl">Sobre o Projeto</h2>
            </div>

            <article className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
              <p>
                Sobre o Projeto Trajetória
              </p>
              <p>
                O projeto Trajetória nasce da necessidade de repensar o modo como jovens constroem
                seus caminhos pessoais e profissionais em um mundo em constante transformação. Em um
                cenário marcado pela ansiedade, pela pressão social e pela velocidade das mudanças
                tecnológicas, muitos estudantes chegam ao fim da educação básica sem clareza sobre
                seus talentos, habilidades ou possibilidades de futuro.
              </p>
              <p>
                A escola, ainda pautada em um modelo tradicional herdado da Revolução Industrial,
                mantém uma estrutura que valoriza a repetição e o desempenho técnico, mas pouco
                estimula o autoconhecimento, a criatividade e o pensamento crítico. Nesse contexto, a
                orientação profissional se torna limitada, tratando escolhas de carreira como
                decisões isoladas, e não como parte de um processo de descoberta humana e emocional.
              </p>
              <p>
                A Trajetória surge como uma resposta a esse desafio: uma plataforma digital
                desenvolvida no curso de Design Visual da Universidade Positivo, que integra
                psicologia, design estratégico e tecnologia para promover o autoconhecimento e a
                reflexão profissional. Por meio de experiências visuais, interativas e acessíveis, a
                ferramenta convida o jovem a compreender que o ser humano é formado por múltiplas
                inteligências, habilidades e potências — e que nenhuma trajetória é linear.
              </p>
              <p>
                A plataforma utiliza testes reconhecidos, como Múltiplas Inteligências de Gardner,
                DISC, RIASEC e Arquétipos de Jung, para ajudar o usuário a mapear suas forças,
                compreender seus comportamentos e visualizar caminhos possíveis de crescimento
                pessoal e profissional.
              </p>
              <p>
                Mais do que indicar profissões, o projeto busca reconectar o indivíduo com seu
                propósito, despertando o sentimento de pertencimento e autonomia diante das
                incertezas do futuro. Assim, a Trajetória se consolida como uma bússola
                contemporânea, que orienta, inspira e guia o jovem em direção a uma vida mais
                consciente, equilibrada e significativa — onde aprender, trabalhar e viver voltam a
                caminhar lado a lado.
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






