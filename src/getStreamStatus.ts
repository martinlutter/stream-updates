import fetch from 'node-fetch';
import {environment} from "../environment.js";
import {JSDOM} from "jsdom";

interface StreamStatus {
    streamName: string
    isOnline: boolean
}

export async function getStreamStatus(streamName: string): Promise<StreamStatus> {
    const response = await fetch(environment.searchUrl);
    const parsedWebsite = new JSDOM(await response.text());
    const foundStreamLink = parsedWebsite.window.document.querySelector(environment.searchByCssSelector);

    return {
        streamName,
        isOnline: foundStreamLink !== null
    };
}
