package com.example.sevillagol.model;

public class Reserva {
    private String id;
    private String fecha;
    private String idPista;

    public Reserva() {
    }

    public Reserva(String fecha, String idPista) {
        this.id = id;
        this.fecha = fecha;
        this.idPista = idPista;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getIdPista() {
        return idPista;
    }

    public void setIdPista(String idPista) {
        this.idPista = idPista;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Reserva reserva = (Reserva) o;

        if (id != null ? !id.equals(reserva.id) : reserva.id != null) return false;
        if (fecha != null ? !fecha.equals(reserva.fecha) : reserva.fecha != null) return false;
        return idPista != null ? idPista.equals(reserva.idPista) : reserva.idPista == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (fecha != null ? fecha.hashCode() : 0);
        result = 31 * result + (idPista != null ? idPista.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Reserva{" +
                "id='" + id + '\'' +
                ", fecha=" + fecha +
                ", idPista=" + idPista +
                '}';
    }
}
