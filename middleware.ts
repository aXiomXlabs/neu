import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Schütze den Admin-Bereich
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // In einer echten Anwendung würdest du hier eine richtige Authentifizierung implementieren
    // Dies ist nur ein einfaches Beispiel für Testzwecke

    const basicAuth = request.headers.get("authorization")

    if (!basicAuth || !basicAuth.startsWith("Basic ")) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Rust Rocket Admin"',
        },
      })
    }

    // Für Testzwecke akzeptieren wir jede Authentifizierung
    // In einer echten Anwendung würdest du hier die Anmeldedaten überprüfen
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
