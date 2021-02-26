import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private readonly router: Router) { }

  onClick() {
    this.router.navigate(['about']);
  }

}
