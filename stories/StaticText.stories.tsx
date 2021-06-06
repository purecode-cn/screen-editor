import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ApiConfigContext, defaultValue } from '../src/ApiConfigContext';
import {
  Viewport,
  SettingTabs,
  GeneralBarChart,
  GeneralPieChart,
  CurrentTime,
  GeneralText,
  Application,
} from '../src';
import { Editor, Frame } from '@craftjs/core';
import '../src/styles.css';

const meta: Meta = {
  title: 'Text',
  component: GeneralText,
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'middle', 'large'],
    },
  },
};

export default meta;

const Template: Story = args => {
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <Editor
        resolver={{ Application, GeneralText, CurrentTime, GeneralBarChart }}
      >
        <Viewport>
          <Frame>
            <Application>
              <GeneralText />
              <CurrentTime />
              <GeneralBarChart />              
            </Application>
          </Frame>
        </Viewport>
      </Editor>
    </ApiConfigContext.Provider>
  );
};

export const GeneralTextBasic = Template.bind({});
GeneralTextBasic.args = {
  size: 'middle',
};
