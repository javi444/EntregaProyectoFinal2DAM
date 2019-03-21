package com.example.sevillagol.ui;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.TimePicker;
import android.widget.Toast;

import com.example.sevillagol.R;
import com.example.sevillagol.model.Centro;
import com.example.sevillagol.model.Pista;
import com.example.sevillagol.model.Reserva;
import com.example.sevillagol.model.TipoAutenticacion;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.CentroService;
import com.example.sevillagol.retrofit.service.ReservaService;
import com.example.sevillagol.util.UtilToken;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PickersActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String CERO = "0";
    private static final String BARRA = "/";
    private static final String DOS_PUNTOS = ":";
    private Spinner pistas;
    private String jwt;
    private List<Pista> listaPistas;
    private Button botonReservar;
    private String fechaSeleccionada, horaSeleccionada;

    //Calendario para obtener fecha & hora
    public final Calendar c = Calendar.getInstance();

    //Variables para obtener la fecha
    final int mes = c.get(Calendar.MONTH);
    final int dia = c.get(Calendar.DAY_OF_MONTH);
    final int anio = c.get(Calendar.YEAR);
    final int hora = c.get(Calendar.HOUR_OF_DAY);
    final int minuto = c.get(Calendar.MINUTE);

    //Widgets
    EditText etFecha;
    ImageButton ibObtenerFecha;
    EditText etHora;
    ImageButton ibObtenerHora;
    private String id_centro;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalles);
        getSupportActionBar().hide();

        jwt = UtilToken.getToken(this);
        //user = getUser();

        Bundle extras = getIntent().getExtras();
        id_centro = extras.getString("id");

        pistas = findViewById(R.id.spPistas);
        cargarPistas();

        //Widget EditText donde se mostrara la fecha obtenida
        etFecha = (EditText) findViewById(R.id.et_mostrar_fecha_picker);
        //Widget ImageButton del cual usaremos el evento clic para obtener la fecha
        ibObtenerFecha = (ImageButton) findViewById(R.id.ib_obtener_fecha);
        //Evento setOnClickListener - clic
        ibObtenerFecha.setOnClickListener(this);

        etHora = (EditText) findViewById(R.id.et_mostrar_hora_picker);
        //Widget ImageButton del cual usaremos el evento clic para obtener la hora
        ibObtenerHora = (ImageButton) findViewById(R.id.ib_obtener_hora);
        botonReservar = findViewById(R.id.botonReserva);
        //Evento setOnClickListener - clic
        ibObtenerHora.setOnClickListener(this);

        botonReservar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Aquí se rescata la pista seleccionada, la hora y la fecha para realizar la reserva.
                Pista pista = (Pista) pistas.getSelectedItem();


                Reserva nuevaReserva = new Reserva(hacerReserva(),pista.getId());
                ReservaService service = ServiceGenerator.createService(ReservaService.class, UtilToken.getToken(PickersActivity.this), TipoAutenticacion.JWT);
                Call<Reserva> call = service.addReserva(nuevaReserva);
                call.enqueue(new Callback<Reserva>() {
                    @Override
                    public void onResponse(Call<Reserva> call, Response<Reserva> response) {
                        if(response.isSuccessful()) {
                            onBackPressed();
                            finish();
                        }else {
                            Toast.makeText(PickersActivity.this, "Error al crear reserva", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Reserva> call, Throwable t) {

                        Toast.makeText(PickersActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.ib_obtener_fecha:
                obtenerFecha();
                break;
            case R.id.ib_obtener_hora:
                obtenerHora();
                break;
        }
    }

    private void obtenerFecha() {
        DatePickerDialog recogerFecha = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                //Esta variable lo que realiza es aumentar en uno el mes ya que comienza desde 0 = enero
                final int mesActual = month + 1;
                //Formateo el día obtenido: antepone el 0 si son menores de 10
                String diaFormateado = (dayOfMonth < 10) ? CERO + String.valueOf(dayOfMonth) : String.valueOf(dayOfMonth);
                //Formateo el mes obtenido: antepone el 0 si son menores de 10
                String mesFormateado = (mesActual < 10) ? CERO + String.valueOf(mesActual) : String.valueOf(mesActual);
                //Muestro la fecha con el formato deseado
                etFecha.setText(diaFormateado + BARRA + mesFormateado + BARRA + year);

                fechaSeleccionada = diaFormateado + "-" + mesFormateado + "-" + year;

            }
            //Estos valores deben ir en ese orden, de lo contrario no mostrara la fecha actual
            /**
             *También puede cargar los valores que usted desee
             */
        }, anio, mes, dia);
        //Muestro el widget
        recogerFecha.show();

    }

    private void obtenerHora() {
        TimePickerDialog recogerHora = new TimePickerDialog(this, new TimePickerDialog.OnTimeSetListener() {
            @Override
            public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                //Formateo el hora obtenido: antepone el 0 si son menores de 10
                String horaFormateada = (hourOfDay < 10) ? String.valueOf(CERO + hourOfDay) : String.valueOf(hourOfDay);
                //Formateo el minuto obtenido: antepone el 0 si son menores de 10
                String minutoFormateado = (minute < 10) ? String.valueOf(CERO + minute) : String.valueOf(minute);
                //Obtengo el valor a.m. o p.m., dependiendo de la selección del usuario
                String AM_PM;
                if (hourOfDay < 12) {
                    AM_PM = "a.m.";
                } else {
                    AM_PM = "p.m.";
                }
                //Muestro la hora con el formato deseado
                etHora.setText(horaFormateada + DOS_PUNTOS + minutoFormateado + " " + AM_PM);


                horaSeleccionada = horaFormateada + DOS_PUNTOS + minutoFormateado;

                hacerReserva();

            }
            //Estos valores deben ir en ese orden
            //Al colocar en false se muestra en formato 12 horas y true en formato 24 horas
            //Pero el sistema devuelve la hora en formato 24 horas
        }, hora, minuto, false);

        recogerHora.show();
    }

    public void cargarPistas() {
        CentroService service = ServiceGenerator.createService(CentroService.class);
        Call<Centro> call = service.listCentro(id_centro);

        call.enqueue(new Callback<Centro>() {
            @Override
            public void onResponse(Call<Centro> call, Response<Centro> response) {
                if (response.isSuccessful()) {
                    int spinnerPosition = 1;
                    Log.d("successPista", "Got pista");
                    listaPistas = response.body().getPistas();
                    System.out.println(listaPistas);

                    ArrayAdapter<Pista> adapter =
                            new ArrayAdapter<>(PickersActivity.this, android.R.layout.simple_spinner_dropdown_item, listaPistas);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    pistas.setAdapter(adapter);
                    pistas.setSelection(listaPistas.size() - 1);

                } else {
                    Toast.makeText(PickersActivity.this, "Error loading categories", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<Centro> call, Throwable t) {

            }
        });
    }

    public String hacerReserva() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        Date fechaHora = null;
        try {
            fechaHora = formatter.parse(fechaSeleccionada + " " + horaSeleccionada);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ", Locale.UK);
        String formattedDateUtc = null;
        formattedDateUtc = sdf.format(fechaHora);

        Toast.makeText(this, formattedDateUtc, Toast.LENGTH_SHORT).show();

        return formattedDateUtc;
    }

}
