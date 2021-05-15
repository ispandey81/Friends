import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/api-response';
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
  count!: number;
  currentPage: number = 1;
  errorMsg!: string;

  constructor(private readonly http: HttpClient, private readonly activatedRoute: ActivatedRoute,
    private readonly sanitizer: DomSanitizer, private readonly router: Router, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show(undefined,
      {
        type: 'square-jelly-box',
        size: 'large',
        bdColor: 'rgba(0,17,17, .8)',
        color: 'white',
        fullScreen: true
      });
    this.activatedRoute.params
      .subscribe(param => {
        this.http.get(`${API_URL}text/${param.search}`)
          .pipe(
            map(response => response['data']),
            mergeMap((objs: any[]) => {
              if (objs.length > 300) {
                return of('Please refine your search. More than 300 images found');
              } else if (objs.length == 0) {
                return of([])
              } else {
                return forkJoin(
                  objs.map(obj => {
                    return this.http.get(`${API_URL}id/${obj.id}`)
                  })
                )
              }
            })
          )
          .subscribe(val => {
            if (typeof (val) === 'string') {
              this.nothingFound = false;
              this.errorMsg = val;
            } else if (val.length > 0) {
              this.nothingFound = false;
              this.images = val as Image[];
              this.count = val.length;
              this.errorMsg = '';
            } else {
              this.nothingFound = true;
            }
            this.spinnerService.hide();
          })
      })
  }

  public getSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`);
  }

  onClick(id: number) {
    this.router.navigate([`api/image/id/${id}`], { state: { data: { navigatedFrom: 'searchResults' } } })
  }

}
