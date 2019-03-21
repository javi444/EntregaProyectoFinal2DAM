package com.example.sevillagol.response;

import java.util.List;

public class UserMisReservasResponse {
    private List<ReservaResponse> reservas;

    public List<ReservaResponse> getReservas() {
        return reservas;
    }

    public void setReservas(List<ReservaResponse> reservas) {
        this.reservas = reservas;
    }
}
