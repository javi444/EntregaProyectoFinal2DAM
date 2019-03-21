package com.example.sevillagol.retrofit.service;

import com.example.sevillagol.model.Reserva;
import com.example.sevillagol.response.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ReservaService {

    @POST("/reservas")
    Call<Reserva> addReserva (@Body Reserva reserva);

    @GET("/reservas")
    Call<ResponseContainer<Reserva>> listReservas();

    @DELETE("/reservas/{id}")
    Call<ResponseContainer<Reserva>> deleteReserva(@Path("id") String id);

    @PUT("/reservas/{id}")
    Call<Reserva> editReserva(@Body Reserva reserva);
}
