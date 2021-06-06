import React, { ChangeEvent } from 'react';
import { defaultGetValueFromEvent } from '../utils/valueUtil';
import '../styles.css';

export interface FormItemProps {
  name: string;
  label: string;
  value?: any;
  valuePropName?: string;
  onChange: (v: any, n: string) => void;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const FormItem = ({
  name,
  label,
  value,
  valuePropName = 'value',
  children,
  onChange,
  ...props
}: FormItemProps) => {
  if (!children) {
    return null;
  }
  const handleChange = (e: ChangeEvent | string) => {
    let v;
    if (typeof e === 'string') {
      v = e;
    } else {
      v = defaultGetValueFromEvent(valuePropName, e);
    }
    children.props && children.props.onChange && children.props.onChange(e);
    onChange && onChange(v, name);
  };
  props[valuePropName] = value;
  props['onChange'] = handleChange;
  let returnChildNode: React.ReactNode = React.cloneElement(children, {
    ...children.props,
    ...props,
  });
  return (
    <div className="ant-row ant-form-item">
      <div className="ant-col ant-form-item-label">
        <label title={label}>{label}</label>
      </div>
      <div className="ant-col ant-form-item-control">
        <div className="ant-form-item-control-input">
          <div className="ant-form-item-control-input-content">
            {returnChildNode}
          </div>
        </div>
      </div>
    </div>
  );
};
