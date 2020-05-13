// @flow
import React, { PureComponent } from 'react';
import _ from 'lodash';
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
  static defaultProps = {
    id: undefined,
    title: undefined,
    value: undefined
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false,
      selectedValues: []
    };
  }

  componentDidMount() {
    const { value } = this.props;
    console.log('MOUNT', value);
    if (!_.isEmpty(value)) {
      this.setState({ selectedValues: value });
      console.log('SETVALUE');
    }
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  onRemove = (value: string) => {
    this.setState(prevState => ({
      selectedValues: prevState.selectedValues.filter(item => item !== value)
    }));
  };

  onSelect = (value: string) => {
    const { onClick } = this.props;
    const { selectedValues } = this.state;
    const currentSelectedValues = selectedValues;
    let index = -1;
    if (selectedValues.includes(`${value}, `)) {
      index = currentSelectedValues.indexOf(`${value}, `);
      if (index > -1) {
        currentSelectedValues.splice(index, 1);
      }
      this.onRemove(`${value}, `);
    } else {
      selectedValues.push(`${value}, `);
    }
    onClick(currentSelectedValues);
    this.handleCollapse();
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
