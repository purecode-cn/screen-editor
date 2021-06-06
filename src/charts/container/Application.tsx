import { useEditor, useNode } from '@craftjs/core';
import React from 'react';
import { AppProps } from '../../declare';
import { Resizer, ZoomLayout } from '../../designer';

const generateGrid = (width, color = 'gray') => {
  return encodeURIComponent(
    `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="smallGrid" width="${width}" height="${width}" patternUnits="userSpaceOnUse">
      <path d="M ${width} 0 L 0 0 0 ${width}" fill="none" stroke="${color}" stroke-width="0.5"/></pattern>
      <pattern id="grid" width="${width * 10}" height="${width *
      10}" patternUnits="userSpaceOnUse">
        <rect width="${width * 10}" height="${width *
      10}" fill="url(#smallGrid)"/>
        <path d="M ${width * 10} 0 L 0 0 0 ${width *
      10}" fill="none" stroke="${color}" stroke-width="1"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>`
  );
};

const defaultProps: AppProps = {
  background: { type: 'color', color: '#ffffff' },
  size: { width: '800px', height: '600px' },
  showRuler: true,
  grid: { show: false, color: 'gray', width: 10 },
  title: '又一个大屏',
  children: null,
};

export const Application = ({
  size,
  background,
  title,
  grid,
  children,
}: Partial<AppProps>) => {
  const {
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const style: any = {
    width: size.width,
    height: size.height,
  };

  if (background.type === 'color') {
    style.backgroundColor = background.color;
  } else {
    style.backgroundImage = `url(${background.image})`;
    style.backgroundSize = background.fillType;
  }
  if (grid && grid.show) {
    style.backgroundImage = `${
      style.backgroundImage ? `${style.backgroundImage}, ` : ''
    }url('data:image/svg+xml;utf8,${generateGrid(grid.width, grid.color)}')`;
  }

  return (
    <ZoomLayout>
      <div
        style={style}
        className="se-app"
        ref={dom => dom && connect(drag(dom))}
      >
        <h4 className='se-app-title'>{title}</h4>
        {children}
      </div>
    </ZoomLayout>
  );
};

Application.craft = {
  displayName: '页面',
  isCanvas: true,
  defaultProps: {
    ...defaultProps,
  },
  custom: {
    settings: {
      basic: [
        {
          name: 'title',
          controlType: 'input',
          label: '标题',
        },
        {
          name: 'size',
          controlType: 'bound',
          hasPosition: false,
        },
        {
          name: 'background',
          controlType: 'background',
        },
        {
          name: 'grid',
          controlType: 'grid',
        },
      ],
    },
  },
};
