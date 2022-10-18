import React from 'react';
import Modal from 'apollo-react/components/Modal';
import threeDots from '../../../../img/3Dots.png';
import Addasite from '../../../../img/Addasite.png';
import Allow from '../../../../img/Allow.png';
import Settings from '../../../../img/Settings.png';
import SitePermission from '../../../../img/SitePermission.png';

const DocumentModal = () => {
   
    const [state, setState] = React.useState({
        warning: true
    });

    const handleClose = (variant) =>{
        setState({ ...state, [variant]: false });
    };

    const handleSave = () => {
        localStorage.setItem('unity_document_consent', true)
        setTimeout(() => {
            handleClose('warning');
        }, 100);
      };

    return (
        <Modal
            open={state.warning}
            image=""
            alt="Enable Cookies"
            onClose={() => handleClose('warning')}
            title="Enable Cookies"
            subtitle=""
            id={'enablecookies'}
            message={``}
            buttonProps={[{}, { label: 'Ok', onClick: handleSave  }]}
            variant="warning"
        >
            <section className="enablecookie-modal">
              <div>
                <p className="enablecookie-fontstyle grey">The Edge browser you are using needs cookies enabled for Unity to perform optimally.</p>
              </div>
              <div className="enablecookie-topspace extra">
                <p className="enablecookie-fontstyle">Step 1. Click on 3 dots near the top right of your browser window</p>
              </div>
              <div>
                <div className="enablecookietop-minspace">
                  <img src={threeDots} alt="3 dots"/>
                </div>
              </div>
            </section>
            <section className="enablecookie-modal">
              <div>
                <p className="enablecookie-fontstyle">Step 2. Click on Settings near the bottom of the now open 3 dot menu</p>
              </div>
              <div>
                  <div className="enablecookietop-minspace">
                    <img src={Settings} alt="Setting" className="Settingsimg" />
                  </div>
              </div>
            </section>
            <section className="enablecookie-modal">
              <div>
                <p className="enablecookie-fontstyle">Step 3. Click on "Site permisssion"</p>
                <div className="enablecookie-topspace">
                <i className="enablecookie-fontstyle">Note: Some versions of Edge label this section Cookies and site permissions</i>
                </div>
              </div>
              <div className="enablecookietop-minspace">
                  <img src={SitePermission} alt="Site permission" className="SitePermissionsimg"/>
              </div>
            </section>
            <section className="enablecookie-modal">
              <div>
                <p className="enablecookie-fontstyle">Step 4. Click "Add" button under the Allow portion of Site permisssion </p>
              </div>
              <div className="enablecookietop-minspace">
                  <img src={Allow} alt="Allow" className="Allowimg"/>
              </div>
            </section>
            <section className="enablecookie-modal">
              <div>
                <p className="enablecookie-fontstyle">Step 5. Add Unity.IQVIA.app to field as shown and click "Add" </p>
              </div>
              <div className="enablecookietop-minspace">
                  <img src={Addasite} alt="Add a site" className="Addasiteimg"/>
              </div>
            </section>
           
        </Modal>
    );
};
export default DocumentModal;
