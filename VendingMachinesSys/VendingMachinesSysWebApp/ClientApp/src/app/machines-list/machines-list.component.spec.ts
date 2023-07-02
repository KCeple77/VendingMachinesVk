import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesListComponent } from './machines-list.component';

describe('MachinesListComponent', () => {
  let component: MachinesListComponent;
  let fixture: ComponentFixture<MachinesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachinesListComponent]
    });
    fixture = TestBed.createComponent(MachinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
