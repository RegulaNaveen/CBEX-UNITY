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
import CircularProgress from 'apollo-react/components/CircularProgress';
import { useHistory, useLocation } from 'react-router-dom';

import {
  selectIsOpen,
  selectQuery,
  selectTotalResultsFound,
  selectCurrentResultIndex,
  selectClearInputFlag,
  selectDataPrerequisiteSatisfied,
  selectSearching,
  selectModalTitle,
  selectModalContent,
  selectShowModal
} from '../../../redux/selectors/search';
import {
  openSearchAction,
  updateQuerySearchAction,
  clearSearchAction,
  closeSearchAction,
  doSearchAction,
  navigateNextSearchAction,
  navigatePrevSearchAction,
  clearSearchResultsAction
} from '../../../redux/actions/search-actions';
import './style.scss';
import { Typography } from 'apollo-react/components/Typography/Typography';
import { SEARCH } from '../../../constants/types';
import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../../constants/app';
import {
  selectIsQuestionsFilterEnabled,
  selectProposalQuestions
} from '../../../redux/selectors';
import CustomModal from '../../common/CustomModal';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [isApprovalFiltersEnabled, setIsApprovalFiltersEnabled] = useState(
    false
  );

  const isOpen = useSelector(selectIsOpen);
  const query = useSelector(selectQuery);
  const currentSearchIndex = useSelector(selectCurrentResultIndex);
  const totalResultsCount = useSelector(selectTotalResultsFound);
  const clearInputFlag = useSelector(selectClearInputFlag);
  const doesDataPrerequisiteSatisfied = useSelector(
    selectDataPrerequisiteSatisfied
  );
  const searching = useSelector(selectSearching);
  const showModal = useSelector(selectShowModal);
  const modalTitle = useSelector(selectModalTitle);
  const modalContent = useSelector(selectModalContent);
  const isQuestionsFilterEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const approvalFilters = useSelector(state => state.approvals.filters);
  const tasksShowMine = useSelector(state => state.tasks.showMine);

  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const proposalQuestions = useSelector(selectProposalQuestions);
  const searchFlag = allFlags.searchFlag || false;
  const dispatch = useDispatch();

  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);

  const history = useHistory();

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
        if (searchInput.length >= 3) {
          if (
            isQuestionsFilterEnabled ||
            isApprovalFiltersEnabled ||
            tasksShowMine
          ) {
            dispatch({
              type: SEARCH.SHOW_MODAL,
              payload: {
                modalTitle: SEARCH_CONSTANTS.TITLE_FILTERED_RESULTS,
                modalContent: SEARCH_CONSTANTS.CONTENT_FILTERED_RESULTS
              }
            });
          } else {
            dispatch(updateQuerySearchAction(searchInput));
            // do search
            if (searchInputRef.current !== null) {
              searchInputRef.current.blur();
              dispatch(doSearchAction());
            }
          }
        } else {
          dispatch(updateQuerySearchAction(searchInput));
          dispatch(clearSearchResultsAction());
        }
      }
    },
    [
      searchInputRef.current,
      searchInput,
      isQuestionsFilterEnabled,
      isApprovalFiltersEnabled,
      tasksShowMine
    ]
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

  function handleModalClose() {
    // do search
    dispatch(updateQuerySearchAction(searchInput));
    if (searchInputRef.current !== null && searchInput.length >= 3) {
      searchInputRef.current.blur();
      dispatch(doSearchAction());
    }
    dispatch({ type: SEARCH.HIDE_MODAL });
  }

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

  useEffect(() => {
    const activeApprovalFiltersCount = approvalFilters.filter(
      item => item.value
    ).length;
    setIsApprovalFiltersEnabled(activeApprovalFiltersCount > 0);
  }, [approvalFilters]);

  useEffect(() => {
    // if searchFlag and doesDataPrerequisiteSatisfied is true and search_q queryparam is not empty then do search
    if (searchFlag && doesDataPrerequisiteSatisfied) {
      const winLocationSearch = window.location.search;
      const queryparams = new URLSearchParams(winLocationSearch);
      const search_q_param = queryparams.get('search_q');
      const search_q_text_param = queryparams.get('search_q_text');
      if (search_q_param) {
        const question = proposalQuestions.find(
          q => q.questionId === search_q_param
        );
        // if question found set search from questionText
        if (question) {
          dispatch(openSearchAction());
          setSearchInput(question.questionText);
          dispatch(updateQuerySearchAction(question.questionText));
          dispatch(doSearchAction());
        }
        queryparams.delete('search_q');
        history.replace({
          search: queryparams.toString()
        });
      } else if (search_q_text_param) {
        dispatch(openSearchAction());
        setSearchInput(search_q_text_param);
        dispatch(updateQuerySearchAction(search_q_text_param));
        dispatch(doSearchAction());
        queryparams.delete('search_q_text');
        history.replace({
          search: queryparams.toString()
        });
      }
    }
  }, [
    doesDataPrerequisiteSatisfied,
    searchFlag,
    proposalQuestions,
    location.search
  ]);

  if (!searchFlag) {
    return null;
  }

  return (
    <>
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

          {query !== null && query.length < 3 ? (
            <div className="search-navigation-container">
              <div
                style={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <p
                  style={{
                    color: '#999999',
                    fontSize: '16px',
                    paddingLeft: '4px'
                  }}
                >
                  3 characters required for search
                </p>
              </div>
            </div>
          ) : null}

          {query !== null && query.length >= 3 ? (
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
                      // color: 'rgb(255, 147, 0)',
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
                        disabled={totalResultsCount <= 1}
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
                        disabled={totalResultsCount <= 1}
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
      <CustomModal
        open={showModal}
        title={modalTitle}
        message={modalContent}
        variant="warning"
        onClose={() => handleModalClose()}
        buttonProps={[{ label: DEFAULT.OK }]}
        className="search-modal"
      />
    </>
  );
}
