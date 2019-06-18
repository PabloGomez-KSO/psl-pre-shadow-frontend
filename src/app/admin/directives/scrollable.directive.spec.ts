import { spy } from 'sinon';
import { DOCUMENT } from '@angular/platform-browser';
import { ScrollableDirective} from './scrollable.directive';

import { expect } from 'chai';

describe('Tests for operations', () => {

  it('4 + 4 = 8', () => {

    expect(4 + 4).to.be.equal( 8 );

  });

});
/*
describe('Admin - Scrollable Directive', () => {

  const scrollableDirective: ScrollableDirective;

  beforeEach(() => {
    scrollableDirective = new ScrollableDirective(DOCUMENT);

  });

});*/
