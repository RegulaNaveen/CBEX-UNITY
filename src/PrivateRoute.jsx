// @flow
import React from 'react';
import type { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import { LOGIN } from './routes';
import { saveRedirectURL } from './utils/StorageUtils';
import { getProposalInfo } from './api/proposal';
import { withRouter } from "react-router";

type Props = { component: ElementType, match?: Match };

const PrivateRoute =  ({ component: Component, ...rest }: Props) => {
  // if(rest && String(rest.path).includes("/proposals/:id?")){
  //   const { computedMatch } = rest;
  //   if(computedMatch && computedMatch.params && computedMatch.params.id){
  //     return getProposalInfo(computedMatch.params.id).then(res => {
  //       let url = '/opportunity/'+ res.proposal.proposalDetails['CRM #'];
  //       window.location.replace(url);
  //     })
  //   }
  // }else{
    function renderRoute(props: any) {
      const {
        history: {
          location: { pathname, search }
        }
      } = props;
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (!isAuthenticated) {
        saveRedirectURL(pathname + search);
      }
      return isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />;
    }
  
    return <Route {...rest} render={renderRoute} />;
  }
// };

PrivateRoute.defaultProps = {
  match: undefined
};

export default withRouter(PrivateRoute);
