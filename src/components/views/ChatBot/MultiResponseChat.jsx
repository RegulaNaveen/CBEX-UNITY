import Button from 'apollo-react/components/Button';
import React from 'react';
import SourceDocument from './SourceDocument';

function getSourceDocNameFromPath(path = '') {
  const splited = path.split('\\');
  return splited[splited.length - 1];
}

export const MultiResponseChat = ({
  className = '',
  list,
  handleGotoQuestion = () => {},
  handleReviewDoc = () => {}
}) => {
  return (
    <div className="multiresponse-list">
      {list?.map((response, i) => (
        <div>
          {' '}
          <p>
            {list.length > 1 && `${i + 1}. `}
            {response?.result}
            <div className="src-doc-list">
              {response?.source_documents
                ?.filter(obj => obj.type == 'Document')
                .map((sourceDoc, i) => (
                  <SourceDocument
                    title={getSourceDocNameFromPath(sourceDoc.metadata.source)}
                    content={sourceDoc.page_content}
                    buttonLabel={`[${i + 1}]`}
                    className="source-doc-btn"
                    pageNo={sourceDoc?.metadata?.page}
                  />
                ))}
            </div>
          </p>
          {response?.source_documents?.map((sourceDoc, i) => {
            if (sourceDoc?.type != 'Document' && sourceDoc?.type != 'Unity') {
              return null;
            }
            return (
              <Button
                variant="secondary"
                size="small"
                className="chatbot-action-btn"
                onClick={() => {
                  if (sourceDoc.type == 'Document') {
                    handleReviewDoc(sourceDoc.metadata.box_file_id);
                  } else if (sourceDoc.type == 'Unity') {
                    handleGotoQuestion(sourceDoc.bid_no, sourceDoc.content);
                  }
                }}
              >
                {sourceDoc.type == 'Document'
                  ? `Review ${getSourceDocNameFromPath(
                      sourceDoc.metadata.source
                    )}`
                  : 'Go to Unity Question'}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
