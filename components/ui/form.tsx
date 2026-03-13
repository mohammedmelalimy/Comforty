'use client';

import * as React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext
} from 'react-hook-form';

import { cn } from '@/lib/utils';

const Form = FormProvider;

/* -------------------------------------------------------------------------- */
/* Context                                   */
/* -------------------------------------------------------------------------- */
type FormItemContextValue = {
  id: string;
  name: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

/* -------------------------------------------------------------------------- */
/* Components                                   */
/* -------------------------------------------------------------------------- */

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id, name: props.name }}>
      <Controller {...props} />
    </FormItemContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: fieldContext.id,
    name: fieldContext.name,
    ...fieldState
  };
};

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export function FormLabel({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  const { id } = useFormField();

  return (
    <label
      htmlFor={id}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

export function FormControl({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { id, error } = useFormField();

  return (
    <div
      id={id}
      aria-invalid={!!error}
      aria-describedby={!error ? `${id}-form-item-description` : `${id}-form-item-message`}
      {...props}
    />
  );
}

export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, id } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={`${id}-form-item-message`}
      className={cn('text-sm font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
}

export { Form };
