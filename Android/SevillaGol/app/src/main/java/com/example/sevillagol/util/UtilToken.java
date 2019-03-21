package com.example.sevillagol.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.sevillagol.R;
import com.example.sevillagol.model.User;

public class UtilToken {

    public static void setToken(Context mContext, String token, User user) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        mContext.getString(R.string.sharedpreferences_filename),
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(mContext.getString(R.string.jwt_key), token);
        editor.putString("idUser", user.getId());
        editor.putString("nombreUser", user.getName());
        editor.putString("fotoUser", user.getPicture());
        editor.putString("emailUser", user.getEmail());

        editor.commit();
    }


    public static String getIdUser(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences(ctx.getString(R.string.sharedpreferences_filename), Context.MODE_PRIVATE);
        return prefs.getString("idUser", null);
    }


    public static String getToken(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                mContext.getString(R.string.sharedpreferences_filename),
                Context.MODE_PRIVATE
        );

        String jwt = sharedPreferences
                .getString(mContext.getString(R.string.jwt_key), null);

        return jwt;
    }

    public static void clearAll(Context mContext){
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                "login",
                Context.MODE_PRIVATE
        );

        SharedPreferences.Editor editor= sharedPreferences.edit();
        editor.clear();
        editor.commit();

    }

    public static String getEmailUser(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences("login", Context.MODE_PRIVATE);
        return prefs.getString("emailUser", null);

    }

    public static String getNombreUser(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences("login", Context.MODE_PRIVATE);
        return prefs.getString("nombreUser", null);
    }

    public static String getPhotoUser(Context ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences("login", Context.MODE_PRIVATE);
        return prefs.getString("fotoUser", null);
    }
}
