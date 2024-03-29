import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { TimeoutError, timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  chatId: any = 0;
  registerForm: FormGroup;
  loginForm: FormGroup;
  updateForm: FormGroup;
  successregister: boolean = false;
  registermsg = "";
  alert = "";
  loginmsg = "";
  alert2 = "";
  successlogin: boolean = false;
  public userObj: User = new User();
  public alluser: any = [];
  secondUsername = "";
  chatObj: Chat = new Chat();
  public chatData: any = [];
  check = "";
  loggedIn: boolean = false;
  loggedOut: boolean = true;
  chatbox: boolean = true;
  public nombre = "";
  public password = "";
  public hobbie = "";
  public descripcion = "";
  public fechaNacimiento = "";
  public imagen = "";
  image: boolean = false;
  image2: boolean = false;
  image3: boolean = false;
  image4: boolean = false;

  logout() {
    this.loggedIn = false;
    this.loggedOut = true;
    sessionStorage.clear();
    
    this.router.navigateByUrl('');
  }

  limpMsg(){
    this.alert = "";
    this.registermsg = "";
    this.alert2 = "";
    this.loginmsg = "";
  }

  constructor(private router: Router, private userService: UserService, private chatService: ChatService) {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      hobbie: new FormControl("", [Validators.required]),
      descripcion: new FormControl("", [Validators.required]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      imagen: new FormControl("", [Validators.required]),
      emogi: new FormControl("", [Validators.required]),
    });
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {

    setInterval(() => {
      this.userService.getAll().subscribe((data) => {
        //console.log(data);

        this.alluser = data;

      })
    }, 1000);
  }

  adduser() {
    if(this.registerForm.value.username == "" || this.registerForm.value.password == "" || this.registerForm.value.hobbie == "" 
    || this.registerForm.value.descripcion == "" || this.registerForm.value.fechaNacimiento == ""){
      this.successregister = false;
      this.alert = "success";
      this.registermsg = "Por favor ingrese todos los datos.";
    }

    if (this.registerForm.valid) {
      this.userObj.userName = this.registerForm.value.username;
      this.userObj.password = this.registerForm.value.password;
      this.userObj.hobbie = this.registerForm.value.hobbie;
      this.userObj.descripcion = this.registerForm.value.descripcion;
      this.userObj.fechaNac = this.registerForm.value.fechaNacimiento;
      this.userObj.imagen = this.registerForm.value.imagen.toString();
      this.userObj.emogi = this.registerForm.value.emogi;
      console.log(this.registerForm.value.imagen.toString());
      
      
      this.userService.adduser(this.userObj).subscribe(
        (data: any) => {
          console.log(data);

          this.successregister = true;
          this.alert = "success";
          this.registermsg = "Usuario registrado satisfactoriamente.";

          this.registerForm.reset();
        },
        (error) => {
          console.log(error.error);
          if (error.status == 409) {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Este usuario ya existe por favor ingresar otro."
          } else {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Error"
          }

        }
      )
    }

  }

  consultarUser(){
      this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(
        (data: any) => {
          //console.log(data);

          this.nombre = data.userName;
          this.password = data.password;
          this.hobbie = data.hobbie;
          this.descripcion = data.descripcion;
          this.fechaNacimiento = data.fechaNac;
          this.imagen = data.imagen;

          if (this.imagen == "3") {
            this.image = true
            this.image2 = false
            this.image3 = false
            this.image4 = false
          }

          if (this.imagen == "2") {
            this.image = false
            this.image2 = true
            this.image3 = false
            this.image4 = false
          }

          if (this.imagen == "1") {
            this.image = false
            this.image2 = false
            this.image3 = true
            this.image4 = false
          }

          if (this.imagen == "4") {
            this.image = false
            this.image2 = false
            this.image3 = false
            this.image4 = true
          }
        },
        (error) => {
          console.log(error.error);
          if (error.status == 404) {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Este usuario no esta registrado."
          } else {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Error"
          }

        }
      )


  }

  editUser() {
    if(this.registerForm.value.password == "" || this.registerForm.value.password == null){
      this.userObj.password = this.password;
    }else {
      this.userObj.password = this.registerForm.value.password;
    }    

    if(this.registerForm.value.hobbie == "" || this.registerForm.value.hobbie == null){
      this.userObj.hobbie = this.hobbie;
    }else {
      this.userObj.hobbie = this.registerForm.value.hobbie;
    }

    if(this.registerForm.value.descripcion == "" || this.registerForm.value.descripcion == null){
      this.userObj.descripcion = this.descripcion;
    }else {
      this.userObj.descripcion = this.registerForm.value.descripcion;
    }

    if(this.registerForm.value.fechaNacimiento == "" || this.registerForm.value.fechaNacimiento == null){
      this.userObj.fechaNac = this.fechaNacimiento;
    }else {
      this.userObj.fechaNac = this.registerForm.value.fechaNacimiento;
    }

    if(this.registerForm.value.imagen == ""){
      this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data: any) => {
      this.userObj.imagen = data.imagen;
    })}

      this.userObj.userName = sessionStorage.getItem('username');
      
      this.userService.updateUser(this.userObj).subscribe(
        (data: any) => {
          console.log(data);

          this.successregister = true;
          this.alert = "success";
          this.registermsg = "Usuario editado satisfactoriamente.";

          this.consultarUser();
        },
        (error) => {
          console.log(error.error);
          if (error.status == 409) {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Este usuario ya existe por favor ingresar otro."
          } else {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Error"
          }

        }
      )
    }

  deleteUser() {    
      this.userService.deleteUser(sessionStorage.getItem('username')).subscribe(
        (data: any) => {
          console.log(data);

          this.successregister = true;
          this.alert = "success";
          this.registermsg = "Usuario eliminado satisfactoriamente.";

          this.nombre = "";
          this.password = "";
          this.hobbie = "";
          this.descripcion = "";
          this.fechaNacimiento = "";
          this.logout();
        },
        (error) => {
          console.log(error.error);
          if (error.status == 409) {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Este usuario ya existe por favor ingresar otro."
          } else {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Error"
          }

        }
      )

  }

  login() {
    if(this.loginForm.value.username == "" || this.loginForm.value.password == ""){
      this.successlogin = false;
      this.alert2 = "success";
      this.loginmsg = "Por favor ingrese todos los datos.";
    }   
    
    if (this.loginForm.valid) {
      this.userService.getUserByUsername(this.loginForm.value.username).subscribe(
        (data: any) => {
          console.log(data);

          if (data.password == this.loginForm.value.password){
            this.successlogin = true;
            this.alert2 = "success";
            this.loginmsg = "Ingreso Satisfactorio";

            sessionStorage.setItem("username", this.loginForm.value.username);
            sessionStorage.setItem("emogi", data.emogi);
            this.check = this.loginForm.value.username;
            this.loginForm.reset();

            this.loggedIn = true;
            this.loggedOut = false;

            this.router.navigateByUrl('/chat');}
          else{
            this.successlogin = false;
            this.alert2 = "success";
            this.loginmsg = "Por favor verifique sus credenciales.";
          }
        },
        (error) => {
          console.log(error.error);
          if (error.status == 404) {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Este usuario no esta registrado."
          } else {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Error"
          }

        }
      )
    }


  }

  goToChat(username: any) {
    this.chatService.getChatByFirstUserNameAndSecondUserName(username, sessionStorage.getItem("username")).subscribe(
      (data) => {
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        sessionStorage.setItem("chatId", this.chatId);
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = sessionStorage.getItem("username");
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              sessionStorage.setItem("chatId", this.chatData[0].chatId);
              // this.router.navigateByUrl('/chat');
              console.log("2")
            })
        } else {
          // this.router.navigateByUrl('/chat');
          console.log("3")
        }
      });

  }

}
