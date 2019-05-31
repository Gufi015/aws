'use strict'

const uuid = require('uuid')
const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {

  const time = new Date().getTime()
  const data = JSON.parse(event.body)

  if (typeof data.name !== 'string') {
    console.log('validación error')

    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'application/json'},
      body: 'error al crear el elemento'
    })
    return
  }

  const params = {
    TableName: process.env.employees,
    Item: {
      id: uuid.v1(),
      name: data.name,
      age: data.age,
      mail: data.mail,
      checked: false,
      createAt: time,
      updateAt: time
    }
  }

  dynamodb.put(params, (error) => {
    if (error) {
      console.log(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'application/json'},
        body: 'no se pudo crear el elemento'
      })
      return
    }
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
