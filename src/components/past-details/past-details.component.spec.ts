import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDetailsComponent } from './past-details.component';

describe('PastDetailsComponent', () => {
  let component: PastDetailsComponent;
  let fixture: ComponentFixture<PastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
