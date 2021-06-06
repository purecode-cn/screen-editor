import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'antd';
import { toPng } from 'html-to-image';

const ZOOM = {
  DOWN: 1,
  UP: 2,
  MIN: 50,
  MAX: 300,
};

export const ZoomLayout = props => {
  // 放大比例, 按百分制给 100 为 100%
  const [scale, setScale] = useState(100);
  const [snapping, setSnapping] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState(scale);
  const zoomSize = type => {
    if (type === ZOOM.DOWN) {
      if (scale === ZOOM.MIN) {
        return;
      }
      setScale(f => f - 10);
    }
    if (type === ZOOM.UP) {
      if (scale === ZOOM.MAX) {
        return;
      }
      setScale(f => f + 10);
    }
  };
  const handleChange = e => {
    const v = parseInt(e.target.value);
    setInputValue(v);
    v <= ZOOM.MAX && v >= ZOOM.MIN && setScale(v);
  };
  useEffect(() => {
    setInputValue(scale);
  }, [scale]);

  useEffect(() => {
    if (snapping) {
      const id = setTimeout(() => {
        toPng(document.getElementById('box-scale'), {
          backgroundColor: '#ffffff',
        }).then(function(dataUrl) {
          const image = dataUrl.replace('image/png', 'image/octet-stream');

          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('download', '设计图.png');
          a.setAttribute('href', image);
          a.setAttribute('target', '_blank');
          a.click();
          document.body.removeChild(a);
          setSnapping(false);
        });
      }, 200);
      return () => clearTimeout(id);
    }
  }, [snapping]);

  return (
    <>
      <div className={`se-zoom${fullScreen ? ' fullscreen' : ''}`}>
        <Input.Group compact>
          <Button
            disabled={snapping}
            loading={snapping}
            icon={<FontAwesomeIcon icon={['fal', 'camera']} fixedWidth />}
            onClick={() => {
              setSnapping(true);
            }}
          ></Button>
          <Button
            type={fullScreen ? 'primary' : 'default'}
            icon={<FontAwesomeIcon icon={['fal', 'expand']} fixedWidth />}
            onClick={() => {
              if (fullScreen) {
                document.exitFullscreen();
                setFullScreen(false);
              } else {
                document
                  .getElementsByClassName('flow-wrapper')[0]
                  .requestFullscreen();
                setFullScreen(true);
              }
            }}
          ></Button>
          <Button
            disabled={scale === ZOOM.MIN}
            onClick={() => zoomSize(ZOOM.DOWN)}
            icon={<FontAwesomeIcon icon={['fal', 'minus']} />}
          ></Button>
          <Input
            onChange={handleChange}
            value={inputValue}
            suffix="%"
            style={{ width: 64 }}
          ></Input>
          <Button
            disabled={scale === ZOOM.MAX}
            onClick={() => zoomSize(ZOOM.UP)}
            icon={<FontAwesomeIcon icon={['fal', 'plus']} />}
          ></Button>
        </Input.Group>
      </div>
      <div
        className="se-box-scale"
        id="box-scale"
        style={{
          transform: `scale(${scale / 100})`,
          transformOrigin: '50% 0px 0px',
        }}
      >
        {props.children}
      </div>
    </>
  );
};
