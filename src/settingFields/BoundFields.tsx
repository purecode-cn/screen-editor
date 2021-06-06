import React from 'react';
import { Col, Row } from 'antd';
import NumberWithUnitInput from '../components/NumberWithUnitInput';
import { FormItem } from '../components';

export const BoundFields = (props: any) => {
  const {
    name,
    value,
    label,
    onChange,
    size,
    hasSize = true,
    hasPosition = true,
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
      {hasPosition && (
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              label="X"
              name="x"
              value={value ? value.x : ''}
              onChange={handleChange}
            >
              <NumberWithUnitInput size={size} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Y"
              name="y"
              value={value ? value.y : ''}
              onChange={handleChange}
            >
              <NumberWithUnitInput size={size} />
            </FormItem>
          </Col>
        </Row>
      )}
      {hasSize && (
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              label="宽"
              name="width"
              value={value ? value.width : ''}
              onChange={handleChange}
            >
              <NumberWithUnitInput size={size} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="高"
              name="height"
              value={value ? value.height : ''}
              onChange={handleChange}
            >
              <NumberWithUnitInput size={size} />
            </FormItem>
          </Col>
        </Row>
      )}
    </>
  );
};
