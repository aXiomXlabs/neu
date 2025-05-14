import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"

// Erstellen Sie die Internationalisierungs-Middleware
const intlMiddleware = createMiddleware({
  // Eine Liste der unterstützten Sprachen
  locales: ["en", "de"],

  // Standardsprache, wenn keine übereinstimmende Sprache gefunden wird
  defaultLocale: "en",
})

// Kombiniere die bestehende Middleware mit der i18n-Middleware
export function middleware(request: NextRequest) {
  // Schütze den Admin-Bereich (bestehende Logik)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const basicAuth = request.headers.get("authorization")

    if (!basicAuth || !basicAuth.startsWith("Basic ")) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Rust Rocket Admin"',
        },
      })
    }

    return NextResponse.next()
  }

  // Führe die i18n-Middleware für alle anderen Routen aus
  return intlMiddleware(request)
}

// Matcher für beides: intl-Pfade und Admin-Bereich
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
