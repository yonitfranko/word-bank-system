import { NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        
        const points = await db.collection("points").find({}).toArray();
        return NextResponse.json(points);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("word-bank-db");
        const data = await request.json();
        
        console.log('Received data:', data); // לוג חדש

        const result = await db.collection("points").insertOne(data);
        console.log('Saved to DB:', result); // לוג חדש
        
        return NextResponse.json(result);
    } catch (e) {
        console.error('DB Error:', e); // לוג משופר
        return NextResponse.json({ error: 'Failed to add points' }, { status: 500 });
    }
}