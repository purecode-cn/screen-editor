import React from 'react';
import { Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../components/IconButton';
import { ComponentPicker } from './ComponentPicker';
import COMPONENTS from './components';

export const Toolbox = () => {
  return (
    <Layout.Header className="se-header">
      <div className="left">
        <FontAwesomeIcon
          icon={['fal', 'drafting-compass']}
          size="2x"
          color="#ef5454"
        />
        <span>大屏设计器</span>
        <IconButton
          iconType="fontawesome"
          label="撤销"
          icon={['fal', "undo"]}
          key="undo"
        />
        <IconButton
          iconType="fontawesome"
          label="重做"
          icon={['fal', "redo"]}
          key="redo"
        />
      </div>
      <ComponentPicker items={COMPONENTS} />

      <div className="right">
        <IconButton
          iconType="fontawesome"
          label="预览"
          icon={['fal', "search"]}
          key="search"
        />
        <IconButton
          iconType="fontawesome"
          label="保存"
          icon={['fal', "save"]}
          key="save"
        />
        <IconButton
          iconType="fontawesome"
          label="退出"
          icon={['fal', "times"]}
          key="times"
        />
      </div>
    </Layout.Header>
  );
};
