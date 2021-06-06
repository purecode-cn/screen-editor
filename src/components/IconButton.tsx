import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type IconButtonProps = {
  icon: IconProp | string;
  label: string;
  name: string;
  iconType?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
};

export const IconButton: React.FC<any> = ({
  icon,
  label,
  name,
  iconType,
  disabled,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className="se-icon-button"
      onClick={() => onClick && onClick(name)}
      disabled={disabled}
    >
      {iconType === 'fontawesome' && (
        <FontAwesomeIcon icon={icon as IconProp} fixedWidth size="lg" />
      )}
      {iconType === 'image' && <img src={icon as string} alt={label} />}
      <span>{label}</span>
    </button>
  );
};
