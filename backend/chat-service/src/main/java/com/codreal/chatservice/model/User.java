package com.codreal.chatservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String userName;
    private String password;
    private String hobbie;
    private String descripcion;
    private String fechaNac;
    private String imagen;
    private String emogi;

    public User() {
    }

    public User(String userName, String password, String hobbie, String descripcion, String fechaNac, String imagen, String emogi) {
        this.userName = userName;
        this.password = password;
        this.hobbie = hobbie;
        this.descripcion = descripcion;
        this.fechaNac = fechaNac;
        this.imagen = imagen;
        this.emogi = emogi;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getHobbie() {
        return hobbie;
    }

    public void setHobbie(String hobbie) {
        this.hobbie = hobbie;
    }

    public String getdescripcion() {
        return descripcion;
    }

    public void setdescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getfechaNac() {
        return fechaNac;
    }

    public void setfechaNac(String fechaNac) {
        this.fechaNac = fechaNac;
    }

    public String getimagen() {
        return imagen;
    }

    public void setimagen(String imagen) {
        this.imagen = imagen;
    }

    public String getemogi() {
        return emogi;
    }

    public void setemogi(String emogi) {
        this.emogi = emogi;
    }
}
