# solid-resizable

A `Resizable` component to resize its content by dragging handles on its edges.

## Installation
To install the `solid-resizable` package, simply use your preferred package manager:

```bash
yarn add solid-resizable
```

or

```bash
pnpm add solid-resizable

```

## Importing

You can import the `Resizable` component into your project like this:

```jsx
import Resizable from 'solid-resizable';
```

## Example Usage

Here is an example of how to use the `Resizable` component:

```jsx
<Resizable
  leftHandle={true}
  rightHandle={<CustomHandle />}
  topHandle={false}
  bottomHandle={true}
  onResizeStart={(direction) => {
    console.log(`Resize started in the ${direction} direction`)
  }}
  onResizeStop={(direction) => {
    console.log(`Resize stopped in the ${direction} direction`)
  }}
  onResize={(direction, width, height, widthDelta, heightDelta) => {
    console.log(`Resizing in the ${direction} direction`);
    console.log(`New Size: ${width}x${height}`);
    console.log(`Delta: ${widthDelta}x${heightDelta}`);
  }}
  debounce={200}
>
  <ContentComponent />
</Resizable>
```

## Props

`leftHandle`

- **Type:** `boolean | JSX.Element`
- **Description:** Whether to show a handle on the left side or a custom JSX element for the handle.

`rightHandle`

- **Type:** `boolean | JSX.Element`
- **Description:** Whether to show a handle on the right side or a custom JSX element for the handle.

`topHandle`

- **Type:** `boolean | JSX.Element`
- **Description:** Whether to show a handle on the top side or a custom JSX element for the handle.

`bottomHandle`

- **Type:** `boolean | JSX.Element`
- **Description:** Whether to show a handle on the bottom side or a custom JSX element for the handle.

`onResizeStart`

- **Type:** `(direction: ResizeDirection) => void`
- **Description:** Callback function when resizing starts.
- **Parameters:**
  - `direction`: The direction in which resizing is happening.

`onResizeStop`

- **Type:** `(direction: ResizeDirection) => void`
- **Description:** Callback function when resizing ends.
- **Parameters:**
  - `direction`: The direction in which resizing is happening.

`onResize`

- **Type:** `(direction: ResizeDirection, width: number, height: number, widthDelta: number, heightDelta: number) => void`
- **Description:** Callback function during resizing.
- **Parameters:**
  - `direction`: The direction in which resizing is happening.
  - `width`: The new width of the resizable element.
  - `height`: The new height of the resizable element.
  - `widthDelta`: The change in width.
  - `heightDelta`: The change in height.

`style`

- **Type:** `Omit<Omit<JSX.CSSProperties, 'display'>, 'flex-direction'>`
- **Description:** Custom styles for the resizable element.
  - Note: `display` and `flex-direction` are not allowed.

`debounce`

- **Type:** `number`
- **Description:** Debounce delay for the resize events. Default is `1`.

`children`

- **Type:** `JSX.Element`
- **Description:** The content to be rendered inside the resizable element.

`ResizeDirection`
- **Type:** `'top' | 'bottom' | 'left' | 'right'`
- **Description:** Defines the direction in which resizing can happen.

### Custom Handle Example

You can pass a custom JSX element to be used as a handle:

```jsx
const CustomHandle = () => <div className="custom-handle">||</div>;

<Resizable
  rightHandle={<CustomHandle />}
>
  <ContentComponent />
</Resizable>
```

## Events

### Resizing Events

- **`onResizeStart`**: Triggered when resizing starts.
- **`onResizeStop`**: Triggered when resizing stops.
- **`onResize`**: Triggered during resizing to provide updated size information.

## Styling

You can pass custom styles to the `Resizable` component using the `style` prop. Note that `display` and `flex-direction` properties are not allowed to be set via the `style` prop. You can also specify `min-width`, `max-width`, `min-height`, and `max-height` to set bounds for resizability.

```jsx
<Resizable
  style={{
    border: '2px dashed red',
    'min-width': '100px',
    'max-width: '500px',
    'min-height': '100px',
    'max-height': '500px'
  }}
>
  <ContentComponent />
</Resizable>
```

## Performance

The `debounce` prop can be used to control the frequency of resize event callbacks. By default, this delay is set to `1` millisecond.

```jsx
<Resizable debounce={100}>
  <ContentComponent />
</Resizable>
```
