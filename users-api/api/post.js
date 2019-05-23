'use strict'

const uuid = require('uuid')
const AWS = require('aws-sdk')

const dinamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.post = (event, context, callback) => {
  const tiempo = new Date().getTime()
  console.log(tiempo)
  console.log(event)

  const data = JSON.parse(event.body)

  if (typeof data.nombre && data.apellidos && data.email && data.telefono !== 'string' ) {
    console.error('No hay ninguna cadena')
    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain'},
      body: {
        message: 'Error al crear el elemento'
      }
    })
    return
  }

  const params = {
    TableName: process.env.USUARIOS_TABLE,
    Item: {
      id: uuid.v1(),
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      telefono: data.telefono,
      check: false,
      creado: tiempo,
      actualizado: tiempo
    }
  }

  dinamoDb.put(params, (error, result) => {

    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'error al intentar agregar un elemento'
      })
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }

    callback(null, response)
  })
}
