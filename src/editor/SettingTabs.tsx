import React, { useEffect, useState } from 'react';
import { NodeProvider, useEditor, useNode } from '@craftjs/core';
import { Tabs } from 'antd';
import { Settings } from './Settings';

const TabTitles = {
  basic: '基础',
  data: '数据',
  interactive: '交互',
  other: '其他',
};

export const SettingTabs = () => {
  const [lastActive, setLastActive] = useState('');
  const { active, settings } = useEditor(state => {
    const data = {
      active: state.events.selected,
      settings:
        state.events.selected &&
        state.nodes[state.events.selected].data.custom.settings,
    };
    return data;
  });

  useEffect(() => {
    setLastActive('');
    const id = setTimeout(() => setLastActive(active), 0);
    return () => clearTimeout(id);
  }, [active]);

  return (
    active && (
      <NodeProvider id={active}>
        <Tabs defaultActiveKey="basic">
          {Object.keys(settings).map(k => (
            <Tabs.TabPane key={k} tab={TabTitles[k]}>
              {lastActive && <Settings info={settings[k]} />}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </NodeProvider>
    )
  );
};
