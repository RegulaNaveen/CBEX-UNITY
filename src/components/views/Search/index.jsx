import React, { useCallback, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import TextField from 'apollo-react/components/TextField';
import IconButton from 'apollo-react/components/IconButton';
import Button from 'apollo-react/components/Button';
import SearchIcon from 'apollo-react-icons/Search';
import CloseIcon from 'apollo-react-icons/Close';
import ChevronLeftIcon from 'apollo-react-icons/ChevronLeft';
import ChevronRightIcon from 'apollo-react-icons/ChevronRight';

import {
  selectIsOpen,
  selectQuery,
  selectTotalResultsFound,
  selectCurrentResultIndex,
  selectClearInputFlag,
  selectDataPrerequisiteSatisfied,
  selectSearching
} from '../../../redux/selectors/search';
import {
  openSearchAction,
  updateQuerySearchAction,
  clearSearchAction,
  closeSearchAction,
  doSearchAction,
  navigateNextSearchAction,
  navigatePrevSearchAction
} from '../../../redux/actions/search-actions';
import './style.scss';
import { Typography } from 'apollo-react/components/Typography/Typography';
import { SEARCH } from '../../../constants/types';
import CircularProgress from 'apollo-react/components/CircularProgress';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  const isOpen = useSelector(selectIsOpen);
  const query = useSelector(selectQuery);
  const currentSearchIndex = useSelector(selectCurrentResultIndex);
  const totalResultsCount = useSelector(selectTotalResultsFound);
  const clearInputFlag = useSelector(selectClearInputFlag);
  const doesDataPrerequisiteSatisfied = useSelector(
    selectDataPrerequisiteSatisfied
  );
  const searching = useSelector(selectSearching);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const searchFlag = allFlags.searchFlag || false;
  const dispatch = useDispatch();

  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);

  const toggleSearchIconOpen = useCallback(async () => {
    dispatch(openSearchAction());
  }, []);

  const handleInputChange = event => {
    event.persist();
    setSearchInput(event.target.value);
  };

  const handleKeyPress = useCallback(
    async e => {
      if (e.key === 'Enter') {
        // do search
        dispatch(updateQuerySearchAction(searchInput));
        searchInputRef.current.blur();
        if (searchInputRef.current !== null && searchInput.length >= 3) {
          dispatch(doSearchAction());
        }
      }
    },
    [searchInputRef.current, searchInput]
  );

  const handleClearClick = useCallback(async () => {
    if (searchInputRef.current !== null) {
      searchInputRef.current.value = '';
      searchInputRef.current.focus();
    }
    setSearchInput('');
    dispatch(clearSearchAction());
  }, [searchInputRef.current]);

  const handleSearchInputBlur = useCallback(async () => {
    if (searchInput.length === 0) {
      dispatch(closeSearchAction());
      dispatch(clearSearchAction());
    }
  }, [searchInput]);

  async function handleNextClick() {
    dispatch(navigateNextSearchAction());
  }

  async function handlePrevClick() {
    dispatch(navigatePrevSearchAction());
  }

  const handleKeyDown = useCallback(
    async e => {
      if (searchFlag && doesDataPrerequisiteSatisfied) {
        if (e.ctrlKey && e.key === 'f') {
          e.preventDefault();
          e.stopPropagation();
          dispatch(openSearchAction());
        }
      }
    },
    [dispatch, searchFlag, doesDataPrerequisiteSatisfied]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchFlag, doesDataPrerequisiteSatisfied]);

  useEffect(() => {
    if (isOpen && searchInputRef.current !== null) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef.current, isOpen]);

  useEffect(() => {
    if (clearInputFlag) {
      if (searchInput.length > 0) {
        setSearchInput('');
        dispatch(clearSearchAction());
        if (isOpen && searchInputRef.current !== null) {
          searchInputRef.current.focus();
        }
      }
      dispatch({ type: SEARCH.RESET_CLEAR_INPUT_FLAG });
    }
  }, [dispatch, clearInputFlag, searchInput, searchInputRef.current, isOpen]);

  if (!searchFlag) {
    return null;
  }

  return (
    <div
      className={classNames({
        'toolbar-search-container': true,
        enabled: isOpen
      })}
      data-testid="toolbar-search-container"
    >
      <div ref={searchIconRef} style={{ position: 'relative' }}>
        <IconButton
          disabled={isOpen || !doesDataPrerequisiteSatisfied}
          onClick={toggleSearchIconOpen}
          data-testid="search-icon-btn-testid"
        >
          <SearchIcon className="search-icon" />
        </IconButton>

        {query.length >= 3 ? (
          <div className="search-navigation-container">
            {searching ? (
              <div
                style={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <CircularProgress
                  variant="indeterminate"
                  size={20}
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
                <p
                  style={{
                    color: '#999999',
                    fontSize: '16px',
                    paddingLeft: '4px'
                  }}
                >
                  Searching...
                </p>
              </div>
            ) : (
              <>
                {totalResultsCount === 0 ? (
                  <Typography variant="body2" className="no-result-text">
                    No Matches Found
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="text"
                      icon={ChevronLeftIcon}
                      disabled={currentSearchIndex <= 0}
                      onClick={handlePrevClick}
                      data-testid="search-prev"
                    >
                      Previous
                    </Button>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {`${currentSearchIndex + 1} of ${totalResultsCount}`}
                    </span>
                    <Button
                      variant="text"
                      icon={ChevronRightIcon}
                      disabled={
                        currentSearchIndex < 0 ||
                        currentSearchIndex > totalResultsCount - 2
                      }
                      onClick={handleNextClick}
                      data-testid="search-next"
                    >
                      Next
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        ) : null}
      </div>

      <TextField
        className={classNames({ hidden: !isOpen, 'text-input': true })}
        placeholder="Search"
        icon={
          searchInput.length > 0 ? (
            <CloseIcon
              className="close-icon"
              onClick={handleClearClick}
              data-testid="search-clearicon"
            />
          ) : null
        }
        value={searchInput}
        onChange={async e => {
          e.persist();
          handleInputChange(e);
        }}
        onKeyPress={handleKeyPress}
        onBlur={handleSearchInputBlur}
        InputProps={{
          inputRef: searchInputRef
        }}
      ></TextField>
    </div>
  );
}
