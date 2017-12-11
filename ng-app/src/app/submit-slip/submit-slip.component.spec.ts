import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSlipComponent } from './submit-slip.component';

describe('SubmitSlipComponent', () => {
  let component: SubmitSlipComponent;
  let fixture: ComponentFixture<SubmitSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
