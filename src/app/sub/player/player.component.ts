import { Component, OnInit, Input } from '@angular/core';
import { Episode } from 'src/app/core/models/episode.model';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  episode: Episode;
  @Input() display: boolean;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.episode.subscribe(ep => {
      this.episode = ep;
    });
  }
}
