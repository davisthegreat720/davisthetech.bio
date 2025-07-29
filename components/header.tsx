import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono mb-2">Danielle Davis</h1>
          <p className="text-base sm:text-lg text-blue-600 font-medium font-mono mb-4">
            Creator of Effortless IT Experiences
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-4 text-sm text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a href="mailto:davis072087@gmail.com" className="hover:text-blue-600 transition-colors break-all">
                davis072087@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a href="tel:214.603.4714" className="hover:text-blue-600 transition-colors">
                214.603.4714
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>Dallas, TX USA</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              <a
                href="https://www.linkedin.com/in/davisthetech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
