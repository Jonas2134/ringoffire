import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../firebase-services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  constructor(private router: Router, public gameService: GameService) {}

  newGame() {
    const game = new Game();
    this.gameService.addGame(game.toJson()).then((gameId) => {
      if (gameId) {
        console.log('Spiel erfolgreich hinzugefügt. ID:', gameId);
        this.router.navigateByUrl(`/game/${gameId}`);
    } else {
        console.error('Das Spiel konnte nicht hinzugefügt werden.');
    }
    });
  }
}
