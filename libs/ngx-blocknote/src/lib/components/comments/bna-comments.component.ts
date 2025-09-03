import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadData } from '@blocknote/core/comments';
import { NgxBlocknoteService } from '../../services/ngx-blocknote.service';
import { BnaDictionaryService } from '../../i18n/bna-dictionary.service';

export interface BnaCommentsProps {
  thread: ThreadData;
  maxCommentsBeforeCollapse?: number;
}

@Component({
  selector: 'bna-comments',
  template: `
    <div class="bn-comments-container">
      <!-- Individual comments -->
      <ng-container *ngFor="let comment of thread.comments; let i = index; trackBy: trackByCommentId">
        <bna-comment
          [comment]="comment"
          [thread]="thread"
          [showResolveButton]="i === 0"
        ></bna-comment>
      </ng-container>

      <!-- Resolved by comment if needed -->
      <div
        *ngIf="thread.resolved && thread.resolvedUpdatedAt && thread.resolvedBy"
        class="bn-thread-comment bn-resolved-comment"
      >
        <div class="bn-resolved-text">
          {{ dictionary.comments?.sidebar?.marked_as_resolved || 'Marked as resolved' }}
        </div>
      </div>

      <!-- Collapse prompt if too many comments -->
      <div
        *ngIf="shouldShowCollapsePrompt"
        class="bn-thread-expand-prompt"
        (click)="expandComments()"
      >
        {{ getMoreRepliesText() }}
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BnaCommentsComponent implements BnaCommentsProps {
  @Input() thread!: ThreadData;
  @Input() maxCommentsBeforeCollapse?: number;

  private ngxBlocknoteService = inject(NgxBlocknoteService);
  private dictionaryService = inject(BnaDictionaryService);

  private expanded = false;

  get dictionary() {
    return this.dictionaryService.getDictionary();
  }

  get editor() {
    return this.ngxBlocknoteService.editor();
  }

  get shouldShowCollapsePrompt(): boolean {
    return !!(
      this.maxCommentsBeforeCollapse &&
      this.thread.comments.length > this.maxCommentsBeforeCollapse &&
      !this.expanded
    );
  }

  trackByCommentId(index: number, comment: any): string {
    return comment.id;
  }

  expandComments(): void {
    this.expanded = true;
  }

  getMoreRepliesText(): string {
    if (!this.maxCommentsBeforeCollapse) return '';
    const hiddenCount = this.thread.comments.length - 2; // Show first and last
    return this.dictionary.comments?.sidebar?.more_replies?.(hiddenCount) ||
           `${hiddenCount} more replies`;
  }

  getVisibleComments() {
    if (!this.maxCommentsBeforeCollapse || this.expanded) {
      return this.thread.comments;
    }

    if (this.thread.comments.length <= this.maxCommentsBeforeCollapse) {
      return this.thread.comments;
    }

    // Show first comment and last comment, hide middle ones
    return [
      this.thread.comments[0],
      ...this.thread.comments.slice(-1)
    ];
  }
}
