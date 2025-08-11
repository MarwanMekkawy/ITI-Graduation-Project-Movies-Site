import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';




interface MyJwtPayload {
  Id: string;
  creationDate: string;
  exp: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}


@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  tokenprocessing(token: any) {
    localStorage.clear();
    const _token = token;
    localStorage.setItem(`token`, _token);
    const _decodedtoken = jwtDecode<MyJwtPayload>(_token);
    console.log(_decodedtoken);

    localStorage.setItem(`user_id`, _decodedtoken.Id);
    localStorage.setItem(`user_creationDate`, _decodedtoken.creationDate);
    localStorage.setItem(`user_tokenexp`, _decodedtoken.exp);
    localStorage.setItem(`user_name`, _decodedtoken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    localStorage.setItem(`user_email`, _decodedtoken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
  }
}