'use strict';


const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();



module.exports.get = (event, context, callback)=>{


    const params = {
        TableName: process.env.employees,
        Key:{
            id: event.pathParameters.id
        }
    };



    dynamodb.get(params, (error, result)=>{

        if(error){
            console.log(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers:{'Content-Type':'application/json'},
                body: 'don`t get id item of database dynamodb',
            });

            return;
        }

        const response ={
            statusCode: 200,
            headers:{'Content-Type':'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(result.Item)
        };

        callback(null, response);
    });
};