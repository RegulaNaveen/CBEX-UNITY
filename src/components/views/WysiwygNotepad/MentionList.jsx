import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef
} from 'react';

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedRef = useRef();

  const selectItem = index => {
    // TODO
    // Call notification API from here
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const scrollSelectedRef = () => {
    selectedRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start'
    });
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
    scrollSelectedRef();
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
    scrollSelectedRef();
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    }
  }));

  return (
    <div className='mention-items'>
      {props?.items?.length
        ? props?.items.map((item, index) => (
            <button
              type='button'
              className={`mention-item ${
                index === selectedIndex ? 'is-selected' : ''
              }`}
              ref={index === selectedIndex ? selectedRef : null}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.listOption}
            </button>
          ))
        : null}
    </div>
  );
});
