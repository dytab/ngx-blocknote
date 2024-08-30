import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaBlockTypeSelectComponent } from './bna-block-type-select.component';

describe('BnaBlockTypeSelectComponent', () => {
  let component: BnaBlockTypeSelectComponent;
  let fixture: ComponentFixture<BnaBlockTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBlockTypeSelectComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBlockTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
