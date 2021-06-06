type FontSettings = {
  fontSize?: string;
  align?: 'left' | 'center' | 'right';
  textColor?: string;
};

type BoundSettings = {
  x: string;
  y: string;
  width: string;
  height: string;
};

export interface BackgroundSettings {
  type: 'color' | 'image';
  color?: string;
  image?: string;
  fillType?: 'no-repeat' | 'cover' | 'fill';
}

type AppProps = {
  size?: Record<'width' | 'height', string>;
  background?: BackgroundSettings;
  showRuler?: boolean;
  grid: {
    show: boolean;
    color: string;
    width: number;
  };
  alignToGrid?: boolean;
  title?: string;
  children: React.ReactNode;
};
