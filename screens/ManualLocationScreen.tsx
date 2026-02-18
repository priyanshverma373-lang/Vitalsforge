import React, { useState } from 'react';
import { Button } from '../components/Button';
import { MapPin } from 'lucide-react';

interface ManualLocationScreenProps {
  onSubmit: (location: string) => void;
  onCancel: () => void;
}

export const ManualLocationScreen: React.FC<ManualLocationScreenProps> = ({ onSubmit, onCancel }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length > 2) {
        onSubmit(input);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-slate-950">
        <div className="flex-1">
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Manual Location</h2>
                <p className="text-slate-400 mt-2">Enter your city, address, or landmark.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Current Location</label>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. Central Park, New York"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg outline-none"
                        autoFocus
                    />
                </div>
                
                <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4">
                    <p className="text-sm text-blue-200">
                        <strong>Tip:</strong> Look for street signs, landmarks, or business names nearby.
                    </p>
                </div>

                <Button 
                    variant="primary" 
                    fullWidth 
                    type="submit" 
                    disabled={input.trim().length < 3}
                >
                    Confirm Location
                </Button>
                
                <Button 
                    variant="ghost" 
                    fullWidth 
                    onClick={onCancel}
                    type="button"
                >
                    Cancel
                </Button>
            </form>
        </div>
    </div>
  );
};