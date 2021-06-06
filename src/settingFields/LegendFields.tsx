import React from 'react';
import { Col, Radio, Row, Switch } from 'antd';
import NumberWithUnitInput from '../components/NumberWithUnitInput';
import { FormItem } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LegendFields = (props: any) => {
  const { name, value, label, onChange } = props;

  const handleChange = (v: string, n: string) => {
    onChange &&
      onChange(
        {
          ...value,
          [n]: v,
        },
        name
      );
  };

  return (
    <>
      {' '}
      {label && (
        <div className="form-item-group">
          <h4>{label}</h4>
        </div>
      )}
      <Row gutter={4}>
        <Col span={12}>
          <Row gutter={4}>
            <Col>
              <FormItem
                label="显示图例"
                name="show"
                value={value ? value.show : false}
                valuePropName="checked"
                onChange={handleChange}
              >
                <Switch />
              </FormItem>
            </Col>
            <Col>
              {value && value.show && (
                <FormItem
                  label="方向"
                  name="orient"
                  value={value ? value.orient : 'auto'}
                  onChange={handleChange}
                >
                  <Radio.Group>
                    <Radio.Button value="horizontal">
                      <FontAwesomeIcon
                        fixedWidth
                        icon={['fal', 'horizontal-rule']}
                      />
                    </Radio.Button>
                    <Radio.Button value="vertical">
                      <FontAwesomeIcon
                        fixedWidth
                        rotation={90}
                        icon={['fal', 'horizontal-rule']}
                      />
                    </Radio.Button>
                  </Radio.Group>
                </FormItem>
              )}
            </Col>
          </Row>
        </Col>
        {value && value.show && (
          <Col span={12}>
            <FormItem
              label="图例位置"
              name="position"
              value={value ? value.position : ''}
              onChange={handleChange}
            >
              <Radio.Group className="se-radio-grid">
                <Radio.Button value="top-left">
                  <FontAwesomeIcon
                    fixedWidth
                    icon={['fal', 'angle-up']}
                    transform={{ rotate: -45 }}
                  />
                </Radio.Button>
                <Radio.Button value="top-center">
                  <FontAwesomeIcon fixedWidth icon={['fal', 'ellipsis-h']} />
                </Radio.Button>
                <Radio.Button value="top-right">
                  <FontAwesomeIcon
                    fixedWidth
                    icon={['fal', 'angle-up']}
                    transform={{ rotate: 45 }}
                  />
                </Radio.Button>

                <Radio.Button value="middle-left">
                  <FontAwesomeIcon fixedWidth icon={['fal', 'ellipsis-v']} />
                </Radio.Button>

                <Radio.Button value="auto-auto">
                  <FontAwesomeIcon fixedWidth icon={['fal', 'square-full']} />
                </Radio.Button>

                <Radio.Button value="middle-right">
                  <FontAwesomeIcon fixedWidth icon={['fal', 'ellipsis-v']} />
                </Radio.Button>
                <Radio.Button value="bottom-left">
                  <FontAwesomeIcon
                    fixedWidth
                    icon={['fal', 'angle-down']}
                    transform={{ rotate: 45 }}
                  />
                </Radio.Button>
                <Radio.Button value="bottom-center">
                  <FontAwesomeIcon fixedWidth icon={['fal', 'ellipsis-h']} />
                </Radio.Button>
                <Radio.Button value="bottom-right">
                  <FontAwesomeIcon
                    fixedWidth
                    icon={['fal', 'angle-down']}
                    transform={{ rotate: -45 }}
                  />
                </Radio.Button>
              </Radio.Group>
            </FormItem>
          </Col>
        )}
      </Row>
    </>
  );
};
