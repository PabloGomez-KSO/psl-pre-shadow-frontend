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

  showInvalidMessage(error: string) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'error',
      text: error
    });
  }

  showGoodByeMessage() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Goodbye'
    });
  }

  showDeleteAskNotification(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure about this ?',
      text: "You won't be able to see the candidate anymore!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    });
  }

  showDeleteNotification() {
    Swal.fire(
      'Deleted!',
      'Candidate has been deleted.',
      'success'
    )
  }

  closeNotification() {
    Swal.close();
  }
}
