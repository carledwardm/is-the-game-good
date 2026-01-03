import { NextResponse, NextRequest } from 'next/server';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export async function GET(req: NextRequest) {
    try {
        const url  = req.nextUrl.pathname;
        const id = url.split("/").pop();
        console.log(id);
        if (!id) {
            return NextResponse.json({ error: 'ID not found'}, { status: 400 });
        }
        
        const docRef = doc(db, "games", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log("404!")
            return NextResponse.json({ error: "Game not found" }, { status: 400 })
        }

        return NextResponse.json(docSnap.data());
        
    } catch (error) {
        return NextResponse.json({ error: "An unexpected error has occurred" }, {status: 500 });
    }
}