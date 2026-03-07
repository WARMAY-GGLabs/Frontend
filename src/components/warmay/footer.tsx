import { Flower2, Github, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-5 md:px-7">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-destructive flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-serif font-black text-lg text-foreground">WARMAY</div>
              <div className="text-xs text-muted-foreground">Hackathon Web3 Bolivia 2024</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <TechBadge name="Chainlink" />
            <TechBadge name="World ID" />
            <TechBadge name="Claude AI" />
            <TechBadge name="Ethereum" />
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="p-2.5 rounded-lg bg-secondary border border-border hover:border-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-lg bg-secondary border border-border hover:border-primary transition-colors"
              aria-label="Demo Video"
            >
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Desarrollado con amor para las madres bolivianas - WARMAY 2024
          </p>
        </div>
      </div>
    </footer>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground">
      {name}
    </div>
  )
}
