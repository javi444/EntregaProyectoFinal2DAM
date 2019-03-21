package com.example.sevillagol.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sevillagol.R;
import com.example.sevillagol.model.Reserva;
import com.example.sevillagol.model.TipoAutenticacion;
import com.example.sevillagol.response.ReservaResponse;
import com.example.sevillagol.response.ResponseContainer;
import com.example.sevillagol.response.UserMisReservasResponse;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.ReservaInteractionListener;
import com.example.sevillagol.retrofit.service.ReservaService;
import com.example.sevillagol.ui.PickersActivity;
import com.example.sevillagol.ui.ReservaEditActivity;
import com.example.sevillagol.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * {@link RecyclerView.Adapter} that can display a {@link Reserva} and makes a call to the
 * specified {@link ReservaInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class MyMisReservasRecyclerViewAdapter extends RecyclerView.Adapter<MyMisReservasRecyclerViewAdapter.ViewHolder> {

    private final List<ReservaResponse> mValues;
    private final ReservaInteractionListener mListener;
    private final Context ctx;
    private String jwt;
    private ReservaService reservaService;
    private List<Reserva> reservaList;

    public MyMisReservasRecyclerViewAdapter(Context ctx, int layout, List<ReservaResponse> items, ReservaInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_misreservas, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.mItem = mValues.get(position);
        holder.tvPista.setText(holder.mItem.getIdPista().getNombre());
        holder.tvFecha.setText(holder.mItem.getFecha());
        holder.iconoEditar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ctx, ReservaEditActivity.class);
                i.putExtra("id", mValues.get(position).getId());
                ctx.startActivity(i);
            }
        });

        holder.iconoDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                reservaList = new ArrayList<>();
                String id = holder.mItem.getId();

                //Cancelar una reserva.
                ReservaService service = ServiceGenerator.createService(ReservaService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
                //---------------
                Call<ResponseContainer<Reserva>> call = service.deleteReserva(id);

                call.enqueue(new Callback<ResponseContainer<Reserva>>() {


                    @Override
                    public void onResponse(Call<ResponseContainer<Reserva>> call, Response<ResponseContainer<Reserva>> response) {
                        if (response.isSuccessful()) {
                            // error
                            Toast.makeText(ctx, "Eliminada correctamente", Toast.LENGTH_SHORT).show();

                        } else {
                            Toast.makeText(ctx, "Error al eliminar", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseContainer<Reserva>> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());

                    }
                });
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tvPista;
        public final TextView tvFecha;
        public ReservaResponse mItem;
        public final ImageView iconoDelete;
        public final ImageView iconoEditar;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvPista = view.findViewById(R.id.tvPista);
            tvFecha = view.findViewById(R.id.tvFecha);
            iconoDelete = view.findViewById(R.id.iconoDelete);
            iconoEditar = view.findViewById(R.id.iconoEditar);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + tvPista.getText() + "'";
        }
    }
}
