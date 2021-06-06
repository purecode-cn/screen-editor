import React from 'react';
import { useNode } from '@craftjs/core';
import { Checkbox, Input, InputNumber, Radio, Select, Switch } from 'antd';

import { FormItem, NumberWithUnitInput, ColorPicker } from '../components';
import {
  BackgroundFields,
  BoundFields,
  GridFields,
  DataSourceFields,
  FontFields,
  SeriesFields,
  MarginFields,
  LegendFields,
} from './fields';

export const Settings: React.FC<any> = ({ info }) => {
  const {
    actions: { setProp },
    props,
  } = useNode(node => ({
    props: node.data.props,
  }));

  const setValue = React.useCallback((propKey, value) => {
    setProp((props: any) => {
      if (props) {
        props[propKey] = value;
      } else {
        props = { [propKey]: value };
      }
    });
  }, []);

  return info.map((k: any) => (
    <SettingItem
      key={k.name}
      {...k}
      value={props[k.name]}
      setValue={setValue}
    />
  ));
};

export const SettingItem: React.FC<any> = ({
  name,
  controlType,
  label,
  value,
  setValue,
  ...restProps
}) => {
  switch (controlType) {
    case 'input':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <Input {...restProps} />
        </FormItem>
      );
    case 'textarea':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <Input.TextArea {...restProps} />
        </FormItem>
      );
    case 'inputNumber':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <InputNumber {...restProps} />
        </FormItem>
      );
    case 'numberUnit':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <NumberWithUnitInput {...restProps} />
        </FormItem>
      );
    case 'radio':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <Radio.Group {...restProps}>
            {restProps.options.map((o: any) => (
              <Radio value={o.value} key={o.value}>
                {o.label}
              </Radio>
            ))}
          </Radio.Group>
        </FormItem>
      );
    case 'radioButton':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <Radio.Group {...restProps}>
            {restProps.options.map((o: any) => (
              <Radio.Button value={o.value} key={o.value}>
                {o.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </FormItem>
      );
    case 'switch':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          valuePropName="checked"
          onChange={(v, n) => setValue(n, v)}
        >
          <Switch {...restProps}></Switch>
        </FormItem>
      );
    case 'tags':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          valuePropName="checked"
          onChange={(v, n) => setValue(n, v)}
        >
          <Select mode="tags" {...restProps}></Select>
        </FormItem>
      );
    case 'select':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <Select {...restProps}></Select>
        </FormItem>
      );
    case 'bound':
      return (
        <BoundFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        />
      );
    case 'series':
      return (
        <SeriesFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        ></SeriesFields>
      );
    case 'dataSource':
      return (
        <DataSourceFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        />
      );
    case 'background':
      return (
        <BackgroundFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        />
      );
    case 'grid':
      return (
        <GridFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        />
      );
    case 'font':
      return (
        <FontFields
          name={name}
          label={label}
          value={value}
          {...restProps}
          onChange={(v: any, n: any) => setValue(n, v)}
        />
      );
    case 'color':
      return (
        <FormItem
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        >
          <ColorPicker />
        </FormItem>
      );
    case 'margin':
      return (
        <MarginFields
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        />
      );
    case 'legend':
      return (
        <LegendFields
          name={name}
          label={label}
          value={value}
          onChange={(v, n) => setValue(n, v)}
        />
      );
    default:
      return <div>还没做到</div>;
  }
};
