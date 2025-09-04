# Project Guidelines — BlockNoteAngular

These guidelines help Junie work effectively in this repository.

## Project Overview
- Monorepo managed by Nx (nx.json present) using Angular 20, Vite/AnalogJS for docs, and NestJS for API.
- Key parts of the workspace:
  - apps/docs: Documentation site built with AnalogJS + Vite. Targets: build, serve, lint.
  - apps/api: Simple Node/Nest API. Targets: serve, test, lint.
  - libs/ngx-blocknote: Angular library wrapping BlockNote. Targets: lint, release publish.
  - libs/ui/*-helm: Reusable UI component libraries.
  - BlockNoteReact: Git submodule containing upstream React implementation (read-only in this repo).

## Node and Package Managers
- node: 22, npm: 10 (enforced by package.json engines).
- Use: npm ci to install dependencies.

## Common Tasks
Because top-level package.json currently defines no scripts, prefer Nx directly:
- Install dependencies: npm ci
- List projects: npx nx show projects
- Run docs locally: npx nx serve docs
- Build docs: npx nx build docs --configuration=production
- Lint a project: npx nx lint <project>
- Run API tests (if defined): npx nx test api
- Serve API: npx nx serve api

Notes:
- Default project is docs (nx.json: defaultProject = "docs").
- Release configuration is set for libs/ngx-blocknote via Nx release but publishing requires building output into dist first.

## Building and Artifacts
- Docs build output: dist/apps/docs/client (plus SSR/Nitro folders under dist/apps/docs).
- Library distribution: dist/libs/ngx-blocknote after packaging. If packaging targets are added later (e.g., @nx/angular:package), use them prior to publishing.

## Testing
- Workspace uses both Jest and Vitest tooling. For Angular/unit tests prefer Nx targets defined per project:
  - apps/api: @nx/vite:test
  - Other projects may add tests later; respect their configured executors.
- Run with: npx nx test <project> [--coverage]

## Linting and Formatting
- ESLint 9 with Nx plugins and Angular ESLint is configured. Run:
  - npx nx lint <project>
- Prettier is included; follow default formatting. Avoid introducing formatting noise unrelated to the issue.

## CI and Caching
- Nx targetDefaults enable caching for build, test, lint. Avoid unnecessary target runs.

## Contribution Guidelines for Junie
- Update documentation in .junie/guidelines.md when project-level conventions change.
- Do not modify the BlockNoteReact submodule contents from here.
- If adding scripts, prefer Nx targets in project.json rather than ad-hoc npm scripts.

## How Junie Should Validate Changes
- If you modify Angular/Nx code:
  - Install deps (npm ci) when needed.
  - Run npx nx lint <affected-projects> and any available tests with npx nx test <project>.
  - Build docs when changes affect the docs app: npx nx build docs.
- For documentation-only issues (like this one), no build/test is required.


## Upstream Sync — BlockNote React to Angular Wrapper
This workspace includes the upstream BlockNote React repository as a git submodule at BlockNoteReact. Use the following workflow to detect and port upstream changes into libs/ngx-blocknote:

Component mapping hints
- React components under packages/react/src/components/* generally map to libs/ngx-blocknote/src/lib/components/*:
  - FormattingToolbar -> components/formatting-toolbar/*
  - SideMenu -> components/side-menu/*
  - LinkToolbar -> components/link-toolbar/*
  - TableHandles -> components/table-handles/*
  - SuggestionsMenu (SlashMenu) -> components/suggestions-menu/*
- Core editor wiring:
  - React: hooks/useBlockNoteEditor.ts and editor context files
  - Angular: src/lib/editor/bna-editor.component.ts (createEditor, listeners) and NgxBlocknoteService
- Styles: packages/react/src/styles/* -> libs/ngx-blocknote/src/lib/styles/*

Porting guidance
- Props/Inputs: If upstream adds/renames props, mirror them as @Input()s on the Angular component; propagate through to service/editor calls.
- Events/Outputs: Map upstream callbacks to @Output() EventEmitters and ensure listeners are wired in createEditorListeners.
- Behavior changes: If upstream altered command behavior or editor options, review BnaEditorComponent.createEditor and NgxBlocknoteService for matching options and types.
- CSS: Sync updated classes and variables to keep parity. Check blocks.css, toolbar.css, side-menu.css, core.css under libs/ngx-blocknote/src/lib/styles.

Notes
- Do not modify files inside BlockNoteReact from this repo; treat it as read-only and sync through your Angular wrapper.
