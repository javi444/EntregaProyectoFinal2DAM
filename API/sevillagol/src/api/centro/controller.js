import { success, notFound } from '../../services/response/'
import { Centro } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Centro.create(body)
    .then((centro) => centro.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Centro.count(query)
    .then(count => Centro.find(query, select, cursor)
      .populate('pistas')
      .populate('imagenes')
      .exec()
      .then((centros) => ({
        count,
        rows: centros.map((centro) => centro.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Centro.findById(params.id)
    .populate('pistas', 'nombre id')
    .populate('imagenes')
    .exec()
    .then(notFound(res))
    .then((centro) => centro ? centro.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Centro.findById(params.id)
    .then(notFound(res))
    .then((centro) => centro ? Object.assign(centro, body).save() : null)
    .then((centro) => centro ? centro.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Centro.findById(params.id)
    .then(notFound(res))
    .then((centro) => centro ? centro.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const findByPistaName = ({ params, query }, res, next) =>
  Centro.count(query)
    .then(count => Centro.find({'pista': params.id})
    .populate('pista', 'nombre_id')
    .populate('imagenes')
    .exec()
    .then((centros) => ({
        count,
        rows: centros.map((centros) => centro.view())
      }))
    )
    .then(success(res))
    .catch(next)
