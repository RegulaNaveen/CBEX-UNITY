// @flow
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { objectContains } from '../../../../utils/helpers';
import { CloseCircle } from '../../../svg';

type Props = {
  data: Array<any>,
  title?: string,
  placeholder?: string,
  text?: string,
  getSelectedItem: (selectedItem: string) => void,
  withReset?: boolean
};

type State = {
  searchValue: string,
  filteredData: Array<any>,
  showResetButton: boolean
};

class Lookup extends Component<Props, State> {
  static defaultProps = {
    title: '',
    text: '',
    withReset: false,
    placeholder: ''
  };

  constructor(props: Object) {
    super(props);
    const { text } = this.props;
    this.state = {
      searchValue: text || '',
      filteredData: [],
      showResetButton: false
    };
  }

  onSearching = ({ target: { value } }: SyntheticInputEvent<EventTarget>) => {
    const { data } = this.props;
    const filteringData = data.filter(item =>
      objectContains(item, value, false)
    );

    this.setState({
      searchValue: value,
      filteredData: filteringData
    });
  };

  setSelectedItem = ({
    target: { textContent }
  }: SyntheticInputEvent<EventTarget>) => {
    const { getSelectedItem, withReset } = this.props;

    this.setState(
      {
        searchValue: textContent,
        filteredData: [],
        showResetButton: withReset
      },
      () => getSelectedItem(textContent)
    );
  };

  handleReset = () => {
    const { getSelectedItem } = this.props;

    this.setState(
      {
        searchValue: '',
        filteredData: [],
        showResetButton: false
      },
      () => getSelectedItem('')
    );
  };

  handleBlur = ({ target: { value } }) => {
    const { getSelectedItem, text } = this.props;
    // if value is empty send change update
    // empty value enables ability to clear previously selected value
    if (value.trim().length === 0 && text.length > 0) {
      getSelectedItem('', text);
    }
  };

  render() {
    const { searchValue, filteredData, showResetButton } = this.state;
    const { title, withReset, placeholder, className } = this.props;

    return (
      <div
        id="lookup"
        style={className ? { paddingTop: 3 } : {}}
        className={classNames({ 'is-searching': !isEmpty(filteredData) })}
      >
        {title && <p>{title}</p>}
        <div className={className || 'lookup-wrapper'}>
          <input
            type="text"
            value={searchValue}
            className={className ? 'inputsize' : ''}
            placeholder={placeholder}
            onChange={this.onSearching}
            required
            autoComplete="off"
            onBlur={this.handleBlur}
          />
          {withReset && showResetButton && (
            <button
              type="button"
              onClick={this.handleReset}
              className="resetButton"
            >
              <CloseCircle fill="#444" />
            </button>
          )}
        </div>
        <div className="search-data-wrapper">
          {filteredData.map(({ name, email }) => (
            <span
              role="presentation"
              onClick={this.setSelectedItem}
              key={uuidv4()}
            >
              {name}
              {email && ` (${email})`}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Lookup;
