import { TextToSpeechLanguage, TextToSpeechSpeaker } from "sarvamai/api";

export type Language = typeof SUPPORTED_LANGUAGES[number];

export const SUPPORTED_LANGUAGES = [
  { code: TextToSpeechLanguage.EnIn, name: "English" },
  { code: TextToSpeechLanguage.HiIn, name: "Hindi" },
  { code: TextToSpeechLanguage.BnIn, name: "Bengali" },
  { code: TextToSpeechLanguage.TaIn, name: "Tamil" },
  { code: TextToSpeechLanguage.TeIn, name: "Telugu" },
  { code: TextToSpeechLanguage.KnIn, name: "Kannada" },
  { code: TextToSpeechLanguage.MlIn, name: "Malayalam" },
  { code: TextToSpeechLanguage.MrIn, name: "Marathi" },
  { code: TextToSpeechLanguage.GuIn, name: "Gujarati" },
  { code: TextToSpeechLanguage.PaIn, name: "Punjabi" },
  { code: TextToSpeechLanguage.OdIn, name: "Odia" }
] as const;

export const SUPPORTED_VOICES = [
  { id: TextToSpeechSpeaker.Meera, name: "Meera" },
  { id: TextToSpeechSpeaker.Pavithra, name: "Pavithra" },
  { id: TextToSpeechSpeaker.Maitreyi, name: "Maitreyi" },
  { id: TextToSpeechSpeaker.Arvind, name: "Arvind" },
  { id: TextToSpeechSpeaker.Amol, name: "Amol" },
  { id: TextToSpeechSpeaker.Amartya, name: "Amartya" },
  { id: TextToSpeechSpeaker.Diya, name: "Diya" },
  { id: TextToSpeechSpeaker.Neel, name: "Neel" },
  { id: TextToSpeechSpeaker.Misha, name: "Misha" },
  { id: TextToSpeechSpeaker.Vian, name: "Vian" },
  { id: TextToSpeechSpeaker.Arjun, name: "Arjun" },
  { id: TextToSpeechSpeaker.Maya, name: "Maya" },
  { id: TextToSpeechSpeaker.Anushka, name: "Anushka" },
  { id: TextToSpeechSpeaker.Abhilash, name: "Abhilash" },
  { id: TextToSpeechSpeaker.Manisha, name: "Manisha" },
  { id: TextToSpeechSpeaker.Vidya, name: "Vidya" },
  { id: TextToSpeechSpeaker.Arya, name: "Arya" },
  { id: TextToSpeechSpeaker.Karun, name: "Karun" },
  { id: TextToSpeechSpeaker.Hitesh, name: "Hitesh" }
] as const;

export type Voice = typeof SUPPORTED_VOICES[number];