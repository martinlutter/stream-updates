import fetch from 'node-fetch';
import {environment} from "../environment.js";
import {JSDOM} from "jsdom";

interface StreamStatus {
    streamName: string
    isOnline: boolean
}

export async function getStreamStatus(streamName: string): Promise<StreamStatus> {
    const response = await fetch(environment.searchUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:111.0) Gecko/20100101 Firefox/111.0',
        }
    });
    const html = await response.text();
    console.log(html);

    const parsedWebsite = new JSDOM(html);
    const foundStreamLink = parsedWebsite.window.document.querySelector(environment.searchByCssSelector);

    return {
        streamName,
        isOnline: foundStreamLink !== null
    };
}
