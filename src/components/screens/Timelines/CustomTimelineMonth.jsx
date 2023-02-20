/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import chunk from 'lodash/chunk';

import DateRangePicker from 'apollo-react/components/DateRangePickerV2';

import * as animationFrame from 'dom-helpers/animationFrame';
import { views } from 'react-big-calendar/lib/utils/constants';
import { notify } from 'react-big-calendar/lib/utils/helpers';
import getPosition from 'dom-helpers/position';

import PopOverlay from 'react-big-calendar/lib/PopOverlay';
import DateContentRow from 'react-big-calendar/lib/DateContentRow';
import Header from 'react-big-calendar/lib/Header';
import DateHeader from 'react-big-calendar/lib/DateHeader';

import { inRange, sortEvents } from 'react-big-calendar/lib/utils/eventLevels';
import moment from 'moment';
import { connect } from 'react-redux';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import { selectTimelineDateRange } from '../../../redux/selectors';
import {
  setShowAddModal,
  setTimelineDateRange
} from '../../../redux/actions/timeline-actions';

let eventsForWeek = (evts, start, end, accessors, localizer) =>
  evts.filter(e => inRange(e, start, end, accessors, localizer));

class MonthView extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      date: null
    };
    this.containerRef = createRef();
    this.slotRowRef = createRef();

    this._bgRows = [];
    this._pendingSelection = [];
  }

  static getDerivedStateFromProps({ date, localizer }, state) {
    return {
      date,
      needLimitMeasure: localizer.neq(date, state.date, 'month')
    };
  }

  componentDidMount() {
    let running;

    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);

    window.addEventListener(
      'resize',
      (this._resizeListener = () => {
        if (!running) {
          animationFrame.request(() => {
            running = false;
            this.setState({ needLimitMeasure: true }); //eslint-disable-line
          });
        }
      }),
      false
    );
  }

  componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false);
  }

  getContainer = () => {
    return this.containerRef.current;
  };

  getDatesBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return [new Date()];
    const dates = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  getWeeks = () => {
    const days = [];
    const week = [];

    const startOfMonth = moment(new Date(2022, 11, 18));

    const endOfMonth = moment(new Date(2023, 0, 14));

    let currentDay = startOfMonth;
    let curentWeek = [];
    while (currentDay <= endOfMonth) {
      days.push(currentDay.toDate()._d);
      curentWeek.push(currentDay.toDate());
      if (curentWeek.length === 7) {
        week.push(currentDay.toDate());
        curentWeek = [];
      }
      currentDay = currentDay.clone().add(1, 'day');
    }
    return week;
  };

  handleDateRangeChange = value => {
    if (!value[0] || !value[1]) return;

    this.props.setTimelineDateRange([
      moment(`${value[0]}`),
      moment(`${value[1]}`)
    ]);
  };

  render() {
    const { className, timelineDateRange } = this.props;
    const month = this.getDatesBetween(
      timelineDateRange[0]?._d,
      timelineDateRange[1]?._d
    );

    const weeks = chunk(month, 7);

    this._weekCount = weeks.length;

    this._weekCount = weeks.length;

    return (
      <>
        <div className="timeline-calender-rtl">
          <div>
            <DateRangePicker
              size="small"
              value={timelineDateRange}
              onChange={value => {
                this.handleDateRangeChange(value);
              }}
              placeholder="mm/dd/yyyy"
              helperText=""
              startLabel="Start Week"
              endLabel="End Week"
            />
          </div>
          <div>
            <Button
              variant="primary"
              icon={<PlusIcon />}
              size="small"
              style={{ marginRight: 10, marginBottom: 10 }}
              onClick={() => this.props.setShowAddModal(true)}
              // disabled={!isCurrent}
            >
              Add New
            </Button>
          </div>
          <div className="month-range-label">{`${moment(
            this.props.timelineDateRange[0]
          ).format('MMM DD')} - ${moment(
            this.props.timelineDateRange[1]
          ).format('MMM DD')}`}</div>
        </div>
        <div
          className={clsx('rbc-month-view custom-time', className)}
          role="table"
          aria-label="Month View"
          ref={this.containerRef}
        >
          <div className="rbc-row rbc-month-header" role="row">
            {this.renderHeaders(weeks[0])}
          </div>
          {weeks.map(this.renderWeek)}
          {this.props.popup && this.renderOverlay()}
        </div>
      </>
    );
  }

  renderWeek = (week, weekIdx) => {
    const {
      events,
      components,
      selectable,
      getNow,
      selected,
      date,
      localizer,
      longPressThreshold,
      accessors,
      getters,
      showAllEvents
    } = this.props;

    const { needLimitMeasure, rowLimit } = this.state;

    // let's not mutate props
    const weeksEvents = eventsForWeek(
      [...events],
      week[0],
      week[week.length - 1],
      accessors,
      localizer
    );

    weeksEvents.sort((a, b) => sortEvents(a, b, accessors, localizer));

    return (
      <DateContentRow
        key={weekIdx}
        ref={weekIdx === 0 ? this.slotRowRef : undefined}
        container={this.getContainer}
        className="rbc-month-row"
        getNow={getNow}
        date={date}
        range={week}
        events={weeksEvents}
        maxRows={showAllEvents ? Infinity : rowLimit}
        selected={selected}
        selectable={selectable}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        renderHeader={this.readerDateHeading}
        renderForMeasure={needLimitMeasure}
        onShowMore={this.handleShowMore}
        onSelect={this.handleSelectEvent}
        onDoubleClick={this.handleDoubleClickEvent}
        onKeyPress={this.handleKeyPressEvent}
        onSelectSlot={this.handleSelectSlot}
        longPressThreshold={longPressThreshold}
        rtl={this.props.rtl}
        resizable={this.props.resizable}
        showAllEvents={showAllEvents}
      />
    );
  };

  readerDateHeading = ({ date, className, ...props }) => {
    let { date: currentDate, getDrilldownView, localizer } = this.props;
    let isOffRange = localizer.neq(date, currentDate, 'month');
    let isCurrent = localizer.isSameDate(date, currentDate);
    let drilldownView = getDrilldownView(date);
    let label = localizer.format(date, 'dateFormat');
    let DateHeaderComponent = this.props.components.dateHeader || DateHeader;

    return (
      <div
        {...props}
        className={clsx(
          className,
          isOffRange && 'rbc-off-range',
          isCurrent && 'rbc-current'
        )}
        role="cell"
      >
        <DateHeaderComponent
          label={label}
          date={date}
          drilldownView={drilldownView}
          isOffRange={isOffRange}
          onDrillDown={e => this.handleHeadingClick(date, drilldownView, e)}
        />
      </div>
    );
  };

  renderHeaders(row) {
    let { localizer, components } = this.props;
    let first = row[0];
    let last = row[row.length - 1];
    let HeaderComponent = components.header || Header;

    return localizer.range(first, last, 'day').map((day, idx) => (
      <div key={'header_' + idx} className="rbc-header">
        <HeaderComponent
          date={day}
          localizer={localizer}
          label={localizer.format(day, 'weekdayFormat')}
        />
      </div>
    ));
  }

  renderOverlay() {
    let overlay = this.state?.overlay ?? {};
    let {
      accessors,
      localizer,
      components,
      getters,
      selected,
      popupOffset,
      handleDragStart
    } = this.props;

    const onHide = () => this.setState({ overlay: null });

    return (
      <div style={{ width: '320px !important' }}>
        <PopOverlay
          overlay={overlay}
          accessors={accessors}
          localizer={localizer}
          components={components}
          getters={getters}
          selected={selected}
          popupOffset={popupOffset}
          ref={this.containerRef}
          handleKeyPressEvent={this.handleKeyPressEvent}
          handleSelectEvent={this.handleSelectEvent}
          handleDoubleClickEvent={this.handleDoubleClickEvent}
          handleDragStart={handleDragStart}
          show={!!overlay.position}
          overlayDisplay={this.overlayDisplay}
          onHide={onHide}
        />
      </div>
    );
  }

  measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.slotRowRef.current.getRowLimit()
    });
  }

  handleSelectSlot = (range, slotInfo) => {
    this._pendingSelection = this._pendingSelection.concat(range);

    clearTimeout(this._selectTimer);
    this._selectTimer = setTimeout(() => this.selectDates(slotInfo));
  };

  handleHeadingClick = (date, view, e) => {
    e.preventDefault();
    this.clearSelection();
    notify(this.props.onDrillDown, [date, view]);
  };

  handleSelectEvent = (...args) => {
    this.clearSelection();
    notify(this.props.onSelectEvent, args);
  };

  handleDoubleClickEvent = (...args) => {
    this.clearSelection();
    notify(this.props.onDoubleClickEvent, args);
  };

  handleKeyPressEvent = (...args) => {
    this.clearSelection();
    notify(this.props.onKeyPressEvent, args);
  };

  handleShowMore = (events, date, cell, slot, target) => {
    const {
      popup,
      onDrillDown,
      onShowMore,
      getDrilldownView,
      doShowMoreDrillDown
    } = this.props;
    //cancel any pending selections so only the event click goes through.
    this.clearSelection();

    if (popup) {
      let position = getPosition(cell, this.containerRef.current);

      this.setState({
        overlay: { date, events, position, target }
      });
    } else if (doShowMoreDrillDown) {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY]);
    }

    notify(onShowMore, [events, date, slot]);
  };

  overlayDisplay = () => {
    this.setState({
      overlay: null
    });
  };

  selectDates(slotInfo) {
    let slots = this._pendingSelection.slice();

    this._pendingSelection = [];

    slots.sort((a, b) => +a - +b);

    const start = new Date(slots[0]);
    const end = new Date(slots[slots.length - 1]);
    end.setDate(slots[slots.length - 1].getDate() + 1);

    notify(this.props.onSelectSlot, {
      slots,
      start,
      end,
      action: slotInfo.action,
      bounds: slotInfo.bounds,
      box: slotInfo.box
    });
  }

  clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  }
}

MonthView.propTypes = {
  events: PropTypes.array.isRequired,
  date: PropTypes.instanceOf(Date),

  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),

  step: PropTypes.number,
  getNow: PropTypes.func.isRequired,

  scrollToTime: PropTypes.instanceOf(Date),
  enableAutoScroll: PropTypes.bool,
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onNavigate: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  showAllEvents: PropTypes.bool,
  doShowMoreDrillDown: PropTypes.bool,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,

  popup: PropTypes.bool,
  handleDragStart: PropTypes.func,

  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  ])
};

MonthView.title = (date, { localizer }) =>
  localizer.format(date, 'monthHeaderFormat');

const mapStateToProps = state => ({
  timelineDateRange: selectTimelineDateRange(state)
});

const mapDispatchToProps = {
  setTimelineDateRange,
  setShowAddModal
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
