import { Directive, HostListener, EventEmitter, Output} from '@angular/core';
import { AdminApiService } from '../services/admin-api.service'
@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(private adminApiService: AdminApiService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
      if (document.documentElement.scrollTop + window.innerHeight + 2
          >= document.documentElement.offsetHeight && !this.adminApiService._loading.value) {
        this.scrollPosition.emit('bottom');
      }
  }
}
