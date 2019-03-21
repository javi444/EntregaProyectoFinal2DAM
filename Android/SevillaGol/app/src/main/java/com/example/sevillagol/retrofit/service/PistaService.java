package com.example.sevillagol.retrofit.service;

import com.example.sevillagol.model.Pista;
import com.example.sevillagol.response.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;

public interface PistaService {

    @GET("/pistas")
    Call<ResponseContainer<Pista>> listPistas();

    @GET("/pistasCentros")
    Call<ResponseContainer<Pista>> listPistasCentro();
}
