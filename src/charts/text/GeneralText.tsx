import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import icon from './generalText.svg';
import { GeneralTextProps } from './GeneralText.types';

export const GeneralText = ({
  font,
  text,
  margin,
  bound,
}: Partial<GeneralTextProps>) => {
  const {
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

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
      <ContentEditable
        innerRef={connect}
        html={text || ''} // innerHTML of the editable div
        disabled={!enabled}
        onChange={e => {
          setProp(prop => (prop.text = e.target.value), 500);
        }}
        tagName="h2"
        style={{
          width: '100%',
          margin: Array.isArray(margin)
            ? `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`
            : margin,
          fontSize: font.fontSize,
          color: font.textColor,
          textAlign: font.align,
        }}
      />
    </div>
  );
};

GeneralText.craft = {
  displayName: '静态文本',
  defaultProps: {
    bound: {
      x: '0px',
      y: '0px',
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
    text: '文本',
  },
  custom: {
    settings: {
      basic: [
        {
          name: 'text',
          label: '文本',
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
