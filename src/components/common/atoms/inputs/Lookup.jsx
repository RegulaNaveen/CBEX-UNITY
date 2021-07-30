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
    withReset: false
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

  render() {
    const { searchValue, filteredData, showResetButton } = this.state;
    const { title, withReset } = this.props;

    return (
      <div
        id="lookup"
        className={classNames({ 'is-searching': !isEmpty(filteredData) })}
      >
        {title && <p>{title}</p>}
        <div className="lookup-wrapper">
          <input
            type="text"
            value={searchValue}
            onChange={this.onSearching}
            required
            autoComplete="off"
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
