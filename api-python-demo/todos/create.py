import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')


def create(event, context):
    data = json.loads(event['body'])
    if 'nombre' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    timestamp = int(time.time() * 1000)

    table = dynamodb.Table(os.environ['pythonTable'])

    item = {
        'id': str(uuid.uuid1()),
        'nombre': data['nombre'],
        'apellidos': data['apellidos'],
        'edad': data['edad'],
        'email': data['email'],
        'checked': False,
        'createdAt': timestamp,
        'updatedAt': timestamp,
    }

    # write the todo to the database
    table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(item)
    }

    return response
