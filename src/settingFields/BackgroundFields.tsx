import React from 'react';
import { message, Select, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { FormItem } from '../components';
import ColorPicker from '../components/ColorPicker';
import { ApiConfigContext } from '../ApiConfigContext';
import { HttpRequestHeader } from 'antd/lib/upload/interface';
import { BackgroundSettings } from '../declare';


const previewStyle: CSSProperties = {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const getBase64 = (img: Blob, callback: (result: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const BackgroundFields = (props: any) => {
  const { name, label, value, onChange, size } = props;
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | boolean | undefined>();
  const [internalValue, setInternalValue] = useState<Partial<BackgroundSettings>>(
    {
      type: 'color',
      color: '#ffffff',
    }
  );
  useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  const handleNormalChange = (v: any, n: string) => {
    const newValue = { ...internalValue, [n]: v };
    setInternalValue(newValue);
    onChange && onChange(newValue, name);
  };

  const handleImageChange = (e: any) => {
    const { file } = e;
    switch (file.status) {
      case 'uploading':
        setUploadedFile(undefined);
        setUploading(true);
        getBase64(file.originFileObj, imageUrl => {
          setUploadedFile(imageUrl);
        });
        break;
      case 'done':
        if (file.response) {
          let link = file.response;
          for (
            var i = 0;
            link && i < config.options.ajaxDataNamePath?.length;
            i++
          ) {
            link = link[config.options.ajaxDataNamePath[i]];
          }
          setUploading(false);
          setUploadedFile(false);
          handleNormalChange(link, 'image');
        }
        break;
      case 'error':
        setUploading(false);
        setTimeout(() => setUploadedFile(false), 200);
        message.error(file.error.message);
        break;
    }
  };
  const config = useContext(ApiConfigContext);

  return (
    <>
      {label && (
        <div className="form-item-group">
          <h4>{label}</h4>
        </div>
      )}
      <FormItem
        label="背景类型"
        name="type"
        value={internalValue.type || 'color'}
        onChange={handleNormalChange}
      >
        <Select size={size}>
          <Select.Option value="color">纯色</Select.Option>
          <Select.Option value="image">图片</Select.Option>
        </Select>
      </FormItem>
      {(!internalValue.type || internalValue.type === 'color') && (
        <FormItem
          label="背景颜色"
          name="color"
          value={internalValue.color}
          onChange={handleNormalChange}
        >
          <ColorPicker size={size} />
        </FormItem>
      )}
      {internalValue.type === 'image' && (
        <>
          <FormItem
            label="背景图片"
            name="image"
            valuePropName="fileList"
            onChange={handleImageChange}
          >
            <Upload
              showUploadList={false}
              listType="picture-card"
              action={
                config.options.imageUploadUrl || config.options.fileUploadUrl
              }
              headers={
                (config.options.imageUploadAuthorizationToken ||
                config.options.fileUploadAuthorizationToken
                  ? {
                      Authorization:
                        config.options.imageUploadAuthorizationToken ||
                        config.options.fileUploadAuthorizationToken,
                    }
                  : undefined) as HttpRequestHeader | undefined
              }
            >
              {internalValue.image ? (
                <img src={internalValue.image} />
              ) : (
                <div
                  style={{
                    ...previewStyle,
                    backgroundImage:
                      (uploadedFile as string) && `url(${uploadedFile})`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fal', uploading ? 'circle-notch' : 'plus']}
                    size="3x"
                    spin={uploading}
                    color={uploading ? '#0000009c' : '#000000'}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      background: '#fafafa7f',
                    }}
                  >
                    {uploading ? '上传中...' : '上传图片'}
                  </div>
                </div>
              )}
            </Upload>
          </FormItem>
          <FormItem
            label="填充方式"
            name="fillType"
            onChange={handleNormalChange}
          >
            <Select size={size}>
              <Select.Option value="no-repeat">无重复</Select.Option>
              <Select.Option value="cover">封面</Select.Option>
              <Select.Option value="fill">平铺</Select.Option>
            </Select>
          </FormItem>
        </>
      )}
    </>
  );
};
