'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: process.env.USUARIOS_TABLE
};



module.exports.get = (event, context, callback) => {
    dynamoDb.scan(params, (error, result)=>{
        if(error){
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {'Content-Type': 'text/plain'},
                body: { 
                    message:"No se pudo obtener la informacion"
                }
            });
            return
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};