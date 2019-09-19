import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private x2jService: NgxXml2jsonService) { }

  get(endpoint: string) {
    return this.http.get(endpoint);
  }

  getMimeText(endpoint: string, ctype: string) {
    const headers = new HttpHeaders();
    headers.append('Accept', ctype);
    return this.http.get(`http://localhost/php/util/fetchURL.php?uri=${encodeURI(endpoint)}`, { observe: 'body', responseType: 'text' } );
  }
}
