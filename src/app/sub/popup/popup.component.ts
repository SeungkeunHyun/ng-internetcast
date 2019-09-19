import { Episode } from './../../core/models/episode.model';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  episodes: Episode[];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }


  ngOnInit() {
    this.episodes = episodes;
  }

}
