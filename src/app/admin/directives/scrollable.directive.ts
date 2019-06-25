import { Directive, HostListener, EventEmitter, Output, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective implements OnInit {

  @Output() scrollPosition = new EventEmitter();
  private scrollEvent = new Subject();

  ngOnInit() {
    this.scrollEvent.pipe(
      debounceTime(1000)
    ).subscribe(() => this.scrollPosition.emit('bottom'));
  }

  constructor(private adminApiService: AdminApiService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (document.documentElement.scrollTop + window.innerHeight + 2
      >= document.documentElement.offsetHeight && !this.adminApiService._loading.value) {
        this.scrollEvent.next({});
    }
  }

}
