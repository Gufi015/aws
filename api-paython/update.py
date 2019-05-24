import json
import os
import time
import logging
import decimalencoder
import boto3

dynamoDb = boto3.resource('dynamodb')


def update(event, context):
    data = json.loads(event['body'])

    if 'nombre' not in data or 'checked' not in data or 'apellidos' not in data or 'edad' not in data or 'email' not in data:
        logging.error('Validacion Fallida')
        raise Exception("No se pudo actualizar el elemento")
        return

    timestamp = int(time.time() * 1000)

    table = dynamoDb.Table(os.environ['python_users'])

    result = table.update_item(
        Key={
            'id': event['pathParameters']['id']
        },
        ExpressionAttributeNames={
            '#todo_nombre': 'nombre',
            '#todo_apellidos': 'apellidos',
            '#todo_edad': 'edad',
            '#todo_email': 'email'
        },
        ExpressionAttributeValues={
            ':nombre': data['nombre'],
            ':apellidos': data['apellidos'],
            ':edad': data['edad'],
            ':email': data['email'],
            ':checked': data['cheked'],
            ':actualizado': timestamp
        },
        UpdateExpression='SET #todo_nombre = :nombre,'
        'apellidos = :apellidos,'
        'edad = :edad,'
        'email = :email,'
        'checked = :checked,'
        'actualizado = :actualizado',
        ReturnValues='ALL_NEW',
    )

    response = {
        "statusCode": 200,
        "body": json.dumps(result['Attributes'],
                           cls=decimalencoder.DecimalEncoder)
    }

    return response
