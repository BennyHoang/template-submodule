import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongRoleComponent } from './wrong-role.component';

describe('WrongRoleComponent', () => {
  let component: WrongRoleComponent;
  let fixture: ComponentFixture<WrongRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
