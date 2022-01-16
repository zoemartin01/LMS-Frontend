import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";

import { HelpFaqComponent } from './help-faq.component';

describe('HelpFaqComponent', () => {
  let component: HelpFaqComponent;
  let fixture: ComponentFixture<HelpFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HelpFaqComponent,
      ],
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
