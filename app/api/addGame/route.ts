import { NextResponse, NextRequest } from 'next/server';
import twitchCreds from '@/lib/twitchIGDBConfig';

export async function POST(req: NextRequest) {
    const data = await req.json();
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
        return NextResponse.json({error: "No results found, please check your search parameters and try again"}, {status: 400});
    }
    const searchData = await response.json();
    return NextResponse.json(searchData)
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch IGDB data"}, { status: 500 })
    }
}