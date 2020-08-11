// @flow
import React, { PureComponent } from 'react';
import _ from 'lodash';
import { any } from 'expect';
import MultiselectItem from './MultiselectItem';

type Props = {
  id?: string,
  placeholder: string,
  items: Array<Object>,
  title?: string,
  onClick: Function,
  value?: Array<string>
};

type State = {
  isCollapsed: boolean,
  selectedValues: Array<string>
};

class Multiselect extends PureComponent<Props, State> {
  ref: any;

  static defaultProps = {
    id: undefined,
    title: undefined,
    value: undefined
  };

  constructor(props: Object) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      isCollapsed: false,
      selectedValues: []
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);

    const { value } = this.props;

    if (!_.isEmpty(value)) {
      this.setState({ selectedValues: value });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    if (this.ref.current !== event.target)
      this.setState({ isCollapsed: false });
  };

  onRemove = (value: string) => {
    this.setState(prevState => ({
      selectedValues: prevState.selectedValues.filter(item => item !== value)
    }));
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  onSelect = (event: SyntheticEvent<EventTarget>, value: string) => {
    event.stopPropagation();

    const { onClick } = this.props;
    const { selectedValues } = this.state;

    let index = -1;

    if (selectedValues.includes(`${value}, `)) {
      index = selectedValues.indexOf(`${value}, `);
      if (index > -1) selectedValues.splice(index, 1);
    } else selectedValues.push(`${value}, `);

    this.setState({ selectedValues }, () => {
      onClick(selectedValues);
    });

    this.forceUpdate();
  };

  render() {
    const { isCollapsed, selectedValues } = this.state;
    const { id, placeholder, items, title } = this.props;
    return (
      <>
        {title && <p className="multiselect-title">{title}</p>}
        <div className="multiselect-wrapper">
          <div
            id={id}
            ref={this.ref}
            className="multiselect-header"
            role="presentation"
            onClick={this.handleCollapse}
          >
            {selectedValues.length !== 0 ? (
              <div className="multiselect-header-selected">
                {selectedValues}
              </div>
            ) : (
                <div className="multiselect-header-placeholder">
                  {placeholder}
                </div>
              )}
          </div>
          {isCollapsed && (
            <ul className="multiselect-list">
              {items &&
                items.map(item => (
                  <MultiselectItem
                    onClick={this.onSelect}
                    item={item}
                    key={item}
                    isSelected={selectedValues.includes(`${item}, `)}
                  />
                ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default Multiselect;
