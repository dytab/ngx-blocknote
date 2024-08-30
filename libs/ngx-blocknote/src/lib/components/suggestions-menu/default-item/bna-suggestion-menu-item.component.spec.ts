import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlocknoteService } from '../../../services';
import { BnaSuggestionMenuItemComponent } from './bna-suggestion-menu-item.component';

describe('BnaSuggestionMenuItemComponent', () => {
  let component: BnaSuggestionMenuItemComponent;
  let fixture: ComponentFixture<BnaSuggestionMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionMenuItemComponent],
      providers: [NgxBlocknoteService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionMenuItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suggestionItem', {} as never);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
