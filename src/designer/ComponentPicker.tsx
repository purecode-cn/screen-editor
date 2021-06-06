import { Element, useEditor } from '@craftjs/core';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { IconButton } from '../components/IconButton';
import * as charts from '../charts';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type MenuItemProps = {
  name: string;
  icon: IconProp | string;
  title: string;
  connectors: any;
};
type MenuItemGroupProps = {
  name: string;
  icon: IconProp | string;
  title: string;
  components: MenuItemProps[];
  connectors: any;
};

const renderMenuItem = ({ name, title, connectors }: MenuItemProps) => {
  if(!charts[name]) {
    return null;
  }
  return (
    <Menu.Item key={name}>
      <div ref={(ref: any) => connectors.create(ref, React.createElement(charts[name]))}>
        <IconButton icon={charts[name].craft.custom.icon} iconType="image" label={title} name={name} />
      </div>
    </Menu.Item>
  );
};

const renderMenuItemGroup = ({
  name,
  title,
  components,
  connectors,
}: MenuItemGroupProps) => {
  return (
    <Menu.ItemGroup key={name} title={title}>
      {components &&
        components.map(chart => renderMenuItem({ ...chart, connectors }))}
    </Menu.ItemGroup>
  );
};

const renderSubMenu = ({
  name,
  icon,
  title,
  groups,
  components,
  connectors,
}: any) => {
  return (
    <Menu.SubMenu
      key={name}
      popupClassName="se-comp-picker-popup"
      title={
        <IconButton
          label={title}
          iconType="fontawesome"
          icon={icon}
          name={name}
        />
      }
    >
      {components &&
        components.map((item: MenuItemProps) =>
          renderMenuItem({ ...item, connectors })
        )}
      {groups &&
        groups.map((item: MenuItemGroupProps) =>
          renderMenuItemGroup({ ...item, connectors })
        )}
    </Menu.SubMenu>
  );
};

export const ComponentPicker = (props: any) => {
  const { items } = props;
  const { connectors } = useEditor();

  return (
    <Menu
      selectedKeys={[]}
      mode="horizontal"
      className="se-comp-picker"
      theme="dark"
    >
      {items && items.map((x: any) => renderSubMenu({ ...x, connectors }))}
    </Menu>
  );
};
