import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingSysToolbarComponent } from './vending-sys-toolbar.component';

describe('VendingSysToolbarComponent', () => {
  let component: VendingSysToolbarComponent;
  let fixture: ComponentFixture<VendingSysToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendingSysToolbarComponent]
    });
    fixture = TestBed.createComponent(VendingSysToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
