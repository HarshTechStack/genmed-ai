import React, { useState, useEffect } from 'react';
import { Stethoscope, HeartPulse, ClipboardList, Microscope, Pill, BrainCircuit, ShieldPlus, Languages, CalendarCheck, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import medicalImage from '/image/medical.png';
import medicalImage2 from '/image/medical2.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const images = [
    { src: medicalImage, alt: 'Doctor using digital health platform' },
    { src: medicalImage2, alt: 'Healthcare team reviewing patient data' },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section with Medical Gradient */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="bg-blue-600 rounded-full p-3 shadow-lg">
                  <Stethoscope className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                <span className="text-blue-400">MediAI</span> Clinical Assistant
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Advanced AI-powered clinical decision support system for modern healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
                  aria-label="Get started with MediAI"
                >
                  <Activity className="w-5 h-5" />
                  Get Started
                </button>
                <button className="border border-blue-400 text-blue-400 hover:bg-blue-900/50 px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200">
                  Learn More
                </button>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 text-blue-200 text-sm">
                  <ShieldPlus className="w-4 h-4" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200 text-sm">
                  <BrainCircuit className="w-4 h-4" />
                  <span>AI-Powered Diagnostics</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200 text-sm">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="relative w-full max-w-md mx-auto bg-gray-800/50 rounded-xl shadow-xl overflow-hidden border border-blue-800/30">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600/80 hover:bg-blue-700 text-white p-2 rounded-full backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600/80 hover:bg-blue-700 text-white p-2 rounded-full backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-blue-400 w-6' : 'bg-gray-500'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-medium">CLINICAL TOOLS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Comprehensive <span className="text-blue-400">Healthcare</span> Solutions
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Designed by physicians for physicians - streamline your clinical workflow with our integrated tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ClipboardList className="w-8 h-8" />,
                title: 'Smart SOAP Notes',
                description: 'Automatically generate structured clinical notes with our AI-powered documentation system.',
                color: 'text-blue-400'
              },
              {
                icon: <Microscope className="w-8 h-8" />,
                title: 'Differential Diagnosis',
                description: 'Evidence-based diagnostic suggestions ranked by probability and urgency.',
                color: 'text-purple-400'
              },
              {
                icon: <HeartPulse className="w-8 h-8" />,
                title: 'Patient Monitoring',
                description: 'Real-time tracking of vital signs and health metrics with alert thresholds.',
                color: 'text-red-400'
              },
              {
                icon: <Pill className="w-8 h-8" />,
                title: 'Medication Advisor',
                description: 'Drug interaction checker with dosage recommendations and alternatives.',
                color: 'text-green-400'
              },
              {
                icon: <BrainCircuit className="w-8 h-8" />,
                title: 'Clinical Decision Support',
                description: 'Instant access to UpToDate, CDC, and WHO guidelines integrated into workflow.',
                color: 'text-yellow-400'
              },
              {
                icon: <Languages className="w-8 h-8" />,
                title: 'Multilingual Interface',
                description: 'Support for 15+ languages with medical terminology accuracy.',
                color: 'text-cyan-400'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/30 group"
              >
                <div className={`${feature.color} mb-4 group-hover:text-white transition-colors`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Benefits Section */}
      <div className="py-16 bg-gradient-to-br from-gray-900 to-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <span className="text-blue-400 font-medium">WHY CHOOSE US</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                Enhancing <span className="text-blue-400">Clinical</span> Outcomes
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <ShieldPlus className="w-6 h-6 text-blue-400" />,
                    title: 'Reduce Diagnostic Errors',
                    description: 'Our AI cross-references symptoms with thousands of case studies to minimize oversight.'
                  },
                  {
                    icon: <Activity className="w-6 h-6 text-blue-400" />,
                    title: 'Improve Workflow Efficiency',
                    description: 'Automate documentation and save 2+ hours per day on administrative tasks.'
                  },
                  {
                    icon: <HeartPulse className="w-6 h-6 text-blue-400" />,
                    title: 'Enhance Patient Care',
                    description: 'Spend more time with patients through streamlined workflows and decision support.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-blue-900/50 p-2 rounded-lg h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-800/30">
              <div className="bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Clinical Impact Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '78%', label: 'Reduction in documentation time' },
                    { value: '42%', label: 'Fewer medication errors' },
                    { value: '91%', label: 'Clinician satisfaction' },
                    { value: '65%', label: 'Faster diagnosis' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-900/70 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center gap-1 mx-auto">
                    View clinical study results
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-gray-800 rounded-2xl p-8 sm:p-12 border border-blue-800/30">
            <HeartPulse className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare professionals using MediAI to deliver exceptional patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Start Free Trial
              </button>
              <button className="border border-blue-400 text-blue-400 hover:bg-blue-900/30 px-8 py-3 rounded-lg font-medium text-lg">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-400">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400">Clinical Guidelines</a></li>
                <li><a href="#" className="hover:text-blue-400">Webinars</a></li>
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
                <li><a href="#" className="hover:text-blue-400">Sales</a></li>
                <li><a href="#" className="hover:text-blue-400">Partnerships</a></li>
                <li><a href="#" className="hover:text-blue-400">Emergency</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Stethoscope className="w-6 h-6 text-blue-400" />
              <span className="text-white font-bold text-lg">MediAI</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} MediAI Technologies. All rights reserved. HIPAA compliant.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};