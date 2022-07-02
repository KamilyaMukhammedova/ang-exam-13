import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.sass']
})
export class StarsComponent implements OnInit {
  @Input() rating: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
