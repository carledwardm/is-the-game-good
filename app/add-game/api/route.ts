import { NextResponse } from 'next/server';
import twitchCreds from '@/lib/twitchIGDBConfig';

export async function POST(req: Request) {
    const data = await req.json();
    console.log(data);
    const url = "https://api.igdb.com/v4/games";
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Client-ID': twitchCreds.twitchClientID!,
            'Authorization': `Bearer ${twitchCreds.twitchAccessToken}`,
            'Accept': 'application/json',
        },
        body: `search "${data.gameTitle}"; fields name, id, first_release_date, artworks.url, screenshots.url; limit ${data.gameSearchLimit}; `
    });
    if (!response.ok) {
        throw new Error("Unable to complete search, please try again.");
    }
    const searchData = await response.json();
    console.log(searchData);
    return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Failed to fetch IGDB data"}, { status: 500 })
    }
}