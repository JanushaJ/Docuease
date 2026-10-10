import React from 'react';
import { 
  Sun, 
  Moon, 
  Sunrise, 
  Clock, 
  Utensils, 
  Pill, 
  ShieldAlert, 
  Calendar 
} from 'lucide-react';
import { StructuredMedication } from '../../types/medscript';

export interface PrescriptionScheduleProps {
  medications?: StructuredMedication[];
}

export const PrescriptionSchedule: React.FC<PrescriptionScheduleProps> = ({
  medications = []
}) => {
  // Demo medications if none provided
  const meds: StructuredMedication[] = medications.length > 0 ? medications : [
    {
      id: 'med-1',
      name: 'Metformin',
      strength: '500 mg',
      dosage: '500 mg',
      frequency: 'Twice daily (BD)',
      timingInstructions: 'Morning and Night, After Meals',
      foodInstructions: 'After food',
      purpose: 'Blood sugar glycemic management',
      confidence: 0.98,
      duration: 'Ongoing',
      route: 'Oral',
      isVerified: true,
      rawLine: 'Tab. Metformin 500 mg PO BD'
    },
    {
      id: 'med-2',
      name: 'Telmisartan',
      strength: '40 mg',
      dosage: '40 mg',
      frequency: 'Once daily (OD)',
      timingInstructions: 'Morning, After Breakfast',
      foodInstructions: 'After breakfast',
      purpose: 'Blood pressure maintenance',
      confidence: 0.97,
      duration: 'Ongoing',
      route: 'Oral',
      isVerified: true,
      rawLine: 'Tab. Telmisartan 40 mg PO OD'
    },
    {
      id: 'med-3',
      name: 'Atorvastatin',
      strength: '20 mg',
      dosage: '20 mg',
      frequency: 'Once daily at bedtime (HS)',
      timingInstructions: 'Night, at Bedtime',
      foodInstructions: 'Bedtime',
      purpose: 'Cholesterol & lipid management',
      confidence: 0.96,
      duration: 'Ongoing',
      route: 'Oral',
      isVerified: true,
      rawLine: 'Tab. Atorvastatin 20 mg PO HS'
    }
  ];

  return (
    <div className="w-full p-4 rounded-xl bg-darkblue-950/90 border border-darkblue-700/80 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-darkblue-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-gold-500/20 text-gold-accent">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream-100">
              Prescription Daily Schedule
            </h4>
            <p className="text-[11px] text-cream-400">Structured daily timeline for your medications</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-darkblue-800 text-cream-200 border border-darkblue-700">
          {meds.length} Medicines
        </span>
      </div>

      {/* Medication Cards */}
      <div className="flex flex-col gap-2.5">
        {meds.map((med, idx) => {
          const isMorning = med.timingInstructions.toLowerCase().includes('morning') || med.frequency.includes('OD') || med.frequency.includes('BD');
          const isNight = med.timingInstructions.toLowerCase().includes('night') || med.timingInstructions.toLowerCase().includes('bedtime') || med.frequency.includes('BD') || med.frequency.includes('HS');

          return (
            <div 
              key={idx}
              className="p-3 rounded-lg bg-darkblue-900 border border-darkblue-800 hover:border-darkblue-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              {/* Medicine Name & Strength */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-cream-50 font-sans">
                      {med.name}
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {med.dosage}
                    </span>
                  </div>
                  <div className="text-[11px] text-cream-300 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-accent" />
                      {med.frequency}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-emerald-400" />
                      {med.timingInstructions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Slots Indicator */}
              <div className="flex items-center gap-1.5 bg-darkblue-950 px-2.5 py-1 rounded-lg border border-darkblue-800">
                <div 
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    isMorning ? 'bg-amber-500/20 text-amber-300' : 'opacity-25 text-cream-500'
                  }`}
                  title="Morning Dose"
                >
                  <Sunrise className="w-3 h-3" />
                  <span>Morning</span>
                </div>

                <div 
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    isNight ? 'bg-indigo-500/20 text-indigo-300' : 'opacity-25 text-cream-500'
                  }`}
                  title="Night Dose"
                >
                  <Moon className="w-3 h-3" />
                  <span>Night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="mt-3 pt-2 border-t border-darkblue-800 text-[11px] text-cream-400 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-gold-accent flex-shrink-0" />
        <span>Always verify dosage and schedule with your prescribing physician or pharmacist.</span>
      </div>
    </div>
  );
};
