import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Danielle Davis</h1>
            <p className="text-lg text-blue-600 font-medium">Creator of Effortless IT Experiences</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:davis072087@gmail.com" className="hover:text-blue-600 transition-colors">
                davis072087@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:214.603.4714" className="hover:text-blue-600 transition-colors">
                214.603.4714
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Dallas, TX USA</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
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
