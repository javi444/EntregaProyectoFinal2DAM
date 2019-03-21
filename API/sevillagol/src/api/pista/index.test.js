import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Pista } from '.'

const app = () => express(apiRoot, routes)

let pista

beforeEach(async () => {
  pista = await Pista.create({})
})

test('POST /pistas 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', cubierta: 'test', precio: 'test', idCentro: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.cubierta).toEqual('test')
  expect(body.precio).toEqual('test')
  expect(body.idCentro).toEqual('test')
})

test('GET /pistas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pistas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pista.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pista.id)
})

test('GET /pistas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /pistas/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pista.id}`)
    .send({ nombre: 'test', cubierta: 'test', precio: 'test', idCentro: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pista.id)
  expect(body.nombre).toEqual('test')
  expect(body.cubierta).toEqual('test')
  expect(body.precio).toEqual('test')
  expect(body.idCentro).toEqual('test')
})

test('PUT /pistas/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', cubierta: 'test', precio: 'test', idCentro: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pistas/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pista.id}`)
  expect(status).toBe(204)
})

test('DELETE /pistas/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
