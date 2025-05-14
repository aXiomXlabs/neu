import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-text-secondary mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          href="/en"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md inline-block transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
