// @flow
import React, { PureComponent } from 'react';
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

  componentDidUpdate() {
    const { selectedValues } = this.state;
    const { onClick } = this.props;
    if (selectedValues) {
      onClick(selectedValues);
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
    const { selectedValues } = this.state;
    if (selectedValues.includes(`${value}, `)) {
      this.onRemove(`${value}, `);
    } else {
      selectedValues.push(`${value}, `);
    }
    this.handleCollapse();
  };

  render() {
    const { isCollapsed, selectedValues } = this.state;
    const { id, placeholder, items, title, value } = this.props;
    console.log(value);

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
