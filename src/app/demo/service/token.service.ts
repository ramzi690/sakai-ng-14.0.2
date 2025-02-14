import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

private iss={
  login : 'http://localhost:8000/api/login',
  signup: 'http://localhost:8000/api/signup'
}
  constructor() { }
  handle(token: any){
    this.set(token)
  }
  set(token: any){
    localStorage.setItem('token',token)

  }
  get(){
   return localStorage.getItem('token')
  }
  remove(){
    localStorage.removeItem('token')
  }
  isValid(){
    const token=this.get()
    if (token) {
      const payload = this.payload(token)
      if (payload){
       return Object.values(this.iss).indexOf(payload.iss) > -1 ?true : false;
      }
    }
    return false
  }
  payload(token:any) {
    const payload = token.split('.')[1];
    return this.decode(payload)

    }
    getTechnicianId(): string | null {
      const token = this.get();
      if (token) {
        const payload = this.payload(token);
        if (payload && payload.technician_id) {
          return payload.technician_id; 
        }
      }
      return null;
    }
    decode(payload:any){
      return JSON.parse(atob(payload))
    }
    loggedIn(){
      return this.isValid();
    }
    getUserRole(): string | null {
      const token = this.get();
      if (token) {
        const payload = this.payload(token);
        if (payload && payload.role) {
          return payload.role; 
        }
      }
      return null;
      
    }
  }

