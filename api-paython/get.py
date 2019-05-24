import json
import os
import decimalencoder
import boto3

dynamoDb = boto3.resource('dynamodb')


def get(event, context):
    table = dynamoDb.Table(os.environ['python_users'])

    result = table.get_item(
        key={
            'id': event['pathParameters']['id']
        }
    )

    response = {
        "statusCode": 200,
        "body": json.dumps(result['Item'],
                           cls=decimalencoder.DecimalEncoder)
    }

    return response