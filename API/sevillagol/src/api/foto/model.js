import mongoose, { Schema } from 'mongoose'

const fotoSchema = new Schema({
  imgurLink: {
    type: String
  },
  deletehash: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fotoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      imgurLink: this.imgurLink,
      deletehash: this.deletehash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

fotoSchema.pre('remove', {query: true }, function(next){
  console.log('Elminando la imagen' + this.imgurLink)
  uploadService.deleteImage(this.deletehash)
  return next();
})

const model = mongoose.model('Foto', fotoSchema)

export const schema = model.schema
export default model
