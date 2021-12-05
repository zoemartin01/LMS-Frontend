import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwlabRulesComponent } from './hwlab-rules.component';

describe('HwlabRulesComponent', () => {
  let component: HwlabRulesComponent;
  let fixture: ComponentFixture<HwlabRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwlabRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwlabRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
