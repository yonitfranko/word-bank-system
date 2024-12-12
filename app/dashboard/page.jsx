'use client';
import React, { useState, useEffect } from 'react';

export default function DashboardPage() {
    const [points, setPoints] = useState({});
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // טעינת הנתונים רק בצד הלקוח
        const storedPoints = localStorage.getItem('points');
        const storedHistory = localStorage.getItem('history');

        if (storedPoints) setPoints(JSON.parse(storedPoints));
        if (storedHistory) setHistory(JSON.parse(storedHistory));
    }, []);

    // חישוב סטטיסטיקות
    const totalPoints = Object.values(points).reduce((sum, curr) => sum + curr, 0);
    const activeClasses = Object.keys(points).length;
    const totalRewards = history.filter(h => h.type === 'spent').length;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4" dir="rtl">
            <div className="flex justify-between items-center mb-8">
                <a
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    חזרה לדף הראשי
                </a>
                <h1 className="text-4xl font-bold">דשבורד מנהלת</h1>
            </div>

            {/* סיכום נתונים */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">סך הכל נקודות</h3>
                    <p className="text-3xl">{totalPoints}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">כיתות פעילות</h3>
                    <p className="text-3xl">{activeClasses}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">פרסים שחולקו</h3>
                    <p className="text-3xl">{totalRewards}</p>
                </div>
            </div>

            {/* נתונים לפי כיתה */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">נקודות לפי כיתה</h2>
                <div className="grid gap-4">
                    {Object.entries(points).map(([className, points]) => (
                        <div key={className} className="flex justify-between items-center p-2 border-b">
                            <span className="font-bold">כיתה {className}</span>
                            <span>{points} נקודות</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* היסטוריית פעילות */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">היסטוריית פעילות אחרונה</h2>
                <div className="space-y-2">
                    {history.slice(0, 10).map((entry, index) => (
                        <div key={index} className="p-2 border-b">
                            {entry.date} - כיתה {entry.class} - {' '}
                            {entry.type === 'earned'
                                ? `הרוויח ${entry.points} נקודות`
                                : `קנה ${entry.reward} (-${Math.abs(entry.points)} נקודות)`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}