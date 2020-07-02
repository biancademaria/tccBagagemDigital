import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth() {
    throw new Error("Method not implemented.");
  }

  constructor(private afa: AngularFireAuth) { }

  login(User: Usuario) {
    return this.afa.createUserWithEmailAndPassword(User.email, User.password);
  }

  registrar(User: Usuario) {
    return this.afa.createUserWithEmailAndPassword(User.email, User.password);
  }

  logout() {

  }

  getAuth() {
    return this.afa.authState;
  }
}
