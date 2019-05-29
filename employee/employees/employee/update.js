'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const time = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' ||  typeof data.checked !== 'boolean') {
    console.error('Validation Failed'+ error);
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: "No se actualizo el item."
    });
    return;
  }

  const params = {
    TableName: process.env.employees,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#employee': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':age': data.age,
      ':mail': data.mail,
      ':checked': data.checked,
      ':updateAt': time
    },
    UpdateExpression: 'SET #employee = :name, age = :age, mail = :mail,  checked = :checked, updateAt = :updateAt',
    ReturnValues: 'ALL_NEW'
  };

  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'application/json' },
        body: "Couldn't fetch the employee item."
      });
      return;
    };

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    console.log(response);
    callback(null, response);
  });
};
