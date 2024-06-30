import {createSignal, JSX, onCleanup, createMemo} from 'solid-js';
import {isServer} from 'solid-js/web';
import {createMouseDelta} from '../lib/mouseDelta';
import {debounce} from '@solid-primitives/scheduled';

import './styles.css';

export const DefaultVerticalHandle = () => (
  <div class="default-vertical-handle">‎ </div>
);
export const DefaultHorizontalHandle = () => (
  <div class="default-horizontal-handle">‎ </div>
);

const ResizeHandle = (props: {
  direction: 'vertical' | 'horizontal';
  children: JSX.Element;
  onResizeStart?: () => void;
  onResizeStop?: () => void;
  onResize: (delta: number) => void;
  debouce?: number;
}) => {
  const [resizing, setResizing] = createSignal(false);
  const mouseDelta = createMouseDelta();

  const handleMouseMove = createMemo(() =>
    debounce((e: MouseEvent) => {
      if (!resizing()) return;
      mouseDelta.updateMouseDelta(e, 1, 1);

      if (props.direction === 'vertical') {
        props.onResize(mouseDelta.deltaY());
      } else {
        props.onResize(mouseDelta.deltaX());
      }
      mouseDelta.init(e, 1, 1);
    }, props.debouce || 1)
  );

  const handleMouseUp = () => {
    setResizing(false);
    window.removeEventListener('mousemove', handleMouseMove());
    window.removeEventListener('mouseup', handleMouseUp);
    props.onResizeStop?.();
  };

  const handleMouseDown = (e: MouseEvent) => {
    setResizing(true);
    mouseDelta.init(e, 1, 1);
    props.onResizeStart?.();

    window.addEventListener('mousemove', handleMouseMove());
    window.addEventListener('mouseup', handleMouseUp);
  };

  onCleanup(() => {
    if (!isServer) {
      window.removeEventListener('mousemove', handleMouseMove());
      window.removeEventListener('mouseup', handleMouseUp);
    }
  });

  return (
    <div
      class={`handle handle-${props.direction}`}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </div>
  );
};

export default ResizeHandle;
