import { Injectable } from '@angular/core';
import { Episode } from '../models/episode.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  episode: Subject<Episode>;
  constructor() {
    this.episode = new Subject<Episode>();
  }
  play(ep: Episode) {
    this.episode.next(ep);
  }

  getEpisode(): Subject<Episode> {
    return this.episode;
  }
}
