import json
import os

from todos import decimalencoder
import decimalencoder

def lista(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = boto3.resource('dynamodb').Table(os.environ['pythonTable'])
    result = table.scan()

    response = json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)

    data = json.loads(response)
    print(data)

    # TODO implement
    return data