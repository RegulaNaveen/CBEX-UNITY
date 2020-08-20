// @flow
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { objectContains } from '../../utils/helpers';

type Props = {
  data: Array<any>,
  defaultValue: string,
  title?: string,
  getSelectedItem: (seletedItem: string) => void
};

type State = {
  searchValue: string,
  filteredData: Array<any>
};

class Lookup extends Component<Props, State> {
  static defaultProps = {
    title: ''
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      searchValue: '',
      filteredData: []
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;

    this.setState({ searchValue: defaultValue });
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
    const { getSelectedItem } = this.props;

    this.setState({ searchValue: textContent, filteredData: [] }, () =>
      getSelectedItem(textContent)
    );
  };

  render() {
    const { searchValue, filteredData } = this.state;
    const { title } = this.props;

    return (
      <div
        id="lookup"
        className={classNames({ 'is-searching': !isEmpty(filteredData) })}
      >
        <p>{title}</p>

        <div className="input-wrapper">
          <input
            type="text"
            value={searchValue}
            onChange={this.onSearching}
            required
            autoComplete="off"
          />
        </div>

        <div
          className={classNames('search-data-wrapper', {
            'search-data-wrapper-with-data': !isEmpty(filteredData)
          })}
        >
          {filteredData.map(({ id, name }) => (
            <span role="presentation" onClick={this.setSelectedItem} key={id}>
              {name}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Lookup;
