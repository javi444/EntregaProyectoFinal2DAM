package com.example.sevillagol.response;

import com.example.sevillagol.model.Pista;

public class ReservaResponse {
    private String id;
    private String idUsuario;
    private Pista idPista;
    private String fecha;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Pista getIdPista() {
        return idPista;
    }

    public void setIdPista(Pista idPista) {
        this.idPista = idPista;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
