import {SSM} from "aws-sdk";
import {environment} from "../environment.js";

export async function setStreamStatus(isOnline: boolean) {
    const ssm = new SSM();
    await ssm.putParameter({
        Name: environment.previousStreamStatusParamName,
        Value: isOnline ? 'true' : 'false',
        Overwrite: true
    }).promise()
}
