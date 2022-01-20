import React from 'react'
import Footer from 'apollo-react/components/Footer';

const UnityFooter = ({ questionTemplateVersionNumber, opportunityType }) => {
    let templateversion = null;
    if (questionTemplateVersionNumber) {
        templateversion = `Question Template Verison: ${questionTemplateVersionNumber}`
    }
    if (templateversion && opportunityType) {
        templateversion = `${templateversion} - ${opportunityType}`
    }
    return (
        <>
            <Footer
                id="unityfooter"
                maxWidth={1600}
                buttonProps={templateversion ? [
                    {
                        label: `${templateversion}`
                    }
                ] : [{
                      label: '',
                      href: '',
                      target: '',
                    }]}
            /> :
        </>
    )
}

export default UnityFooter;