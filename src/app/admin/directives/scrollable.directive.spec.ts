
import { ScrollableDirective } from './scrollable.directive';
import { BehaviorSubject } from 'rxjs';
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