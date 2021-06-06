import React from 'react';
import { Col, Input, Row } from 'antd';
import cx from 'classnames';
import { SettingTabs } from '../editor';

export const Viewport: React.FC = ({ children }) => {
  return (
    <div
      className={cx('viewport', { loaded: true })}
    >
      <Row>
        <Col span={16} style={{ position: 'relative', height: 800 }}>
          {children}
        </Col>
        <Col span={8} style={{overflowY: 'auto', maxHeight:750}}>
          <div className="screen-editor ant-form ant-form-vertical">
            <SettingTabs />
          </div>
        </Col>
      </Row>
    </div>
  );
};
