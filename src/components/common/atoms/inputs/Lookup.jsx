// @flow
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import TextField from 'apollo-react/components/TextField';
import { objectContains } from '../../../../utils/helpers';
import { CloseCircle } from '../../../svg';

type Props = {
  data: Array<any>,
  title?: string,
  placeholder?: string,
  text?: string,
  sectionName?: string,
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
    sectionName: '',
    error: false
  };

  constructor(props: Object) {
    super(props);
    const { text, withReset } = this.props;
    this.textInput = null;
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
        this.setState({ searchValue: '', filteredData: [] });
      }
    });
  }

  onSearching = ({ target: { value } }: SyntheticInputEvent<EventTarget>) => {
    const { data } = this.props;
    const searchValue = value && value.slice(value.lastIndexOf(',') + 1).trim();
    const filteringData = data.filter(item =>
      objectContains(item, value, false)
    );

    this.setState(
      {
        searchValue: value,
        filteredData: filteringData,
        error: !filteringData.length
      },
      () => {
        this._resizeTextBox();
      }
    );
  };

  _resizeTextBox = () => {
    setTimeout(() => {
      const textareae = this.textInput.getElementsByTagName('textarea')[0];
      const txtareaheight =
        textareae.scrollHeight > 300 ? 300 : textareae.scrollHeight;
      this.textInput.style.height = `auto`;
      this.textInput.style.height = `${txtareaheight + 2}px`;
      textareae.style.height = `${txtareaheight}px`;
    }, 100);
  };

  setSelectedItem = ({
    target: { textContent }
  }: SyntheticInputEvent<EventTarget>) => {
    const { getSelectedItem, withReset } = this.props;

    const { previouslySelectedValue } = this.state;
    const newValue = ( previouslySelectedValue && previouslySelectedValue.length  ? `${previouslySelectedValue}, ` : '') + textContent;
    this.setState(
      {
        searchValue: textContent,
        filteredData: [],
        showResetButton: withReset,
        error: false
      },
      () => {
        getSelectedItem(newValue);
        this._resizeTextBox();
      }
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
      defaultValue,
      sectionName
    } = this.props;

    return (
      <div
        id="lookup"
        style={className ? { paddingTop: 3 } : {}}
        className={classNames({ 'is-searching': !isEmpty(filteredData) })}
      >
        {title && <p>{title}</p>}
        <div className="lookup-wrapper">
          <TextField
            ref={e => (this.textInput = e)}
            style={{ marginBottom: 0 }}
            type="text"
            className="teammember align-lookup proposal-text-area"
            value={searchValue}
            placeholder={placeholder}
            onChange={this.onSearching}
            autoComplete="off"
            onBlur={this.handleBlur}
            sizeAdjustable
            minHeight={40}
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
        {error && sectionName === 'Proposal Team' && (
          <p className="number-error-text">Please enter a valid answer</p>
        )}
      </div>
    );
  }
}

export default Lookup;
