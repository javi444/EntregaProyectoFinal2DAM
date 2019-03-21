package com.example.sevillagol.model;

public class Pista {

    private String id;
    private String nombre;
    private boolean cubierta;
    private double precio;

    public Pista() {
    }

    public Pista(String id, String nombre, boolean cubierta, double precio) {
        this.id = id;
        this.nombre = nombre;
        this.cubierta = cubierta;
        this.precio = precio;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean isCubierta() {
        return cubierta;
    }

    public void setCubierta(boolean cubierta) {
        this.cubierta = cubierta;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pista pista = (Pista) o;

        if (cubierta != pista.cubierta) return false;
        if (Double.compare(pista.precio, precio) != 0) return false;
        if (id != null ? !id.equals(pista.id) : pista.id != null) return false;
        return nombre != null ? nombre.equals(pista.nombre) : pista.nombre == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id != null ? id.hashCode() : 0;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (cubierta ? 1 : 0);
        temp = Double.doubleToLongBits(precio);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return nombre;
    }
}
