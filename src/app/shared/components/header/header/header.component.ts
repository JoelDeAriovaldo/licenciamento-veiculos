import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = true;
  @Input() showExtraButton: boolean = false;
  @Input() extraButtonIcon: string = 'ellipsis-vertical-outline';
  @Input() onExtraButtonClick: () => void = () => { };

  constructor(private location: Location) { }

  ngOnInit() { }

  goBack() {
    this.location.back();
  }

}
