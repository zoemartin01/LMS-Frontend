import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for utility methods
 * @typedef {Service} UtilityService
 * @class
 */
export class UtilityService {
  /**
   * constructor
   */
  constructor() {
  }

  /**
   * Gets all values of a form that are marked with a dirty bit
   *
   * @param {FormGroup} form form
   */
  public getDirtyValues(form: FormGroup) {
    let dirtyValues: { [key: string]: any} = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if ((<FormGroup>currentControl).controls)
            dirtyValues[key] = this.getDirtyValues(<FormGroup>currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
}
