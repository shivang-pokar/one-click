import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'one-click-post-data-section',
  templateUrl: './post-data-section.component.html',
  styleUrls: ['./post-data-section.component.scss']
})
export class PostDataSectionComponent implements OnInit {

  message: string;
  @Input() selectedAccountList: Array<any> = []

  constructor() { }

  ngOnInit(): void {

  }

  uploadSelectFile() {

  }
}
