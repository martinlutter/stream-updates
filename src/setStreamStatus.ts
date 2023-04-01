import {SSM} from "aws-sdk";
import {environment} from "../environment.js";

export async function setStreamStatus(isOnline: boolean) {
    console.log('setting stream status to ' + isOnline.toString())

    const ssm = new SSM();
    await ssm.putParameter({
        Name: environment.previousStreamStatusParamName,
        Value: isOnline.toString(),
        Overwrite: true
    }).promise()
}
