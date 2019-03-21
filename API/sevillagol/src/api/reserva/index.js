import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reserva, { schema } from './model'
import { password as passwordAuth, master, token } from '../../services/passport'

const router = new Router()
const { fecha, idUsuario, idPista } = schema.tree

/**
 * @api {post} /reservas Create reserva
 * @apiName CreateReserva
 * @apiGroup Reserva
 * @apiParam fecha Reserva's fecha.
 * @apiParam idUsuario Reserva's idUsuario.
 * @apiParam idPista Reserva's idPista.
 * @apiSuccess {Object} reserva Reserva's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reserva not found.
 */
router.post('/',
  token({ required: true }),
  body({ fecha, idUsuario, idPista }),
  create)

/**
 * @api {get} /reservas Retrieve reservas
 * @apiName RetrieveReservas
 * @apiGroup Reserva
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of reservas.
 * @apiSuccess {Object[]} rows List of reservas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /reservas/:id Retrieve reserva
 * @apiName RetrieveReserva
 * @apiGroup Reserva
 * @apiSuccess {Object} reserva Reserva's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reserva not found.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /reservas/:id Update reserva
 * @apiName UpdateReserva
 * @apiGroup Reserva
 * @apiParam fecha Reserva's fecha.
 * @apiParam idUsuario Reserva's idUsuario.
 * @apiParam idPista Reserva's idPista.
 * @apiSuccess {Object} reserva Reserva's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reserva not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ fecha, idUsuario, idPista }),
  update)

/**
 * @api {delete} /reservas/:id Delete reserva
 * @apiName DeleteReserva
 * @apiGroup Reserva
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reserva not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
