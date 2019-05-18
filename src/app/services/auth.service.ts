import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserInterface } from '../models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UsersColletion :AngularFirestoreCollection<UserInterface>;
  private user: Observable<UserInterface[]>;

  constructor(private _fb: AngularFireDatabase,private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { 
    this.UsersColletion = afs.collection<UserInterface>('users');
    this.user = this.UsersColletion.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFacebookUser() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  newUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const data: UserInterface = user;
    return userRef.set(data,{merge:true})
  }

  isFirstTime(id:string){
    return this.UsersColletion.doc<UserInterface>(id).valueChanges();
  }

  updateUser(id:string,user:UserInterface){
    return this.UsersColletion.doc(id).update(user);
  }
}
