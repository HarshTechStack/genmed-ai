import React from 'react';
import { UserCheck, Users, ArrowLeft, Stethoscope } from 'lucide-react';

interface UserTypeSelectionProps {
  onSelectUserType: (type: 'doctor' | 'asha' | 'guest') => void;
  onBack: () => void;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelectUserType, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="bg-blue-600 rounded-full p-4 w-fit mx-auto mb-6">
              <Stethoscope className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h1>
            <p className="text-gray-600 text-lg">
              Select how you'll be using GenMed to get the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Healthcare Worker Option */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="text-center">
                <div className="bg-blue-600 rounded-full p-4 w-fit mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Healthcare Worker</h2>
                <p className="text-gray-600 mb-6">
                  For doctors, nurses, and ASHA workers. Get full features with patient history, 
                  documentation, and secure data storage.
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Save patient records
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Access consultation history
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Generate prescriptions & referrals
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onSelectUserType('doctor')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    I'm a Doctor
                  </button>
                  <button
                    onClick={() => onSelectUserType('asha')}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    I'm an ASHA Worker
                  </button>
                </div>
              </div>
            </div>

            {/* Guest User Option */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-green-200">
              <div className="text-center">
                <div className="bg-green-600 rounded-full p-4 w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Guest User</h2>
                <p className="text-gray-600 mb-6">
                  For general health questions and guidance. No registration required, 
                  but data won't be saved.
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    No account needed
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Ask medical questions
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Get AI responses
                  </div>
                </div>

                <button
                  onClick={() => onSelectUserType('guest')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-500">
            <p>
              Healthcare workers get access to advanced features like patient record management, 
              consultation history, and secure data storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};