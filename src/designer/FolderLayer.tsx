import { useEditor } from '@craftjs/core';
import { useLayer } from '@craftjs/layers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const FolderLayerHeader = () => {
  const {
    id,
    depth,
    expanded,
    children,
    connectors: { drag, layerHeader },
    actions: { toggleLayer },
  } = useLayer(layer => {
    return {
      expanded: layer.expanded,
    };
  });

  const { hidden, actions, selected, topLevel, displayName } = useEditor(
    (state, query) => ({
      hidden: state.nodes[id] && state.nodes[id].data.hidden,
      selected: state.events.selected === id,
      topLevel: query.node(id).isTopLevelCanvas(),
      displayName:
        state.nodes[id] && state.nodes[id].data.custom.displayName
          ? state.nodes[id].data.custom.displayName
          : state.nodes[id].data.displayName,
    })
  );

  return (
    <div
      className={`se-layers-header ${selected ? 'selected' : ''}`}
      ref={drag}
    >
      <div>
        <FontAwesomeIcon
          icon={['fal', hidden ? 'eye-slash' : 'eye']}
          onClick={() => actions.setHidden(id, !hidden)}
          fixedWidth
        />
        <span className="se-layer-header-title">
          <FontAwesomeIcon
            icon={['fal', children && children.length ? 'folder' : 'file']}
          />
          <span>{displayName}</span>
        </span>
      </div>
      {children && children.length ? (
        <FontAwesomeIcon
          icon={['fal', expanded ? 'chevron-down' : 'chevron-right']}
          onMouseDown={() => toggleLayer()}
        />
      ) : null}
    </div>
  );
};

const FolderLayer = ({ children }) => {
  const {
    id,
    expanded,
    hovered,
    connectors: { layer },
  } = useLayer(layer => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));
  const { hasChildCanvases } = useEditor((_, query) => {
    return {
      hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
    };
  });

  return (
    <div
      className={`se-layers${expanded ? ' se-layers-expanded' : ''}${
        hovered ? ' se-layers-hovered' : ''
      }${hasChildCanvases ? 'se-layers-contains-children' : ''}`}
      ref={layer}
    >
      <FolderLayerHeader />
      {children ? <div className="se-layers-children">{children}</div> : null}
    </div>
  );
};

export default FolderLayer;
