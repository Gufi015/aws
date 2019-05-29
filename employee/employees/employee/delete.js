'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports.delete = (event, context, callback)=>{

    const params = {
        TableName: process.env.employees,
        Key:{
            id: event.pathParameters.id
        }
    };



    dynamodb.delete(params, (error)=>{
        if(error){
            console.log(error);

            callback(null,{
                statusCode: error.estatusCode || 501,
                headers:{'Content-Type':'application/json'},
                body: 'can`t  delete to item of database of table employees'
            });
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Item delete successful'
            })
        };
        
        callback(null, response);
    });
};