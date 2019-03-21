import { Centro } from '.'

let centro

beforeEach(async () => {
  centro = await Centro.create({ nombre: 'test', descripcion: 'test', direccion: 'test', localizacion: 'test', imagenes: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = centro.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(centro.id)
    expect(view.nombre).toBe(centro.nombre)
    expect(view.descripcion).toBe(centro.descripcion)
    expect(view.direccion).toBe(centro.direccion)
    expect(view.localizacion).toBe(centro.localizacion)
    expect(view.imagenes).toBe(centro.imagenes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = centro.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(centro.id)
    expect(view.nombre).toBe(centro.nombre)
    expect(view.descripcion).toBe(centro.descripcion)
    expect(view.direccion).toBe(centro.direccion)
    expect(view.localizacion).toBe(centro.localizacion)
    expect(view.imagenes).toBe(centro.imagenes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
