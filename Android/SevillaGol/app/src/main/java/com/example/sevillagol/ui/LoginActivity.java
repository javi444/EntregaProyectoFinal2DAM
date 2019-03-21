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
import com.example.sevillagol.response.LoginResponse;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.LoginService;
import com.example.sevillagol.util.UtilToken;

import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    EditText email, password;
    Button btn_login;
    TextView btn_registro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();

        email = findViewById(R.id.editTextEmail);
        password = findViewById(R.id.editTextPass);
        btn_login = findViewById(R.id.buttonLogin);
        btn_registro = findViewById(R.id.textViewRegistro);

        btn_registro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, RegistroUsuarioActivity.class));
            }
        });

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //Con este método se realiza el inicio de sesión.
                String email_txt = email.getText().toString().trim();
                String password_txt = password.getText().toString().trim();

                String credentials = Credentials.basic(email_txt, password_txt);

                LoginService service = ServiceGenerator.createService(LoginService.class);
                Call<LoginResponse> call = service.doLogin(credentials);

                call.enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if (response.code() != 201) {
                            // error
                            Log.e("RequestError", response.message());
                            Toast.makeText(LoginActivity.this, "Error de petición", Toast.LENGTH_SHORT).show();
                        } else {
                            // exito
                            // Toast.makeText(MainActivity.this, response.body().getToken(), Toast.LENGTH_LONG).show();
                            /*
                                Pasos:
                                    1) Almacenar el token donde corresponda.
                                    2) Lanzar el siguiente Activity.
                             */
                            // ServiceGenerator.jwtToken = response.body().getToken();
                            /*SharedPreferences sharedPreferences =
                                    getSharedPreferences(getString(R.string.sharedpreferences_filename),
                                            Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = sharedPreferences.edit();
                            editor.putString(getString(R.string.jwt_key), response.body().getToken());
                            editor.commit();*/
                            Log.i("PRUEBA","Entra en evento click");
                            UtilToken.setToken(LoginActivity.this, response.body().getToken(), response.body().getUser());
                            Log.i("PRUEBA","Entra en evento click");
                            Intent i = new Intent(
                                    LoginActivity.this,
                                    DashboardActivity.class
                            );

                            startActivity(i);
                            finish();

//                            startActivity(new Intent(LoginActivity.this, UserListActivity.class));

                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(LoginActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                    }
                });


            }
        });


    }
}
