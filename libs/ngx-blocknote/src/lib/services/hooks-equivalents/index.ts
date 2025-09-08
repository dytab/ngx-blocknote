/**
 * Angular equivalents of React BlockNote hooks
 *
 * This directory contains Angular services that provide equivalent functionality
 * to React hooks from @blocknote/react. Each service uses Angular's signal-based
 * reactivity system instead of React's hook system.
 */

// Core editor services
export * from './use-block-note-editor.service';
export * from './use-create-block-note.service';

// Editor change tracking services
export * from './use-editor-change.service';
export * from './use-editor-selection-change.service';
export * from './use-editor-content-or-selection-change.service';
export * from './use-editor-force-update.service';

// Block and selection services
export * from './use-selected-blocks.service';
export * from './use-active-styles.service';
export * from './use-editor-selection-bounding-box.service';

// Upload related services
export * from './use-on-upload-start.service';
export * from './use-on-upload-end.service';
export * from './use-upload-loading.service';

// UI and interaction services
export * from './use-ui-plugin-state.service';
export * from './use-focus-within.service';
export * from './use-prefers-color-scheme.service';

// Note: UseUIElementPositioningService is not implemented as it requires
// complex Floating UI integration specific to Angular. Consider using
// Angular CDK Overlay or similar positioning solutions for UI elements.

/**
 * Summary of implemented React hook equivalents:
 *
 * ✓ UseBlockNoteEditorService - Access to editor instance
 * ✓ UseCreateBlockNoteService - Editor creation and lifecycle
 * ✓ UseEditorChangeService - Listen to content changes
 * ✓ UseEditorSelectionChangeService - Listen to selection changes
 * ✓ UseEditorContentOrSelectionChangeService - Combined change listener
 * ✓ UseEditorForceUpdateService - Transaction-based reactive updates
 * ✓ UseSelectedBlocksService - Track selected blocks
 * ✓ UseActiveStylesService - Track active text styles
 * ✓ UseEditorSelectionBoundingBoxService - Selection bounding box tracking
 * ✓ UseOnUploadStartService - File upload start events
 * ✓ UseOnUploadEndService - File upload end events
 * ✓ UseUploadLoadingService - Upload loading state tracking
 * ✓ UseUIPluginStateService - Generic UI plugin state management
 * ✓ UseFocusWithinService - Focus tracking within elements
 * ✓ UsePrefersColorSchemeService - Color scheme preference detection
 *
 * Not implemented:
 * - UseUIElementPositioningService (requires Floating UI Angular integration)
 *   Consider using Angular CDK Overlay or similar solutions instead.
 */
