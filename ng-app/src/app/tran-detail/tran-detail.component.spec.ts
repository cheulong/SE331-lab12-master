import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranDetailComponent } from './tran-detail.component';

describe('TranDetailComponent', () => {
  let component: TranDetailComponent;
  let fixture: ComponentFixture<TranDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
