import React from 'react';
import { Calendar } from 'lucide-react';

interface BirthDateInputProps {
  birthDate: string;
  onChange: (date: string) => void;
}

export default function BirthDateInput({ birthDate, onChange }: BirthDateInputProps) {
  return (
    <div className="relative">
      <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
        Your Birth Date
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="date"
          id="birthdate"
          value={birthDate}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
}