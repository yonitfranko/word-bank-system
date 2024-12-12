import { NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET() {
    console.log('GET request started');
    try {
        const client = await clientPromise;
        console.log('Connected to MongoDB');
        const db = client.db("word-bank-db");
        const collection = db.collection("points");
        
        const points = await collection.find({}).toArray();
        console.log('Retrieved points:', points);
        return NextResponse.json(points);
    } catch (e) {
        console.error('GET Error:', e);
        return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }
}

export async function POST(request) {
    console.log('POST request started');
    try {
        const client = await clientPromise;
        console.log('Connected to MongoDB');
        const db = client.db("word-bank-db");
        const collection = db.collection("points");
        
        const data = await request.json();
        console.log('Received data:', data);
        
        const result = await collection.insertOne(data);
        console.log('Saved to DB:', result);
        
        return NextResponse.json({ success: true, result });
    } catch (e) {
        console.error('POST Error:', e);
        return NextResponse.json({ error: 'Failed to add points', details: e.message }, { status: 500 });
    }
}