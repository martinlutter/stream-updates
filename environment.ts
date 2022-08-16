declare let process: { env: { [key: string]: any } };

export const environment = {
    awsAccount: process.env.AWS_ACCOUNT,
    awsRegion: process.env.AWS_REGION,
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
    searchUrl: process.env.SEARCH_URL,
    previousStreamStatusParamName: process.env.PREVIOUS_STREAM_STATUS_PARAM_NAME,
    streamName: process.env.STREAM_NAME,
    streamLink: process.env.STREAM_LINK,
    searchByCssSelector: process.env.SEARCH_BY_CSS_SELECTOR,
};
