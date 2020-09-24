// @flow
import React, { PureComponent } from 'react';
import { isEmpty, cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import MultiselectItem from './MultiselectItem';

type Props = {
  id?: string,
  placeholder: string,
  items: Array<Object>,
  title?: string,
  onClick: (selectedValues: Array<string>, lastAnswer: Array<string>) => void,
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

    const { value: lastAnswer } = this.props;

    if (!isEmpty(lastAnswer)) this.setState({ selectedValues: lastAnswer });
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const { isCollapsed, selectedValues } = this.state;
    const { onClick, value: lastAnswer } = this.props;

    if (prevState.isCollapsed !== isCollapsed) {
      if (!isCollapsed && lastAnswer) onClick(selectedValues, lastAnswer);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: SyntheticEvent<EventTarget>) => {
    if (this.ref.current !== event.target)
      this.setState({ isCollapsed: false });
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  onSelect = (event: SyntheticEvent<EventTarget>, value: string) => {
    event.stopPropagation();

    const { selectedValues } = this.state;

    let index = -1;
    const newArray = cloneDeep(selectedValues);

    if (!selectedValues.includes(value)) newArray.push(value);
    else {
      index = newArray.indexOf(value);
      if (index > -1) newArray.splice(index, 1);
    }

    this.setState({ selectedValues: newArray });
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
            {!isEmpty(selectedValues) ? (
              this.renderSelectedItems()
            ) : (
              <div className="multiselect-header-placeholder">
                {placeholder}
              </div>
            )}
          </div>
          {isCollapsed && (
            <ul className="multiselect-list">
              {!isEmpty(items) &&
                items.map(item => (
                  <MultiselectItem
                    onClick={this.onSelect}
                    item={item}
                    key={uuidv4()}
                    isSelected={selectedValues.includes(item)}
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
