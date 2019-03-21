import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import { schema } from './model'
export Centro, { schema } from './model'

const router = new Router()
const { nombre, descripcion, direccion, pistas, imagen } = schema.tree

/**
 * @api {post} /centros Create centro
 * @apiName CreateCentro
 * @apiGroup Centro
 * @apiParam nombre Centro's nombre.
 * @apiParam descripcion Centro's descripcion.
 * @apiParam direccion Centro's direccion.
 * @apiParam localizacion Centro's localizacion.
 * @apiParam imagenes Centro's imagenes.
 * @apiSuccess {Object} centro Centro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Centro not found.
 */
router.post('/',
  token({ required: true }),
  body({ nombre, descripcion, direccion, pistas, imagen }),
  create)

/**
 * @api {get} /centros Retrieve centros
 * @apiName RetrieveCentros
 * @apiGroup Centro
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of centros.
 * @apiSuccess {Object[]} rows List of centros.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /centros/:id Retrieve centro
 * @apiName RetrieveCentro
 * @apiGroup Centro
 * @apiSuccess {Object} centro Centro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Centro not found.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /centros/:id Update centro
 * @apiName UpdateCentro
 * @apiGroup Centro
 * @apiParam nombre Centro's nombre.
 * @apiParam descripcion Centro's descripcion.
 * @apiParam direccion Centro's direccion.
 * @apiParam localizacion Centro's localizacion.
 * @apiParam imagenes Centro's imagenes.
 * @apiSuccess {Object} centro Centro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Centro not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ nombre, descripcion, direccion, pistas, imagen }),
  update)

/**
 * @api {delete} /centros/:id Delete centro
 * @apiName DeleteCentro
 * @apiGroup Centro
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Centro not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
