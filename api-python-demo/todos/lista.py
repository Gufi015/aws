import json
import os

from todos import decimalencoder

def lista(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = boto3.resource('dynamodb').Table('api-python-demo-dev')
    result = table.scan()

    response = json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)

    data = json.loads(response)
    print(data)

    # TODO implement
    return data
