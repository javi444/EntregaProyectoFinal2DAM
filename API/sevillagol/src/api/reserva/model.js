import mongoose, { Schema } from 'mongoose'

const reservaSchema = new Schema({
  fecha: {
    type: Date
  },
  idUsuario: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  idPista: {
    type: Schema.ObjectId,
    ref: 'Pista'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reservaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      fecha: this.fecha,
      idUsuario: this.idUsuario,
      idPista: this.idPista,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Reserva', reservaSchema)

export const schema = model.schema
export default model
