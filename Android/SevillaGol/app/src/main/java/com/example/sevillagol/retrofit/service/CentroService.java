package com.example.sevillagol.retrofit.service;

import com.example.sevillagol.model.Centro;
import com.example.sevillagol.response.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface CentroService {

    @GET("/centros")
    Call<ResponseContainer<Centro>> listCentros();

    @GET("/centros/{id}")
    Call<Centro> listCentro(@Path("id") String id);

}
