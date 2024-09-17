import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../services';
import { BnaSlashMenuComponent } from './bna-slash-menu.component';

describe('BnaSlashMenuComponent', () => {
  let component: BnaSlashMenuComponent;
  let fixture: ComponentFixture<BnaSlashMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSlashMenuComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSlashMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
