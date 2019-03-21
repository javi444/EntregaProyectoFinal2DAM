import { success, notFound } from '../../services/response/'
import { Foto } from '.'
import { Centro } from '../centro/'

const uploadService = require('../../services/upload/');

export const create = (req, res, next) => {
  uploadService.uploadFromBinary(req.file.buffer)
    .then(json => Foto.create({
      imgurLink: json.data.link,
      deleteHash: json.data.deletehash
    }))
    .then(photo => {
      return new Promise((resolve, reject) => {
        Centro.findByIdAndUpdate(
          req.body.centro_id,
          { imagen: photo.imgurLink},
          (err, user) => {
            if (err) {
              return reject(err.me);
            }
            return resolve(photo);
          }
        );
      });
    })
    .then((photo) => photo.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Foto.count(query)
    .then(count => Foto.find(query, select, cursor)
      .then((fotos) => ({
        count,
        rows: fotos.map((foto) => foto.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Foto.findById(params.id)
    .then(notFound(res))
    .then((foto) => foto ? foto.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Foto.findById(params.id)
    .then(notFound(res))
    .then((foto) => foto ? Object.assign(foto, body).save() : null)
    .then((foto) => foto ? foto.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Foto.findById(params.id)
    .then(notFound(res))
    .then((foto) => foto ? foto.remove() : null)
    .then(success(res, 204))
    .catch(next)
