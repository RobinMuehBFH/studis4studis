import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NachhilfeCreationComponent } from './nachhilfe-creation.component';

describe('NachhilfeCreationComponent', () => {
  let component: NachhilfeCreationComponent;
  let fixture: ComponentFixture<NachhilfeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NachhilfeCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NachhilfeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
