import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratComponent } from './inserat.component';

describe('InseratComponent', () => {
  let component: InseratComponent;
  let fixture: ComponentFixture<InseratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InseratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InseratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
