export class Angular2FirebasePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-firebase-app h1')).getText();
  }
}
