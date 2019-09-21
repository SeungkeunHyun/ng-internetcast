import { Episode } from './../../core/models/episode.model';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Cast } from 'src/app/core/models/cast/cast.model';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnChanges {
  @Input('cast') cast: Cast;
  display: boolean;
  constructor(private playerService: PlayerService ) {
    this.display = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.cast.currentValue) {
      this.display = false;
      return;
    }
    this.display = true;
    console.log(changes);
  }

  playThis(e, ep: Episode) {
    this.playerService.play(ep);
  }

  ngOnInit() {

  }
}
