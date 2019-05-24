import os
import boto3

dynamoDb = boto3.resource('dynamodb')


def delete(event, context):
    table = dynamoDb.Table(os.environ['python_users'])

    table.detate_item(
        Key={
            'id': event['pathParameters']['id']
        }
    )

    response = {
        "statusCode": 200,
        "body":{
            "message": "Elemento eliminado"
        }
    }

    return response
