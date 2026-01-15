"use client";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function userReviewPage() {
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const fetchReviewData = () => {
            return
        }
        fetchReviewData();
    }, [])

    return (
        <h1>Welcome to user reviews! Rating functionality will follow.</h1>
    )
}