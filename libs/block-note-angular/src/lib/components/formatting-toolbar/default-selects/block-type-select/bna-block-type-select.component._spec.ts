import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteAngularService } from '../../../../services';
import { BnaBlockTypeSelectComponent } from './bna-block-type-select.component';

describe('BnaBlockTypeSelectComponent', () => {
  let component: BnaBlockTypeSelectComponent;
  let fixture: ComponentFixture<BnaBlockTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBlockTypeSelectComponent],
      providers: [BlockNoteAngularService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBlockTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
