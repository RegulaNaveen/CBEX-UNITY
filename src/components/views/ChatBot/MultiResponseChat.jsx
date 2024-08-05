import Button from 'apollo-react/components/Button';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import SourceDocument from './SourceDocument';
import {
  getSourceDocTooltipInfo,
  parseQuestionReference,
  sanitizeResponse
} from './utils';
import { CHATBOT } from '../../../constants/app';
import ResponseRenderer from './ResponseRenderer';
import { setVTabActiveIndexAction } from '../../../redux/actions/proposal-actions';
import { useDispatch } from 'react-redux';

function getSourceDocNameFromPath(source) {
  if (
    source.metadata.box_file_id &&
    source.metadata.box_file_id.trim() &&
    !Number.isNaN(Number(source.metadata.box_file_id))
  ) {
    return source.metadata.source.split('/').slice(-1)[0] || '';
  }
  return '';
}

export const MultiResponseChat = ({
  className = 'multiresponse-list',
  list,
  handleGotoQuestion = () => {},
  handleReviewDoc = () => {},
  bubbleId = uuidv4(),
  query = ''
}) => {
  let sourceIndex = 0;
  const dispatch = useDispatch();

  return (
    <div className={className}>
      {list?.map((response, i) => {
        return (
          <div>
            {' '}
            <p
              className={classNames({
                error:
                  ((response &&
                    response.result &&
                    response.result.replace(/\"$/, '')) ||
                    '') === ''
              })}
            >
              {list.length > 1 && `${i + 1}. `}
              <ResponseRenderer
                response={
                  (response &&
                    response.result &&
                    response.result.replace(/\"$/, '')) ||
                  ''
                }
              />
              {Array.isArray(response.source_documents) && (
                <div className="src-doc-list">
                  {response.source_documents.map((sourceDoc, i) => {
                    const sourceInfo = getSourceDocTooltipInfo(sourceDoc);
                    return (
                      <SourceDocument
                        key={`source-doc-${bubbleId}-${i}`}
                        title={sourceInfo.title}
                        subTitle={sourceInfo.subtitle}
                        content={sanitizeResponse(sourceInfo.content, null)}
                        buttonLabel={(() => {
                          sourceIndex++;
                          return `[${sourceIndex}]`;
                        })()}
                        className="source-doc-btn"
                      />
                    );
                  })}
                </div>
              )}
            </p>
            {Array.isArray(response.source_documents) &&
              response.source_documents
                .filter(sourceDoc => {
                  // Do not show Go to Unity button when query is 'Summarize this opportunity'
                  return !(
                    sourceDoc &&
                    sourceDoc.metadata &&
                    sourceDoc.metadata.doc_class &&
                    sourceDoc.metadata.doc_class.toLowerCase() === 'unity' &&
                    query &&
                    query.toLowerCase() === 'summarize this opportunity'
                  );
                })
                .map((sourceDoc, i) => {
                  if (
                    sourceDoc &&
                    sourceDoc.metadata &&
                    sourceDoc.metadata.doc_class &&
                    sourceDoc.metadata.doc_class.toLowerCase() === 'unity' &&
                    sourceDoc.metadata.section_name &&
                    Object.keys(
                      CHATBOT.SUPPORTED_GO_TO_UNITY_SECTIONS_MAP
                    ).includes(sourceDoc.metadata.section_name.toLowerCase())
                  ) {
                    const btnLabel =
                      sourceDoc.metadata.section_name.toLowerCase() ===
                      'notepad'
                        ? 'Go to Unity'
                        : 'Go to Unity Question';
                    return (
                      <Button
                        variant="secondary"
                        size="small"
                        className="chatbot-action-btn"
                        onClick={() => {
                          // Open notepad
                          if (
                            sourceDoc.metadata.section_name.toLowerCase() ===
                            'notepad'
                          )
                            dispatch(setVTabActiveIndexAction(1));
                          handleGotoQuestion(
                            sourceDoc.metadata.bid_no,
                            [
                              'questions',
                              'custom_questions',
                              'question_for_customers'
                            ].includes(
                              sourceDoc.metadata.section_name.toLowerCase()
                            )
                              ? parseQuestionReference(
                                  sanitizeResponse(
                                    sourceDoc.page_content || '',
                                    CHATBOT.SUPPORTED_GO_TO_UNITY_SECTIONS_MAP[
                                      sourceDoc.metadata.section_name.toLowerCase()
                                    ]
                                  )
                                )
                              : sanitizeResponse(
                                  sourceDoc.page_content || '',
                                  CHATBOT.SUPPORTED_GO_TO_UNITY_SECTIONS_MAP[
                                    sourceDoc.metadata.section_name.toLowerCase()
                                  ]
                                )
                          );
                        }}
                        title={btnLabel}
                      >
                        {btnLabel}
                      </Button>
                    );
                  } else if (
                    sourceDoc &&
                    sourceDoc.metadata &&
                    sourceDoc.metadata.doc_class &&
                    sourceDoc.metadata.doc_class.toLowerCase() !== 'unity' &&
                    sourceDoc.metadata.box_file_id &&
                    sourceDoc.metadata.box_file_id.trim() &&
                    !Number.isNaN(Number(sourceDoc.metadata.box_file_id))
                  ) {
                    return (
                      <Button
                        variant="secondary"
                        size="small"
                        className="chatbot-action-btn"
                        onClick={() =>
                          handleReviewDoc(sourceDoc.metadata.box_file_id)
                        }
                        title={`Review ${getSourceDocNameFromPath(sourceDoc)}`}
                      >
                        Review {getSourceDocNameFromPath(sourceDoc)}
                      </Button>
                    );
                  }
                  return null;
                })}
          </div>
        );
      })}
    </div>
  );
};
