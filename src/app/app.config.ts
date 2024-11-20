import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-a971a","appId":"1:181978011620:web:b4862db20e4488307f99f1","storageBucket":"ring-of-fire-a971a.firebasestorage.app","apiKey":"AIzaSyAAGuWLkQ2R-vaFo3GxCwtCAGbGTMFCy1A","authDomain":"ring-of-fire-a971a.firebaseapp.com","messagingSenderId":"181978011620"})), provideFirestore(() => getFirestore())]
};
