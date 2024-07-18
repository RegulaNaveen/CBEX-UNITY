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
  bubbleId = uuidv4()
}) => {
  return (
    <div className={className}>
      {list?.map((response, i) => (
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
            {(response &&
              response.result &&
              response.result.replace(/\"$/, '')) ||
              'We sincerely apologize for the inconvenience caused please reload or rephrase the question.'}
            <div className="src-doc-list">
              {Array.isArray(response.source_documents) &&
                response.source_documents.map((sourceDoc, i) => {
                  const sourceInfo = getSourceDocTooltipInfo(sourceDoc);
                  return (
                    <SourceDocument
                      key={`source-doc-${bubbleId}-${i}`}
                      title={sourceInfo.title}
                      content={sanitizeResponse(sourceInfo.content, null)}
                      buttonLabel={`[${i + 1}]`}
                      className="source-doc-btn"
                      pageNo={sourceInfo.page}
                    />
                  );
                })}
            </div>
          </p>
          {Array.isArray(response.source_documents) &&
            response.source_documents.map((sourceDoc, i) => {
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
                return (
                  <Button
                    variant="secondary"
                    size="small"
                    className="chatbot-action-btn"
                    onClick={() =>
                      handleGotoQuestion(
                        sourceDoc.metadata.bid_no,
                        sourceDoc.metadata.section_name.toLowerCase() ===
                          'questions'
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
                      )
                    }
                    title={`Go to Unity Question`}
                  >
                    Go to Unity Question
                  </Button>
                );
              } else if (
                sourceDoc &&
                sourceDoc.metadata &&
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
      ))}
    </div>
  );
};
