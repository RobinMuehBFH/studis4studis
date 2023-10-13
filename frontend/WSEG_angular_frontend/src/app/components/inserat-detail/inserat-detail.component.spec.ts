import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratDetailComponent } from './inserat-detail.component';

describe('InseratDetailComponent', () => {
  let component: InseratDetailComponent;
  let fixture: ComponentFixture<InseratDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InseratDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InseratDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
