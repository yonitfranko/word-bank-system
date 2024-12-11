'use client';
import React, { useState } from 'react';

export default function HomePage() {
    const [selectedClass, setSelectedClass] = useState('');
    const [points, setPoints] = useState({});
    const classes = ['א1', 'א2', 'א3', 'א4', 'ב1', 'ב2', 'ב3', 'ב4'];

    const addPoints = (classId, amount) => {
        setPoints(prev => ({
            ...prev,
            [classId]: (prev[classId] || 0) + amount
        }));
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-bold text-right mb-8">מערכת בנק המילים</h1>

            <div className="mb-8">
                <label className="block text-lg mb-2 text-right">בחר כיתה:</label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-2 border rounded"
                    dir="rtl"
                >
                    <option value="">בחר כיתה</option>
                    {classes.map(className => (
                        <option key={className} value={className}>
                            כיתה {className} ({points[className] || 0} נקודות)
                        </option>
                    ))}
                </select>
            </div>

            {selectedClass && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-right">
                        כיתה {selectedClass} - {points[selectedClass] || 0} נקודות
                    </h2>
                    <div className="flex gap-4 justify-end">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                            onClick={() => addPoints(selectedClass, 10)}
                        >
                            תשובה מלאה (+10)
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
                            onClick={() => addPoints(selectedClass, 5)}
                        >
                            תשובה חלקית (+5)
                        </button>
                    </div>

                    {points[selectedClass] > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg mt-4">
                            <h3 className="text-lg font-bold mb-2">פרסים אפשריים:</h3>
                            <ul className="space-y-2">
                                {points[selectedClass] >= 50 && <li className="text-right">✓ שעת יצירה (50 נקודות)</li>}
                                {points[selectedClass] >= 100 && <li className="text-right">✓ שיעור לבחירה (100 נקודות)</li>}
                                {points[selectedClass] >= 200 && <li className="text-right">✓ שיעור חופשי (200 נקודות)</li>}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}