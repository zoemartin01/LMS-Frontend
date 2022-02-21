import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from "@angular/forms";

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dirty values of a form', () => {
    let subForm: FormGroup = new FormGroup({
      subField: new FormControl('sub'),
    });

    let formGroup: FormGroup = new FormGroup({
      fieldOne: new FormControl('one'),
      fieldTwo: new FormControl('two'),
      subForm,
    });

    formGroup.controls['fieldTwo'].markAsDirty();
    subForm.controls['subField'].markAsDirty();

    expect(service.getDirtyValues(formGroup)).toEqual({
      fieldTwo: 'two',
      subForm: {
        subField: 'sub',
      },
    });
  });
});
