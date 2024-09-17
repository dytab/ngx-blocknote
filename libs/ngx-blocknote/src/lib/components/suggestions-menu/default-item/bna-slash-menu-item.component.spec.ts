import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlocknoteService } from '../../../services';
import { BnaSlashMenuItemComponent } from './bna-slash-menu-item.component';

describe('BnaSlashMenuItemComponent', () => {
  let component: BnaSlashMenuItemComponent;
  let fixture: ComponentFixture<BnaSlashMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSlashMenuItemComponent],
      providers: [NgxBlocknoteService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSlashMenuItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suggestionItem', {} as never);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
