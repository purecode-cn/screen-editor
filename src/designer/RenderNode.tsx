import { ROOT_NODE, useEditor, useNode } from '@craftjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

const Indicator = ({ ref, style, children }) => {
  return (
    <div ref={ref} className="se-indicator" style={style}>
      {children}
    </div>
  );
};

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor(state => ({
    isActive: state.nodes[id].events.selected,
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode(node => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('se-comp-selected');
      else dom.classList.remove('se-comp-selected');
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom!);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document.querySelector('.se-renderer').addEventListener('scroll', scroll);

    return () => {
      document
        .querySelector('.se-renderer')
        .removeEventListener('scroll', scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <Indicator
              ref={currentRef}
              style={{
                left: getPos(dom!).left,
                top: getPos(dom!).top,
                zIndex: 9999,
              }}
            >
              <h2>{name}</h2>
              {moveable ? (
                <div className="se-indicator-btn" ref={drag}>
                  <Popover title="移动">
                    <FontAwesomeIcon icon={['fal', 'arrows']} color="white" fixedWidth/>
                  </Popover>
                </div>
              ) : null}
              {id !== ROOT_NODE ? (
                <div
                  className="se-indicator-btn"
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  <Popover title="选择父级">
                    <FontAwesomeIcon icon={['fal', 'arrow-up']} color="white" fixedWidth />
                  </Popover>
                </div>
              ) : null}
              {deletable ? (
                <div
                  className="se-indicator-btn"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Popover title="删除">
                    <FontAwesomeIcon icon={['fal', 'trash']} color="white" fixedWidth />
                  </Popover>
                </div>
              ) : null}
            </Indicator>,
            document.querySelector('.se-page-container')
          )
        : null}
      {render}
    </>
  );
};
