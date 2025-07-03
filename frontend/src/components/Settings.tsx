import React, { useState } from 'react';
import { User, Globe, Bell, Shield, Save } from 'lucide-react';

interface User {
  id: string;
  name: string;
  type: 'doctor' | 'asha' | 'guest' | null;
  email: string;
}

interface SettingsProps {
  user: User;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [settings, setSettings] = useState({
    name: user.name,
    email: user.email,
    language: 'en',
    notifications: true,
    voiceEnabled: true,
    autoSave: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Language & Localization
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="bn">Bengali</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive alerts for critical cases</p>
                </div>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Voice Input</p>
                  <p className="text-sm text-gray-600">Enable voice recording features</p>
                </div>
                <input
                  type="checkbox"
                  name="voiceEnabled"
                  checked={settings.voiceEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-Save</p>
                  <p className="text-sm text-gray-600">Automatically save consultation notes</p>
                </div>
                <input
                  type="checkbox"
                  name="autoSave"
                  checked={settings.autoSave}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Security
            </h3>
            <div className="space-y-4">
              <button
                type="button"
                className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>
              <button
                type="button"
                className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-gray-900">Data Export</p>
                <p className="text-sm text-gray-600">Download your patient records</p>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};