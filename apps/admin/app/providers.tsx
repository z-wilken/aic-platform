'use client'

import { SessionProvider } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </SessionProvider>
  )
}
