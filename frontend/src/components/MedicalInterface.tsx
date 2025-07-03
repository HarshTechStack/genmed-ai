import React, { useState } from 'react';
import { Mic, MicOff, Send, MessageCircle, AlertTriangle, FileText, Presentation as Prescription, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  type: 'doctor' | 'asha' | 'guest' | null;
  email: string;
}

interface MedicalInterfaceProps {
  user: User;
}

interface ConsultationResponse {
  patient_name: string;
  note: {
    chief_complaint?: string;
    history?: string;
    symptoms?: string[];
    observations?: {
      temperature?: string;
      heart_rate?: string;
      blood_pressure?: string;
      general_condition?: string;
    };
    assessment?: string;
    plan?: {
      medications?: string;
      first_aid?: string;
      referral?: string;
      follow_up?: string;
    };
    error?: string;
  };
  is_critical: boolean;
}

export const MedicalInterface: React.FC<MedicalInterfaceProps> = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ConsultationResponse | null>(null);
  const [mode, setMode] = useState<'consultation' | 'question'>('consultation');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    
    // Simulate API call to your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    const mockResponse: ConsultationResponse = {
      patient_name: patientName || 'Patient',
      note: {
        chief_complaint: 'Fever and headache for 3 days',
        history: 'Patient reports onset of fever 3 days ago with associated headache',
        symptoms: ['Fever', 'Headache', 'Body ache'],
        observations: {
          temperature: '101.2°F',
          heart_rate: '92 bpm',
          blood_pressure: '120/80 mmHg',
          general_condition: 'Appears unwell but stable'
        },
        assessment: 'Possible viral fever syndrome',
        plan: {
          medications: 'Paracetamol 500mg TID for fever',
          first_aid: 'Rest and increased fluid intake',
          referral: 'Not required at this time',
          follow_up: 'Return if fever persists beyond 5 days'
        }
      },
      is_critical: inputText.toLowerCase().includes('chest pain') || inputText.toLowerCase().includes('difficulty breathing')
    };

    setResponse(mockResponse);
    setIsLoading(false);
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
  };

  const handleNewConsultation = () => {
    setInputText('');
    setPatientName('');
    setResponse(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Medical Consultation</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setMode('consultation')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'consultation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Consultation
            </button>
            <button
              onClick={() => setMode('question')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'question'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Ask Question
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'consultation' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter patient name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'consultation' ? 'Patient Description' : 'Your Question'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder={mode === 'consultation' 
                ? "Describe the patient's symptoms, history, and current condition..." 
                : "Ask any medical question you have..."}
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleRecordingToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Record Voice</span>
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Processing...' : 'Submit'}</span>
            </button>
          </div>
        </form>
      </div>

      {response && (
        <div className="mt-6 space-y-4">
          {response.is_critical && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-800">Critical Symptoms Detected</h3>
              </div>
              <p className="text-red-700 mt-1">
                This case may require immediate medical attention. Please consider urgent referral.
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {mode === 'consultation' ? 'Medical Note' : 'Response'}
              </h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  <Prescription className="w-4 h-4" />
                  <span>Generate Prescription</span>
                </button>
                <button
                  onClick={handleNewConsultation}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  New Consultation
                </button>
              </div>
            </div>

            {response.note.error ? (
              <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                {response.note.error}
              </div>
            ) : mode === 'consultation' ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Chief Complaint</h4>
                    <p className="text-gray-600">{response.note.chief_complaint}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Assessment</h4>
                    <p className="text-gray-600">{response.note.assessment}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">History</h4>
                  <p className="text-gray-600">{response.note.history}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {response.note.symptoms?.map((symptom, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                {response.note.observations && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Observations</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(response.note.observations).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{key.replace('_', ' ').toUpperCase()}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {response.note.plan && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Treatment Plan</h4>
                    <div className="space-y-2">
                      {Object.entries(response.note.plan).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-800 mb-1">
                            {key.replace('_', ' ').toUpperCase()}
                          </h5>
                          <p className="text-gray-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {/* This would be the AI response for questions */}
                  Based on your question, here's the medical guidance...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};