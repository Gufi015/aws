'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);


    if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
        console.error('ERROR en la validacion');

        callback(null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: 'no se pudo actualizar el elemento',
        });

        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeNames:{
            '#todo_text': 'text'
        },
        ExpressionAttributeValues:{
            ':text': data.text,
            ':checked': data.checked,
            ':updatedAt': timestamp
        },
        UpdateExpression: 'SET #todo_text = :text, checked = :checked, updateAt = :updateAt',
        ReturnValues: 'ALL_NEW'
    };

    dynamoDb.update(params, (error, result)=>{
        if(error){
            console.error(error);
            callback(null,{
                statusCode: error.statusCode || 501,
                headers: {'Content-Type': 'text/plain'},
                body: 'no se pudo actualizar el elemento'
            });
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};