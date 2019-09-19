import { PopupComponent } from './../sub/popup/popup.component';
import { HttpService } from './../core/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Cast } from '../core/models/cast/cast.model';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-cast-table',
  templateUrl: './cast-table.component.html',
  styleUrls: ['./cast-table.component.scss']
})
export class CastTableComponent implements OnInit {

  casts: Cast[];
  constructor(private httpService: HttpService, private x2jService: NgxXml2jsonService, private dlgService: DialogService) { }

  ngOnInit() {
    this.httpService.get(`http://skhyun.iptime.org/htmlv5/podcast/json/podcastlist.json?q=${new Date().getTime()}`)
    .subscribe(res  => {
      this.casts = res;
      this.casts.forEach(i => i.episodes = []);
      this.fetchRSS();
      //console.log(this.casts);
    });
  }

  getPodbbangEpisodes(scr: string) {
    let episode = {};
    let episode_uids = [];
    scr = scr.trim() + ";episode";
    const ctx = eval(scr);
    const eps = [];
    for(let k in ctx) {
      eps.push(ctx[k]);
    }
    return eps.slice(0);
  }

  parseDate(ymd: string) {
    //console.log(ymd);
    return new Date(Date.parse(ymd.substring(0,4) + '-' + ymd.substring(4, 6) + '-' + ymd.substring(6)));
  }

  fetchRSS() {
    this.casts.forEach(c => {
      //console.log(c);
      switch(c.provider) {
        case 'podbbang':
          for(let p = 1; p < 4; p++) {
            this.httpService.getMimeText(`http://www.podbbang.com/podbbangchnew/episode_list?id=${c.podcastID}&page=${p}`, 'text/plain').subscribe(h => {
              const startOffset = h.indexOf("var ischsell	= 'N'");
              let scriptPart = h.substring(startOffset);
              scriptPart = scriptPart.substring(0, scriptPart.indexOf('if(episode_uids'));
              c.episodes = c.episodes.concat(this.getPodbbangEpisodes(scriptPart));
              if(p === 3) {
                c.episodes = this.mapPodbbang(c.episodes);
                c.releasedAt = this.parseDate(c.episodes[0].pubDate);
              }
            });
          }
          break;
        case 'podty':
          break;
        default:
          this.httpService.getMimeText(c.url, 'application/xml').subscribe(x => {
            try {
              const domp = new DOMParser();
              const xdoc = domp.parseFromString(x, 'text/xml');
              const jdoc = this.x2jService.xmlToJson(xdoc);
              c.episodes = this.mapiTunes(jdoc.rss.channel.item);
              //console.log(c);
              c.episodes.sort((a,b) => { new Date(a.pubDate) > new Date(b.pubDate) });
              c.releasedAt = c.episodes[0].pubDate;
              //console.log(c.episodes[0]);
            } catch(ex) {
              console.error(ex);
            }
          });
          break;
      }
    });
  }
  mapiTunes(arr: any[]) {
    let eps = [];
    arr.forEach(e => eps.push({title: e.title, summary: e.hasOwnProperty('itunes:summary') ? e['itunes:summary'] : null
    , pubDate: e.pubDate, mediaURL: e.enclosure['@attributes'].url
    , duration: e.hasOwnProperty('itunes:duration') ? e['itunes:duration']: null}));
    return eps;
  }

  mapPodbbang(arr: any[]) {
    let eps = [];
    arr.forEach(e => {
      //console.log(e);
      eps.push({
        title: e.title, pubDate: e.pubdate, duration: e.duration, mediaURL: e.down_file
      })
    });
    return eps;
  }

  showEpisodes(e, dat: Cast) {
    console.log(e, dat);
    this.dlgService.open(PopupComponent, {data: {episodes: dat.episodes}, header: dat.name, width: '70%'});
  }
}
