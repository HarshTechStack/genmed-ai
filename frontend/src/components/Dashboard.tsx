import React, { useState } from 'react';
import { Header } from './Header';
import { MedicalInterface } from './MedicalInterface';
import { PatientHistory } from './PatientHistory';
import { Settings } from './Settings';

interface User {
  id: string;
  name: string;
  type: 'doctor' | 'asha' | 'guest' | null;
  email: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'history' | 'settings'>('consultation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('consultation')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'consultation'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Consultation
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Patient History
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {activeTab === 'consultation' && <MedicalInterface user={user} />}
        {activeTab === 'history' && <PatientHistory user={user} />}
        {activeTab === 'settings' && <Settings user={user} />}
      </div>
    </div>
  );
};