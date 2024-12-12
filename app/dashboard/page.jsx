'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DashboardPage() {
    const points = JSON.parse(localStorage.getItem('points') || '{}');
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    // חישוב סטטיסטיקות
    const totalPoints = Object.values(points).reduce((sum, curr) => sum + curr, 0);
    const activeClasses = Object.keys(points).length;
    const totalRewards = history.filter(h => h.type === 'spent').length;

    // נתונים לגרף נקודות לפי כיתה
    const classData = Object.entries(points).map(([className, points]) => ({
        name: className,
        points: points
    }));

    return (
        <div className="max-w-6xl mx-auto py-8 px-4" dir="rtl">
            <h1 className="text-4xl font-bold mb-8">דשבורד מנהלת</h1>

            {/* סיכום נתונים */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">סך הכל נקודות</h3>
                    <p className="text-3xl">{totalPoints}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">כיתות פעילות</h3>
                    <p className="text-3xl">{activeClasses}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">פרסים שחולקו</h3>
                    <p className="text-3xl">{totalRewards}</p>
                </div>
            </div>

            {/* גרף נקודות לפי כיתה */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">נקודות לפי כיתה</h2>
                <BarChart width={800} height={400} data={classData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" fill="#8884d8" name="נקודות" />
                </BarChart>
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