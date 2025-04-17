import { NgIcon } from '@ng-icons/core';
import { Clipboard } from '@angular/cdk/clipboard';

import {
  booleanAttribute,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  HlmButtonDirective,
  HlmIconDirective
} from '@dytab/ui';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideClipboard } from '@ng-icons/lucide';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'bna-code',
  imports: [
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    Highlight
],
  providers: [provideIcons({ lucideClipboard, lucideCheck })],
  host: {
    class:
      'spartan-scroll relative block font-mono rounded-md text-sm border overflow-hidden',
  },
  template: `
    <button
      (click)="copyToClipBoard()"
      hlmBtn
      variant="ghost"
      class="absolute w-10 h-10 p-1 right-2 top-2"
    >
      <ng-icon
        hlm
        size="xs"
        [name]="copied ? 'lucideCheck' : 'lucideClipboard'"
      />
    </button>
    <pre class="max-h-[650px] w-full overflow-auto p-4">
      <code
        [highlight]="_content"
        language="ts"
        class="max-w-full max-w-screen"
      ></code>
    </pre>
  `,
  styles: [
    `
      .spartan-scroll .token.class-name {
        opacity: 1;
      }

      .spartan-scroll .token.property,
      .spartan-scroll .token.tag,
      .spartan-scroll .token.boolean,
      .spartan-scroll .token.number,
      .spartan-scroll .token.constant,
      .spartan-scroll .token.symbol,
      .spartan-scroll .token.deleted,
      .spartan-scroll .token.selector,
      .spartan-scroll .token.attr-name,
      .spartan-scroll .token.string,
      .spartan-scroll .token.char,
      .spartan-scroll .token.builtin,
      .spartan-scroll .token.inserted,
      .spartan-scroll .token.atrule,
      .spartan-scroll .token.attr-value,
      .spartan-scroll .token.function,
      .spartan-scroll .token.regex,
      .spartan-scroll .token.important,
      .spartan-scroll .token.variable {
        opacity: 0.533;
      }

      .spartan-scroll .token.operator,
      .spartan-scroll .token.entity,
      .spartan-scroll .token.url,
      .spartan-scroll .token.keyword,
      .spartan-scroll .language-css .token.string,
      .spartan-scroll .style .token.string {
        opacity: 0.733;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent {
  private readonly _clipboard = inject(Clipboard);
  protected _content = '';
  protected copied = false;

  protected _disableCopy = false;
  @Input({ transform: booleanAttribute })
  set disableCopy(value: boolean) {
    this._disableCopy = value;
  }

  private _language: 'ts' | 'html' | 'css' = 'ts';
  @Input()
  set language(value: 'ts' | 'html' | 'css') {
    this._language = value;
  }

  private _code: string | null | undefined;
  @Input()
  set code(value: string | null | undefined) {
    this._code = value;
    this._content = value ?? '';
  }

  copyToClipBoard() {
    if (!this._code) return;
    this._clipboard.copy(this._code);
    this.copied = true;
    setTimeout(() => (this.copied = false), 3000);
  }
}
