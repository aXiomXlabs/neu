import { redirect } from "next/navigation"

export default function GlobalNotFound() {
  // Redirect to the English not-found page
  redirect("/en/not-found")
}
