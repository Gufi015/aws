import json
import os
import logging
import uuid
import time

import boto3


dynamoDb = boto3.resource('dynamodb')


def create(event, context):
    data = json.loads(event['body'])

    # if 'nombre' and 'apellidos' and 'edad' and 'email' not in data:
    #     logging.error('Validacion fallida')
    #     raise Exception("No se creó el elemento")

    timestamp = int(time.time() * 1000)

    table = dynamoDb.Table(os.environ('python_users'))

    item = {
        'id': str(uuid.uuid1()),
        'nombre': data['nombre'],
        'apellidos': data['apellidos'],
        'edad': data['edad'],
        'email': data['email'],
        'checked': False,
        'creado': timestamp,
        'actualizado': timestamp
    }

    table.put_item(Item=item)

    response = {
        "statusCode": 200,
        "body": json.dumps(item)
    }

    return response
