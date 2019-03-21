package com.example.sevillagol.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.sevillagol.R;
import com.example.sevillagol.model.TipoAutenticacion;
import com.example.sevillagol.model.User;
import com.example.sevillagol.response.UserResponse;
import com.example.sevillagol.retrofit.generator.ServiceGenerator;
import com.example.sevillagol.retrofit.service.UserService;
import com.example.sevillagol.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;



public class PerfilFragment extends Fragment {
    private Context ctx;
    private UserResponse userResponse;
    private EditText nombre;
    private EditText email;
    private EditText pass;
    private Button botonEditar;
    private UserInteractionListener mListener;

    public PerfilFragment() {
        // Required empty public constructor
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_perfil, container, false);
        findViews(view);
        getDatas();
        editProfile(UtilToken.getIdUser(ctx));
        getActivity().setTitle("Mi perfil");
        return view;
    }
    private void getDatas() {
        nombre.setText(UtilToken.getNombreUser(ctx));
        email.setText(UtilToken.getEmailUser(ctx));
    }

    private void editProfile(final String idUser) {
        botonEditar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                User user = new User(
                        email.getText().toString(),
                        pass.getText().toString(),
                        nombre.getText().toString()
                );

                //Editamos los datos del usuario logeado.
                String jwt = UtilToken.getToken(ctx);
                UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
                Call<User> call = service.editUser(idUser, user);
                call.enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        if(response.isSuccessful()){
                            getFragmentManager().beginTransaction().replace(R.id.container, new PerfilFragment()).commit();
                        }else {
                            Toast.makeText(ctx, "sorry pero no se ha editado.", Toast.LENGTH_SHORT).show();
                        }
                    }
                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                    }
                });
            }
        });
    }
    private void findViews(View view) {
        nombre = view.findViewById(R.id.etNombre);
        email = view.findViewById(R.id.etEmail);
        pass = view.findViewById(R.id.etPass);
        botonEditar = view.findViewById(R.id.botonEditar);
    }


    @Override
    public void onAttach(Context context) {
        ctx = context;
        super.onAttach(context);
        if (context instanceof UserInteractionListener) {
            mListener = (UserInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
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
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface UserInteractionListener {
        // TODO: Update argument type and name
        void UserInteraction(Uri uri);
    }
}
