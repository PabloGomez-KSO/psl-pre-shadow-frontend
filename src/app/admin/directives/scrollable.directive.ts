import { Directive, HostListener, EventEmitter, Output, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    try {
       const scrollHeight = document.documentElement.scrollHeight;
       const scrollTop = document.documentElement.scrollTop;
       const clientHeight = document.documentElement.clientHeight;

       if ( clientHeight + scrollTop  === scrollHeight ) {
         this.scrollPosition.emit('bottom');
       }

    } catch (err) {}
  }

}
