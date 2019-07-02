import { AppPage } from './app.po';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('workspace-project App', () => {
 let page: AppPage;

 beforeEach(() => {
   page = new AppPage();
 });

 it('should display welcome message', () => {
   page.navigateTo();
   expect(page.getParagraphText()).to.eventually.equal('Welcome to psl-pre-shadow-frontend!');
 });
});