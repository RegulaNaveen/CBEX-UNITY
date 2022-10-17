// @flow
import React, { PureComponent } from 'react';
import { isEmpty, cloneDeep, isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import MultiselectItem from './MultiselectItem';
import { SocketContext } from '../../../../context/SocketContext';

type Props = {
  id?: string,
  placeholder: string,
  items: Array<Object>,
  title?: string,
  onClick: (selectedValues: Array<string>, lastAnswer: Array<string>) => void,
  value?: Array<string>,
  error?: mixed,
  disabled: boolean,
  lockQuestionOnFocus?: boolean,
  toggleWatch?: Function,
  onCascadeChange?: Function,
  forceBlur?: boolean
};

type State = {
  isOpen: boolean,
  selectedValues: Array<string>
};

class Multiselect extends PureComponent<Props, State> {
  ref: any;
  static contextType = SocketContext;

  static defaultProps = {
    id: undefined,
    title: undefined,
    value: undefined,
    error: undefined,
    disabled: false,
    lockQuestionOnFocus: false
  };

  constructor(props: Object) {
    super(props);

    this.ref = React.createRef();
    this.listRef = React.createRef();

    this.state = {
      isOpen: false,
      selectedValues: [],
      isFocused: false,
      focusedValue: ''
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('keydown', this.handleKeyDown);

    const { value: lastAnswer } = this.props;

    if (!isEmpty(lastAnswer)) this.setState({ selectedValues: lastAnswer });
    // add focus listener to element
    if (this.ref.current) {
      this.ref.current.addEventListener('focusin', this.handleFocusIn);
      this.ref.current.addEventListener('focusout', this.handleFocusOut);
    }
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const { isOpen, selectedValues } = this.state;
    const { onClick, value: lastAnswer, forceBlur } = this.props;
    const { value: prevlastAnswer } = prevProps;

    if (!isEqual(prevlastAnswer, lastAnswer)) {
      this.setState({ selectedValues: lastAnswer });
    }

    if (prevState.isOpen !== isOpen) {
      if (!isOpen) onClick(selectedValues, lastAnswer || []);
    }

    if (forceBlur === true) {
      if (isOpen) {
        this.setState({ isOpen: false }, () => {
          this.props.setSelectRow(false);
        });
      }
      if (this.props.toggleWatch) this.props.toggleWatch(false);
      if (this.props.lockedBySelf) {
        this.context?.questionUnlockWrapper(this.props.questionId);
      }
    }
  }

  componentWillUnmount() {
    const { isOpen, selectedValues } = this.state;
    const { onClick, value: lastAnswer } = this.props;
    // when multi-select is not collapsed, update changes on component destroy
    if (isOpen) onClick(selectedValues, lastAnswer || []);
    window.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    const { setSelectRow, lockedBySelf } = this.props;
    if (this.ref.current !== event.target) {
      if (setSelectRow) {
        this.setState({ isOpen: false }, () => {
          if (this.props.toggleWatch) this.props.toggleWatch(false);
          this.props.setSelectRow(false);

          if (lockedBySelf) {
            if (!this.state.isOpen && !this.state.isFocused)
              this.context?.questionUnlockWrapper(this.props.questionId);
          }
        });
      }
    }
  };

  handleCollapse = () => {
    const { isOpen } = this.state;
    const { setSelectRow } = this.props;

    this.setState({ isOpen: !isOpen }, () => {
      if (this.props.setSelectRow) {
        if (!this.state.isOpen && !this.state.isFocused) {
          setSelectRow(false);
        }
      }
    });
  };

  onSelect = (event: SyntheticEvent<EventTarget>, value: string) => {
    event.stopPropagation();
    if (this.props.onCascadeChange) this.props.onCascadeChange();

    const { selectedValues } = this.state;

    let index = -1;
    const newArray = cloneDeep(selectedValues);

    if (!selectedValues.includes(value)) newArray.push(value);
    else {
      index = newArray.indexOf(value);
      if (index > -1) newArray.splice(index, 1);
    }

    this.setState({ selectedValues: newArray });

    if (value === this.props.lastAnswer && this.props.lockedBySelf) {
      this.context?.questionUnlockWrapper(this.props.questionId);
    }

    this.forceUpdate();
  };

  renderSelectedItems = () => {
    const { selectedValues } = this.state;

    return (
      <div className="multiselect-header-selected">
        {selectedValues.map((item, index) => (
          <span key={uuidv4()}>
            {index !== selectedValues.length - 1 ? `${item}, ` : `${item}`}
          </span>
        ))}
      </div>
    );
  };

  handleFocusIn = event => {
    this.setState({ isFocused: true });
    if (this.props.setSelectRow) this.props.setSelectRow(true);
  };

  handleFocusOut = event => {
    this.setState({ isFocused: false });
    if (this.props.setSelectRow) this.props.setSelectRow(false);
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

  handleOptionSelect = () => {
    const { focusedValue, selectedValues } = this.state;
    let index = -1;
    const newArray = cloneDeep(selectedValues);

    if (!selectedValues.includes(focusedValue)) newArray.push(focusedValue);
    else {
      index = newArray.indexOf(focusedValue);
      if (index > -1) newArray.splice(index, 1);
    }

    this.setState({ selectedValues: newArray });
    this.forceUpdate();
  };

  handleKeyDown = event => {
    const { isOpen, focusedValue, isFocused, selectedValues } = this.state;
    const { items, onClick, lastAnswer } = this.props;

    if (!isFocused) return;

    if (
      ['Escape', 'Enter', 'ArrowUp', 'ArrowDown', 'Space'].includes(event.code)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.code === 'Escape' || event.code === 'Tab') {
      this.setState({ isOpen: false }, () => {
        if (this.props.toggleWatch) {
          this.props.toggleWatch(false);
        }
        if (this.props.lockedBySelf) {
          if (!this.state.isOpen && !this.state.isFocused) {
          }
          this.context?.questionUnlockWrapper(this.props.questionId);
        }
      });
      return;
    }

    if (event.code === 'Enter') {
      if (!isOpen) {
        this.setState({
          isOpen: true,
          focusedValue: items.size > 0 ? items.get(0) : ''
        });
        if (this.props.lockQuestionOnFocus && !this.props.lockedBySelf) {
          if (this.props.toggleWatch) {
            this.props.toggleWatch(true);
          }
          this.context?.questionLockWrapper(this.props.questionId);
        }
      } else {
        this.setState({ isOpen: false }, () => {
          if (this.props.toggleWatch) {
            this.props.toggleWatch(false);
          }
          if (this.props.lockedBySelf) {
            if (!this.state.isOpen && !this.state.isFocused) {
            }
            this.context?.questionUnlockWrapper(this.props.questionId);
          }
        });
      }
      return;
    }

    if (!isOpen) return;

    if (event.code === 'ArrowDown') {
      if (this.props.onCascadeChange) this.props.onCascadeChange();
      this.handleDownArrowPress();
      return;
    }

    if (event.code === 'ArrowUp') {
      if (this.props.onCascadeChange) this.props.onCascadeChange();
      this.handleUpArrowPress();
    }

    if (event.code === 'Space') {
      if (this.props.onCascadeChange) this.props.onCascadeChange();
      this.handleOptionSelect();
    }
  };

  render() {
    const { isOpen, selectedValues, focusedValue } = this.state;
    const { id, placeholder, items, title, error, disabled } = this.props;

    return (
      <>
        {title && <p className="multiselect-title">{title}</p>}
        <div
          className="multiselect-wrapper"
          // onBlur={() =>
          //   this.props.onBlur(this.state.isOpen, this.state.isFocused)
          // }
        >
          <div
            id={id}
            ref={this.ref}
            className={
              error && error.length > 0
                ? disabled
                  ? 'multiselect-header-error multiselect-error-disabled'
                  : 'multiselect-header-error'
                : disabled
                ? 'multiselect-header multiselect-disabled'
                : 'multiselect-header'
            }
            role="presentation"
            onClick={() => {
              if (this.props.toggleWatch) this.props.toggleWatch(true);
              if (this.props.lockQuestionOnFocus && !this.props.lockedBySelf)
                this.context?.questionLockWrapper(this.props.questionId);

              if (!disabled) this.handleCollapse();
            }}
            tabIndex={0}
          >
            {!isEmpty(selectedValues) ? (
              this.renderSelectedItems()
            ) : (
              <div className="multiselect-header-placeholder">
                {placeholder}
              </div>
            )}
          </div>
          {isOpen && (
            <ul className="multiselect-list" ref={this.listRef}>
              {!isEmpty(items) &&
                items.map((item, itemIndex) => (
                  <MultiselectItem
                    onClick={this.onSelect}
                    item={item}
                    key={`${id}-multiselect-${itemIndex}`}
                    isSelected={selectedValues.includes(item)}
                    focused={focusedValue === item}
                    parentRef={this.listRef}
                  />
                ))}
            </ul>
          )}
        </div>
        {error &&
          error.length > 0 &&
          error.map(v => {
            if (v.roleNames)
              return (
                <p
                  key={String(v.roleNames?.message)}
                  className="number-error-text"
                >
                  {v.roleNames?.message}
                </p>
              );
          })}
      </>
    );
  }
}

export default Multiselect;
