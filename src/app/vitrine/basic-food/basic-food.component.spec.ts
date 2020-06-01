import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFoodComponent } from './basic-food.component';

describe('BasicFoodComponent', () => {
  let component: BasicFoodComponent;
  let fixture: ComponentFixture<BasicFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
