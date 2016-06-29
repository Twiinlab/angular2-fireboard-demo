import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { Angular2FirebaseAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2FirebaseAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
      apiKey: "AIzaSyAS4fmPXFy4tWnggXNJTUXbkju3nxqHpyA",
      authDomain: "angular2-fireboard-demo.firebaseapp.com",
      databaseURL: "https://angular2-fireboard-demo.firebaseio.com",
      storageBucket: "angular2-fireboard-demo.appspot.com"
    }),
  [provide(Window, {useValue: window})]
]);