import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import adminApp from "@/lib/firebaseAdminConfig";

export async function PATCH(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();
    const app = adminApp;
    const auth = getAuth(app);
    try {
        if (!id) {
            return NextResponse.json({ error: "ID not found" }, { status: 400 });
        }
        await auth.setCustomUserClaims(id, { admin: true });
        return NextResponse.json( { message: "Admin claim successfully set" }, { status: 200 } ); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "There was a unexpected error" }, { status: 500 });
    }
}