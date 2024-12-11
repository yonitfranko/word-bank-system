'use client';
import React, { useState } from 'react';

// רשימת הפרסים המלאה
const REWARDS = [
    { id: 1, name: 'שעת יצירה', cost: 50 },
    { id: 2, name: 'זמן משחק כיתתי', cost: 60 },
    { id: 3, name: 'זמן מחשבים', cost: 70 },
    { id: 4, name: 'סרט עם פופקורן', cost: 80 },
    { id: 5, name: 'שיעור לבחירה', cost: 100 },
    { id: 6, name: 'שיעור חופשי', cost: 200 },
    { id: 7, name: 'יום ללא תיק', cost: 600 },
    { id: 8, name: 'סרט במדיה טק', cost: 700 },
    { id: 9, name: 'פעילות גיבוש כיתתית', cost: 800 }
];

export default function HomePage() {
    const [selectedClass, setSelectedClass] = useState('');
    const [points, setPoints] = useState({});
    const [history, setHistory] = useState([]);
    const classes = ['א1', 'א2', 'א3', 'א4', 'ב1', 'ב2', 'ב3', 'ב4'];

    const addPoints = (classId, amount) => {
        setPoints(prev => ({
            ...prev,
            [classId]: (prev[classId] || 0) + amount
        }));
        setHistory(prev => [...prev, {
            date: new Date().toLocaleDateString('he-IL'),
            class: classId,
            points: amount,
            type: 'earned'
        }]);
    };

    const buyReward = (reward) => {
        if (!selectedClass) return;
        const currentPoints = points[selectedClass] || 0;
        if (currentPoints >= reward.cost) {
            setPoints(prev => ({
                ...prev,
                [selectedClass]: prev[selectedClass] - reward.cost
            }));
            setHistory(prev => [...prev, {
                date: new Date().toLocaleDateString('he-IL'),
                class: selectedClass,
                points: -reward.cost,
                reward: reward.name,
                type: 'spent'
            }]);
            alert(`פרס נקנה בהצלחה: ${reward.name}`);
        } else {
            alert('אין מספיק נקודות לקניית הפרס');
        }
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

                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h3 className="text-lg font-bold mb-4 text-right">פרסים זמינים:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {REWARDS.map(reward => (
                                <div
                                    key={reward.id}
                                    className={`p-4 rounded-lg border ${(points[selectedClass] || 0) >= reward.cost ? 'bg-white' : 'bg-gray-100'}`}
                                >
                                    <div className="text-right mb-2">
                                        <span className="font-bold">{reward.name}</span>
                                        <span className="text-gray-600"> - {reward.cost} נקודות</span>
                                    </div>
                                    <button
                                        onClick={() => buyReward(reward)}
                                        disabled={(points[selectedClass] || 0) < reward.cost}
                                        className={`w-full py-2 rounded ${(points[selectedClass] || 0) >= reward.cost
                                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {(points[selectedClass] || 0) >= reward.cost ? 'קנה פרס' : 'אין מספיק נקודות'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {history.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-4 text-right">היסטוריית פעילות:</h3>
                            <div className="space-y-2">
                                {history
                                    .filter(entry => entry.class === selectedClass)
                                    .map((entry, index) => (
                                        <div key={index} className="text-right p-2 border-b">
                                            {entry.date} - {' '}
                                            {entry.type === 'earned'
                                                ? `הרוויח ${entry.points} נקודות`
                                                : `קנה ${entry.reward} (-${Math.abs(entry.points)} נקודות)`}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}