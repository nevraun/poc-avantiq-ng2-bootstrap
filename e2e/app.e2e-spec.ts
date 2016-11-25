import { PocAvantiqNg2BootstrapPage } from './app.po';

describe('poc-avantiq-ng2-bootstrap App', function() {
  let page: PocAvantiqNg2BootstrapPage;

  beforeEach(() => {
    page = new PocAvantiqNg2BootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
