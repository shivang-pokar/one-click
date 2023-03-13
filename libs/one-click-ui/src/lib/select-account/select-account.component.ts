import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { messages } from '@one-click/data';
import { AlertService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss']
})
export class SelectAccountComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  integrationCtrl = new FormControl('');
  filteredIntegrations: Observable<any[]>;
  selectedIntegration: any[] = [];
  @Input() integrationList: any[];
  @ViewChild('integrationInput') integrationInput: ElementRef<HTMLInputElement>;
  @Output() selectedAccount = new EventEmitter();


  message: string;

  constructor(
    private alertService: AlertService,
  ) {

  }

  ngOnInit(): void {

    this.integrationList.forEach(item => {
      if (item.is_selected) {
        this.selectedIntegration.push(item);
      }
    })



    this.filteredIntegrations = this.integrationCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => (fruit ? this._filter(fruit) : this.integrationList.slice())),
    );

  }


  remove(fruit: string): void {
    const index = this.selectedIntegration.indexOf(fruit);

    if (index >= 0) {
      this.selectedIntegration.splice(index, 1);
      this.selectedAccount.emit(this.selectedIntegration);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let index = this.selectedIntegration.findIndex(integration => integration.id == event.option.value.id);
    if (index == -1) {
      this.selectedIntegration.push(event.option.value);
    } else {
      this.alertService.error(messages.INI_ALREADY);
    }

    this.integrationInput.nativeElement.value = '';
    this.integrationCtrl.setValue(null);
    this.selectedAccount.emit(this.selectedIntegration);
  }

  private _filter(value: string): any[] {
    return this.integrationList.filter(integration => integration.name.includes(value));
  }

  uploadSelectFile() {

  }

}
