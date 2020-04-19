import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfpiechartComponent } from './halfpiechart.component';

describe('HalfpiechartComponent', () => {
  let component: HalfpiechartComponent;
  let fixture: ComponentFixture<HalfpiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfpiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
