package com.example.sevillagol.model;

import java.util.List;

public class Centro {
    private String id;
    private String nombre;
    private String descripcion;
    private String direccion;
    private List<Pista> pistas;
    private String imagen;

    public Centro() {
    }

    public Centro(String id, String nombre, String descripcion, String direccion, List<Pista> pistas, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.pistas = pistas;
        this.imagen = imagen;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<Pista> getPistas() {
        return pistas;
    }

    public void setPistas(List<Pista> pistas) {
        this.pistas = pistas;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Centro centro = (Centro) o;

        if (id != null ? !id.equals(centro.id) : centro.id != null) return false;
        if (nombre != null ? !nombre.equals(centro.nombre) : centro.nombre != null) return false;
        if (descripcion != null ? !descripcion.equals(centro.descripcion) : centro.descripcion != null)
            return false;
        if (direccion != null ? !direccion.equals(centro.direccion) : centro.direccion != null)
            return false;
        if (pistas != null ? !pistas.equals(centro.pistas) : centro.pistas != null) return false;
        return imagen != null ? imagen.equals(centro.imagen) : centro.imagen == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (direccion != null ? direccion.hashCode() : 0);
        result = 31 * result + (pistas != null ? pistas.hashCode() : 0);
        result = 31 * result + (imagen != null ? imagen.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Centro{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", direccion='" + direccion + '\'' +
                ", pistas=" + pistas +
                ", imagen='" + imagen + '\'' +
                '}';
    }
}
