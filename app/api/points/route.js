import { NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        const collection = db.collection("points");
        
        // מביא את הנתונים האחרונים של כל כיתה
        const points = await collection.find({}).sort({ date: -1 }).toArray();
        
        // מארגן את הנתונים לפורמט שאנחנו צריכים
        const latestPoints = points.reduce((acc, curr) => {
            acc[curr.classId] = (acc[curr.classId] || 0) + curr.amount;
            return acc;
        }, {});

        return NextResponse.json(latestPoints);
    } catch (e) {
        console.error('GET Error:', e);
        return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        const collection = db.collection("points");
        
        const data = await request.json();
        console.log('Received data:', data); // לוג לבדיקה
        
        // הוספת חותמת זמן
        const pointsData = {
            ...data,
            timestamp: new Date()
        };
        
        const result = await collection.insertOne(pointsData);
        console.log('Saved to DB:', result); // לוג לבדיקה
        
        return NextResponse.json({ success: true, result });
    } catch (e) {
        console.error('POST Error:', e);
        return NextResponse.json({ error: 'Failed to add points' }, { status: 500 });
    }
}