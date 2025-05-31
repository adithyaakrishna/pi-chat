import { useState } from "react";
import Sidebar from "../navigation/sidebar";
import OptionsPanel from "../panels/options-panel";
import ChatPanel from "../panels/chat-panel";
import AccountPanel from "../panels/account-panel";
import { VolumeX, Menu, Volume2, Globe2, Mic2 } from "lucide-react";
import { Language, SUPPORTED_LANGUAGES, SUPPORTED_VOICES, Voice } from "@/lib/types";

const MainLayout = () => {
  const [userName, setUserName] = useState("Adi");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState("discover");
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [selectedVoice, setSelectedVoice] = useState<Voice>(SUPPORTED_VOICES[0]);

  const handleOptionSelect = (message: string) => {
    setSelectedMessage(message);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const renderMiddlePanel = () => {
    switch (activeIcon) {
      case "profile":
        return <AccountPanel />;
      case "discover":
      default:
        return (
          <div className="p-3 sm:p-4 md:p-6">
            <h1 className="text-2xl sm:text-3xl font-serif text-green-900 mb-4 sm:mb-6">
              {getGreeting()}, <span className="italic">{userName}</span>
            </h1>
            <OptionsPanel onOptionSelect={handleOptionSelect} />
          </div>
        );
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#f8f3e9] overflow-hidden relative">
      <div className="hidden md:flex md:relative flex-col w-[70px] flex-shrink-0 bg-[#F2EDE5] h-full z-30">
        <Sidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </div>
      
      <div className="hidden md:block md:relative w-full md:max-w-md flex-shrink-0 overflow-y-auto h-full z-20 bg-[#f7efe3]">
        {renderMiddlePanel()}
      </div>
      
      <div className="flex-grow bg-[#f8f3e9] overflow-hidden relative z-10">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-100 md:border-0">
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 md:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-1.5">
                    <Globe2 className="w-5 h-5" />
                    <span className="text-sm hidden sm:inline">{selectedLanguage.name}</span>
                  </button>
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px] z-50">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          selectedLanguage.code === lang.code ? 'text-green-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-1.5">
                    <Mic2 className="w-5 h-5" />
                    <span className="text-sm hidden sm:inline">{selectedVoice.name}</span>
                  </button>
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px] z-50">
                    {SUPPORTED_VOICES.map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => setSelectedVoice(voice)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          selectedVoice.id === voice.id ? 'text-green-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {voice.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatPanel 
              isMuted={isMuted} 
              selectedMessage={selectedMessage}
              selectedLanguage={selectedLanguage}
              selectedVoice={selectedVoice}
            />
          </div>
        </div>
      </div>

      <div 
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-20
          md:hidden
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          transition-opacity duration-300
        `}
        onClick={toggleMobileMenu}
      />

      <div 
        className={`
          fixed top-0 left-0 h-full w-[320px] bg-[#F2EDE5] z-30
          md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex h-full">
          <div className="w-[70px] h-full bg-[#F2EDE5] border-r border-gray-200">
            <Sidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
          </div>
          <div className="flex-1 bg-[#f8f3e9] overflow-y-auto">
            {renderMiddlePanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;