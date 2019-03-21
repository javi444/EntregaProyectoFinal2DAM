import { success, notFound } from '../../services/response/'
import { Pista } from '.'
import { Centro } from '../centro/'

export const create = ({ user, bodymen: { body }, params }, res, next) => {

  let nuevaPista = new Pista();
  nuevaPista.nombre = body.nombre;
  nuevaPista.cubierta = body.cubierta;
  nuevaPista.precio = body.precio;
  nuevaPista.idCentro = body.idCentro;

  Pista.create(nuevaPista)
    .then(pista => {
      return new Promise((resolve, reject) => {
        Centro.findByIdAndUpdate(
          params.id,
          { $push: { pistas: pista } },
          (err, centro) => {
            if (err) {
              return reject(err.me);
            }
            return resolve(pista);
          }
        );
      });
    })
    .then(success(res, 201))
    .catch(next)
}

/* export const create = ({ bodymen: { body } }, res, next) =>
  Pista.create(body)
    .then((pista) => pista.view(true))
    .then(success(res, 201))
    .catch(next) */

export const showPistasCentros = (req /* { querymen: { query, select, cursor } } */, res, next) => {


    return Pista.count({ centro : req.centro })
      .then(count => Pista.find({ centro: req.centro }, req.querymen.select, req.querymen.cursor).populate()
        .then((pistas) => ({
          count,
          rows: pistas.map((pista) => pista.view())
        }))
      )
      .then(success(res))
      .catch(next)
  } 

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pista.count(query)
    .then(count => Pista.find(query, select, cursor)
      .then((pistas) => ({
        count,
        rows: pistas.map((pista) => pista.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pista.findById(params.id)  
    .then(notFound(res))
    .then((pista) => pista ? pista.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Pista.findById(params.id)
    .then(notFound(res))
    .then((pista) => pista ? Object.assign(pista, body).save() : null)
    .then((pista) => pista ? pista.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Pista.findById(params.id)
    .then(notFound(res))
    .then((pista) => pista ? pista.remove() : null)
    .then(success(res, 204))
    .catch(next)
