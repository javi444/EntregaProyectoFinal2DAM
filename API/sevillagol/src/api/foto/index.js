import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Foto, { schema } from './model'
import { password as passwordAuth, master, token } from '../../services/passport'

const router = new Router()
const { imgurLink, deletehash, centro_id } = schema.tree

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

/**
 * @api {post} /fotos Create foto
 * @apiName CreateFoto
 * @apiGroup Foto
 * @apiParam imgurLink Foto's imgurLink.
 * @apiParam deletehash Foto's deletehash.
 * @apiSuccess {Object} foto Foto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Foto not found.
 */
router.post('/',
  token({ required: true }),
  // body({ propertyId, imgurLink, deletehash }),
  upload.single('photo'),
  create)

/**
 * @api {get} /fotos Retrieve fotos
 * @apiName RetrieveFotos
 * @apiGroup Foto
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of fotos.
 * @apiSuccess {Object[]} rows List of fotos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /fotos/:id Retrieve foto
 * @apiName RetrieveFoto
 * @apiGroup Foto
 * @apiSuccess {Object} foto Foto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Foto not found.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /fotos/:id Update foto
 * @apiName UpdateFoto
 * @apiGroup Foto
 * @apiParam imgurLink Foto's imgurLink.
 * @apiParam deletehash Foto's deletehash.
 * @apiSuccess {Object} foto Foto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Foto not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ imgurLink, deletehash }),
  update)

/**
 * @api {delete} /fotos/:id Delete foto
 * @apiName DeleteFoto
 * @apiGroup Foto
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Foto not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
