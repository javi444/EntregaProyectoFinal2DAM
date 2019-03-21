import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Centro } from '.'

const app = () => express(apiRoot, routes)

let centro

beforeEach(async () => {
  centro = await Centro.create({})
})

test('POST /centros 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', descripcion: 'test', direccion: 'test', localizacion: 'test', imagenes: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.direccion).toEqual('test')
  expect(body.localizacion).toEqual('test')
  expect(body.imagenes).toEqual('test')
})

test('GET /centros 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /centros/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${centro.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(centro.id)
})

test('GET /centros/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /centros/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${centro.id}`)
    .send({ nombre: 'test', descripcion: 'test', direccion: 'test', localizacion: 'test', imagenes: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(centro.id)
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.direccion).toEqual('test')
  expect(body.localizacion).toEqual('test')
  expect(body.imagenes).toEqual('test')
})

test('PUT /centros/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', descripcion: 'test', direccion: 'test', localizacion: 'test', imagenes: 'test' })
  expect(status).toBe(404)
})

test('DELETE /centros/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${centro.id}`)
  expect(status).toBe(204)
})

test('DELETE /centros/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
