// @flow
import React, { PureComponent } from 'react';
import MultiselectItem from './MultiselectItem';

type Props = {
  id?: string,
  placeholder: string,
  items: Array<Object>,
  title?: string
};

type State = {
  isCollapsed: boolean,
  selectedValues: Array<string>
};

class Multiselect extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined,
    title: undefined
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false,
      selectedValues: []
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  selectFormat = (selectedValues: Array<string>) => {
    const values = selectedValues.join(',').split(' ');
    this.setState({ selectedValues: values });
  };

  onSelect = (value: string) => {
    const { selectedValues } = this.state;
    selectedValues.push(value);
    this.selectFormat(selectedValues);
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
            {selectedValues ? (
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
