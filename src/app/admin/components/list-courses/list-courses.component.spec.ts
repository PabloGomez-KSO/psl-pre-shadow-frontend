import { ListCoursesComponent } from './list-courses.component';
import { empty, of, BehaviorSubject, Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
const sinon = require('sinon');
import { User } from '../../../shared/models/user';
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const expect = chai.expect;

describe('list-courses.component', () => {

  const createListCoursesComponent = (params: any) =>
    new  ListCoursesComponent(params.adminHelper);


});

