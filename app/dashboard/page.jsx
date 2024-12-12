'use client';
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [data, setData] = useState({
        points: {},
        history: []
    });

    useEffect(() => {
        // טעינת נתונים רק בצד הלקוח
        if (typeof window !== 'undefined') {
            const points = JSON.parse(localStorage.getItem('points') || '{}');
            const history = JSON.parse(localStorage.getItem('history') || '[]');
            setData({ points, history });
        }
    }, []);

    // חישוב סטטיסטיקות
    const calculateStats = () => {
        const totalPoints = Object.values(data.points).reduce((sum, curr) => sum + curr, 0);
        const activeClasses = Object.keys(data.points).length;
        const rewards = data.history.filter(h => h.type === 'spent');
        const totalRewards = rewards.length;
        const topClass = Object.entries(data.points)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || 'אין';

        return { totalPoints, activeClasses, totalRewards, topClass };
    };

    const stats = calculateStats();

    // מיון כיתות לפי נקודות
    const sortedClasses = Object.entries(data.points)
        .sort(([, a], [, b]) => b - a);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4" dir="rtl">
            {/* כותרת וניווט */}
            <div className="flex justify-between items-center mb-8">
                <a
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    חזרה למערכת
                </a>
                <h1 className="text-4xl font-bold">דשבורד מנהלת</h1>
            </div>

            {/* קופסאות סטטיסטיקה */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-bold mb-2">סך הכל נקודות</h3>
                    <p className="text-3xl text-blue-600">{stats.totalPoints}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-bold mb-2">כיתות פעילות</h3>
                    <p className="text-3xl text-green-600">{stats.activeClasses}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-bold mb-2">פרסים שחולקו</h3>
                    <p className="text-3xl text-yellow-600">{stats.totalRewards}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-bold mb-2">כיתה מובילה</h3>
                    <p className="text-3xl text-purple-600">כיתה {stats.topClass}</p>
                </div>
            </div>

            {/* טבלת דירוג כיתות */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">דירוג כיתות</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-right">דירוג</th>
                                <th className="px-4 py-2 text-right">כיתה</th>
                                <th className="px-4 py-2 text-right">נקודות</th>
                                <th className="px-4 py-2 text-right">פרסים שנקנו</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedClasses.map(([className, points], index) => {
                                const classRewards = data.history.filter(h =>
                                    h.class === className && h.type === 'spent'
                                ).length;

                                return (
                                    <tr key={className} className="border-b">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">כיתה {className}</td>
                                        <td className="px-4 py-2">{points}</td>
                                        <td className="px-4 py-2">{classRewards}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* היסטוריית פעילות */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">היסטוריית פעילות אחרונה</h2>
                <div className="space-y-2">
                    {data.history.slice(0, 15).reverse().map((entry, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${entry.type === 'earned' ? 'bg-green-50' : 'bg-blue-50'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold">כיתה {entry.class}</span>
                                <span className="text-gray-600">{entry.date}</span>
                            </div>
                            <div className="mt-1">
                                {entry.type === 'earned'
                                    ? `הרוויח ${entry.points} נקודות`
                                    : `רכש ${entry.reward} (-${Math.abs(entry.points)} נקודות)`
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}