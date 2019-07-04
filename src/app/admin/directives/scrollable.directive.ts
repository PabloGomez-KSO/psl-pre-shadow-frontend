import { Directive, HostListener, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective implements OnInit {

  @Output() scrollPosition = new EventEmitter();
  private scrollEvent = new Subject();

  constructor() { }

  ngOnInit() {
    this.scrollEvent.pipe(
      debounceTime(1000)
    ).subscribe(() => this.scrollPosition.emit('bottom'));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (document.documentElement.scrollTop + window.innerHeight + 2
      >= document.documentElement.offsetHeight) {
        this.scrollEvent.next({});
    }
  }

}
