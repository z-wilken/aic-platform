import { auth } from "@aic/auth"
import { redirect } from "next/navigation"
import InternalDashboard from "./components/InternalDashboard"

export default async function Page() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  return <InternalDashboard />
}
