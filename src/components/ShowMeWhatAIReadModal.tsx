import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Eye, 
  Layers, 
  Maximize2
} from 'lucide-react';
import { ProcessedDocument, OCRToken } from '../types/medscript';

interface ShowMeWhatAIReadModalProps {
  document: ProcessedDocument;
  onClose: () => void;
}

export const ShowMeWhatAIReadModal: React.FC<ShowMeWhatAIReadModalProps> = ({
  document,
  onClose
}) => {
  const [selectedToken, setSelectedToken] = useState<OCRToken | null>(
    document.tokens.find(t => t.isUncertain) || document.tokens[0] || null
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTokens = document.tokens.filter(t => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'uncertain') return t.isUncertain;
    return t.category === filterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Show Me What AI Read
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Transparent bounding box inspection for every detected word and confidence value
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Badges Bar */}
        <div className="px-6 py-2.5 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto text-xs bg-white">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Highlight:</span>
            {['all', 'uncertain', 'medication', 'dosage', 'lab_value', 'diagnosis'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full font-semibold capitalize transition ${
                  filterCategory === cat
                    ? 'bg-medblue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Tokens' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-500 inline-block" /> High Confidence (&ge;90%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Uncertain Word (&lt;80%)
            </span>
          </div>
        </div>

        {/* Main Content Area: Left Canvas Overlay + Right Token Inspector */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left: Original Document Canvas with Bounding Boxes */}
          <div className="flex-1 bg-slate-100 p-4 overflow-auto flex items-center justify-center relative">
            <div className="relative max-w-full max-h-full rounded-2xl shadow-md border border-slate-300 bg-white overflow-hidden">
              {document.imageDataUrl.startsWith('data:application/pdf') ? (
                <iframe
                  src={document.imageDataUrl}
                  title="PDF Preview"
                  className="w-[600px] h-[70vh] rounded-xl border-0 bg-white"
                />
              ) : (
                <img
                  src={document.imageDataUrl}
                  alt="Document with Bounding Boxes"
                  className="max-h-[70vh] w-auto object-contain block"
                />
              )}

              {/* Bounding Box Highlights */}
              {filteredTokens.map((token) => {
                const isSelected = selectedToken?.id === token.id;
                return (
                  <div
                    key={token.id}
                    onClick={() => setSelectedToken(token)}
                    title={`${token.text} (Confidence: ${token.confidence}%)`}
                    style={{
                      left: `${token.bbox.x}%`,
                      top: `${token.bbox.y}%`,
                      width: `${token.bbox.width}%`,
                      height: `${token.bbox.height}%`,
                    }}
                    className={`absolute cursor-pointer transition-all duration-150 rounded-sm border-2 ${
                      token.isUncertain
                        ? isSelected
                          ? 'border-amber-500 bg-amber-400/40 ring-4 ring-amber-300 shadow-md'
                          : 'border-amber-500 bg-amber-400/20 hover:bg-amber-400/30'
                        : isSelected
                        ? 'border-teal-600 bg-teal-400/35 ring-4 ring-teal-200 shadow-md'
                        : 'border-teal-500/70 bg-teal-400/10 hover:bg-teal-400/25'
                    }`}
                  >
                    {/* Small Badge */}
                    <span className={`absolute -top-3.5 left-0 px-1 py-0.2 text-[8px] font-extrabold uppercase rounded shadow-sm ${
                      token.isUncertain ? 'bg-amber-600 text-white' : 'bg-teal-700 text-white'
                    }`}>
                      {token.confidence}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed OCR Inspector Panel */}
          <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-slate-200 bg-white p-6 overflow-y-auto flex flex-col justify-between">
            {selectedToken ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                    selectedToken.isUncertain
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-teal-100 text-teal-800 border border-teal-300'
                  }`}>
                    {selectedToken.category.replace('_', ' ')}
                  </span>

                  <span className="text-xs font-extrabold text-slate-700">
                    Confidence: <span className={selectedToken.confidence < 80 ? 'text-amber-600' : 'text-teal-600'}>{selectedToken.confidence}%</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Detected Text
                </h4>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base font-bold text-slate-900 mb-4">
                  «{selectedToken.text}»
                </div>

                {/* Source Area Crop if available */}
                {selectedToken.sourceCropUrl && (
                  <div className="mb-4">
                    <span className="text-xs font-bold text-slate-500 block mb-1.5 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-medblue-600" />
                      Handwriting Source Crop:
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <img
                        src={selectedToken.sourceCropUrl}
                        alt="Crop"
                        className="max-h-20 object-contain rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Medical Context */}
                {selectedToken.medicalMeaning && (
                  <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 mb-4 leading-relaxed">
                    <span className="font-bold text-medblue-900 block mb-1">
                      Clinical Term Meaning:
                    </span>
                    {selectedToken.medicalMeaning}
                  </div>
                )}

                {/* Alternatives if uncertain */}
                {selectedToken.alternatives && selectedToken.alternatives.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 mb-4">
                    <span className="font-bold block mb-1">
                      Candidate Medical Alternatives:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {selectedToken.alternatives.map((alt, i) => (
                        <li key={i}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 space-y-1">
                  <p>• Bounding coordinates: x: {selectedToken.bbox.x}%, y: {selectedToken.bbox.y}%</p>
                  <p>• Token ID: {selectedToken.id}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-60" />
                <p className="text-xs">Click any highlighted bounding box on the document to view its OCR confidence data.</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Close Inspector
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
