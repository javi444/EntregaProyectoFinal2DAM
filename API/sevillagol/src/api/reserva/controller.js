import { success, notFound } from '../../services/response/'
import { Reserva } from '.'
import { User } from '../user'

/* export const create = ({ bodymen: { body } }, res, next) =>
  Reserva.create(body)
    .then((reserva) => reserva.view(true))
    .then(success(res, 201))
    .catch(next) */

export const create = ({ user, bodymen: { body } }, res, next) => {
  let reservaCreada = new Reserva();
  reservaCreada.fecha = body.fecha;
  reservaCreada.idUsuario = user.id;
  reservaCreada.idPista = body.idPista;
  Reserva.create(reservaCreada)
    .then((reserva) => {
      reservaCreada = reserva
      return User.findByIdAndUpdate(reserva.idUsuario, { $push: {reservas: reserva}}).exec()
    })
    .then((idUsuario) => reservaCreada.view(true))
    .then(success(res, 201))
    .catch(err => {
      console.log(err)
      next(err)
    })
}


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reserva.count(query)
    .then(count => Reserva.find(query, select, cursor)
      .then((reservas) => ({
        count,
        rows: reservas.map((reserva) => reserva.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Reserva.findById(params.id)
    .then(notFound(res))
    .then((reserva) => reserva ? reserva.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reserva.findById(params.id)
    .then(notFound(res))
    .then((reserva) => reserva ? Object.assign(reserva, body).save() : null)
    .then((reserva) => reserva ? reserva.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Reserva.findById(params.id)
    .then(notFound(res))
    .then((reserva) => reserva ? reserva.remove() : null)
    .then(success(res, 204))
    .catch(next)
