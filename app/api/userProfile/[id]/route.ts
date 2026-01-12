import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.pathname;
        const id = url.split("/").pop();
        if (!id) {
            return NextResponse.json({error: "User not found"}, {status: 400})
        }
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({error: "User not found"}, {status: 400})
        }

        return NextResponse.json({id: docSnap.id, ...docSnap.data()}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: "An error has occurred"}, {status: 500})
    }
}