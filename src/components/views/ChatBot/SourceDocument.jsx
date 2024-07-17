import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';

const SourceDocument = ({
  className = '',
  buttonLabel,
  title,
  content,
  pageNo
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const handleTooltipClick = e => {
    e.preventDefault();
    setShowTooltip(showing => !showing);
  };

  const handleScroll = useCallback(() => {
    if (showTooltip) setShowTooltip(false);
  }, [showTooltip, tooltipRef.current]);

  useEffect(() => {
    const handleClickOutside = event => {
      // Check if the click is on the scrollbar
      const isScrollbarClick =
        event.offsetX > event.target.clientWidth ||
        event.offsetY > event.target.clientHeight;

      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        !isScrollbarClick
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [content]);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      if (
        tooltipRef.current.parentElement &&
        tooltipRef.current.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.parentElement
      ) {
        tooltipRef.current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener(
          'scroll',
          handleScroll
        );
      }
    }

    return () => {
      if (
        tooltipRef.current &&
        tooltipRef.current.parentElement &&
        tooltipRef.current.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement &&
        tooltipRef.current.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.parentElement
      ) {
        tooltipRef.current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.removeEventListener(
          'scroll',
          handleScroll
        );
      }
    };
  }, [tooltipRef.current, showTooltip]);

  return (
    <span ref={tooltipRef} tabIndex={0}>
      <Tooltip
        id="answer-tooltip"
        title={
          <div>
            <div>{title}</div>
            <div>{pageNo !== '' ? `Page: ${pageNo}` : ''}</div>
          </div>
        }
        body={content}
        placement="top-start"
        variant="light"
        open={showTooltip}
      >
        <span
          className="tooltip-index"
          onClick={handleTooltipClick}
          style={{ cursor: 'pointer' }}
        >
          {buttonLabel}
        </span>
      </Tooltip>
    </span>
  );
};

export default SourceDocument;
