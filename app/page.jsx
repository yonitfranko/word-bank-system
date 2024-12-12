'use client';
import React, { useState } from 'react';

export default function HomePage() {
    const [selectedClass, setSelectedClass] = useState('');
    const [points, setPoints] = useState({});
    const [history, setHistory] = useState([]);
    const classes = ['א1', 'א2', 'א3', 'א4', 'ב1', 'ב2', 'ב3', 'ב4', 'ג1', 'ג2', 'ג3', 'ג4',
        'ד1', 'ד2', 'ד3', 'ד4', 'ה1', 'ה2', 'ה3', 'ה4', 'ו1', 'ו2', 'ו3', 'ו4'];

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/api/points');
                const data = await response.json();
                if (data) {
                    setPoints(data);
                }
            } catch (error) {
                console.error('Error loading points:', error);
            }
        }
        loadData();
    }, []);

    const REWARDS = [
        { id: 1, name: 'שעת יצירה', cost: 50 },
        { id: 2, name: 'זמן משחק כיתתי', cost: 60 },
        { id: 3, name: 'זמן מחשבים', cost: 70 },
        { id: 4, name: 'סרט עם פופקורן', cost: 80 },
        { id: 5, name: 'הורה מפעיל', cost: 90 },
        { id: 6, name: 'שיעור לבחירה', cost: 100 },
        { id: 7, name: 'פעילות עם הורים', cost: 150 },
        { id: 8, name: 'שיעור חופשי', cost: 200 },
        { id: 9, name: 'ארטיק/שלוק/גלידה', cost: 250 },
        { id: 10, name: 'העברת פעילות לכיתה אחרת', cost: 300 },
        { id: 11, name: 'ארוחה כיתתית בחצר ביהס', cost: 350 },
        { id: 12, name: 'יום ישיבה חופשית', cost: 400 },
        { id: 13, name: 'למידה מחוץ לכיתה', cost: 450 },
        { id: 14, name: 'משחק קופסה לכיתה', cost: 500 },
        { id: 15, name: 'יום ללא תיק', cost: 600 },
        { id: 16, name: 'סרט במדיה טק', cost: 700 },
        { id: 17, name: 'פעילות גיבוש כיתתית', cost: 800 },
        { id: 18, name: 'פעילות באולינג', cost: 900 },
        { id: 19, name: 'פארק חבלים', cost: 1000 }
    ];

    // בדיוק מעל ה-return
    const addPoints = async (classId, amount) => {
        try {
            // הוספת לוג לבדיקה
            console.log('Trying to add points:', { classId, amount });

            const response = await fetch('/api/points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classId,
                    amount,
                    date: new Date().toISOString()
                })
            });

            // הוספת לוג לבדיקת התשובה
            console.log('Response:', response);

            if (response.ok) {
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
            } else {
                console.error('Failed to add points:', await response.text());
            }
        } catch (error) {
            console.error('Error adding points:', error);
        }
    };

    const buyReward = async (reward) => {
        if (!selectedClass) return;
        const currentPoints = points[selectedClass] || 0;
        if (currentPoints >= reward.cost) {
            try {
                const response = await fetch('/api/points', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        classId: selectedClass,
                        amount: -reward.cost,
                        reward: reward.name,
                        date: new Date().toISOString()
                    })
                });

                if (response.ok) {
                    setPoints(prev => ({
                        ...prev,
                        [selectedClass]: currentPoints - reward.cost
                    }));

                    setHistory(prev => [...prev, {
                        date: new Date().toLocaleDateString('he-IL'),
                        class: selectedClass,
                        points: -reward.cost,
                        reward: reward.name,
                        type: 'spent'
                    }]);

                    alert(`פרס נקנה בהצלחה: ${reward.name}`);
                }
            } catch (error) {
                console.error('Error buying reward:', error);
                alert('אירעה שגיאה בקניית הפרס');
            }
        } else {
            alert('אין מספיק נקודות לקניית הפרס');
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <a
                    href="/dashboard"
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                    דשבורד מנהלת
                </a>
                <h1 className="text-4xl font-bold">מערכת בנק המילים</h1>
            </div>

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
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-150"
                            onClick={() => addPoints(selectedClass, 10)}
                        >
                            תשובה מלאה (+10)
                        </button>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition duration-150"
                            onClick={() => addPoints(selectedClass, 5)}
                        >
                            תשובה חלקית (+5)
                        </button>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h3 className="text-lg font-bold mb-4 text-right">פרסים זמינים:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                        className={`w-full py-2 rounded transition duration-150 ${(points[selectedClass] || 0) >= reward.cost
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
                            <div className="space-y-2 border rounded-lg p-4">
                                {history
                                    .filter(entry => entry.class === selectedClass)
                                    .reverse()
                                    .map((entry, index) => (
                                        <div key={index} className="text-right p-2 border-b last:border-b-0">
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