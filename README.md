## stream-updates
This project checks the contents of a website to see if it contains a css path (of a stream).  
If it does then it posts a message to a Discord webhook.

We deploy a Lambda function to AWS and trigger it every 5 minutes with EventBus.
It also stores the last stream status (online/offline) to a variable in the Parameter store, so we only send the message the first time the stream comes online.

## Requirements
- an AWS account
- node + npm installed
- cdk installed globally
- a Discord webhook url

## Deployment
1. run `npm i`
2. create `.env` file from `.env.dist` and fill the vars
3. run `cdk deploy --profile=<your aws profile>`

## Todo:
- lower the size of the deployed Lambda (currently over 50mb??????????)
- add linter
- use github actions?
