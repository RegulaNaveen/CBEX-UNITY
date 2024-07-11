import Button from 'apollo-react/components/Button';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SourceDocument from './SourceDocument';
import { getSourceDocTooltipInfo, sanitizeResponse } from './utils';
import { CHATBOT } from '../../../constants/app';

function getSourceDocNameFromPath(path = '') {
  const splitedByBackSlash = path.split('\\');
  const splitedByForwardSlash = splitedByBackSlash[
    splitedByBackSlash.length - 1
  ].split('/');
  return splitedByForwardSlash[splitedByForwardSlash.length - 1];
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
          <p>
            {list.length > 1 && `${i + 1}. `}
            {response.result.replace(/\"$/, '')}
            <div className="src-doc-list">
              {Array.isArray(response.source_documents) &&
                response.source_documents.map((sourceDoc, i) => {
                  const sourceInfo = getSourceDocTooltipInfo(sourceDoc);
                  return (
                    <SourceDocument
                      key={`source-doc-${bubbleId}-${i}`}
                      title={sourceInfo.title}
                      content={sanitizeResponse(sourceInfo.content, '')}
                      buttonLabel={`[${i + 1}]`}
                      className="source-doc-btn"
                      pageNo={sourceInfo.page}
                    />
                  );
                })}
            </div>
          </p>
          {response?.source_documents?.map((sourceDoc, i) => {
            if (
              sourceDoc &&
              sourceDoc.metadata &&
              sourceDoc.metadata.doc_class &&
              sourceDoc.metadata.doc_class.toLowerCase() === 'unity' &&
              sourceDoc.metadata.section_name &&
              Object.keys(CHATBOT.SUPPORTED_GO_TO_UNITY_SECTIONS_MAP).includes(
                sourceDoc.metadata.section_name.toLowerCase()
              )
            ) {
              return (
                <Button
                  variant="secondary"
                  size="small"
                  className="chatbot-action-btn"
                  onClick={() =>
                    handleGotoQuestion(
                      sourceDoc.metadata.bid_no,
                      sanitizeResponse(
                        sourceDoc.page_content,
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
              !Number.isNaN(sourceDoc.metadata.box_file_id)
            ) {
              return (
                <Button
                  variant="secondary"
                  size="small"
                  className="chatbot-action-btn"
                  onClick={() =>
                    handleReviewDoc(sourceDoc.metadata.box_file_id)
                  }
                  title={`Review ${getSourceDocNameFromPath(
                    sourceDoc.metadata.source
                  )}`}
                >
                  Review {getSourceDocNameFromPath(sourceDoc.metadata.source)}
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
