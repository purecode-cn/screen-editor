import React, { useEffect, useState } from 'react';
import { Col, Radio, Row, Slider } from 'antd';
import { FormItem } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorPicker from '../components/ColorPicker';
import { FontSettings } from '../declare';

export const FontFields = (props: any) => {
  const { name, label, value, onChange, size } = props;
  const [internalValue, setInternalValue] = useState<FontSettings>({});

  useEffect(() => {
    if (value) {
      const { fontSize, ...rest } = value;
      setInternalValue({
        ...rest,
        fontSize: fontSize ? parseInt(fontSize) : 16,
      });
    }
  }, [value]);

  const handleChange = (v: string, n: string) => {
    onChange(
      n === 'fontSize'
        ? { ...value, fontSize: `${v}px` }
        : { ...value, [n]: v },
      name
    );
  };

  return (
    <>
      {label && (
        <div className="form-item-group">
          <h4>{label}</h4>
        </div>
      )}
      <FormItem
        label={`字号: ${internalValue.fontSize}`}
        name="fontSize"
        value={internalValue.fontSize}
        onChange={handleChange}
      >
        <Slider min={12} max={60} tooltipVisible={false} />
      </FormItem>
      <Row gutter={4}>
        <Col span={12}>
          <FormItem
            label="文字颜色"
            name="textColor"
            value={internalValue.textColor}
            onChange={handleChange}
          >
            <ColorPicker size={size} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="对齐"
            name="align"
            value={internalValue.align}
            onChange={handleChange}
          >
            <Radio.Group size={size}>
              <Radio.Button value="left">
                <FontAwesomeIcon icon={['fal', 'align-left']} fixedWidth />
              </Radio.Button>
              <Radio.Button value="center">
                <FontAwesomeIcon icon={['fal', 'align-center']} fixedWidth />
              </Radio.Button>
              <Radio.Button value="right">
                <FontAwesomeIcon icon={['fal', 'align-right']} fixedWidth />
              </Radio.Button>
            </Radio.Group>
          </FormItem>
        </Col>
      </Row>
    </>
  );
};
