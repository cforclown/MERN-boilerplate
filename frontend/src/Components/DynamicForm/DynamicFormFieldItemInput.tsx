import { IMetadataField } from '@/Utils/metadata';
import { ControllerRenderProps } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { getTextInputType } from './DynamicForm.service';

export interface IDynamicFormFieldItemInput {
  formField: ControllerRenderProps<any, any>,
  rawField: IMetadataField<any>,
  isEditing?: boolean
}

function DynamicFormFieldItemInput({
  formField,
  rawField,
  isEditing
}: IDynamicFormFieldItemInput): JSX.Element | null {
  if (
    rawField.type.value === 'ID'
    || (rawField.type.noneditable === 'hide' && isEditing)
    || (rawField.type.noneditable === 'static' && isEditing)
  ) {
    return null;
  }

  const { type } = rawField;

  if (type.value === 'ENUM' && type.enum) {
    return (
      <Select {...formField}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={rawField.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {type.enum.label && (
              <SelectLabel>
                {type.enum.label}
              </SelectLabel>
            )}
            {type.enum.options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input 
      { ...formField } 
      type={getTextInputType(rawField.type)} 
      placeholder={rawField.placeholder} 
    />
  );
}

export default DynamicFormFieldItemInput;
