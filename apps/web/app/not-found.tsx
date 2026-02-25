"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-8xl font-bold text-[#c9920a] mb-4">404</div>
        <h1 className="text-4xl text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to explore our portals.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white px-6 py-3">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="px-6 py-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
