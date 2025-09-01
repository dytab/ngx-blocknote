import { NgModule } from '@angular/core';

import { HlmDialog } from './lib/hlm-dialog';
import { HlmDialogClose } from './lib/hlm-dialog-close';
import { HlmDialogContent } from './lib/hlm-dialog-content';
import { HlmDialogDescription } from './lib/hlm-dialog-description';
import { HlmDialogFooter } from './lib/hlm-dialog-footer';
import { HlmDialogHeader } from './lib/hlm-dialog-header';
import { HlmDialogOverlay } from './lib/hlm-dialog-overlay';
import { HlmDialogTitle } from './lib/hlm-dialog-title';

export * from './lib/hlm-dialog';
export * from './lib/hlm-dialog-close';
export * from './lib/hlm-dialog-content';
export * from './lib/hlm-dialog-description';
export * from './lib/hlm-dialog-footer';
export * from './lib/hlm-dialog-header';
export * from './lib/hlm-dialog-overlay';
export * from './lib/hlm-dialog-title';
export * from './lib/hlm-dialog.service';

export const HlmDialogImports = [
  HlmDialog,
  HlmDialogClose,
  HlmDialogContent,
  HlmDialogDescription,
  HlmDialogFooter,
  HlmDialogHeader,
  HlmDialogOverlay,
  HlmDialogTitle,
] as const;

@NgModule({
  imports: [...HlmDialogImports],
  exports: [...HlmDialogImports],
})
export class HlmDialogModule {}
