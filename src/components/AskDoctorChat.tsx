import React, { useState } from 'react';
import { 
  Send, 
  Stethoscope, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';
import { ChatMessage, ProcessedDocument } from '../types/medscript';

interface AskDoctorChatProps {
  document: ProcessedDocument;
  onAskQuestion: (question: string) => Promise<void>;
  chatMessages: ChatMessage[];
  isLoading: boolean;
}

export const AskDoctorChat: React.FC<AskDoctorChatProps> = ({
  document,
  onAskQuestion,
  chatMessages,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');

  const quickQuestions = document.selectedLanguage === 'ta'
    ? [
        'மருந்துச் சீட்டில் என்னென்ன மருந்துகள் எழுதப்பட்டிருக்கு?',
        'இந்த ரிப்போர்ட் என்ன சொல்லுது?',
        'இதில் கேன்சர் அல்லது தீவிர நோய் குறிப்பு உள்ளதா?',
        'டாக்டரிடம் நான் என்ன கேட்க வேண்டும்?'
      ]
    : document.selectedLanguage === 'hi'
    ? [
        'इस पर्चे में कौन सी दवाइयां लिखी हैं?',
        'यह रिपोर्ट क्या कहती है?',
        'क्या इसमें कोई गंभीर बीमारी का उल्लेख है?',
        'मुझे डॉक्टर से क्या पूछना चाहिए?'
      ]
    : document.selectedLanguage === 'te'
    ? [
        'ఈ ప్రిస్క్రిప్షన్‌లో ఏ మందులు ఉన్నాయి?',
        'ఈ రిపోర్ట్ ఏమి చెబుతోంది?',
        'డాక్టర్‌ను నేను ఏమి అడగాలి?'
      ]
    : [
        'What medicines are prescribed in this document?',
        'What does this medical report say?',
        'Does this document mention cancer or serious disease?',
        'What questions should I ask my doctor?'
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onAskQuestion(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (question: string) => {
    if (isLoading) return;
    onAskQuestion(question);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-medical p-6 flex flex-col h-[520px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Ask About This Document
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Grounded exclusively in the verified text of {document.name}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
          <ShieldCheck className="w-3.5 h-3.5" /> Strictly Grounded
        </span>
      </div>

      {/* Suggested Quick Prompts Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-2 text-xs">
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-600" /> Prompts:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(q)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px] font-medium transition disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <HelpCircle className="w-10 h-10 mb-2 opacity-50 text-medblue-500" />
            <h5 className="text-xs font-bold text-slate-700 mb-1">
              Ask anything about what the doctor wrote
            </h5>
            <p className="text-[11px] max-w-xs text-slate-500">
              Tap any suggestion above or type your question below. The AI will only answer what is explicitly verified in your document.
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'doctor' && (
                <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-medblue-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.referencedText && (
                  <div className="mt-2 pt-2 border-t border-slate-200/80 text-[10px] text-teal-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    Verified from: {msg.referencedText}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-medblue-100 text-medblue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
            <span className="w-2 h-2 rounded-full bg-medblue-600 animate-ping" />
            <span>Doctor checking verified document context...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative pt-2 border-t border-slate-100">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask me what you want to understand..."
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-medblue-500 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          aria-label="Send question to doctor"
          className="absolute right-2 top-3.5 p-2 rounded-xl bg-medblue-600 hover:bg-medblue-700 disabled:opacity-40 text-white transition shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
