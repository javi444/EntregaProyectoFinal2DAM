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

import com.example.sevillagol.adapters.MyCentrosRecyclerViewAdapter;
import com.example.sevillagol.R;
import com.example.sevillagol.model.Centro;
import com.example.sevillagol.response.ResponseContainer;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.CentroInteractionListener;
import com.example.sevillagol.retrofit.service.CentroService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link CentroInteractionListener}
 * interface.
 */
public class CentrosFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private CentroInteractionListener mListener;
    private Context ctx;
    private List<Centro> centrosList;
    private MyCentrosRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public CentrosFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static CentrosFragment newInstance(int columnCount) {
        CentrosFragment fragment = new CentrosFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getActivity().setTitle("Centros deportivos");

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_centros_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = view.findViewById(R.id.list);
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            //Aquí mostramos la lista con todos los centros existentes.
            centrosList = new ArrayList<>();
            CentroService service = ServiceGenerator.createService(CentroService.class);
            //---------------
            Call<ResponseContainer<Centro>> call = service.listCentros();

            call.enqueue(new Callback<ResponseContainer<Centro>>() {


                @Override
                public void onResponse(Call<ResponseContainer<Centro>> call, Response<ResponseContainer<Centro>> response) {
                    if (response.isSuccessful()) {
                        // error
                        Log.e("RequestSuccessful", response.message());
                        centrosList = response.body().getRows();

                        adapter = new MyCentrosRecyclerViewAdapter(
                                ctx,
                                R.layout.fragment_centros,
                                centrosList,
                                mListener

                        );
                        recyclerView.setAdapter(adapter);
                        //}

                    } else {
                        Log.e("RequestError", response.message());
                    }
                }

                @Override
                public void onFailure(Call<ResponseContainer<Centro>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());

                }
            });
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.ctx = context;
        if (context instanceof CentroInteractionListener) {
            mListener = (CentroInteractionListener) context;
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
