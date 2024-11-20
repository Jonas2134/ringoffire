import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../../models/game';
import { GameService } from '../firebase-services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  coverCards = Array.from({ length: 5 }, (_, i) => ({ name: `Image ${i + 1}` }));
  pickCardAnimation: boolean = false;
  game!: Game;
  currentCard: string | undefined = '';

  constructor(public dialog: MatDialog, public gameService: GameService) {}

  ngOnInit(): void {
    this.newGame();
   this.gameService.subGameData();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game!.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        if (this.currentCard) {
          this.game.playerCards.push(this.currentCard);
        }
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
