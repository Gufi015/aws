'use strict'

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const time = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: "Couldn't update the item."
    });
    return;
  }

  const params = {
    TableName: process.env.employees,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#employee': 'name'
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':checked': data.checked,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET #employee = :name, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'application/json' },
        body: "Couldn't fetch the employee item."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    callback(null, response);
  });
};
