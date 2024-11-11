import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLicensePage } from './create-license.page';

describe('CreateLicensePage', () => {
  let component: CreateLicensePage;
  let fixture: ComponentFixture<CreateLicensePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLicensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
