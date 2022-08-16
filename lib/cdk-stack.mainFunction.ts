import {getStreamStatus} from "../src/getStreamStatus.js";
import {sendDiscordMessage} from "../src/sendDiscordMessage.js";
import {CloudWatchLogsEvent, Context} from "aws-lambda";
import {wasStreamOnline} from "../src/wasStreamOnline";
import {setStreamStatus} from "../src/setStreamStatus";
import {environment} from "../environment.js";

export const handler = async (event: CloudWatchLogsEvent, context: Context) => {
    const wasStreamOnlineBefore = await wasStreamOnline();

    const streamStatus = await getStreamStatus(environment.streamName);

    if (streamStatus.isOnline && !wasStreamOnlineBefore) {
        await setStreamStatus(true)
        await sendDiscordMessage(streamStatus.streamName, environment.streamLink)
    }

    if (!streamStatus.isOnline && wasStreamOnlineBefore) {
        await setStreamStatus(false)
    }

    return streamStatus;
}
