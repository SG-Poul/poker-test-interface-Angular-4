import { LENAClientPage } from './app.po';

describe('lena-client App', () => {
  let page: LENAClientPage;

  beforeEach(() => {
    page = new LENAClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
