import React from 'react';

export interface ApiConfig {
  options: {
    imageUploadUrl?: string;
    imageUploadAuthorizationToken?: string;
    videoUploadUrl?: string;
    videoUploadAuthorizationToken?: string;
    fileUploadUrl: string;
    fileUploadAuthorizationToken?: string;
    ajaxDataNamePath: string[];
  }
}
export const defaultValue: ApiConfig = {
  options: {
    fileUploadUrl: '/api/upload',
    ajaxDataNamePath: ['data']
  }
};
export const ApiConfigContext = React.createContext<ApiConfig>(defaultValue);