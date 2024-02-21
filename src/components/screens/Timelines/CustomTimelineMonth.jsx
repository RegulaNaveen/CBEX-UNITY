/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import chunk from 'lodash/chunk';

import DateRangePicker from 'apollo-react/components/DateRangePicker';

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
import { getSelectedBid } from '../../../redux/selectors/proposal';
import Typography from 'apollo-react/components/Typography';

let eventsForWeek = (evts, start, end, accessors, localizer) =>
  evts.filter(e => inRange(e, start, end, accessors, localizer));

class MonthView extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      date: null,
      showDateRangeError: false
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
    if (currentDate <= endDate) {
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return dates;
  };

  getDateHeadingLabel = date => {
    const { localizer, timelineDateRange } = this.props;

    if (localizer.isSameDate(date, new Date())) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {localizer.format(date, 'D').toString() === '1' && (
            <div style={{ marginRight: '3px' }}>{`${localizer.format(
              date,
              'MMM'
            )} `}</div>
          )}
          <Typography
            style={{
              display: 'flex',
              borderRadius: '50%',
              color: '#fff',
              height: '28px',
              width: '28px',
              backgroundColor: '#0768fd',
              fontFamily: 'ProximaNova-Regular',
              fontSize: '16px',
              fontweight: '500',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '2px'
            }}
          >
            {localizer.format(date, 'D')}
          </Typography>
        </div>
      );
    }

    if (
      (localizer.format(date, 'D').toString() === '1' ||
        localizer.isSameDate(date, new Date(timelineDateRange[0]?._d))) &&
      !localizer.isSameDate(date, new Date())
    ) {
      return localizer.format(date, 'MMM D');
    }

    return localizer.format(date, 'D');
  };

  handleDateRangeChange = value => {
    if (!moment(`${value[0]}`).isValid() || !moment(`${value[1]}`).isValid()) {
      this.setState({ showDateRangeError: true });
    } else this.setState({ showDateRangeError: false });
    if (
      !moment(`${value[0]}`).isBefore(`${value[1]}`) ||
      !moment(`${value[1]}`).isAfter(`${value[0]}`)
    ) {
      return;
    }
    const start = moment(`${value[0]}`).isValid()
      ? moment(`${value[0]}`)
      : this.props.timelineDateRange[0];
    const end = moment(`${value[1]}`).isValid()
      ? moment(`${value[1]}`)
      : this.props.timelineDateRange[1];

    this.props.setTimelineDateRange([start, end]);
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
          <div style={{ justifySelf: 'flex-start' }}>
            <DateRangePicker
              size="small"
              value={timelineDateRange}
              error={this.state.showDateRangeError}
              onChange={value => {
                this.handleDateRangeChange(value);
              }}
              placeholder="DD-MMM-YY"
              dateFormat="DD-MMM-YY"
              helperText=""
              startLabel="Start"
              endLabel="End"
            />
          </div>
          {moment(this.props.timelineDateRange[0])
            .format('MMMM')
            .toString() ===
          moment(this.props.timelineDateRange[1])
            .format('MMMM')
            .toString() ? (
            <div className="month-range-label">{`${moment(
              this.props.timelineDateRange[1]
            ).format('MMMM YYYY')}`}</div>
          ) : (
            <div className="month-range-label">{`${moment(
              this.props.timelineDateRange[0]
            ).format('MMMM')} - ${moment(
              this.props.timelineDateRange[1]
            ).format('MMMM YYYY')}`}</div>
          )}
          <div style={{ justifySelf: 'end' }}>
            <Button
              variant="primary"
              icon={<PlusIcon />}
              size="small"
              style={{ marginRight: 0, marginBottom: 10 }}
              onClick={() => this.props.setShowAddModal(true)}
              disabled={!this.props.selectedBid.isEditable}
            >
              Add New
            </Button>
          </div>
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
    let isEditable = localizer.isSameDate(date, currentDate);
    let drilldownView = getDrilldownView(date);
    let label = this.getDateHeadingLabel(date);

    let DateHeaderComponent = this.props.components.dateHeader || DateHeader;

    return (
      <div
        {...props}
        className={clsx(
          className,
          isOffRange && 'rbc-off-range',
          isEditable && 'rbc-current'
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
    const customRowLimit = this.slotRowRef.current.getRowLimit() - 1;
    this.setState({
      needLimitMeasure: false,
      rowLimit: customRowLimit
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
  timelineDateRange: selectTimelineDateRange(state),
  selectedBid: getSelectedBid(state).toJS()
});

const mapDispatchToProps = {
  setTimelineDateRange,
  setShowAddModal
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
