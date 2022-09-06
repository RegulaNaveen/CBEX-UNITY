import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = index => {
    console.log({ propsitems: props.items});
    // TODO
    // 1. Remove console logs
    // 2. Call notification API from here
    const item = props.items[index];

    if (item) {
      // props.command({ id: item.id });
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
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
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`mention-item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.listOption}
          </button>
        ))
      ) : (
        <div className='mention-item'>No result</div>
      )}
    </div>
  );
});
