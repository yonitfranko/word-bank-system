import { NextResponse } from 'next/server';
import clientPromise from '../db';

// פונקציה לקבלת נתונים - GET
export async function GET() {
    try {
        // התחברות למסד הנתונים
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        
        // שליפת כל הנקודות מהמסד
        const points = await db.collection("points").find({}).toArray();
        return NextResponse.json(points);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }
}

// פונקציה להוספת נתונים - POST
export async function POST(request) {
    try {
        // התחברות למסד הנתונים
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        
        // קבלת המידע שנשלח
        const data = await request.json();
        
        // הוספת המידע למסד הנתונים
        const result = await db.collection("points").insertOne(data);
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to add points' }, { status: 500 });
    }
}