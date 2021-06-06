import React, { useEffect, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import dayjs from 'dayjs';
import icon from './generalText.svg';
import { GeneralTextProps } from './GeneralText.types';

export const CurrentTime = ({ font, format, bound }: any) => {
  const {
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const [time, setTime] = useState('19:00:00');

  useEffect(() => {
    var timer = setInterval(() => setTime(dayjs().format(format)), 1000);
    return () => clearInterval(timer);
  });

  return (
    <div
      style={{
        left: bound.x,
        top: bound.y,
        width: bound.width,
        height: bound.height,
        position: 'absolute',
        zIndex: 10,
      }}
      ref={dom => dom && connect(drag(dom))}
    >
      <div style={{ fontSize: font.fontSize, textAlign: font.textAlign }}>
        {time}
      </div>
    </div>
  );
};

CurrentTime.craft = {
  displayName: '当前时间',
  defaultProps: {
    bound: {
      x: '0px',
      y: '30px',
      width: '200px',
      height: '80px',
    },
    font: {
      fontSize: '15px',
      align: 'left',
      weight: '500',
      textColor: '#232323',
    },
    margin: [0, 0, 0, 0],
    format: 'HH:mm:ss',
  },
  custom: {
    settings: {
      basic: [
        {
          name: 'format',
          label: '格式',
          controlType: 'input',
        },
        {
          name: 'bound',
          label: '尺寸 & 位置',
          controlType: 'bound',
        },
        {
          name: 'font',
          label: '字体',
          controlType: 'font',
        },
        {
          name: 'background',
          label: '背景',
          controlType: 'background',
        },
      ],
      data: [],
    },
    icon: icon,
  },
};
