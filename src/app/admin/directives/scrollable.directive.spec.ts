import { spy } from 'sinon';
import { DOCUMENT } from '@angular/platform-browser';
import { ScrollableDirective } from './scrollable.directive';

// import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/src/render3';
import { doesNotThrow } from 'assert';

describe('Tests for operations', () => {

  const createScrollableDirective = (params: any) =>
    new ScrollableDirective(params.adminApiService);

  const scrollableDirectiveMock = {
    adminApiService: {
      _loading: new BehaviorSubject(false)
    }
  };

  let scrollableDirective;

  beforeEach(() => {
    scrollableDirective = createScrollableDirective(scrollableDirectiveMock);
  });

  describe('ngOnInit', () => {

    it('scrollEvent should be called', (done: DoneFn) => {

      scrollableDirective.scrollEvent.subscribe((data) => {
        console.log(data);
        done();
      });


    });
  });

});