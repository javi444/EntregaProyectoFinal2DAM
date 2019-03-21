package com.example.sevillagol.ui;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sevillagol.R;
import com.example.sevillagol.model.Registro;
import com.example.sevillagol.response.LoginResponse;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.LoginService;
import com.example.sevillagol.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistroUsuarioActivity extends AppCompatActivity {
    EditText nombre, email, password;
    Button btn_registro;
    TextView btn_login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro_usuario);
        getSupportActionBar().hide();

        nombre = findViewById(R.id.etNombre);
        email = findViewById(R.id.etEmail);
        password = findViewById(R.id.etPass);
        btn_registro = findViewById(R.id.botonEditar);
        btn_login = findViewById(R.id.tvVolverLogin);

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(RegistroUsuarioActivity.this, LoginActivity.class));
            }
        });

        btn_registro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // Recoger los datos del formulario
                String fullname = nombre.getText().toString().trim();
                String correo = email.getText().toString().trim();
                String contrasenya = password.getText().toString().trim();

                Registro registro = new Registro(correo, contrasenya, fullname);

                LoginService service = ServiceGenerator.createService(LoginService.class);

                Call<LoginResponse> loginReponseCall = service.doRegister(registro);
                //.doRegister("lNeTI8waAqmpUZa7QSiLv53rqSnlsldv",
                //        registro);

                loginReponseCall.enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if (response.code() == 201) {
                            // éxito
                            /*
                                Pasos:
                                    1) Almacenar el token donde corresponda.
                                    2) Lanzar el siguiente Activity.
                             */
                            //ServiceGenerator.jwtToken = response.body().getToken();
                            UtilToken.setToken(RegistroUsuarioActivity.this, response.body().getToken(), response.body().getUser());
//                            startActivity(new Intent(RegistroUsuarioActivity.this, UserListActivity.class));                            // Toast.makeText(RegistroActivity.this, "Usuario registrado y logeado con éxito", Toast.LENGTH_LONG).show();
                            Log.d("token", response.body().getToken());

                        } else {
                            // error
                            Toast.makeText(RegistroUsuarioActivity.this, "Error en el registro. Revise los datos introducidos", Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(RegistroUsuarioActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();

                    }
                });

            }
        });
    }
}
