// @flow
import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';
import { CloseCircle } from '../../../svg';

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
  disabled?: boolean
};

type State = {
  isCollapsed: boolean,
  selectedValue: string
};

class Dropdown extends PureComponent<Props, State> {
  ref: any;

  static defaultProps = {
    id: undefined,
    placeholder: '',
    title: undefined,
    value: undefined,
    withReset: false,
    error: [],
    disabled: false
  };

  constructor(props: Object) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      isCollapsed: false,
      selectedValue: ''
    };
  }

  componentDidMount() {
    const { selectedValue } = this.props;
    window.addEventListener('click', this.closeOnOutsideClick);
    if (selectedValue) {
      const { onClick } = this.props;
      onClick(selectedValue);
      this.setState({ selectedValue });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnOutsideClick);
  }

  closeOnOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    const { setSelectRow } = this.props;
    if (this.ref.current !== event.target) {
      this.setState({ isCollapsed: false });
      setSelectRow(false);
    }
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    const { setSelectRow } = this.props;
    this.setState({ isCollapsed: !isCollapsed });
    if (setSelectRow) setSelectRow(!isCollapsed);
  };

  handleClick = (event: SyntheticEvent<EventTarget>, value: string) => {
    event.stopPropagation();

    const { onClick } = this.props;
    onClick(value);

    this.setState({ selectedValue: value, isCollapsed: false });
  };

  handleReset = () => {
    const { onClick } = this.props;
    onClick('');
    this.setState({ selectedValue: '', isCollapsed: false });
  };

  render() {
    const { isCollapsed, selectedValue } = this.state;
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
              onClick={() => {
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
            {isCollapsed && (
              <ul className="dd-list">
                {items &&
                  items.map(item => (
                    <DropdownItem
                      onClick={this.handleClick}
                      item={item}
                      key={item}
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
