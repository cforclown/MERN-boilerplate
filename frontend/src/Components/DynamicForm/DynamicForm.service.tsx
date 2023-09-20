import * as zod from 'zod';
import { IMetadataField, IMetadataFieldType } from '@/Utils/metadata';
import { UseFormReturn } from 'react-hook-form';
import DynamicFormField from './DynamicFormField';
import { Skeleton } from '../ui/skeleton';

const getDefaultValue = (fieldType: IMetadataFieldType): any => {
  if (fieldType.default) {
    return fieldType.default;
  }

  switch (fieldType.value) {
    case 'NUMBER':
      return 0;
    case 'ENUM':
      return fieldType.enum?.options[0].id ?? '';
    default:
      return '';
  }
};

export function generateFormDefaultValues<T>(fields: IMetadataField<T>[]): Record<string, any> {
  return fields.filter(f => f.accessorKey).reduce((acc: Record<string, any>, curr) => {
    acc[curr.accessorKey as string] = getDefaultValue(curr.type);
    return acc;
  }, {});
}

export function generateFormSkeleton<T>(fields: IMetadataField<T>[]): JSX.Element[] {
  const skeletons = fields.filter(f => f.accessorKey).map((field) => (
    <div key={field.accessorKey} className="flex flex-col items-start gap-4 mb-8">
      <Skeleton className="h-6 w-[25%]" />
      <Skeleton className="h-8 w-[80%]" />
    </div>
  ));
  skeletons.push(
    <Skeleton key='submit-btn' className="h-10 w-[75px]" />
  );
    
  return skeletons;
}

export const getTextInputType = (type: IMetadataFieldType): string => {
  switch (type.value) {
    case 'EMAIL':
      return 'email';
    case 'PASSWORD':
      return 'password';
    case 'NUMBER':
      return 'number';
    case 'DATE':
      return 'date';
    case 'DATETIME':
      return 'datetime-local';
    default:
      return 'text';
  }
};

export function generateFormFields(
  form: UseFormReturn<any, any, undefined>,
  fields: IMetadataField<any>[]
): any {
  return fields.filter(f => f.accessorKey).map((field) => (
    <DynamicFormField key={field.accessorKey} form={form} field={field} />
  ));
}

function getFieldSchema<T>(field: IMetadataField<T>, isEditing?: boolean): any {
  const { type } = field;

  let schema;
  switch(type.value) {
    case 'EMAIL':
      schema = zod.string({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please provide valid email' : undefined,
      }).email({ 
        message: 'Invalid email address' 
      });
      return (!(type.noneditable === 'static' && isEditing) && type.required) ? schema.nonempty() : schema;
    case 'DATE':
      return zod.date({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please select a date' : undefined,
        invalid_type_error: 'That\'s not a date!',
      });
    case 'DATETIME':
      return zod.string({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please select a date' : undefined,
        invalid_type_error: 'That\'s not a date!',
      }).transform((val, ctx) => {
        try {
          const valDate = new Date(val).toISOString();
          if (!zod.string().datetime().safeParse(valDate).success) {
            return ctx.addIssue({
              code: zod.ZodIssueCode.custom,
              message: 'Invalid datetime format'
            });
          }
          
          return valDate;
        } catch (err) {
          return ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'Invalid datetime format'
          });
        }
      });
    case 'NUMBER':
      return zod.number({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please provide valid number' : undefined,
        invalid_type_error: 'That\'s not a number!',
      });
    case 'PERCENT':
      return zod.number({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please provide valid number' : undefined,
        invalid_type_error: 'That\'s not a number!',
      }).min(0).max(100);
    case 'STRING':
    case 'PASSWORD':
    case 'ID':
    default:
      return zod.string({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please provide text' : undefined,
      });
  }
}

export function generateFormSchema<T>(
  fields: IMetadataField<T>[],
  isEditing?: boolean
): any {
  return zod.object(fields.filter(f => f.accessorKey).reduce((acc: Record<string, any>, curr) => {
  acc[curr.accessorKey as string] = getFieldSchema(curr, isEditing);
  return acc;
}, {}));
}
