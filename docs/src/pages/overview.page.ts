import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HlmButtonDirective,
  HlmCardDirective,
  hlmH2,
  hlmLead,
} from '@dytab/block-note-angular';
import { BasicSetupExample } from './examples/basic/basic-setup/basic-setup.example';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    HlmButtonDirective,
    HlmCardDirective,
    BasicSetupExample,
  ],
  template: `<section
      class="relative flex h-fit w-full justify-center overflow-hidden pb-36 pt-24 xl:pt-36"
    >
      <div
        class="z-20 flex w-full flex-col items-center justify-between gap-6 px-6 md:max-w-screen-md xl:max-w-[1440px] xl:flex-row"
      >
        <div
          class="relative flex h-fit flex-col items-center justify-center gap-6 text-center xl:w-[584px] xl:items-start xl:text-left"
        >
          <div
            class="hero-glow text-glow absolute block h-full w-full sm:hidden"
          ></div>
          <h1 class=" leading-none text-6xl font-medium md:text-7xl z-10">
            Unofficial<br /><strong>Block Note</strong><br />Angular Wrapper
          </h1>
          <p class="font-space-grotesk text-lg leading-snug md:text-xl z-10">
            A beautiful text editor that just works in <strong>angular</strong>.
            Easily add an editor to your app that users will love. Customize it
            with your own functionality like custom blocks or AI tooling.
          </p>
          <a hlmBtn variant="default" routerLink="/examples">Get Started</a>
        </div>
        <div
          class="relative h-[36rem] w-full shrink-0 grow-0 rounded-lg sm:block xl:w-[584px]"
        >
          <div
            class="absolute h-full w-full -inset-0,5 bg-gradient-to-r from-purple-600 to-sky-400 rouned-lg blur opacity-75"
          ></div>
          <div hlmCard class="relative z-20 h-full w-full rounded-lg">
            <bna-basic-setup-example></bna-basic-setup-example>
          </div>
        </div>
      </div>
    </section>
    <section
      class="relative flex h-fit w-full justify-center overflow-hidden pb-36 pt-24 xl:pt-36 border-b border-t shadow-sm"
    >
      <div class="flex flex-col justify-center items-center">
        <h2 class="${hlmH2}">Disclaimer</h2>
        <p class="${hlmLead} text-center xl:w-[584px] mb-5">
          This is not an official Angular wrapper for Block Note. This wrapper
          was created on our own because we needed a solution for Angular. For
          this reason, we would like to offer it here in case other developers
          also need a corresponding solution for Angular.
        </p>
        <a hlmBtn variant="default" href="https://www.blocknotejs.org/"
          >Go to Block Note</a
        >
      </div>
    </section>`,
})
export class OverviewPage {}
