import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ApiConfigContext, defaultValue } from '../src/ApiConfigContext';
import {
  Viewport,
  SettingTabs,
  GeneralBarChart,
  GeneralPieChart,
  RingPieChart,
  Application,
} from '../src';
import { Editor, Frame } from '@craftjs/core';
import '../src/styles.css';

const meta: Meta = {
  title: 'Pie',
  component: GeneralPieChart,
};

export default meta;

const Template: Story = args => {
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <Editor resolver={{ Application, GeneralPieChart }}>
        <Viewport>
          <Frame>
            <Application size={{ width: '600px', height: '600px' }}>
              <GeneralPieChart />
            </Application>
          </Frame>
        </Viewport>
      </Editor>
    </ApiConfigContext.Provider>
  );
};

const TemplateRingPie: Story = args => {
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <Editor resolver={{ Application, RingPieChart }}>
        <Viewport>
          <Frame>
            <Application size={{ width: '600px', height: '600px' }}>
              <RingPieChart />
            </Application>
          </Frame>
        </Viewport>
      </Editor>
    </ApiConfigContext.Provider>
  );
};




export const Pie = Template.bind({});
Pie.args = {
  size: 'middle',
};

export const RingPie = TemplateRingPie.bind({});
RingPie.args = {
  size: 'middle',
};

