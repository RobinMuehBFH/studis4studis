import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NachhilfeComponent } from './nachhilfe.component';

describe('NachhilfeComponent', () => {
  let component: NachhilfeComponent;
  let fixture: ComponentFixture<NachhilfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NachhilfeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NachhilfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
