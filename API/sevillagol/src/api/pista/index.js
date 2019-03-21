import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, showPistasCentros } from './controller'
import { schema } from './model'
export Pista, { schema } from './model'
import { password as passwordAuth, master, token } from '../../services/passport'

const router = new Router()
const { nombre, cubierta, precio, idCentro } = schema.tree

/**
 * @api {post} /pistas Create pista
 * @apiName CreatePista
 * @apiGroup Pista
 * @apiParam nombre Pista's nombre.
 * @apiParam cubierta Pista's cubierta.
 * @apiParam precio Pista's precio.
 * @apiParam idCentro Pista's idCentro.
 * @apiSuccess {Object} pista Pista's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pista not found.
 */
router.post('/:id',
  token({ required: true }),
  body({ nombre, cubierta, precio, idCentro}),
  create)

/**
 * @api {get} /pistas Retrieve pistas
 * @apiName RetrievePistas
 * @apiGroup Pista
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of pistas.
 * @apiSuccess {Object[]} rows List of pistas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  master(),
  query(),
  index)

router.get('/pistasCentros',
  master(),
  query(),
  showPistasCentros)

/**
 * @api {get} /pistas/:id Retrieve pista
 * @apiName RetrievePista
 * @apiGroup Pista
 * @apiSuccess {Object} pista Pista's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pista not found.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /pistas/:id Update pista
 * @apiName UpdatePista
 * @apiGroup Pista
 * @apiParam nombre Pista's nombre.
 * @apiParam cubierta Pista's cubierta.
 * @apiParam precio Pista's precio.
 * @apiParam idCentro Pista's idCentro.
 * @apiSuccess {Object} pista Pista's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pista not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ nombre, cubierta, precio, idCentro }),
  update)

/**
 * @api {delete} /pistas/:id Delete pista
 * @apiName DeletePista
 * @apiGroup Pista
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pista not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
