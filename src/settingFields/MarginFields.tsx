import React from 'react';
import { Col, Row } from 'antd';
import NumberWithUnitInput from '../components/NumberWithUnitInput';
import { FormItem } from '../components';

export const MarginFields = (props: any) => {
  const {
    name,
    value,
    label,
    onChange,
    size,
  } = props;

  const handleChange = (v: string, n: string) => {
    onChange({ ...value, [n]: v }, name);
  };

  return (
    <>
      {label && (
        <div className="form-item-group">
          <h4>{label}</h4>
        </div>
      )}
      <Row gutter={4}>
        <Col span={12}>
          <FormItem
            label="上边距"
            name="top"
            value={value ? value.top : ''}
            onChange={handleChange}
          >
            <NumberWithUnitInput size={size} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="右边距"
            name="right"
            value={value ? value.right : ''}
            onChange={handleChange}
          >
            <NumberWithUnitInput size={size} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="下边距"
            name="bottom"
            value={value ? value.bottom : ''}
            onChange={handleChange}
          >
            <NumberWithUnitInput size={size} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="左边距"
            name="left"
            value={value ? value.left : ''}
            onChange={handleChange}
          >
            <NumberWithUnitInput size={size} />
          </FormItem>
        </Col>
      </Row>
    </>
  );
};
