import mongoose, { Schema } from 'mongoose'

const centroSchema = new Schema({
  nombre: {
    type: String
  },
  descripcion: {
    type: String
  },
  direccion: {
    type: String
  },
  pistas: [{
    type: Schema.ObjectId,
    ref: 'Pista'
  }],
  imagen: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

centroSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      direccion: this.direccion,
      pistas: this.pistas,
      imagen: this.imagen,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Centro', centroSchema)

export const schema = model.schema
export default model
