import json
import os
import decimalencoder
import boto3

dynamoDb = boto3.resource('dynamodb')


def list(event, context):
    table = dynamoDb.Table(os.environ['python_users'])

    result = table.scan()

    response = {
        "statusCode": 200,
        "body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)
    }

    return response
