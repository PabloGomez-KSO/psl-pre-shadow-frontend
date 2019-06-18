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
    console.log(document.documentElement.scrollTop + window.innerHeight);
    console.log(document.documentElement.offsetHeight);
      if (document.documentElement.scrollTop + window.innerHeight + 2 >= document.documentElement.offsetHeight) {
        console.log('got it ');
        this.scrollPosition.emit('bottom');
      }
  }
}
