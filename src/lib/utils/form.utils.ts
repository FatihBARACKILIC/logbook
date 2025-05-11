import { toast } from "@/components/toast";
import { ActionError, isInputError } from "astro:actions";

/**
 * The function `disableSubmitButton` disables the submit button within a specified form element.
 * @param {HTMLFormElement} form - The `form` parameter is an HTMLFormElement object representing a
 * form element in the DOM. It is the form element to which the submit button will be disabled.
 * @param {string} [selector=button[type='submit']] - The `selector` parameter in the
 * `disableSubmitButton` function is a CSS selector used to target the submit button within the
 * specified form element. By default, the selector is set to target `<button>` elements with a `type`
 * attribute set to `'submit'`. However, you can customize the
 */
export function disableSubmitButton(
  form: HTMLFormElement,
  selector: string = "button[type='submit']"
): void {
  const button = form.querySelector(selector) as HTMLButtonElement;
  if (button) {
    button.setAttribute("disabled", "true");
  }
}

/**
 * The function `enableSubmitButton` enables a submit button within a specified form element.
 * @param {HTMLFormElement} form - The `form` parameter is an HTMLFormElement object representing a
 * form element in the DOM.
 * @param {string} [selector=button[type='submit']] - The `selector` parameter in the
 * `enableSubmitButton` function is a CSS selector used to target the submit button within the
 * specified HTML form element. By default, the selector is set to target `<button>` elements with a
 * `type` attribute set to `'submit'`. This allows the function to
 */
export function enableSubmitButton(
  form: HTMLFormElement,
  selector: string = "button[type='submit']"
): void {
  const button = form.querySelector(selector) as HTMLButtonElement;
  if (button) {
    button.removeAttribute("disabled");
  }
}

type HandleFormErrorOptions = {
  submitButtonSelector?: string;
};

/**
 * The function `handleFormErrors` handles form errors by displaying input errors or a generic error
 * message and enabling the submit button.
 * @param errors - The `errors` parameter is an object that contains error information related to form
 * submission. It can be of type `ActionError<T>`, where `T` is a generic type that represents the
 * shape of the error object. The function checks if the errors are related to input fields or a
 * general form
 * @param {HTMLFormElement} form - The `form` parameter in the `handleFormErrors` function is an
 * HTMLFormElement representing the form element in the DOM that you want to handle errors for.
 * @param {HandleFormErrorOptions} options - The `options` parameter in the `handleFormErrors` function
 * is an optional parameter of type `HandleFormErrorOptions`. It has a default value of `{
 * submitButtonSelector: "button[type='submit']" }`. This parameter allows you to customize the
 * behavior of the function by providing additional options
 */
export function handleFormErrors<T extends Record<string, unknown>>(
  errors: ActionError<T>,
  form: HTMLFormElement,
  options: HandleFormErrorOptions = { submitButtonSelector: "button[type='submit']" }
): void {
  if (isInputError(errors)) {
    handleInputErrors(errors.fields, form);
  } else {
    toast.error("An error occurred while signing in. Please try again.");
  }
  enableSubmitButton(form, options.submitButtonSelector);
}

/**
 * The function `handleGeneralErrors` in TypeScript displays an error message using a toast
 * notification.
 * @param {ActionError} error - The `error` parameter in the `handleGeneralErrors` function is of type
 * `ActionError`, which likely contains information about an error that occurred during an action or
 * operation. The function uses this error object to display an error message using a toast
 * notification.
 */
export function handleGeneralErrors(error: ActionError) {
  toast.error(error.message);
}

/**
 * The function `handleInputErrors` updates error messages and accessibility attributes for form inputs
 * based on the provided error fields.
 * @param errorFields - The `errorFields` parameter is a record object where the keys are field names
 * and the values are arrays of error messages associated with those fields.
 * @param {HTMLFormElement} form - The `form` parameter in the `handleInputErrors` function is expected
 * to be an HTMLFormElement, which represents a form element in the DOM. This form element contains
 * input fields that may have validation errors that need to be handled.
 */
function handleInputErrors(
  errorFields: Record<string, string[] | undefined>,
  form: HTMLFormElement
): void {
  Object.entries(errorFields).forEach(([key, value]) => {
    const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement | null;
    const errorMessage = form.querySelector(`#${key}-error`) as HTMLParagraphElement | null;
    const description = form.querySelector(`#${key}-description`) as HTMLParagraphElement | null;

    if (input && errorMessage && value) {
      errorMessage.textContent = value.join(", ");
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", `${key}-error`);
      if (description) {
        description.setAttribute("aria-hidden", "true");
      }
    }
  });
}
