import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, onSnapshot, updateDoc, where, query, limit, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    firestore: Firestore = inject(Firestore);

    constructor() { }

    subGameData() {
        return onSnapshot(this.getGameData(), (data) => {
            data.forEach(element => {
                console.log('Game update', element.data());
            })
        })
    }

    getGameData() {
        return collection(this.firestore, 'games');
    }
}