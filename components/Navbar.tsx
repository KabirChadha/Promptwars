import React from "react";
import Link from "next/link";
import { ShieldCheck, Activity, Award } from "lucide-react";

/**
 * Global Top Navigation Bar Component
 *
 * Renders the persistent branding, live operational engine status indicator,
 * hackathon metadata badges, and GitHub repository reference link.
 *
 * @returns The rendered sticky top navigation bar.
 */
export function Navbar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Pulse Live Badge */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:border-orange-500/60 group-hover:bg-orange-500/20 transition-all shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-zinc-50 group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  FairShift
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    PRO
                  </span>
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  UN SDG 8 Intelligence Engine
                </span>
              </div>
            </Link>

            {/* Live Status Badge with pulse indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 border border-orange-500/25 text-orange-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="tracking-wide">FairShift • Active Engine</span>
            </div>
          </div>

          {/* Right: Event Badges & Github link */}
          <div className="flex items-center gap-2.5">
            {/* ACM Hackathon / Event Badge */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Award className="w-3.5 h-3.5 text-orange-400" />
              <span>ACM PromptWars 2026</span>
            </div>

            {/* UN Global Compact Badge */}
            <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/60 border border-zinc-800/80 text-zinc-400">
              <Activity className="w-3.5 h-3.5 text-zinc-400" />
              <span>UN Target 8.1 - 8.10</span>
            </div>

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/KabirChadha/Promptwars"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-50 transition-all focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">KabirChadha/Promptwars</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
