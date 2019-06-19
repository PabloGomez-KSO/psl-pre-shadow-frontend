import { Directive, HostListener, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
      if (document.documentElement.scrollTop + window.innerHeight + 2 >= document.documentElement.offsetHeight) {
        this.scrollPosition.emit('bottom');
      }
  }
}
