import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesMainLayoutComponent } from './offices-main-layout.component';

describe('OfficesMainLayoutComponent', () => {
  let component: OfficesMainLayoutComponent;
  let fixture: ComponentFixture<OfficesMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficesMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficesMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
