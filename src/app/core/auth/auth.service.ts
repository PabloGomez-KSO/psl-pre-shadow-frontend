import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /*Missing implementation with Database.*/
  logInFirebase(username: string, password: string): boolean{
     return true;
  }
}
