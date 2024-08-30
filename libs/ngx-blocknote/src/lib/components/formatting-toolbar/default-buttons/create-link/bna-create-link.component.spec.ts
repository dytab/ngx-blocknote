import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaCreateLinkComponent } from './bna-create-link.component';

describe('BnaCreateLinkComponent', () => {
  let component: BnaCreateLinkComponent;
  let fixture: ComponentFixture<BnaCreateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaCreateLinkComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaCreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
