import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type HTMLAttributes,
} from "react";
import { Label, type LabelProps } from "@aurora-ui-react/label";
import { cn } from "@aurora-ui-react/core";
import styles from "./Form.module.css";

// --- FormField Context ---

interface FormFieldContextValue {
  id: string;
  name: string;
  error?: string;
  required?: boolean;
  descriptionId: string;
  messageId: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a Form.Field");
  }
  return context;
}

// --- Form (root) ---

export interface FormProps extends HTMLAttributes<HTMLFormElement> {}

const FormRoot = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn(styles.root, className)} {...props} />
  )
);
FormRoot.displayName = "Form";

// --- Form.Field ---

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  error?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, error, required, className, children, ...props }, ref) => {
    const generatedId = useId();
    const id = `${name}-${generatedId}`;
    const descriptionId = `${id}-description`;
    const messageId = `${id}-message`;

    return (
      <FormFieldContext.Provider
        value={{ id, name, error, required, descriptionId, messageId }}
      >
        <div ref={ref} className={cn(styles.field, className)} {...props}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormField.displayName = "FormField";

// --- Form.Label ---

export interface FormLabelProps extends LabelProps {}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { id, required, error } = useFormField();
    return (
      <Label
        ref={ref}
        htmlFor={id}
        required={required}
        error={!!error}
        className={className}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

// --- Form.Description ---

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useFormField();
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn(styles.description, className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

// --- Form.Message ---

export interface FormMessageProps
  extends HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "success";
}

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ type = "error", className, children, ...props }, ref) => {
    const { messageId, error } = useFormField();
    const content = children ?? (type === "error" ? error : undefined);

    if (!content) return null;

    return (
      <p
        ref={ref}
        id={messageId}
        role="alert"
        aria-live="polite"
        data-type={type}
        className={cn(styles.message, className)}
        {...props}
      >
        {content}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

// --- Compound export ---

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Description: FormDescription,
  Message: FormMessage,
});
