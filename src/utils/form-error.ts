import { FieldErrors, FieldValues } from "react-hook-form";

const hnadleErrorFocus = (errors: FieldErrors<FieldValues>) => {
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    const field = document.querySelector(`[data-field^="${firstErrorField}"]`) as HTMLElement;
    if (field) {
      field.setAttribute("tabindex", "0");
      field.scrollIntoView({ behavior: "auto", block: "center" });
      field.focus();
      field.onblur = () => {
        field.removeAttribute("tabindex");
      };
    }
  }
};

export { hnadleErrorFocus };
