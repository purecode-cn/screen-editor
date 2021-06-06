import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import { SketchPicker } from 'react-color';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';

export interface ColorPickerProps {
  value: string;
  onChange: (v: string, color?: any) => void;
  onChangeComplete: (v: string) => void;
  size: SizeType;
}

export const ColorPicker = ({ onChange, value, size }: Partial<ColorPickerProps>) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [internalValue, setInternalValue] = useState('#ffffff');

  const colorRef = useRef(null);
  const [postion, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setInternalValue(value)
  }, [value])


  useEffect(() => {
    if (colorRef.current) {
      const rect = colorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + 30,
        left: rect.x - 191,
      });
    }
  }, [colorRef.current]);

  const handleClick = () => {
    setDisplayColorPicker(true);
  };
  const handleClose = e => {
    e.stopPropagation();
    setDisplayColorPicker(false);
  };
  const handleChange = (color: { rgb; hex }) => {
    let str = color.hex;
    if (color.rgb.a !== 1) {
      str = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }
    setInternalValue(str);
  };
  const handleChangeComplete = (color: { rgb; hex }) => {
    let str = color.hex;
    if (color.rgb.a !== 1) {
      str = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }
    onChange && onChange(str);
  };

  const styles: { [name: string]: CSSProperties } = {
    color: {
      width: size === 'small' ? '12px' : '16px',
      height: size === 'small' ? '12px' : '16px',
      borderRadius: '2px',
      background: internalValue,
    },
    swatch: {
      margin: size === 'small' ? '4px 0 -2px' : '6px 0 0',
      background: '#fff',
      borderRadius: '2px',
      border: '1px solid #0000001A',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: 100,
      left: postion.left,
      top: postion.top,
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    wrapper: {
      position: 'inherit',
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const picker = (
    <div style={styles.popover}>
      <div style={styles.cover} onClick={handleClose}></div>
      <div style={styles.wrapper}>
        <SketchPicker
          color={internalValue}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        />
      </div>
    </div>
  );

  return (
    <Input
      size={size}
      onFocus={() => setDisplayColorPicker(true)}
      onChange={handleInputChange}
      value={internalValue}
      addonAfter={
        <div style={styles.swatch} onClick={handleClick} ref={colorRef}>
          <div style={styles.color} />
          {displayColorPicker
            ? ReactDOM.createPortal(picker, document.querySelector('body'))
            : null}
        </div>
      }
    />
  );
};