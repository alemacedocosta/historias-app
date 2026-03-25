import Link from "next/link";
import { BookOpen, Clock, Lock, Search, Users, ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="text-xl font-bold">Histórias</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-base text-muted-foreground hover:text-foreground transition-colors">
            Entrar
          </Link>
          <Link
            href="/login"
            className="h-[48px] px-6 bg-foreground text-background text-base font-bold inline-flex items-center hover:bg-foreground/90 transition-colors"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
          Guarde as histórias que<br />fazem quem você é.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Um espaço permanente para registrar, organizar e redescobrir as memórias da sua
          família — por texto, imagem e ano do acontecimento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="h-[72px] px-10 bg-foreground text-background text-lg font-bold inline-flex items-center gap-3 hover:bg-foreground/90 transition-colors justify-center"
          >
            Começar gratuitamente
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="self-center text-muted-foreground text-base">
            14 dias grátis. Sem cartão de crédito.
          </p>
        </div>
      </section>

      {/* Visual divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">
          Tudo que a sua família precisa para nunca esquecer
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          {[
             {
              icon: Clock,
              title: "Linha do Tempo da Família",
              desc: "Timeline vertical organizada pelo ANO do acontecimento — não pela data de postagem. Role para baixo e viaje pelo passado da família.",
            },
            {
              icon: BookOpen,
              title: "Memórias que ficam para sempre",
              desc: "Registre histórias com título, texto e foto. Cada memória fica ancorada ao seu ano — nunca se perde, não importa quantas vezes o celular for trocado.",
            },
            {
              icon: Lock,
              title: "Espaço Familiar Privado",
              desc: "Crie um espaço exclusivo para a sua família e convide todo mundo pelo WhatsApp. Acesso por link — sem app para baixar.",
            },
            {
              icon: Search,
              title: "Busca que funciona",
              desc: "Encontre qualquer memória por nome de pessoa, ano ou período. O oposto do WhatsApp.",
            },
            {
              icon: Users,
              title: "Feito para todas as idades",
              desc: "Letras grandes, alto contraste, poucos passos por tela. Qualquer pessoa usa — mesmo quem nunca usou outro app além do WhatsApp.",
            },
            {
              icon: ArrowRight,
              title: "Exportação em PDF",
              desc: "Exporte a timeline completa da família como um livro digital em PDF — um registro permanente para guardar para sempre.",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} class="border border-border p-8 bg-card">
                <div class="w-12 h-12 bg-secondary flex items-center justify-center mb-4">
                  <Icon class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold mb-2">{f.title}</h3>
                <p class="text-muted-foreground text-base leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
          </div>
      </section>

      {/* Visual divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Pricing */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Um preço simples e justo</h2>
        <p className="text-muted-foreground text-lg mb-12">
          Uma única assinatura. Espaços ilimitados. Memórias ilimitadas.
        </p>

        <div class="border-2 border-foreground p-10">
          <div class="flex items-baseline gap-2 justify-center mb-2">
            <span class="text-5xl font-bold">R$ 19,90</span>
            <span class="text-muted-foreground text-xl">/mês</span>
          </div>
          <p class="text-muted-foreground mb-8">ou R$ 179/ano 〔 ~25% de desconto</p>
          <ul class="space-y-3 text-left mb-10">
            {
[ "Espaços familiares ilimitados","Membros ilimitados por espaço","Memorias ilimitadas","5 GB de fotos por espaço","Exportação em PDF","Moderação de membros","14 dias grátis para experimentar",].map((item) => (
              <li key={item} class="flex items-center gap-3 text-base">
                <Check class="w-5 h-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            class="block w-full h-[72px] bg-foreground text-background text-lg font-bold inline-flex items-center justify-center hover:bg-foreground/90 transition-colors"
          >
            Começar 14 dias grátis
          </Link>
          <p class="text-sm text-muted-foreground mt-4">
            Sem cartão de crédito. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t border-border">
        <div class="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <BookOpen class="w-4 h-4" />
            <span class="font-semibold text-foreground">Histórias</span>
            <span>— O livro vivo da sua família.</span>
          </div>
          <div class="flex gap-6">
            <Link href="/privacidade" class="hover:text-foreground transition-colors">Privacidade</Link>
            <Link href="/termos" class="hover:text-foreground transition-colors">Termos</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
