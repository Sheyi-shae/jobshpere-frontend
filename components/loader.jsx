

export function PageLoader({text}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Main briefcase icon with animated elements */}
        <div className="relative w-20 h-16">
          {/* Briefcase body */}
          <div className="absolute inset-x-2 top-4 bottom-2 bg-blue-900 rounded-lg shadow-lg">
            {/* Briefcase handle */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 border-2 border-blue-900 rounded-t-lg bg-transparent"></div>

            {/* Briefcase lock */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>

            {/* Briefcase divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-800"></div>
          </div>

          {/* Animated documents floating out */}
          <div className="absolute -top-2 -right-2">
            <div
              className="w-3 h-4 bg-amber-500 rounded-sm opacity-80 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "2s" }}
            ></div>
          </div>
          <div className="absolute -top-1 -right-4">
            <div
              className="w-3 h-4 bg-amber-400 rounded-sm opacity-60 animate-bounce"
              style={{ animationDelay: "0.3s", animationDuration: "2s" }}
            ></div>
          </div>
          <div className="absolute top-1 -right-6">
            <div
              className="w-3 h-4 bg-amber-300 rounded-sm opacity-40 animate-bounce"
              style={{ animationDelay: "0.6s", animationDuration: "2s" }}
            ></div>
          </div>
        </div>

        {/* Orbiting dots animation */}
        <div className="absolute inset-0 w-20 h-16">
          <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute top-0 left-1/2 w-2 h-2 bg-amber-500 rounded-full -translate-x-1/2 animate-spin origin-[0_48px]"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full -translate-x-1/2 animate-spin origin-[0_48px]"
              style={{ animationDuration: "3s", animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-1 h-1 bg-amber-400 rounded-full -translate-x-1/2 animate-spin origin-[0_48px]"
              style={{ animationDuration: "3s", animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        {/* Pulsing background circle */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-200 rounded-full animate-ping opacity-20"></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 border border-amber-200 rounded-full animate-ping opacity-30"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-1">
          <span className="text-blue-900 font-medium">{text}</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-900 to-amber-500 rounded-full animate-pulse"
          style={{
            width: "100%",
            animation: "progress 3s ease-in-out infinite",
          }}
        ></div>
      </div> */}

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
