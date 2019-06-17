import { Directive, HostListener, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(@Inject(DOCUMENT) public document: Document) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

      if (Math.round(document.documentElement.scrollTop + window.innerHeight)
          === Math.round(document.documentElement.offsetHeight)) {
        this.scrollPosition.emit('bottom');
      }
  }
}
