import React from 'react'
import Footer from 'apollo-react/components/Footer';

const UnityFooter = ({data}) => {
    const { questionTemplateVersionNumber, opportunityType } = data;
    let templateversion =  null;
    if(questionTemplateVersionNumber){
        templateversion = `Question Template Verison: ${questionTemplateVersionNumber}`
    }
    if(templateversion && opportunityType){
        templateversion = `${templateversion} - ${opportunityType}`
    }
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