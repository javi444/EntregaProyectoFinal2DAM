package com.example.sevillagol.ui;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.example.sevillagol.R;
import com.example.sevillagol.fragments.CentrosFragment;
import com.example.sevillagol.fragments.MisReservasFragment;
import com.example.sevillagol.fragments.PerfilFragment;
import com.example.sevillagol.retrofit.service.CentroInteractionListener;
import com.example.sevillagol.retrofit.service.ReservaInteractionListener;
import com.example.sevillagol.retrofit.service.UserInteractionListener;
import com.example.sevillagol.util.UtilToken;

public class DashboardActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, CentroInteractionListener, ReservaInteractionListener, PerfilFragment.UserInteractionListener {

    private NavigationView navigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        navigationView = findViewById(R.id.nav_view);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


        View headerView = navigationView.getHeaderView(0);
        ImageView iv = headerView.findViewById(R.id.imageView_nav);
        TextView name = headerView.findViewById(R.id.userName_nav);
        TextView email = headerView.findViewById(R.id.emailUser_nav);



        navigationView.setNavigationItemSelectedListener(this);

        name.setText(UtilToken.getNombreUser(DashboardActivity.this));
        email.setText(UtilToken.getEmailUser(DashboardActivity.this));
        Glide.with(DashboardActivity.this).load(UtilToken.getPhotoUser(DashboardActivity.this)).into(iv);
        getSupportFragmentManager().beginTransaction().add(R.id.container, new CentrosFragment(), "centrosFrag").commit();
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.dashboard, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_centros) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, new CentrosFragment()).commit();

        } else if (id == R.id.nav_reservas) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container,new MisReservasFragment()).commit();

        } else if (id == R.id.nav_perfil) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container,new PerfilFragment()).commit();

        } else if (id == R.id.nav_salir) {
            UtilToken.clearAll(this);
            startActivity(new Intent(DashboardActivity.this, LoginActivity.class));

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void UserInteraction(Uri uri) {

    }
}
