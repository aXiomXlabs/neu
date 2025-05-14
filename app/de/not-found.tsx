import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404 - Seite nicht gefunden</h1>
        <p className="text-text-secondary mb-8">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
        <Link
          href="/de"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md inline-block transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  )
}
