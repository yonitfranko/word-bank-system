'use client';
import React, { useState } from 'react';

export default function HomePage() {
  const [selectedClass, setSelectedClass] = useState('');
  const classes = ['א1', 'א2', 'א3', 'א4', 'ב1', 'ב2', 'ב3', 'ב4', 'ג1', 'ג2', 'ג3', 'ג4', 
                   'ד1', 'ד2', 'ד3', 'ד4', 'ה1', 'ה2', 'ה3', 'ה4', 'ו1', 'ו2', 'ו3', 'ו4'];

  return (
    <div className="p-8 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">מערכת בנק המילים</h1>
      
      <div className="mb-6">
        <label className="block text-lg mb-2">בחר כיתה:</label>
        <select 
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-2 border rounded w-48"
        >
          <option value="">בחר כיתה</option>
          {classes.map(className => (
            <option key={className} value={className}>
              כיתה {className}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">כיתה {selectedClass}</h2>
          <div className="flex gap-4">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => alert('תשובה מלאה - 10 נקודות')}
            >
              תשובה מלאה (+10)
            </button>
            <button 
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => alert('תשובה חלקית - 5 נקודות')}
            >
              תשובה חלקית (+5)
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => alert('תשובה שגויה - 0 נקודות')}
            >
              תשובה שגויה (0)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}