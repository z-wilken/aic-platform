'use client';

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import InternalDashboard from "./components/InternalDashboard"

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen italic text-gray-500">Verifying security clearance...</div>
  }

  if (!session) {
    return null
  }

  return <InternalDashboard />
}
