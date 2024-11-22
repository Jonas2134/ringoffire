
export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playerCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string | undefined = '';

    constructor(gameData?: Partial<Game>) {
        if (gameData) {
            this.players = gameData.players || [];
            this.stack = gameData.stack || [];
            this.playerCards = gameData.playerCards || [];
            this.currentPlayer = gameData.currentPlayer ?? 0;
            this.pickCardAnimation = gameData.pickCardAnimation ?? false;
            this.currentCard = gameData.currentCard;
        } else {
            for (let i = 1; i < 14; i++) {
                this.stack.push('ace_' + i);
                this.stack.push('clubs_' + i);
                this.stack.push('diamonds_' + i);
                this.stack.push('hearts_' + i);
            }
            this.shuffle(this.stack);
        }
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playerCards: this.playerCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }

    shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    };
}