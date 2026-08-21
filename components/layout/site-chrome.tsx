import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CompareBar } from "@/components/compare/compare-bar"
import { AiAssistant } from "@/components/assistant/ai-assistant"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CompareBar />
      <AiAssistant />
    </div>
  )
}
