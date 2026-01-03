import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../firebase-admin.json"

const adminApp = initializeApp({
    credential: cert(serviceAccount as any),
})

export default adminApp;