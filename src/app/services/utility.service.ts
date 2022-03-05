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

  /**
   * Formats errors given back by the backend
   * @param {any} errorResponse error response object
   */
  public formatErrorMessage(errorResponse: any): string {
    //if backend gives back error message as string in response body
    if (errorResponse.error && errorResponse.error.message && typeof errorResponse.error.message === 'string') {
      return errorResponse.error.message;
    }

    //if backend gives back an array of errors in response body
    if (errorResponse.error && Array.isArray(errorResponse.error)) {
      let errorMessage = 'Invalid Input:';

      for (const errorEntry of errorResponse.error) {
        Object.keys(errorEntry.constraints).forEach(
          (key: any) => {
            errorMessage += `<br> - ${errorEntry.constraints[key]}`
          }
        );
      }

      return errorMessage;
    }

    //If no special error message was sent back by backend
    return 'There has been an error!';
  }
}
