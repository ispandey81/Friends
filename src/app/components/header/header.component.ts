import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  term = new FormControl();
  result: any;

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit(): void {
    this.term.valueChanges.
      pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        // switchMap(val => this.http.get('http://localhost:8080/api/image/text/' + val))
      ).subscribe(val => {
        console.log(val);
        this.router.navigate([`api/image/text/${val}`])
      });
  }

}
