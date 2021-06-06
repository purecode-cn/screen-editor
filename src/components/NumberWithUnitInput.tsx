import React, { useEffect, useState } from 'react';
import { Input, InputNumber, InputNumberProps, Select } from 'antd';

export interface NumberWithUnitInputProps extends InputNumberProps {
  unitOptions?: [Record<'label' | 'value', string>];
  value?: string;
}

const defaultUnitOptions = [
  { label: '无', value: '' },
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' },
  { label: 'pt', value: 'pt' },
  { label: 'rem', value: 'rem' },
];

export const NumberWithUnitInput = ({
  value,
  onChange,
  unitOptions = defaultUnitOptions,
  ...props
}: any) => {
  const [num, setNum] = useState(0);
  const [unit, setUnit] = useState('px');

  useEffect(() => {
    if (value && typeof value === 'string') {
      const matches = value.match(/([\d\.-]+)(.*)/);
      setNum(parseFloat(matches![1]));
      setUnit(matches![2]);
    } else if (value && typeof value === 'number') {
      setNum(value);
      setUnit(unitOptions[0].value);
    } else {
      setNum(0);
      setUnit('');
    }
  }, [value]);

  const handleChange = (field: string, val: string) => {
    let v = num + unit;
    switch (field) {
      case 'num':
        setNum(parseFloat(val || '0'));
        v = (val || '0') + unit;
        break;
      case 'unit':
        setUnit(val);
        v = num + val;
        break;
      default:
        break;
    }

    onChange && onChange(v);
  };

  return (
    <Input.Group compact size={props.size}>
      <InputNumber
        value={num}
        size={props.size}
        onChange={v => handleChange('num', v ? v.toString() : '')}
      />
      <Select
        className="se-unit-select"
        size={props.size}
        value={unit}
        onChange={v => handleChange('unit', v)}
        dropdownMatchSelectWidth={false}
      >
        {unitOptions.map((x: any) => (
          <Select.Option value={x.value} key={x.value}>
            {x.label}
          </Select.Option>
        ))}
      </Select>
    </Input.Group>
  );
};