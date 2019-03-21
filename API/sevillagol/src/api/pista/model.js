import mongoose, { Schema } from 'mongoose'

const pistaSchema = new Schema({
  nombre: {
    type: String
  },
  cubierta: {
    type: Boolean
  },
  precio: {
    type: Number
  },
  idCentro: {
    type: Schema.ObjectId,
    ref: 'Centro'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

pistaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      cubierta: this.cubierta,
      precio: this.precio,
      idCentro: this.idCentro,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Pista', pistaSchema)

export const schema = model.schema
export default model
