import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ApiConfigContext, defaultValue } from '../src/ApiConfigContext';
import {
  Viewport,  
  Application,
  GeneralLineChart,
} from '../src';
import { Editor, Frame } from '@craftjs/core';
import '../src/styles.css';

const meta: Meta = {
  title: 'Line',
  component: GeneralLineChart,
};

export default meta;

const Template: Story = args => {
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <Editor
        resolver={{ Application, GeneralLineChart }}
      >
        <Viewport>
          <Frame>
            <Application>
              <GeneralLineChart />
            </Application>
          </Frame>
        </Viewport>
      </Editor>
    </ApiConfigContext.Provider>
  );
};

export const Lines = Template.bind({});
Lines.args = {
  size: 'middle',
};
