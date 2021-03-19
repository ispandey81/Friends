import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/api-url';
import { Image } from 'src/app/shared/image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  image!: Image;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly http: HttpClient, 
    private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap((params: Params) => this.http.get(`${API_URL}id/${params['imageId']}`)))
    .subscribe(img => {
      this.image = img as Image;
      console.log(this.image);     
    });
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`);
}

}
