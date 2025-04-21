import {JSX, Show} from 'solid-js';
import ResizeHandle, {
  DefaultHorizontalHandle,
  DefaultVerticalHandle,
} from './ResizeHandle';

/**
 * Directions in which the resizable component is/can be resized.
 */
type ResizeDirection = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for the Resizable component.
 */
export type ResizableProps = {
  /**
   * Whether to show a handle on the left side or a custom JSX element for the handle.
   */
  leftHandle?: boolean | JSX.Element;

  /**
   * Whether to show a handle on the right side or a custom JSX element for the handle.
   */
  rightHandle?: boolean | JSX.Element;

  /**
   * Whether to show a handle on the top side or a custom JSX element for the handle.
   */
  topHandle?: boolean | JSX.Element;

  /**
   * Whether to show a handle on the bottom side or a custom JSX element for the handle.
   */
  bottomHandle?: boolean | JSX.Element;

  /**
   * Callback function when resizing starts.
   * @param direction - The direction in which resizing is happening.
   */
  onResizeStart?: (direction: ResizeDirection) => void;

  /**
   * Callback function when resizing ends.
   * @param direction - The direction in which resizing is happening.
   */
  onResizeStop?: (direction: ResizeDirection) => void;

  /**
   * Callback function during resizing.
   * @param direction - The direction in which resizing is happening.
   * @param width - The new width of the resizable element.
   * @param height - The new height of the resizable element.
   * @param widthDelta - The change in width.
   * @param heightDelta - The change in height.
   */
  onResize?: (
    direction: string,
    width: number,
    height: number,
    widthDelta: number,
    heightDelta: number,
  ) => void;
  /**
   * Custom styles for the resizable element.
   * Note: 'display' and 'flex-direction' are not allowed.
   */
  style?: Omit<Omit<JSX.CSSProperties, 'display'>, 'flex-direction'>;

  /**
   * Debounce delay for the resize events. Default is 1.
   */
  debounce?: number;

  /**
   * The content to be rendered inside the resizable element.
   */
  children: JSX.Element;
};

/**
 * A resizable component that allows resizing from all four sides.
 *
 * @param props - The properties for the resizable component.
 * @returns A JSX element representing the resizable container.
 */
const Resizable = (props: ResizableProps) => {
  let resizableRef!: HTMLDivElement;

  const getHeight = () => resizableRef?.offsetHeight || 0;
  const getWidth = () => resizableRef?.offsetWidth || 0;

  const handleWidthUpdate = (direction: ResizeDirection, delta: number) => {
    const newWidth = getWidth() + delta;
    resizableRef.style.width = `${newWidth}px`;
    props.onResize?.(direction, newWidth, getHeight(), delta, 0);
  };
  const handleHeightUpdate = (direction: ResizeDirection, delta: number) => {
    const newHeight = getHeight() + delta;
    resizableRef.style.height = `${newHeight}px`;
    props.onResize?.(direction, getWidth(), newHeight, 0, delta);
  };

  return (
    <div
      ref={resizableRef}
      class="resizable"
      style={{display: 'flex', 'flex-direction': 'column', ...props.style}}
    >
      <Show when={props.topHandle}>
        <ResizeHandle
          direction="vertical"
          onResizeStart={() => props.onResizeStart?.('top')}
          onResizeStop={() => props.onResizeStop?.('top')}
          onResize={delta => handleHeightUpdate('top', 0 - delta)}
          debouce={props.debounce}
        >
          {typeof props.topHandle === 'boolean' ? (
            <DefaultVerticalHandle />
          ) : (
            props.topHandle
          )}
        </ResizeHandle>
      </Show>
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          'max-height': '100%',
          'max-width': '100%',
        }}
      >
        <Show when={props.leftHandle}>
          <ResizeHandle
            direction="horizontal"
            onResizeStart={() => props.onResizeStart?.('left')}
            onResizeStop={() => props.onResizeStop?.('left')}
            onResize={delta => handleWidthUpdate('left', 0 - delta)}
            debouce={props.debounce}
          >
            {props.leftHandle === true ? (
              <DefaultHorizontalHandle />
            ) : (
              props.leftHandle
            )}
          </ResizeHandle>
        </Show>
        <div
          style={{flex: '1 1 auto', 'max-height': '100%', 'max-width': '100%'}}
        >
          {props.children}
        </div>
        <Show when={props.rightHandle}>
          <ResizeHandle
            direction="horizontal"
            onResizeStart={() => props.onResizeStart?.('right')}
            onResizeStop={() => props.onResizeStop?.('right')}
            onResize={delta => handleWidthUpdate('right', delta)}
            debouce={props.debounce}
          >
            {typeof props.rightHandle === 'boolean' ? (
              <DefaultHorizontalHandle />
            ) : (
              props.rightHandle
            )}
          </ResizeHandle>
        </Show>
      </div>
      <Show when={props.bottomHandle}>
        <ResizeHandle
          direction="vertical"
          onResizeStart={() => props.onResizeStart?.('bottom')}
          onResizeStop={() => props.onResizeStop?.('bottom')}
          onResize={delta => handleHeightUpdate('bottom', delta)}
          debouce={props.debounce}
        >
          {typeof props.bottomHandle === 'boolean' ? (
            <DefaultVerticalHandle />
          ) : (
            props.bottomHandle
          )}
        </ResizeHandle>
      </Show>
    </div>
  );
};

export default Resizable;
