import React from 'react';
import { Stethoscope, LogOut, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  type: 'doctor' | 'asha' | 'guest' | null;
  email: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const getUserTypeDisplay = () => {
    switch (user.type) {
      case 'doctor':
        return 'Doctor';
      case 'asha':
        return 'ASHA Worker';
      default:
        return 'Healthcare Worker';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-2 mr-3">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GenMed</h1>
              <p className="text-sm text-gray-600">AI Medical Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 rounded-full p-2">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{getUserTypeDisplay()}</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};