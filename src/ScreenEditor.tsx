import React, { useContext, useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import { ApiConfigContext, defaultValue } from './ApiConfigContext';
import { Toolbox, Viewport } from './designer';
import { Layers } from '@craftjs/layers';
import FolderLayer from './designer/FolderLayer';
import { SettingTabs } from './editor';
import useWindowSize from './hooks/useWindowSize';
import {
  GeneralBarChart,
  GeneralPieChart,
  CurrentTime,
  GeneralText,
  Application,
} from './charts';
import { Editor, Frame } from '@craftjs/core';

const { Header, Footer, Content, Sider } = Layout;

export const ScreenEditor: React.FC = ({ children }: any) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight - 60);
  const windowSize = useWindowSize();
  useEffect(() => setViewportHeight(windowSize.height - 60), [
    windowSize.height,
  ]);

  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <Editor resolver={{ Application, GeneralPieChart, GeneralText }}>
        <Layout>
          <Toolbox />
          <Content style={{ height: `${viewportHeight}px` }}>
            <Layout style={{ height: '100%' }}>
              <Sider theme="light" className='screen-editor-layers'>
                <Layers renderLayer={FolderLayer} />
              </Sider>
              <Content className='se-app-container'>
                <Frame>{children}</Frame>
              </Content>
              <Sider className='screen-editor-sidebar' theme="light" width={250}>
                <div className="screen-editor ant-form ant-form-vertical">
                  <SettingTabs />
                </div>
              </Sider>
            </Layout>
          </Content>
        </Layout>
      </Editor>
    </ApiConfigContext.Provider>
  );
};
