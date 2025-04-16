import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-white/60">&copy; {currentYear} - ALL RIGHTS RESERVED</p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
              TERMS & CONDITIONS
            </Link>
            <a href="mailto:HELLO@WEAREVERNON.COM" className="text-sm text-white/60 hover:text-white transition-colors">
              HELLO@WEAREVERNON.COM
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
