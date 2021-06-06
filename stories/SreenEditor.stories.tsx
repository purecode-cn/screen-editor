import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ApiConfigContext, defaultValue } from '../src/ApiConfigContext';
import {
  Application,
  GeneralBarChart,
  GeneralPieChart,
  ScreenEditor,
} from '../src';
import '../src/styles.css';

const meta: Meta = {
  title: 'ScreenEditorDemo',
  component: ScreenEditor,
};

export default meta;

const Template: Story = args => {
  return (
    <ApiConfigContext.Provider value={defaultValue}>
      <ScreenEditor>
        <Application>
          <GeneralBarChart />
          <GeneralPieChart />
        </Application>
      </ScreenEditor>
    </ApiConfigContext.Provider>
  );
};

export const ScreenEditorDemo = Template.bind({});
