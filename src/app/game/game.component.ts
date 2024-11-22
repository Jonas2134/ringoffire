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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  gameId!: string;

  private unsubscribe!: () => void;

  coverCards = Array.from({ length: 5 }, (_, i) => ({ name: `Image ${i + 1}` }));

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public gameService: GameService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.subscribeToGameUpdates();
    })
  }


  subscribeToGameUpdates() {
    this.unsubscribe = this.gameService.subGameData(this.gameId, (updatedGame) => {
      if (updatedGame) {
        this.game = updatedGame;
        console.log('Game data updated: ', this.game);
      } else {
        console.error('Game data could not be loaded.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game!.stack.pop();
      this.game.pickCardAnimation = true;
      this.gameService.updateGame(this.gameId, this.game.toJson());

      setTimeout(() => {
        if (this.game.currentCard) {
          this.game.playerCards.push(this.game.currentCard);
        }
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.game.pickCardAnimation = false;
        this.gameService.updateGame(this.gameId, this.game.toJson());
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.gameService.updateGame(this.gameId, this.game.toJson());
      }
    });
  }
}
