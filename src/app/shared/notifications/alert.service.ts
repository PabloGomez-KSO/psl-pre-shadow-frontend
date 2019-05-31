import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccessMessage(message: string) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'success',
      text: message
    });
  }

  showLoadingInfoMessageLogin() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Loading...'
    });
    Swal.showLoading();
  }

  showInvalidCredentialsMessage(){
    Swal.fire({
      allowOutsideClick: false,
      type: 'error',
      text: 'Invalid Credentials'
    });
  }

  closeNotification() {
    Swal.close();
  }
}
