import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { openai } from "@/lib/openai";
import { SarvamAIClient } from "sarvamai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  isMuted: boolean;
  selectedMessage: string | null;
}

const ChatPanel = ({ isMuted, selectedMessage }: ChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

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
    if (selectedMessage) {
      const submitMessage = async () => {
        const userMessage = { role: 'user' as const, content: selectedMessage };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [...messages, userMessage],
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
      target_language_code: "en-IN",
      text: text.slice(0, 500),
      model: "bulbul:v2",
      speaker: "anushka",
    });

    if (!response.audios || !response.audios[0]) {
      console.error('No audio data received');
      return;
    }

    if (audioPlayer) {
      // Stop any currently playing audio
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      // Convert the audio data to base64 and then to a Blob
      const audioData = atob(response.audios[0]);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        uint8Array[i] = audioData.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      // Set up audio player
      audioPlayer.src = url;
      
      try {
        await audioPlayer.play();
        console.log('Audio playing started');
      } catch (playError) {
        console.error('Audio playback error:', playError);
      }

      // Clean up the URL when done
      audioPlayer.onended = () => {
        console.log('Audio finished playing');
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
        messages: [...messages, userMessage],
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
      <ScrollArea className="flex-1 p-2 sm:p-3 md:p-4">
        <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 mb-2 sm:mb-3 md:mb-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${msg.role === 'user' ? 'self-end' : 'self-start'} max-w-[85%] sm:max-w-[80%]`}
            >
              <div 
                className={`${
                  msg.role === 'user' 
                    ? 'bg-[#F2EDE5] text-gray-800 rounded-tl-xl sm:rounded-tl-2xl rounded-tr-xl sm:rounded-tr-2xl rounded-bl-xl sm:rounded-bl-2xl' 
                    : 'bg-white text-gray-800 rounded-tl-xl sm:rounded-tl-2xl rounded-tr-xl sm:rounded-tr-2xl rounded-br-xl sm:rounded-br-2xl'
                } p-3 sm:p-4`}
              >
                <p className="text-sm sm:text-base">{msg.content}</p>
              </div>
              {!isMuted && msg.role === 'assistant' && (
                <button
                  onClick={() => speakMessage(msg.content)}
                  className="mt-1 text-xs text-gray-500 hover:text-gray-700 ml-2"
                >
                  🔊 Play again
                </button>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="self-start max-w-[85%] sm:max-w-[80%]">
              <div className="bg-white text-gray-800 rounded-tl-xl sm:rounded-tl-2xl rounded-tr-xl sm:rounded-tr-2xl rounded-br-xl sm:rounded-br-2xl p-3 sm:p-4">
                <p className="text-sm sm:text-base">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-2 sm:p-3 md:p-4 border-t border-gray-200">
        <div className="relative max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Talk with Pi"
              className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 pr-10 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-green-500 text-sm sm:text-base"
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