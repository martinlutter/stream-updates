#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CdkStack} from '../lib/cdk-stack';
import * as dotenv from 'dotenv';

declare let process: { env: { [key: string]: any } };

dotenv.config();

const app = new cdk.App();
new CdkStack(app, 'StreamUpdatesStack', {
    env: {account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION},
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
    searchUrl: process.env.SEARCH_URL,
    previousStreamStatusParamName: process.env.PREVIOUS_STREAM_STATUS_PARAM_NAME,
    streamName: process.env.STREAM_NAME,
    streamLink: process.env.STREAM_LINK,
    searchByCssSelector: process.env.SEARCH_BY_CSS_SELECTOR,
});
