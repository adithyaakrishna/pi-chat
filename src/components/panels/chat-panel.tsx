import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { openai } from "@/lib/openai";
import { SarvamAIClient } from "sarvamai";
import { Language, Voice } from "@/lib/types";
import { TextToSpeechLanguage } from "sarvamai/api";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  isMuted: boolean;
  selectedMessage: string | null;
  selectedLanguage: Language;
  selectedVoice: Voice;
}

const ChatPanel = ({ isMuted, selectedMessage, selectedLanguage, selectedVoice }: ChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const getSystemPrompt = () => {
    if (selectedLanguage.code === TextToSpeechLanguage.EnIn) {
      return "You are a helpful assistant.";
    }
    return `You are a helpful assistant. Always respond in ${selectedLanguage.name}. Do not translate or use any other language.`;
  };

  useEffect(() => {
    setAudioPlayer(new Audio());
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (isMuted && audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  }, [isMuted, audioPlayer]);


  useEffect(() => {
    if (selectedMessage) {
      const submitMessage = async () => {
        const userMessage = { role: 'user' as const, content: selectedMessage };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: 'system', content: getSystemPrompt() },
              ...messages,
              userMessage
            ],
          });

          const assistantMessage = {
            role: 'assistant' as const,
            content: response.choices[0]?.message?.content || 'Sorry, I could not process that.'
          };

          setMessages(prev => [...prev, assistantMessage]);
          await speakMessage(assistantMessage.content);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      };

      submitMessage();
    }
  }, [selectedMessage]);

  const speakMessage = async (text: string) => {
    if (isMuted || !text) return;

    try {
      const client = new SarvamAIClient({
        apiSubscriptionKey: import.meta.env.VITE_PUBLIC_SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY
      });

      const response = await client.textToSpeech.convert({
        target_language_code: selectedLanguage.code,
        text: text.slice(0, 500),
        model: "bulbul:v2",
        speaker: selectedVoice.id,
      });

      if (!response.audios || !response.audios[0]) {
        console.error('No audio data received');
        return;
      }

      // Check mute status again before playing
      if (isMuted) return;

      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;

        const audioData = atob(response.audios[0]);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < audioData.length; i++) {
          uint8Array[i] = audioData.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);

        audioPlayer.src = url;
        
        try {
          // Final mute check before playing
          if (!isMuted) {
            await audioPlayer.play();
          }
        } catch (playError) {
          console.error('Audio playback error:', playError);
        }

        audioPlayer.onended = () => {
          URL.revokeObjectURL(url);
        };
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: getSystemPrompt() },
          ...messages,
          userMessage
        ],
      });

      const assistantMessage = {
        role: 'assistant' as const,
        content: response.choices[0]?.message?.content || 'Sorry, I could not process that.'
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the assistant's message
      await speakMessage(assistantMessage.content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 mx-8 p-2 sm:p-3 md:p-4">
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${msg.role === 'user' ? 'self-end' : 'self-start'} max-w-[85%] sm:max-w-[75%]`}
            >
              <div 
                className={`${
                  msg.role === 'user' 
                    ? 'bg-[#0C4A35] text-white rounded-[20px] rounded-tr-none' 
                    : 'bg-[#F2EDE5] text-[#0C4A35] rounded-[20px] rounded-tl-none'
                } p-4 sm:p-5 font-serif text-[17px]`}
              >
                <p className="leading-relaxed">{msg.content}</p>
              </div>
              {!isMuted && msg.role === 'assistant' && (
                <button
                  onClick={() => speakMessage(msg.content)}
                  className="mt-2 text-xs text-neutral-600 hover:text-neutral-800 ml-2"
                >
                  🔊 Play again
                </button>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="self-start max-w-[85%] sm:max-w-[75%]">
              <div className="bg-[#F2EDE5] text-[#0C4A35] rounded-[20px] rounded-tl-none p-4 sm:p-5 font-serif text-[17px]">
                <p className="leading-relaxed">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-2 sm:p-3 md:p-4">
        <div className="relative max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Talk with Pi"
              className="flex-1 py-4 px-8 pr-12
                text-lg text-gray-700 placeholder:text-gray-400 
                bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                border-0
                focus:outline-none focus:ring-2 focus:ring-green-50
                hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                transition-shadow duration-200
                font-serif"
              aria-label="Chat input"
              autoComplete="off"
              spellCheck="true"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2.5 sm:right-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          <div className="text-[10px] sm:text-xs text-center text-gray-400 mt-1.5 sm:mt-2">
            Pi Clone, built by <a href="https://twitter.com/adii_kris" className="text-green-600 hover:underline">Adithya Krishna</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;