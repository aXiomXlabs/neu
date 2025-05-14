import { NextResponse, type NextRequest } from "next/server"

// Unterstützte Sprachen
const supportedLocales = ["en", "de"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  // Schütze den Admin-Bereich
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

  // Behandle Sprachweiterleitung für die Hauptroute
  const pathname = request.nextUrl.pathname

  // Überspringe die Middleware für bestimmte Pfade
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("/images/") ||
    pathname.includes(".") // Statische Dateien wie Bilder, CSS, etc.
  ) {
    return NextResponse.next()
  }

  // Überprüfe, ob der Pfad bereits eine Sprachpräfix hat
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  // Wenn kein Sprachpräfix vorhanden ist und es sich nicht um die Root-Route handelt,
  // leite zur Standardsprache weiter
  if (!pathnameHasLocale && pathname !== "/") {
    // Für die not-found-Seite zur Standardsprache weiterleiten
    if (pathname === "/not-found" || pathname === "/_not-found") {
      return NextResponse.redirect(new URL(`/${defaultLocale}/not-found`, request.url))
    }

    // Für andere Pfade zur entsprechenden Sprachversion weiterleiten
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

// Matcher für die Middleware
export const config = {
  matcher: [
    // Alle Pfade außer statische Dateien und API-Routen
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
}
