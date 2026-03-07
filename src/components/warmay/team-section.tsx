import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const team = [
  {
    name: 'Dr. Maria Quispe',
    role: 'Directora Medica',
    bio: 'Obstetra con 15 anos de experiencia en salud materna rural. Ex-asesora del Ministerio de Salud.',
    avatar: 'MQ',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Carlos Mamani',
    role: 'CTO & Blockchain Lead',
    bio: 'Ingeniero de software especializado en Web3. Ex-Chainlink Labs y contribuidor de protocolos DeFi.',
    avatar: 'CM',
    social: { github: '#', linkedin: '#' }
  },
  {
    name: 'Ana Gutierrez',
    role: 'Product Manager',
    bio: 'Especialista en productos de salud digital. Lider de proyectos de impacto social en LATAM.',
    avatar: 'AG',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Roberto Flores',
    role: 'AI Engineer',
    bio: 'PhD en NLP multilingue. Investigador en modelos de lenguaje para idiomas indigenas.',
    avatar: 'RF',
    social: { github: '#', linkedin: '#' }
  },
]

const advisors = [
  { name: 'Dr. Juan Perez', role: 'Asesor Medico', org: 'OPS/OMS' },
  { name: 'Sofia Torres', role: 'Asesora Legal', org: 'Baker McKenzie' },
  { name: 'Miguel Arana', role: 'Asesor Blockchain', org: 'Ex-Chainlink' },
]

export function TeamSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-full inline-block">
            El Equipo
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Quienes <span className="text-primary">Somos</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Un equipo multidisciplinario unido por una mision: salvar vidas maternas con tecnologia.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {team.map((member, index) => (
            <div key={index} className="bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-2xl p-5 text-center hover:border-primary/50 transition-colors group">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                {member.avatar}
              </div>
              
              <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
              <div className="text-xs text-primary font-semibold mb-3">{member.role}</div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
              
              {/* Social Links */}
              <div className="flex items-center justify-center gap-2">
                {member.social.github && (
                  <a href={member.social.github} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="bg-linear-to-r from-[rgba(39,18,5,0.85)] to-[rgba(26,8,0,0.9)] backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
          <h3 className="font-serif font-bold text-xl text-center mb-6">Asesores</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {advisors.map((advisor, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-[rgba(26,8,0,0.5)] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-secondary to-muted flex items-center justify-center text-sm font-bold text-primary">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{advisor.name}</div>
                  <div className="text-xs text-muted-foreground">{advisor.role}</div>
                  <div className="text-xs text-primary">{advisor.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Quieres ser parte de nuestra mision?</p>
          <a 
            href="mailto:team@warmay.org"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-[#8B3A10] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            Contactanos
          </a>
        </div>
      </div>
    </section>
  )
}
