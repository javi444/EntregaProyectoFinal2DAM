import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Reserva } from '.'

const app = () => express(apiRoot, routes)

let reserva

beforeEach(async () => {
  reserva = await Reserva.create({})
})

test('POST /reservas 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ fecha: 'test', idUsuario: 'test', idPista: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fecha).toEqual('test')
  expect(body.idUsuario).toEqual('test')
  expect(body.idPista).toEqual('test')
})

test('GET /reservas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /reservas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reserva.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reserva.id)
})

test('GET /reservas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /reservas/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reserva.id}`)
    .send({ fecha: 'test', idUsuario: 'test', idPista: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reserva.id)
  expect(body.fecha).toEqual('test')
  expect(body.idUsuario).toEqual('test')
  expect(body.idPista).toEqual('test')
})

test('PUT /reservas/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ fecha: 'test', idUsuario: 'test', idPista: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reservas/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reserva.id}`)
  expect(status).toBe(204)
})

test('DELETE /reservas/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
