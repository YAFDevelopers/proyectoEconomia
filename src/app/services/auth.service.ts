import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,private router: Router) { }

  loginGoogleUser(){
    return this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
  }

  loginFacebookUser(){
    return this.afAuth.auth.signInWithPopup( new auth.FacebookAuthProvider());
  }

  logoutUser(){
    return this.afAuth.auth.signOut();
  }
}
