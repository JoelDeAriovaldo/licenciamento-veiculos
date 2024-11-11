import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() spinnerType: string = 'circular';
  @Input() color: string = 'primary';
  @Input() message?: string;
  @Input() overlay: boolean = false;

  constructor() { }

  ngOnInit() { }

}
