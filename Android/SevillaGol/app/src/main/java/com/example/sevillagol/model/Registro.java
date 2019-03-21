package com.example.sevillagol.model;

public class Registro {

    private String email;
    private String password;
    private String name;
    private String role;
    private String picture;

    public Registro() {
    }

    public Registro(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public Registro(String email, String password, String name, String role, String picture) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.picture = picture;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Registro registro = (Registro) o;

        if (email != null ? !email.equals(registro.email) : registro.email != null) return false;
        if (password != null ? !password.equals(registro.password) : registro.password != null)
            return false;
        if (name != null ? !name.equals(registro.name) : registro.name != null) return false;
        if (role != null ? !role.equals(registro.role) : registro.role != null) return false;
        return picture != null ? picture.equals(registro.picture) : registro.picture == null;
    }

    @Override
    public int hashCode() {
        int result = email != null ? email.hashCode() : 0;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        result = 31 * result + (picture != null ? picture.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Registro{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", role='" + role + '\'' +
                ", picture='" + picture + '\'' +
                '}';
    }
}
