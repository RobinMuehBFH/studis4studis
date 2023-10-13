import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NachhilfeDetailComponent } from './nachhilfe-detail.component';

describe('NachhilfeDetailComponent', () => {
  let component: NachhilfeDetailComponent;
  let fixture: ComponentFixture<NachhilfeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NachhilfeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NachhilfeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
