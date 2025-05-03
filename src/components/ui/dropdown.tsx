import { ChevronDown } from 'lucide-react';

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
}
type DropdownChild = React.ReactElement<typeof DropdownItem>;
type NonEmptyArray<T> = [T, ...T[]];

type DropdownClassNames = {
  dropdown?: string;
  button?: string;
  container?: string;
};

type DropdownSelectValue = {
  value: string;
  label: string;
};

interface DropdownProps {
  children: DropdownChild | NonEmptyArray<DropdownChild>;
  classNames?: DropdownClassNames;
  placeHolder?: string;
  defaultValue?: DropdownSelectValue[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  classNames,
  placeHolder = 'Select....',
  defaultValue = [],
}: DropdownProps) => {
  return (
    <div className={`dropdown dropdown-end ${classNames?.dropdown ?? ''}`}>
      <div tabIndex={0} role="button" className={`${classNames?.button ?? ''}`}>
        {defaultValue?.length > 0 ? defaultValue.map((item) => item.label).join(', ') : placeHolder}
        <ChevronDown className="h-4 w-4 ml-auto" />
      </div>
      <ul tabIndex={0} className={`dropdown-content menu ${classNames?.container ?? ''} `}>
        {children}
      </ul>
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, className }: DropdownItemProps) => (
  <li className={className}>{children}</li>
);
