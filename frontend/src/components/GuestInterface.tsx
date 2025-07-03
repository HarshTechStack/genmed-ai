import React, { useState } from 'react';
import { ArrowLeft, Mic, MicOff, Send, MessageCircle, AlertTriangle } from 'lucide-react';

interface GuestInterfaceProps {
  onBack: () => void;
}

export const GuestInterface: React.FC<GuestInterfaceProps> = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setShowResponse(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response
    const mockResponse = `
Based on your symptoms, here's some general guidance:

**Possible Causes:**
- Viral infection (common cold/flu)
- Seasonal allergies
- Stress or fatigue

**Immediate Care:**
- Get plenty of rest
- Stay hydrated with water and warm liquids
- Take paracetamol for pain relief (as per package instructions)
- Use steam inhalation for congestion

**When to Seek Medical Help:**
- If symptoms worsen or persist for more than 5 days
- If you develop high fever (above 101°F)
- If you experience difficulty breathing
- If you have severe headache or body pain

**Important:** This is general guidance only. For proper diagnosis and treatment, please consult with a qualified healthcare professional.
    `;

    setResponse(mockResponse);
    setShowResponse(true);
    setIsLoading(false);
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setResponse('');
    setShowResponse(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Guest Consultation</h1>
            <p className="text-sm text-gray-600">Ask medical questions - no account required</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-semibold text-yellow-800">Important Disclaimer</h3>
            </div>
            <p className="text-yellow-700 mt-2 text-sm">
              This is for informational purposes only and should not replace professional medical advice. 
              For emergencies, please contact your local emergency services immediately.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Ask a Medical Question</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your symptoms or ask your question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="I have been feeling unwell with fever and headache for the past 2 days..."
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
                  disabled={isLoading || !question.trim()}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isLoading ? 'Getting Response...' : 'Ask Question'}</span>
                </button>
              </div>
            </form>
          </div>

          {showResponse && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">AI Response</h3>
                <button
                  onClick={handleNewQuestion}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Ask Another Question
                </button>
              </div>
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {response}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};