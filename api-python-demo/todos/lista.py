import json
import os

from todos import decimalencoder

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = boto3.resource('dynamodb').Table('python')
    result = table.scan()

    # TODO implement
    response = {
        'statusCode': 200,
        'body': json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)
    }

    return response
