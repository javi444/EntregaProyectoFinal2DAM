package com.example.sevillagol.fragments;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.sevillagol.adapters.MyMisReservasRecyclerViewAdapter;
import com.example.sevillagol.R;
import com.example.sevillagol.model.Reserva;
import com.example.sevillagol.model.TipoAutenticacion;
import com.example.sevillagol.response.ResponseContainer;
import com.example.sevillagol.response.UserMisReservasResponse;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.ReservaInteractionListener;
import com.example.sevillagol.retrofit.service.ReservaService;
import com.example.sevillagol.retrofit.service.UserService;
import com.example.sevillagol.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link ReservaInteractionListener}
 * interface.
 */
public class MisReservasFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private ReservaInteractionListener mListener;
    private Context ctx;
    private List<Reserva> reservasList;
    private MyMisReservasRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public MisReservasFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static MisReservasFragment newInstance(int columnCount) {
        MisReservasFragment fragment = new MisReservasFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getActivity().setTitle("Mis reservas");

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_misreservas_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = view.findViewById(R.id.list);
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            //Cargamos las reservas que tiene activas el usuario.
            reservasList = new ArrayList<>();
            UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
            //---------------
            Call<UserMisReservasResponse> call = service.listMisReservas(UtilToken.getIdUser(ctx));

            call.enqueue(new Callback<UserMisReservasResponse>() {
                @Override
                public void onResponse(Call<UserMisReservasResponse> call, Response<UserMisReservasResponse> response) {
                    if(response.isSuccessful()) {
                        adapter = new MyMisReservasRecyclerViewAdapter(ctx,R.layout.fragment_misreservas,response.body().getReservas(),mListener);
                        recyclerView.setAdapter(adapter);
                    } else {
                        Toast.makeText(ctx, "Error al listar", Toast.LENGTH_SHORT).show();

                    }
                }

                @Override
                public void onFailure(Call<UserMisReservasResponse> call, Throwable t) {

                    Toast.makeText(ctx, t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });


        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.ctx = context;
        if (context instanceof ReservaInteractionListener) {
            mListener = (ReservaInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */

}
