import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEgresoPage } from './formulario-egreso.page';

describe('FormularioEgresoPage', () => {
  let component: FormularioEgresoPage;
  let fixture: ComponentFixture<FormularioEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioEgresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
