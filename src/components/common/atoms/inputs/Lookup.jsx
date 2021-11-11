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
  withReset?: boolean,
  className?: string,
  defaultValue?: string
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
    placeholder: '',
    className: '',
    defaultValue: '',
    error: false
  };

  constructor(props: Object) {
    super(props);
    const { text, withReset } = this.props;
    this.state = {
      searchValue: text || '',
      filteredData: [],
      error: false,
      showResetButton: withReset && text && text.length > 0
    };
  }

  componentDidMount() {
    document.addEventListener('cleantemmmeberinput', e => {
      if (e && e.detail) {
        this.setState({ searchValue: '' });
      }
    });
  }

  onSearching = ({ target: { value } }: SyntheticInputEvent<EventTarget>) => {
    const { data } = this.props;
    const searchValue = value.slice(value.lastIndexOf(",")+1)
    const filteringData = data.filter(item =>
      objectContains(item, searchValue, false)
    );

    this.setState({
      searchValue: value,
      filteredData: filteringData,
      error: Boolean(filteringData.length) ? false : true
    });
  };

  setSelectedItem = ({
    target: { textContent }
  }: SyntheticInputEvent<EventTarget>) => {
    const { getSelectedItem, withReset } = this.props;

    let searchValue = this.state.searchValue.slice(0,this.state.searchValue.lastIndexOf(","))

    this.setState(
      {
        searchValue: (searchValue == "" ? "" : searchValue+", ")+textContent,
        filteredData: [],
        showResetButton: withReset
      },
      () => getSelectedItem((searchValue == "" ? "" : searchValue+", ")+textContent)
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
    const { searchValue, filteredData, showResetButton, error } = this.state;
    const {
      title,
      withReset,
      placeholder,
      className,
      defaultValue
    } = this.props;

    return (
      <div
        id="lookup"
        style={className ? { paddingTop: 3 } : {}}
        className={classNames({ 'is-searching': !isEmpty(filteredData) })}
      >
        {title && <p>{title}</p>}
        <div className="lookup-wrapper">
          <input
            type="text"
            className="input teammember"
            value={searchValue}
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
        {error &&
          <p className="number-error-text">Please enter a valid answer</p>
         }
      </div>
    );
  }
}

export default Lookup;
