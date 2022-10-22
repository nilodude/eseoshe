import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazygridComponent } from './crazygrid.component';

describe('CrazygridComponent', () => {
  let component: CrazygridComponent;
  let fixture: ComponentFixture<CrazygridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrazygridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrazygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
