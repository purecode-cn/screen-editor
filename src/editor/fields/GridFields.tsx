import React, { useEffect, useState } from 'react';
import { Col, InputNumber, Radio, Row, Slider, Switch } from 'antd';
import { FormItem, ColorPicker } from '../../components';

export const GridFields = (props: any) => {
  const { name, value, onChange, size } = props;

  const handleChange = (v: string, n: string) => {
    onChange && onChange({ ...value, [n]: v }, name);
  };

  return (
    <>
      <FormItem
        label="显示网格"
        name="show"
        value={value && value.show}
        onChange={handleChange}
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
      {value && value.show && (
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              label="网格宽度"
              name="width"
              value={value && value.width}
              onChange={handleChange}
            >
              <InputNumber size={size} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="网格颜色"
              name="color"
              value={value && value.color}
              onChange={handleChange}
            >
              <ColorPicker size={size} />
            </FormItem>
          </Col>
        </Row>
      )}
    </>
  );
};
