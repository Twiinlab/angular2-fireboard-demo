import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2FirebaseAppComponent } from '../app/angular2-firebase.component';

beforeEachProviders(() => [Angular2FirebaseAppComponent]);

describe('App: Angular2Firebase', () => {
  it('should create the app',
      inject([Angular2FirebaseAppComponent], (app: Angular2FirebaseAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-firebase works!\'',
      inject([Angular2FirebaseAppComponent], (app: Angular2FirebaseAppComponent) => {
    expect(app.title).toEqual('angular2-firebase works!');
  }));
});
