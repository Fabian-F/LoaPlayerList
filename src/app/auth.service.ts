import { inject, Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afAuth = inject(Auth);
  authState$ = authState(this.afAuth);

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    this.afAuth.signOut();
  }
}
