import { redirect } from "next/navigation"

export default function Home() {
  // Weiterleitung zur englischen Version als Standard
  redirect("/en")
}
