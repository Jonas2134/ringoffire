import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, onSnapshot, updateDoc, where, query, limit, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    firestore: Firestore = inject(Firestore);

    constructor() { }


    async addGame(item: any): Promise<string | undefined> {
        try {
            const docRef = await addDoc(this.getGameData(), item);
            return docRef.id;
        } catch (err) {
            console.error('Error when adding the game: ', err);
            return undefined;
        }
    }

    async updateGame(gameId: string, data: Partial<Game>): Promise<void> {
        try {
            const gameRef = doc(this.getGameData(), gameId);
            await updateDoc(gameRef, data);
            console.log(`Game with ID ${gameId} updated successfully.`);
        } catch (err) {
            console.error('Error updating the game:', err);
        }
    }

    subGameData(gameId: string, callback: (data: Game | null) => void): () => void {
        const gameRef = doc(this.getGameData(), gameId);
        return onSnapshot(gameRef, (docSnap) => {
            if (docSnap.exists()) {
                const gameData = docSnap.data();
                const game = new Game(gameData);
                callback(game);
            } else {
                console.error('Document not found');
                callback(null);
            }
        })
    }

    getGameData() {
        return collection(this.firestore, 'games');
    }
}