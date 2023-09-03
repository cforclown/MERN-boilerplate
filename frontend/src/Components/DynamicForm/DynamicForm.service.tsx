import * as zod from 'zod';
import { IMetadataField, IMetadataFieldType } from '@/Utils/metadata';
import { UseFormReturn } from 'react-hook-form';
import DynamicFormField from './DynamicFormField';

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
    case 'DATETIME':
      return zod.date({
        required_error: (!(type.noneditable === 'static' && isEditing) && type.required) ? 'Please select a date' : undefined,
        invalid_type_error: 'That\'s not a date!',
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
