import { NgModule } from '@angular/core';
import { HlmTooltip } from './lib/hlm-tooltip';
import { HlmTooltipTrigger } from './lib/hlm-tooltip-trigger';

export * from './lib/hlm-tooltip';
export * from './lib/hlm-tooltip-trigger';

export const HlmTooltipImports = [HlmTooltip, HlmTooltipTrigger] as const;

@NgModule({
  imports: [...HlmTooltipImports],
  exports: [...HlmTooltipImports],
})
export class HlmTooltipModule {}
