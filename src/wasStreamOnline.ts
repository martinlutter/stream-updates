import {SSM} from "aws-sdk";
import {environment} from "../environment.js";

export async function wasStreamOnline() {
    const ssm = new SSM();
    const parameter = await ssm.getParameter({
        Name: environment.previousStreamStatusParamName,
        WithDecryption: false
    }).promise();

    return parameter.Parameter?.Value === 'true';
}
