export function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative transform scale-100 md:scale-105 lg:scale-110 origin-top transition-transform">
      {/* Phone frame */}
      <div className="relative w-[330px] h-[700px] bg-black rounded-[50px] p-2 shadow-[0_0_60px_rgba(194,103,42,0.3),0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        {/* Frame border */}
        <div className="absolute inset-0 rounded-[50px] border-4 border-[#2a2a2a]" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-[#1A0800] rounded-[42px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] mr-6" />
          </div>
          
          {/* Screen content */}
          <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin">
            {children}
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/30 rounded-full z-50" />
        </div>
        
        {/* Side buttons */}
        <div className="absolute right-[-3px] top-[120px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-[-3px] top-[100px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[150px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[210px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
      </div>
    </div>
  )
}
