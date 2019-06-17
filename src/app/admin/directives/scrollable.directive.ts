import { Directive, HostListener, EventEmitter, Output, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    try {

      if (Math.round(document.documentElement.scrollTop + window.innerHeight) === Math.round(document.documentElement.offsetHeight)) {
        this.scrollPosition.emit('bottom');
      }

    } catch (err) { }
  }

}
