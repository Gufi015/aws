'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const params ={
    TableName: process.env.employees
};



module.exports.list = (event, context, callback)=>{

    dynamodb.scan(params, (error, result)=>{
        if(error){
            console.log(error);

            callback(null, {
                statusCode: error.statusCode || 502,
                headers:{'Content-Type':'application/json'},
                body: "Error to get items of database dynamodb"
            });
            return;
        }


        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };

        callback(null, response);
    });
};  