import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { BnaLinkFormComponent } from './bna-link-form.component';

describe('BnaLinkFormComponent', () => {
  let component: BnaLinkFormComponent;
  let fixture: ComponentFixture<BnaLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NgxBlocknoteService],
      imports: [BnaLinkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
