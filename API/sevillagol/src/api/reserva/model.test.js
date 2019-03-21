import { Reserva } from '.'

let reserva

beforeEach(async () => {
  reserva = await Reserva.create({ fecha: 'test', idUsuario: 'test', idPista: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reserva.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reserva.id)
    expect(view.fecha).toBe(reserva.fecha)
    expect(view.idUsuario).toBe(reserva.idUsuario)
    expect(view.idPista).toBe(reserva.idPista)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reserva.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reserva.id)
    expect(view.fecha).toBe(reserva.fecha)
    expect(view.idUsuario).toBe(reserva.idUsuario)
    expect(view.idPista).toBe(reserva.idPista)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
