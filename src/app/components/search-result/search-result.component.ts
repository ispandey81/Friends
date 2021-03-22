import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { API_URL } from '../../shared/api-url';
import { Image } from '../../shared/image';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  images!: Image[];
  nothingFound: boolean = false;

  constructor(private readonly http: HttpClient, private readonly activatedRoute: ActivatedRoute,
     private readonly sanitizer: DomSanitizer, private readonly router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap((params: Params) => this.http.get(`${API_URL}text/${params['search']}`)))
    .subscribe(img => {
      const result = img as Image[];
      if (result.length > 0 ) {
        this.nothingFound = false;
        this.images = result;  
      } else {
        this.nothingFound = true;
      }
    });
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`);
}

  onClick(id: number) {
    this.router.navigate([`api/image/id/${id}`], {state: {data: {navigatedFrom: 'searchResults'}}})
  }

}