"use client";

import React from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
