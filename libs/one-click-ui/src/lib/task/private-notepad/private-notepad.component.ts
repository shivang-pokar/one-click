import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-private-notepad',
  templateUrl: './private-notepad.component.html',
  styleUrls: ['./private-notepad.component.scss'],
})
export class PrivateNotepadComponent implements OnInit {
  editor: EditorJS;

  constructor(
    public commonServiceService: CommonServiceService
  ) {
  }

  ngOnInit(): void {
    this.editor = this.commonServiceService.editorJS("Jot down a quick note or add a link to an important resource.");
  }
}
