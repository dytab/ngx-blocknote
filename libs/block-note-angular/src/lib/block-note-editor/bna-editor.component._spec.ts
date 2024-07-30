import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaEditorComponent } from '@dytab/block-note-angular';

describe('BnaEditorComponent', () => {
  let component: BnaEditorComponent;
  let fixture: ComponentFixture<BnaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
