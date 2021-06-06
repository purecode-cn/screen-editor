import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { FormItem } from '../src/components';
import { Input } from 'antd';
import 'antd/dist/antd.min.css';
import NumberWithUnitInput from '../src/components/NumberWithUnitInput';
import ColorPicker from '../src/components/ColorPicker';
import {
  BackgroundFields,
  BoundFields,
  DataSourceFields,
  FontFields,
} from '../src/settingFields';
import { useEffect } from '@storybook/client-api';
import { ApiConfigContext, defaultValue } from '../src/ApiConfigContext';

const meta: Meta = {
  title: 'FormItem',
  component: FormItem,
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'middle', 'large'],
    },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState({
    text: 'text',
    numberUnit: '10px',
    color: '#fff',
    bound: { x: '0px', y: '0px', width: '200px', height: '200px' },
    background: { type: 'color', color: '#fff' },
    font: { fontSize: '16px', align: 'center', textColor: '#000' },
    data: {}
  });

  const { size } = args;

  const handleChange = (v, n) => setValue(f => ({ ...f, [n]: v }));
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <div className="screen-editor ant-form ant-form-vertical">
        <FormItem
          value={value.text}
          label="文本"
          name="text"
          onChange={handleChange}
        >
          <Input size={size} />
        </FormItem>
        <FormItem
          value={value.numberUnit}
          name="numberUnit"
          label="数字单位"
          onChange={handleChange}
        >
          <NumberWithUnitInput size={size} />
        </FormItem>
        <FormItem
          name="color"
          value={value.color}
          label="颜色"
          onChange={handleChange}
        >
          <ColorPicker size={size} />
        </FormItem>
        <BoundFields
          value={value.bound}
          name="bound"
          label="尺寸与位置"
          onChange={handleChange}
          size={size}
        />
        <BackgroundFields
          value={value.background}
          name="background"
          label="背景"
          onChange={handleChange}
          size={size}
        />
        <FontFields
          value={value.font}
          name="font"
          label="字体"
          onChange={handleChange}
          size={size}
        />
        <DataSourceFields
          value={value.data}
          name="data"
          label="数据"
          onChange={handleChange}
          size={size}
        />
        <div style={{ whiteSpace: 'pre' }}>
          {JSON.stringify(value, null, 4)}
        </div>
      </div>
    </ApiConfigContext.Provider>
  );
};

export const SimpleFormItem = Template.bind({});
SimpleFormItem.args = {
  size: 'middle',
};
