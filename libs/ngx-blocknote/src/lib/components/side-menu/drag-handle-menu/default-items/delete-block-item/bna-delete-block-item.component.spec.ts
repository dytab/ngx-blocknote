import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../../services';
import { BnaDeleteBlockItemComponent } from './bna-delete-block-item.component';

describe('DeleteBlockItemComponent', () => {
  let component: BnaDeleteBlockItemComponent;
  let fixture: ComponentFixture<BnaDeleteBlockItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaDeleteBlockItemComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaDeleteBlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
