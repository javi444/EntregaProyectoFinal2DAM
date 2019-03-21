package com.example.sevillagol.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.sevillagol.R;
import com.example.sevillagol.model.Centro;
import com.example.sevillagol.retrofit.service.CentroInteractionListener;
import com.example.sevillagol.retrofit.service.CentroService;
import com.example.sevillagol.ui.PickersActivity;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link Centro} and makes a call to the
 * specified {@link CentroInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class MyCentrosRecyclerViewAdapter extends RecyclerView.Adapter<MyCentrosRecyclerViewAdapter.ViewHolder> {

    private final List<Centro> mValues;
    private final CentroInteractionListener mListener;
    private final Context ctx;
    private String jwt;
    private CentroService centroService;
    private List<Centro> centrosList;

    public MyCentrosRecyclerViewAdapter(Context ctx, int layout, List<Centro> items, CentroInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_centros, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        //jwt = UtilToken.getToken(this.ctx);
        holder.mItem = mValues.get(position);
        holder.tvNombre.setText(holder.mItem.getNombre());
        holder.tvDireccion.setText(holder.mItem.getDireccion());
        holder.picture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ctx, PickersActivity.class);
                i.putExtra("id", mValues.get(position).getId());
                ctx.startActivity(i);
            }
        });
        Glide.with(ctx).load(holder.mItem.getImagen()).into(holder.picture);
    }

        /*holder.picture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ctx, DetallesActivity.class);
                i.putExtra("id", mValues.get(position).getId());
                ctx.startActivity(i);
            }
        });*/


    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tvNombre;
        public final TextView tvDireccion;
        public Centro mItem;
        public final ImageView picture;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvNombre = view.findViewById(R.id.tvNombre);
            tvDireccion = view.findViewById(R.id.tvDireccion);
            picture = view.findViewById(R.id.picture);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + tvNombre.getText() + "'";
        }
    }
}
