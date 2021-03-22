import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinCharacterLengthComponent } from './min-character-length.component';

describe('MinCharacterLengthComponent', () => {
  let component: MinCharacterLengthComponent;
  let fixture: ComponentFixture<MinCharacterLengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinCharacterLengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinCharacterLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
