import React from 'react';
import { Button, Col, Input, Row, Switch } from 'antd';
import { FormItem, ColorPicker } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const defaultSeriesColors = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

export const SeriesFields = (props: any) => {
  const { name, value, label, onChange, size } = props;

  const handleChange = (v: string, n: string, i: number) => {
    let newValue = [...value];
    if (n === 'showBackground' && v) {
      newValue[i] = {
        ...value[i],
        [n]: v,
        backgroundColor: v ? 'rgba(180,180,180,0.3)' : null,
      };
    } else {
      newValue[i] = {
        ...value[i],
        [n]: v,
      };
    }
    onChange(newValue, name);
  };

  const handleAdd = () => {
    onChange(
      [
        ...value,
        {
          name: '',
          backgroundColor: null,
          showBackground: false,
          color: defaultSeriesColors[value.length % defaultSeriesColors.length],
        },
      ],
      name
    );
  };

  const handleDelete = index => {
    const newValue = value.filter((_v, i) => i !== index);
    onChange([...newValue], name);
  };

  return (
    <>
      {label && (
        <div className="form-item-group">
          <h4>{label}</h4>
        </div>
      )}
      {value &&
        value.map((series, index) => (
          <React.Fragment key={index}>
            <div className="list-header">
              <div className="list-header-text">系列 {index + 1}</div>
              <Button
                size="small"
                onClick={() => handleDelete(index)}
                icon={<FontAwesomeIcon icon={['fal', 'trash']} />}
              />
            </div>
            <Row gutter={4}>
              <Col span={24}>
                <FormItem
                  label="名称"
                  name="name"
                  value={series.name}
                  onChange={(v, n) => handleChange(v, n, index)}
                >
                  <Input size={size} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label="颜色"
                  name="color"
                  value={
                    series.color ||
                    defaultSeriesColors[index % defaultSeriesColors.length]
                  }
                  onChange={(v, n) => handleChange(v, n, index)}
                >
                  <ColorPicker size={size} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="显示背景色"
                  name="showBackground"
                  value={series.showBackground}
                  onChange={(v, n) => handleChange(v, n, index)}
                  valuePropName="checked"
                >
                  <Switch />
                </FormItem>
              </Col>
              {series.showBackground && (
                <Col span={12}>
                  <FormItem
                    label="背景色"
                    name="backgroundColor"
                    value={series.backgroundColor || 'rgba(180,180,180,.3)'}
                    onChange={(v, n) => handleChange(v, n, index)}
                  >
                    <ColorPicker size={size} />
                  </FormItem>
                </Col>
              )}
            </Row>
          </React.Fragment>
        ))}
      <Row>
        <Col span={24}>
          <Button block onClick={handleAdd}>
            添加系列
          </Button>
        </Col>
      </Row>
    </>
  );
};
