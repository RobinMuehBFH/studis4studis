import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratCreationComponent } from './inserat-creation.component';

describe('InseratCreationComponent', () => {
  let component: InseratCreationComponent;
  let fixture: ComponentFixture<InseratCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InseratCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InseratCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
