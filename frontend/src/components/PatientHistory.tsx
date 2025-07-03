import React, { useState } from 'react';
import { Search, Calendar, User, AlertCircle, FileText } from 'lucide-react';

interface User {
  id: string;
  name: string;
  type: 'doctor' | 'asha' | 'guest' | null;
  email: string;
}

interface PatientRecord {
  id: string;
  patientName: string;
  date: string;
  chiefComplaint: string;
  diagnosis: string;
  isCritical: boolean;
}

interface PatientHistoryProps {
  user: User;
}

export const PatientHistory: React.FC<PatientHistoryProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  // Mock patient records
  const patientRecords: PatientRecord[] = [
    {
      id: '1',
      patientName: 'Raj Kumar',
      date: '2024-01-15',
      chiefComplaint: 'Fever and headache',
      diagnosis: 'Viral fever syndrome',
      isCritical: false
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      date: '2024-01-14',
      chiefComplaint: 'Chest pain',
      diagnosis: 'Suspected cardiac issue',
      isCritical: true
    },
    {
      id: '3',
      patientName: 'Mohan Singh',
      date: '2024-01-13',
      chiefComplaint: 'Cough and cold',
      diagnosis: 'Upper respiratory tract infection',
      isCritical: false
    }
  ];

  const filteredRecords = patientRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Patient History</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search patients..."
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h3>
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedRecord?.id === record.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{record.patientName}</span>
                    </div>
                    {record.isCritical && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{record.date}</span>
                    </div>
                    <span>•</span>
                    <span>{record.chiefComplaint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {selectedRecord ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Consultation Details</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>View Full Report</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Patient Name</h4>
                    <p className="text-gray-600">{selectedRecord.patientName}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Date</h4>
                    <p className="text-gray-600">{selectedRecord.date}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Chief Complaint</h4>
                    <p className="text-gray-600">{selectedRecord.chiefComplaint}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Diagnosis</h4>
                    <p className="text-gray-600">{selectedRecord.diagnosis}</p>
                  </div>

                  {selectedRecord.isCritical && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                        <span className="font-medium text-red-800">Critical Case</span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        This case was flagged as requiring immediate attention.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a consultation to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};