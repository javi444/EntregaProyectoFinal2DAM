import { Foto } from '.'

let foto

beforeEach(async () => {
  foto = await Foto.create({ imgurLink: 'test', deletehash: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = foto.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(foto.id)
    expect(view.imgurLink).toBe(foto.imgurLink)
    expect(view.deletehash).toBe(foto.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = foto.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(foto.id)
    expect(view.imgurLink).toBe(foto.imgurLink)
    expect(view.deletehash).toBe(foto.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
