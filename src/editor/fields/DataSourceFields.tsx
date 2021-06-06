import React, { useState } from 'react';
import { Col, Input, InputNumber, Row, Select, Switch } from 'antd';
import { FormItem } from '../../components';

export const DataSourceFields = (props: any) => {
  const { name, value, onChange, size } = props;
  const [type, setType] = useState(value ? value.sourceType : 'json');
  const [intervalEnable, setIntervalEnable] = useState(false);

  const handleChange = (v: string, n: string) => {
    onChange({ ...value, [n]: v }, name);
  };

  return (
    <>
      <FormItem
        label="数据类型"
        value={type}
        name="sourceType"
        onChange={handleChange}
      >
        <Select onChange={(v: string) => setType(v)} size={size}>
          <Select.Option value="">无数据</Select.Option>
          <Select.Option value="url">网址</Select.Option>
          <Select.Option value="json">JSON</Select.Option>
          <Select.Option value="csv">CSV</Select.Option>
        </Select>
      </FormItem>
      {type === 'url' && (
        <>
          <FormItem
            value={value && value.url}
            label="网址"
            name="source"
            onChange={handleChange}
          >
            <Input.TextArea size={size} />
          </FormItem>
          <FormItem
            value={value && value.header}
            label="头信息"
            name="header"
            onChange={handleChange}
          >
            <Input.TextArea size={size} />
          </FormItem>
          <Row>
            <Col span={8}>
              <FormItem
                label="定时刷新"
                name="autoRefresh"
                value={value && value.autoRefresh}
                valuePropName="checked"
                onChange={handleChange}
              >
                <Switch onChange={v => setIntervalEnable(v)} />
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem
                label="间隔"
                value={value && value.autoRefreshInterval}
                name="autoRefreshInterval"
                onChange={handleChange}
              >
                <Input.Group size={size}>
                  <InputNumber step={5} disabled={!intervalEnable} />
                  <span className="ant-input-group-addon">秒</span>
                </Input.Group>
              </FormItem>
            </Col>
          </Row>
        </>
      )}
      {(type === 'json' || type === 'csv') && (
        <>
          <FormItem
            value={value && value.source}
            label="数据内容"
            name="source"
            onChange={handleChange}
          >
            <Input.TextArea style={{ height: 600 }} />
          </FormItem>
        </>
      )}
      {type === 'csv' && (
        <>
          <FormItem
            value={value && value.sperator}
            label="分隔符号"
            name="sperator"
            onChange={handleChange}
          >
            <Input />
          </FormItem>
        </>
      )}
    </>
  );
};
