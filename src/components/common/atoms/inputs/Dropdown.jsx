// @flow
import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';
import { CloseCircle } from '../../../svg';
import { SocketContext } from '../../../../context/SocketContext';

type Props = {
  id?: string,
  placeholder?: string,
  items: Array<Object>,
  title?: string,
  onClick: Function,
  value?: string,
  withReset?: boolean,
  selectedValue: mixed,
  error?: mixed,
  disabled?: boolean,
  lockQuestionOnFocus?: boolean
};

type State = {
  isCollapsed: boolean,
  selectedValue: string
};

class Dropdown extends PureComponent<Props, State> {
  ref: any;
  static contextType = SocketContext;

  static defaultProps = {
    id: undefined,
    placeholder: '',
    title: undefined,
    value: undefined,
    withReset: false,
    error: [],
    disabled: false,
    lockQuestionOnFocus: false,
    isFocusedOnce: false
  };

  constructor(props: Object) {
    super(props);

    this.ref = React.createRef();
    this.listRef = React.createRef();

    this.state = {
      isCollapsed: true,
      selectedValue: '',
      isFocused: false,
      focusedValue: ''
    };
  }

  componentDidMount() {
    const { selectedValue, value } = this.props;
    window.addEventListener('click', this.closeOnOutsideClick);
    window.addEventListener('keydown', this.handleKeyDown);
    if (selectedValue) {
      const { onClick } = this.props;
      onClick(selectedValue);
      this.setState({ selectedValue, focusedValue: selectedValue });
    } else if (value) {
      const { onClick } = this.props;
      onClick(value);
      this.setState({ selectedValue: value, focusedValue: value });
    }

    // add focus listener to element
    if (this.ref.current) {
      this.ref.current.addEventListener('focusin', this.handleFocusIn);
      this.ref.current.addEventListener('focusout', this.handleFocusOut);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value != this.props.value) {
      this.setState({
        selectedValue: this.props.value,
        focusedValue: this.props.value
      });
    }
    //  apply condition if already locked only then unlock
    if (this.props.lockedBySelf) {
      if (this.state.isCollapsed && !this.state.isFocused)
        this.context?.questionUnlockWrapper(this.props.questionId);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnOutsideClick);
    window.removeEventListener('keydown', this.handleKeyDown);
    // remove focus listener from element
    if (this.ref.current) {
      this.ref.current.removeEventListener('focusin', this.handleFocusIn);
      this.ref.current.removeEventListener('focusout', this.handleFocusOut);
    }
  }

  closeOnOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    const { setSelectRow } = this.props;
    if (this.ref.current !== event.target) {
      this.setState({ isCollapsed: true });
      if (setSelectRow) {
        setSelectRow(false);
      }
    }
  };

  handleCollapse = () => {
    const { isCollapsed, isFocused } = this.state;
    const { setSelectRow } = this.props;
    this.setState({ isCollapsed: !isCollapsed });
    if (setSelectRow) {
      if (isCollapsed && !isFocused) setSelectRow(false);
    }
  };

  handleClick = (event: SyntheticEvent<EventTarget>, value: string) => {
    event.stopPropagation();

    const { onClick } = this.props;
    onClick(value);

    this.setState({
      selectedValue: value,
      isCollapsed: false,
      focusedValue: value
    });
  };

  handleReset = () => {
    const { onClick } = this.props;
    onClick('');

    this.setState({ selectedValue: '', isCollapsed: true, focusedValue: '' });
  };

  handleFocusIn = event => {
    console.log('focus function called on number field', this.props);

    this.setState({ isFocused: true, isFocusedOnce: true });
    this.props.setSelectRow(true);
  };

  handleFocusOut = event => {
    this.setState({ isFocused: false });
    const { isCollapsed } = this.state;
    const { setSelectRow } = this.props;
    if (setSelectRow && isCollapsed) {
      setSelectRow(false);
    }
  };

  handleDownArrowPress = () => {
    const { focusedValue } = this.state;
    const { items } = this.props;
    let focusedIndex = 0;

    if (items.size === 0) return;

    const currentFocusedIndex = items.indexOf(focusedValue);
    if (currentFocusedIndex > -1 && currentFocusedIndex <= items.size - 2) {
      focusedIndex = currentFocusedIndex + 1;
      this.setState({ focusedValue: items.get(focusedIndex) });
    }
  };

  handleUpArrowPress = () => {
    const { focusedValue } = this.state;
    const { items } = this.props;
    let focusedIndex = 0;

    if (items.size === 0) return;

    const currentFocusedIndex = items.indexOf(focusedValue);
    if (currentFocusedIndex > -1 && currentFocusedIndex > 0) {
      focusedIndex = currentFocusedIndex - 1;
      this.setState({ focusedValue: items.get(focusedIndex) });
    }
  };

  handleKeyDown = event => {
    const { isCollapsed, focusedValue, isFocused } = this.state;
    const { items, onClick } = this.props;

    if (!isFocused) return;

    if (['Escape', 'Enter', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.code === 'Escape' || event.code === 'Tab') {
      this.setState({ isCollapsed: true });
      return;
    }

    if (event.code === 'Enter') {
      let newFocusedValue = focusedValue;
      if (!isCollapsed) {
        if (items.size > 0 && focusedValue === '') {
          newFocusedValue = items.get(0);
        }
        this.setState({ isCollapsed: false, focusedValue: newFocusedValue });
      } else {
        this.setState({ isCollapsed: true, selectedValue: newFocusedValue });
        onClick(newFocusedValue);
      }
      return;
    }

    if (!isCollapsed) return;

    if (event.code === 'ArrowDown') {
      this.handleDownArrowPress();
      return;
    }

    if (event.code === 'ArrowUp') {
      this.handleUpArrowPress();
    }
  };

  render() {
    const { isCollapsed, selectedValue, focusedValue, offsetTop } = this.state;
    const {
      placeholder,
      id,
      items,
      title,
      value,
      withReset,
      error,
      disabled
    } = this.props;

    return (
      <>
        {title && <p className="dd-title">{title}</p>}
        <div className="dd-input-wrapper">
          <div className="dd-wrapper">
            <div
              id={id}
              className={
                error && error.length > 0
                  ? disabled
                    ? 'dd-header-error dd-header-error-disabled'
                    : 'dd-header-error'
                  : disabled
                  ? 'dd-header dd-header-disabled'
                  : 'dd-header'
              }
              ref={this.ref}
              role="presentation"
              tabIndex={0}
              onClick={() => {
                console.log('onclick is called from drop down');
                if (this.props.lockQuestionOnFocus && !this.props.lockedBySelf)
                  this.context?.questionLockWrapper(this.props.questionId);
                if (!disabled) this.handleCollapse();
                return;
              }}
            >
              {selectedValue || value ? (
                <p className="dd-header-selected">{selectedValue || value}</p>
              ) : (
                <div className="dd-header-placeholder">{placeholder}</div>
              )}
            </div>
            {!isCollapsed && (
              <ul className="dd-list" tabIndex={-1} ref={this.listRef}>
                {items &&
                  items.map(item => (
                    <DropdownItem
                      onClick={this.handleClick}
                      item={item}
                      key={item}
                      focused={focusedValue === item}
                      parentRef={this.listRef}
                    />
                  ))}
              </ul>
            )}
          </div>
          {(selectedValue || value) && withReset && (
            <button
              type="button"
              onClick={this.handleReset}
              className="resetButton"
            >
              <CloseCircle fill="#444" />
            </button>
          )}
        </div>
        {error &&
          error.length > 0 &&
          error.map(v => {
            if (v.section)
              return (
                <p
                  key={String(v.section?.message)}
                  className="number-error-text"
                >
                  {v.section?.message}
                </p>
              );
            if (v.answerType)
              return (
                <p
                  key={String(v.answerType?.message)}
                  className="number-error-text"
                >
                  {v.answerType?.message}
                </p>
              );
          })}
      </>
    );
  }
}

export default Dropdown;
