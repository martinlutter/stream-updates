import fetch from "node-fetch";
import {environment} from "../environment.js";

export async function sendDiscordMessage(streamName: string, streamLink: string) {
    console.log('sending discord message')

    return fetch(environment.discordWebhookUrl, {
        method: 'post',
        body: JSON.stringify({
            content: `@everyone ${streamName} is online ${streamLink}`
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => {
        r.text().then(text => console.log(text))
    })
}
