import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { UserTypeSelection } from './components/UserTypeSelection';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { GuestInterface } from './components/GuestInterface';

export type UserType = 'doctor' | 'asha' | 'guest' | null;
export type AppState = 'landing' | 'userTypeSelection' | 'auth' | 'dashboard' | 'guest';

interface User {
  id: string;
  name: string;
  type: UserType;
  email: string;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleGetStarted = () => {
    setCurrentState('userTypeSelection');
  };

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
    if (type === 'guest') {
      setCurrentState('guest');
    } else {
      setCurrentState('auth');
    }
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedUserType(null);
    setCurrentState('landing');
  };

  const handleBackToUserSelection = () => {
    setSelectedUserType(null);
    setCurrentState('userTypeSelection');
  };

  const handleBackToLanding = () => {
    setSelectedUserType(null);
    setCurrentState('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white"> {/* Changed to dark theme */}
      {currentState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'userTypeSelection' && (
        <UserTypeSelection 
          onSelectUserType={handleUserTypeSelect}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === 'auth' && (
        <AuthForm 
          userType={selectedUserType}
          onAuthSuccess={handleAuthSuccess}
          onBack={handleBackToUserSelection}
        />
      )}
      
      {currentState === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentState === 'guest' && (
        <GuestInterface onBack={handleBackToUserSelection} />
      )}
    </div>
  );
}

export default App;