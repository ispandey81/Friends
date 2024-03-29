import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/api-url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  term = new FormControl();
  result: any;
  randomId!: number;

  constructor(private readonly http: HttpClient, private readonly router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.term.valueChanges.
    pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(val => {
      if (val.length < 2) {
        this.router.navigate([`min-length`]);         
      } else {
        this.router.navigate([`api/image/text/${val}`]);
      }
    });
  }

  onClick() {
    this.spinnerService.show(undefined,
      {
        type: 'square-jelly-box',
        size: 'large',
        bdColor: 'rgba(0,17,17, .8)',
        color: 'white',
        fullScreen: true
      });
    this.http.get(`${API_URL}random`).subscribe(id => {
      this.randomId = id as number;
      this.router.navigate([`api/image/id/${this.randomId}`], {state: {data: {navigatedFrom: 'random'}}});
      this.spinnerService.hide();
    })
  }

}
