import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showMessage(message: string, type, isLoading: boolean): void {
    Swal.fire({
      allowOutsideClick: false,
      type: type,
      text: message
    });

    if (isLoading) {
      Swal.showLoading();
    }
  }

  showAskNotification(title: string, message: string, type ): Observable<any> {
    return from(Swal.fire({
      title: title,
      text: message,
      type: type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }));
  }

  closeNotification() {
    Swal.close();
  }
}
