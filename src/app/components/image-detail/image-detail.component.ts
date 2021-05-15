import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/api-url';
import { Image } from 'src/app/shared/image';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  image!: Image;
  showBackButton!: boolean;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly http: HttpClient, 
    private readonly sanitizer: DomSanitizer, private readonly location: Location, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show(undefined,
      {
        type: 'square-jelly-box',
        size: 'large',
        bdColor: 'rgba(0,17,17, .8)',
        color: 'white',
        fullScreen: true
      });
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state ? window.history.state.data : null))
      .subscribe(data => {
        this.showBackButton = data && data.navigatedFrom === 'random' ? false: true;
      });
      
    this.activatedRoute.params
    .pipe(switchMap((params: Params) => this.http.get(`${API_URL}id/${params['imageId']}`)))
    .subscribe(img => {
      this.image = img as Image;
      this.spinnerService.hide();
    });
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`);
}

  onClick(){
    this.location.back();   
  }

}
