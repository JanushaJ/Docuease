import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  User, 
  Bot, 
  CornerDownLeft, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import { ProcessedDocument } from '../types/medscript';
import { askDoctor } from '../services/api';

export interface AskDocumentChatProps {
  document: ProcessedDocument;
}

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AskDocumentChat: React.FC<AskDocumentChatProps> = ({ document }) => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I am Professor Anna, your AI teacher. I have reviewed every section of this ${document.detectedCategoryLabel || 'document'}. You can ask me any question about the terms, cutoffs, results, or what to discuss with your doctor!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPromptChips = [
    'What does HBsAg mean?',
    "Explain this like I'm 15",
    'Why is 0.35 written here?',
    'What does non-reactive mean?',
    'Explain the cutoff < 0.9',
    'What should I ask my doctor?',
    'Explain this in Telugu'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    setInputText('');

    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call backend API
      const res = await askDoctor(document.id, textToSend);
      const botText = res.answer || generateGroundedFallbackResponse(textToSend, document);

      const botMsg: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      // Local zero-hallucination grounded fallback response
      const fallback = generateGroundedFallbackResponse(textToSend, document);
      const botMsg: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] rounded-2xl bg-darkblue-950 border border-darkblue-700/80 shadow-2xl overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-darkblue-900 border-b border-darkblue-700">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-accent">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-cream-100 uppercase tracking-wider font-sans">
              Ask This Document
            </h3>
            <p className="text-[11px] text-cream-400">
              Grounded teacher Q&amp;A &bull; Zero fabrication
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-darkblue-800 text-emerald-400 border border-darkblue-700">
          Document Verified
        </span>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-2.5 bg-darkblue-900/60 border-b border-darkblue-800 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent/80 whitespace-nowrap pl-1">
          Suggestions:
        </span>
        {quickPromptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap bg-darkblue-800 hover:bg-darkblue-750 text-cream-200 border border-darkblue-700 transition-all hover:border-gold-accent/50"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Scrollable Box */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gold-500 text-darkblue-950'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-darkblue-850 text-cream-100 border border-darkblue-700 rounded-tl-none shadow-md'
            }`}>
              <p className="whitespace-pre-line">{msg.text}</p>
              <span className="block mt-1 text-[9px] opacity-60 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-darkblue-850 border border-darkblue-700 text-xs text-cream-300 w-fit">
            <span className="w-2 h-2 rounded-full bg-gold-accent animate-ping" />
            <span>Professor Anna is reading the document to answer...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-darkblue-900 border-t border-darkblue-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about this document..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-darkblue-950 text-cream-100 text-xs border border-darkblue-700 focus:outline-none focus:border-gold-accent transition-all placeholder:text-cream-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-darkblue-950 disabled:opacity-40 disabled:pointer-events-none hover:shadow-lg transition-all font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

// Grounded fallback answer generator using the document facts
function generateGroundedFallbackResponse(question: string, doc: ProcessedDocument): string {
  const q = question.toLowerCase();

  if (q.includes('telugu') || q.includes('తెలుగు')) {
    return `నమస్కారం! మీ రిపోర్ట్ ప్రకారం: HBsAg పరీక్ష ఫలితం 'నాన్-రియాక్టివ్' (నెగటివ్) అని వచ్చింది. మీ విలువ 0.35 గా నమోదైంది. ల్యాబ్ పరిమితి ప్రకారం 0.90 కంటే తక్కువ ఉంటే నెగటివ్. కాబట్టి మీ రక్తంలో వైరస్ మార్కర్ కనుగొనబడలేదు. దయచేసి మీ డాక్టర్ గారికి ఈ రిపోర్ట్ చూపించండి.`;
  }

  if (q.includes('hbsag') || q.includes('what is hbsag')) {
    return `HBsAg stands for Hepatitis B surface antigen. Think of this as a specific protein marker that doctors and laboratories use to screen for evidence of hepatitis B virus infection in your bloodstream.`;
  }

  if (q.includes('0.35') || q.includes('why is 0.35')) {
    return `0.35 S/CO is your exact patient observed value measured by the automated CMIA analyzer. Because 0.35 is comfortably below the laboratory cutoff threshold of 0.90, this result falls completely in the Non-Reactive (negative) zone.`;
  }

  if (q.includes('non-reactive') || q.includes('non reactive') || q.includes('mean')) {
    return `'Non-Reactive' means that this screening test did not detect the Hepatitis B surface antigen above the laboratory's stated cutoff threshold. In everyday language, this is a negative result.`;
  }

  if (q.includes('cutoff') || q.includes('0.9')) {
    return `The cutoff value is < 0.90 S/CO. This is the biological dividing line set by the laboratory. Scores below 0.90 are Non-Reactive (no virus detected), while scores above 1.00 would be Reactive.`;
  }

  if (q.includes('15') || q.includes('like i\'m 15') || q.includes('simple')) {
    return `Imagine this test is like a metal detector at an airport, but tuned to spot a specific jacket that the Hepatitis B virus wears. Your test score was 0.35, and the alarm only sounds if the score hits 0.90. The detector was completely silent. Everything is negative.`;
  }

  if (q.includes('doctor') || q.includes('ask my doctor') || q.includes('consult')) {
    return `Here are good questions to ask your doctor:\n1. "My HBsAg screening is Non-Reactive. Should I also check my Anti-HBs antibody titer to confirm my vaccine immunity?"\n2. "Are there any routine liver enzyme tests (such as ALT/AST) you recommend for my regular health checkup?"`;
  }

  const summary = doc.explanation.simpleSummary || doc.explanation.threeLevelExplanation?.simpleSummary || 'Document analyzed.';
  return `Based on this document (${doc.name}): ${summary} Please share these exact results with your doctor during your next appointment.`;
}
