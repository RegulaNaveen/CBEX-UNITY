import React from 'react'
import Footer from 'apollo-react/components/Footer';

const UnityFooter = ({data}) => {
    const templateversion = (data && data['QuestionTemplateVersionNumber'])  ? `Question Template Verison: ${data['QuestionTemplateVersionNumber']}` : '';
    return (
        <>
            { templateversion &&
                <Footer
                    id="unityfooter"
                    maxWidth={1600}
                    buttonProps={[
                        {
                            label: `${templateversion}`
                        }
                    ]}
                />
            }
        </>
    )
}

export default UnityFooter;