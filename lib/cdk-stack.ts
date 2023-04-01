import * as cdk from 'aws-cdk-lib';
import {aws_events_targets, aws_lambda, aws_lambda_nodejs, aws_ssm, Duration, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Rule, Schedule} from "aws-cdk-lib/aws-events";
import {RetentionDays} from "aws-cdk-lib/aws-logs";

interface CdkStackProps extends StackProps {
    discordWebhookUrl: string;
    searchUrl: string;
    previousStreamStatusParamName: string;
    streamName: string;
    streamLink: string;
    searchByCssSelector: string;
}

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CdkStackProps) {
        super(scope, id, props);

        const streamOnlineParam = new aws_ssm.StringParameter(this, 'wasStreamOnline', {
            stringValue: 'false',
            parameterName: 'wasStreamOnline',
        })

        const lambda = new aws_lambda_nodejs.NodejsFunction(this, 'mainFunction', {
            handler: 'handler',
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(5),
            memorySize: 512,
            environment: {
                DISCORD_WEBHOOK_URL: props.discordWebhookUrl,
                SEARCH_URL: props.searchUrl,
                PREVIOUS_STREAM_STATUS_PARAM_NAME: props.previousStreamStatusParamName,
                STREAM_NAME: props.streamName,
                STREAM_LINK: props.streamLink,
                SEARCH_BY_CSS_SELECTOR: props.searchByCssSelector,
            },
            bundling: {
                minify: true,
                nodeModules: ['jsdom'],
                externalModules: ['canvas'],
                sourceMap: false,
            },
            logRetention: RetentionDays.THREE_MONTHS,
        })

        streamOnlineParam.grantRead(lambda)
        streamOnlineParam.grantWrite(lambda)

        const lambdaCronRule = new Rule(this, 'lambda-cron', {
            schedule: Schedule.rate(Duration.minutes(5)),
            targets: [new aws_events_targets.LambdaFunction(lambda)],
        })
    }
}
