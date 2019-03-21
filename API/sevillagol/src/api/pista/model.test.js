import { Pista } from '.'

let pista

beforeEach(async () => {
  pista = await Pista.create({ nombre: 'test', cubierta: 'test', precio: 'test', idCentro: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pista.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pista.id)
    expect(view.nombre).toBe(pista.nombre)
    expect(view.cubierta).toBe(pista.cubierta)
    expect(view.precio).toBe(pista.precio)
    expect(view.idCentro).toBe(pista.idCentro)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pista.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pista.id)
    expect(view.nombre).toBe(pista.nombre)
    expect(view.cubierta).toBe(pista.cubierta)
    expect(view.precio).toBe(pista.precio)
    expect(view.idCentro).toBe(pista.idCentro)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
