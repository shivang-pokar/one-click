import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import NestedList from '@editorjs/nested-list';

@Component({
  selector: 'one-click-private-notepad',
  templateUrl: './private-notepad.component.html',
  styleUrls: ['./private-notepad.component.scss'],
})
export class PrivateNotepadComponent implements OnInit {
  editor: EditorJS;
  constructor() {

  }

  ngOnInit(): void {
    this.editor = new EditorJS({
      holder: 'editor',
      placeholder: "Jot down a quick note or add a link to an important resource.",
      hideToolbar: false,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
      }
      // Your configuration options for Editor.js
    });
  }
}
