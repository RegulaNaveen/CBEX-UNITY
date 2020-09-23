// @flow
import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';
import { CloseCircle } from '../svg';

type Props = {
  id?: string,
  placeholder?: string,
  items: Array<Object>,
  title?: string,
  onClick: Function,
  value?: string,
  withReset?: boolean
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
    withReset: false
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
    window.addEventListener('click', this.closeOnOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnOutsideClick);
  }

  closeOnOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    if (this.ref.current !== event.target)
      this.setState({ isCollapsed: false });
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleClick = (event: SyntheticEvent<EventTarget>, selectedValue: string) => {
    event.stopPropagation();

    const { onClick, value: lastAnswer } = this.props;
    onClick(selectedValue, lastAnswer);

    this.setState({ selectedValue, isCollapsed: false });
  };

  handleReset = () => {
    const { onClick } = this.props;
    onClick('');
    this.setState({ selectedValue: '', isCollapsed: false });
  };

  handleReset = () => {
    const { onClick } = this.props;
    onClick('');
    this.setState({ selectedValue: '', isCollapsed: false });
  };

  render() {
    const { isCollapsed, selectedValue } = this.state;
    const { placeholder, id, items, title, value, withReset } = this.props;

    return (
      <>
        {title && <p className="dd-title">{title}</p>}
        <div className="dd-input-wrapper">
          <div className="dd-wrapper">
            <div
              id={id}
              className="dd-header"
              ref={this.ref}
              role="presentation"
              onClick={this.handleCollapse}
            >
              {selectedValue || value ? (
                <div className="dd-header-selected">
                  {selectedValue || value}
                </div>
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
      </>
    );
  }
}

export default Dropdown;
