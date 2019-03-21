package com.example.sevillagol.retrofit.service;

import com.example.sevillagol.model.Reserva;
import com.example.sevillagol.model.User;
import com.example.sevillagol.response.ResponseContainer;
import com.example.sevillagol.response.UserMisReservasResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UserService {
    @GET("/users/me")
    Call<User> getUser();

    @GET("/users/misReservas/{id}")
    Call<UserMisReservasResponse> listMisReservas(@Path("id") String id);

    @PUT("/users/{id}")
    Call<User> editUser(@Path("id") String id, @Body User user);
}
