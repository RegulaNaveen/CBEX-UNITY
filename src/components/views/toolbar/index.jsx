// @flow
import React, { useState, Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Avatar } from '@material-ui/core';
import Search from 'apollo-react-icons/Search';
import Bell from 'apollo-react-icons/Bell';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../../svg';
import { DASHBOARD, UBUILD } from '../../../routes';
import { UBUILD_ENABLED } from '../../../constants/api';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { getUserRole } from '../../../SessionHandler';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import { getRoles } from '../../../redux/selectors';
import WelcomeModal from '../modals/WelcomeModal';
import MatomoHOC from '../../HOC/MatomoHOC';
import Notification from './Notifications';
import { fetchNotifications } from '../../../api/notification';

type State = { isCollapsed: boolean };
class Toolbar extends Component<{}, State> {
  wrapperRef: { current: any | HTMLDivElement };

  constructor(props: Object) {
    super(props);
    this.wrapperRef = createRef();

    this.state = {
      isCollapsed: false,
      roleName: ''
    };
  }

  componentDidMount() {
    const { rolesList, getRolesInfoF } = this.props;
    window.addEventListener('mousedown', this.handleClickOutside);
    const userRole = getUserRole();
    if (!rolesList) getRolesInfoF();
    if (userRole) this.setState({ roleName: userRole });
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this.handleCollapse();
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target))
      this.setState({ isCollapsed: false });
  };

  onRoleChange = (value: string) => {
    const { changeUserRole } = this.props;
    changeUserRole(value);
    this.setState({ roleName: value });
    this.trackMatomoRoleChange(value);
  };

  trackMatomoRoleChange = (role: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`
    });
  };

  render() {
    const { isCollapsed, roleName } = this.state;
    const { rolesList } = this.props;
    const listItems = [
      {
        id: '62d4edf7e3bd9e3383cdb638',
        preference_id: 5,
        time: '9:50',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/8',
        data:
          'Magna dolore enim dolor exercitation officia Lorem culpa Lorem dolor nostrud consectetur consectetur cillum qui.',
        isSeen: true,
        proposal_id: 'f8a73370-0f8b-49e4-9f6e-82b4744fd698',
        opportunity_no: '2f380d05-860d-474e-a6f4-5ed6b26b9f1a',
        action_url: 'https://www.google.com/search?q=Comtrail'
      },
      {
        id: '62d4edf725b2ced941650fcc',
        preference_id: 10,
        time: '7:20',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/10',
        data:
          'Labore nostrud aliqua nisi adipisicing enim cupidatat nulla et aliqua cillum id amet laboris esse.',
        isSeen: false,
        proposal_id: '22bced4d-35fe-4208-b1f0-007b50142367',
        opportunity_no: '82c55db2-94b6-47c9-aca9-f69793e4ca36',
        action_url: 'https://www.google.com/search?q=Barkarama'
      },
      {
        id: '62d4edf739e3f7b606a25194',
        preference_id: 8,
        time: '4:50',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/7',
        data: 'Enim exercitation sunt aliqua ut voluptate id ex reprehenderit.',
        isSeen: false,
        proposal_id: 'b1fd6fbe-3aee-4a76-9987-fd03e2ee3418',
        opportunity_no: 'b6146772-f607-4e61-b53f-c6f4141f70d8',
        action_url: 'https://www.google.com/search?q=Earbang'
      },
      {
        id: '62d4edf761262241e875deca',
        preference_id: 8,
        time: '6:20',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/2',
        data:
          'Laborum incididunt tempor amet aliquip exercitation nulla pariatur incididunt sunt laborum aliqua nisi occaecat.',
        isSeen: false,
        proposal_id: '99b13ead-480b-4aca-98be-945ea11a96ea',
        opportunity_no: '97c0e812-4642-49a1-bca0-98a52aea7c36',
        action_url: 'https://www.google.com/search?q=Enerforce'
      },
      {
        id: '62d4edf75e867dce70705e08',
        preference_id: 8,
        time: '10:50',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/0',
        data: 'Ad cillum labore magna tempor nostrud labore consectetur.',
        isSeen: true,
        proposal_id: '74ad0813-6fcf-4968-8315-5cca21603222',
        opportunity_no: '38614490-5eb4-4fd4-bcf5-26f969903faf',
        action_url: 'https://www.google.com/search?q=Enquility'
      },
      {
        id: '62d4edf7ebf70cfd5d36ea2d',
        preference_id: 10,
        time: '5:70',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/10',
        data: 'Amet dolore cupidatat dolor officia laborum ut enim.',
        isSeen: false,
        proposal_id: 'c160b153-e206-41f4-8912-481e57c5d77e',
        opportunity_no: '9e78f050-7e86-4a0e-aa14-beef6d64c3de',
        action_url: 'https://www.google.com/search?q=Manglo'
      },
      {
        id: '62d4edf7d5e09a42bab0d233',
        preference_id: 3,
        time: '8:70',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/5',
        data:
          'Exercitation amet veniam veniam irure sunt minim enim sit labore labore aliquip.',
        isSeen: true,
        proposal_id: '5c022401-6f93-4bf7-8007-3ccd2c468655',
        opportunity_no: 'ee9f8cf0-ecd5-414a-ab9d-b6aeb002768c',
        action_url: 'https://www.google.com/search?q=Xleen'
      },
      {
        id: '62d4edf71856a418c1af1d8f',
        preference_id: 5,
        time: '8:10',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/4',
        data: 'Sint amet commodo elit fugiat qui velit excepteur.',
        isSeen: false,
        proposal_id: '116c0714-c598-4aff-bb24-7d7bf72cce8f',
        opportunity_no: '351dfbae-859e-49db-b426-b209d981cdad',
        action_url: 'https://www.google.com/search?q=Geeky'
      },
      {
        id: '62d4edf7c552045c9bbf2b7a',
        preference_id: 7,
        time: '8:30',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/3',
        data:
          'Sint enim eu dolore enim Lorem reprehenderit duis laboris sint laborum tempor elit id esse.',
        isSeen: false,
        proposal_id: '99c420e2-d4e8-42bf-b072-ee3083e7441f',
        opportunity_no: '3b0feea5-d630-42f9-9437-ffd2370e8885',
        action_url: 'https://www.google.com/search?q=Stucco'
      },
      {
        id: '62d4edf78d3207fca888332f',
        preference_id: 3,
        time: '10:60',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/8',
        data: 'Aute id eiusmod ullamco ipsum adipisicing consequat minim.',
        isSeen: true,
        proposal_id: '36a44d28-a1c9-494b-a279-6af0b9460bf6',
        opportunity_no: '7f3bca94-c201-4bbd-9f83-cfe316e9a5d0',
        action_url: 'https://www.google.com/search?q=Beadzza'
      },
      {
        id: '62d4edf79ffb5e5baeb56961',
        preference_id: 0,
        time: '4:60',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/0',
        data:
          'Ut dolore eu Lorem excepteur eiusmod in veniam reprehenderit occaecat.',
        isSeen: false,
        proposal_id: '1e408c57-9987-4840-89ed-a265545407c3',
        opportunity_no: '10259146-18a2-4cbb-bace-eda3121ce414',
        action_url: 'https://www.google.com/search?q=Zaggle'
      },
      {
        id: '62d4edf76b9a273f561f88f2',
        preference_id: 10,
        time: '10:40',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/9',
        data:
          'Est sit consequat aliquip officia nisi aliqua pariatur sint aliqua sit incididunt do eiusmod.',
        isSeen: true,
        proposal_id: 'df29896f-8902-43c7-8c66-9f4431bcd2cd',
        opportunity_no: '9e7f72d6-df52-478e-b05c-4f74baa5aa05',
        action_url: 'https://www.google.com/search?q=Entropix'
      },
      {
        id: '62d4edf749289b6cbb9eb60e',
        preference_id: 2,
        time: '7:20',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/5',
        data: 'Lorem culpa magna dolore voluptate est consequat.',
        isSeen: true,
        proposal_id: 'a66f9db2-3327-41f7-9b28-f1e9d4d76405',
        opportunity_no: '71ce8ddc-0891-48a9-a0e8-5ffca2dcde2b',
        action_url: 'https://www.google.com/search?q=Vicon'
      },
      {
        id: '62d4edf7c71c904e130ee665',
        preference_id: 9,
        time: '9:40',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/3',
        data: 'Est anim sunt culpa tempor et culpa proident id in quis velit.',
        isSeen: true,
        proposal_id: '2084955d-90be-40e1-8edc-757512133946',
        opportunity_no: 'be188d62-6218-4a0d-ab3a-121aced1c84f',
        action_url: 'https://www.google.com/search?q=Lovepad'
      },
      {
        id: '62d4edf747da0ebfadf64ab9',
        preference_id: 1,
        time: '1:00',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/7',
        data:
          'Exercitation voluptate laborum tempor sunt deserunt Lorem cupidatat excepteur magna et qui qui.',
        isSeen: false,
        proposal_id: 'b0082036-8565-467c-a152-a0295d32af86',
        opportunity_no: '21254e73-c18c-4097-a3a0-f69111fbb22d',
        action_url: 'https://www.google.com/search?q=Tourmania'
      },
      {
        id: '62d4edf781b19f9d6b495630',
        preference_id: 10,
        time: '3:70',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/3',
        data: 'Aliquip et fugiat consectetur non cillum incididunt.',
        isSeen: true,
        proposal_id: '2a05de4c-5f05-4338-800f-4da72380b5f3',
        opportunity_no: 'c1903c3b-0ba4-4776-8b4f-fc441264672c',
        action_url: 'https://www.google.com/search?q=Roughies'
      },
      {
        id: '62d4edf7d917c2e04462ab86',
        preference_id: 5,
        time: '5:70',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/8',
        data:
          'Sint exercitation ex consequat exercitation occaecat elit cupidatat qui magna ut cupidatat incididunt nulla aute.',
        isSeen: false,
        proposal_id: 'cf88a157-64ed-4be3-926d-4d72981b4244',
        opportunity_no: '8886e2cb-34de-4576-abb9-baec625b4a73',
        action_url: 'https://www.google.com/search?q=Bleendot'
      },
      {
        id: '62d4edf727de57fcae640abc',
        preference_id: 10,
        time: '8:30',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/7',
        data: 'Tempor enim elit et reprehenderit ullamco enim eu.',
        isSeen: false,
        proposal_id: '6151839b-d57d-486d-97df-ac633c21972d',
        opportunity_no: '20148c63-9b5b-4426-816b-13491eae74f8',
        action_url: 'https://www.google.com/search?q=Terrasys'
      },
      {
        id: '62d4edf711ec21fa13baf54f',
        preference_id: 9,
        time: '3:70',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/0',
        data: 'Aute consectetur qui magna tempor.',
        isSeen: true,
        proposal_id: '8dedf7ce-3298-4b6b-bac1-cc748e19131e',
        opportunity_no: '451b08eb-7063-4570-bdbc-9607060a93e4',
        action_url: 'https://www.google.com/search?q=Aquoavo'
      },
      {
        id: '62d4edf721614844aa7b17c6',
        preference_id: 8,
        time: '10:00',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/6',
        data: 'Quis minim et aliqua dolor.',
        isSeen: false,
        proposal_id: 'f901a3c7-2642-409f-b2a5-cd0b209281cb',
        opportunity_no: '8ecc6658-73ba-456b-a098-a9a3fcbe9efd',
        action_url: 'https://www.google.com/search?q=Geekular'
      },
      {
        id: '62d4edf79d573be9fa72ad4f',
        preference_id: 9,
        time: '1:40',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/4',
        data:
          'Culpa incididunt magna officia aliquip elit in dolore cillum amet dolore esse esse.',
        isSeen: true,
        proposal_id: '5adcf081-272b-40ed-8820-4ea6f5c8b006',
        opportunity_no: '5f82947b-a2e1-4151-bcad-d7189999d0d8',
        action_url: 'https://www.google.com/search?q=Xiix'
      },
      {
        id: '62d4edf7ea004792bd966f78',
        preference_id: 5,
        time: '8:80',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/8',
        data:
          'Aliquip do quis id sit labore nulla ullamco minim consectetur aute.',
        isSeen: true,
        proposal_id: '0bd4aaa6-90e1-4424-be1c-a2956f2edde4',
        opportunity_no: 'aa27e6d1-0551-4db7-97b7-477b19ca1706',
        action_url: 'https://www.google.com/search?q=Fibrodyne'
      },
      {
        id: '62d4edf7d7dc0293dc5a58af',
        preference_id: 3,
        time: '10:20',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/1',
        data: 'In irure tempor Lorem do eiusmod laborum et nostrud et quis.',
        isSeen: true,
        proposal_id: 'f7b80d81-e401-4e19-a428-2bd43d087739',
        opportunity_no: '08928f82-58d6-45dd-8a3c-181118768b0a',
        action_url: 'https://www.google.com/search?q=Quarex'
      },
      {
        id: '62d4edf700d12efdb5d999be',
        preference_id: 8,
        time: '10:10',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/2',
        data: 'Fugiat ea in aliquip adipisicing officia dolore aliqua aliquip.',
        isSeen: true,
        proposal_id: '8fef92fb-477d-4c2c-aba2-365f1f4a1141',
        opportunity_no: '150d2f5a-39b9-4b08-8da7-314ee8f4be19',
        action_url: 'https://www.google.com/search?q=Dreamia'
      },
      {
        id: '62d4edf7a81447571682c776',
        preference_id: 4,
        time: '6:80',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/4',
        data: 'Reprehenderit veniam ad culpa incididunt.',
        isSeen: false,
        proposal_id: 'ea17cbf2-d006-4d13-bb6f-c10a5469cc9d',
        opportunity_no: '1c67a47f-dbf7-4f07-8322-615cb890284f',
        action_url: 'https://www.google.com/search?q=Utara'
      },
      {
        id: '62d4edf7140adbb1d6918006',
        preference_id: 4,
        time: '3:50',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/10',
        data: 'Nulla ipsum eiusmod non aute labore dolore incididunt.',
        isSeen: false,
        proposal_id: 'b144f4fc-58d8-4591-89c0-60d909a85b3c',
        opportunity_no: 'bd708a32-e7b7-4b7d-be33-f0ca76a11c89',
        action_url: 'https://www.google.com/search?q=Flotonic'
      },
      {
        id: '62d4edf7bfdd75d2d72329da',
        preference_id: 7,
        time: '10:80',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/4',
        data:
          'Sit id amet aute cillum aliquip dolor eiusmod esse consectetur et exercitation ut aute.',
        isSeen: false,
        proposal_id: '67c1a1f6-332f-48cc-9437-6bc1573814a1',
        opportunity_no: '3ab758a7-ca3a-49b1-82e7-bdf39e11f213',
        action_url: 'https://www.google.com/search?q=Hydrocom'
      },
      {
        id: '62d4edf7901128aa9e327914',
        preference_id: 10,
        time: '8:60',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/6',
        data: 'Cillum esse veniam labore commodo commodo fugiat anim.',
        isSeen: false,
        proposal_id: 'a04e1ed0-1b4e-435f-8e8e-5c09dafa31dc',
        opportunity_no: '6d7cbf83-201c-4e6b-9cbf-d92dd0ae7a84',
        action_url: 'https://www.google.com/search?q=Empirica'
      },
      {
        id: '62d4edf71f199957e52ad4a9',
        preference_id: 1,
        time: '8:80',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/7',
        data: 'Ad nostrud ea adipisicing qui Lorem mollit laborum quis minim.',
        isSeen: true,
        proposal_id: 'af6cd49d-adb9-41a0-a12a-2ab91ed0fdf7',
        opportunity_no: '4eae755b-636d-4a09-bb1f-c4735d112c66',
        action_url: 'https://www.google.com/search?q=Acium'
      },
      {
        id: '62d4edf7b3857302ce3f2724',
        preference_id: 5,
        time: '8:20',
        user_email: 'ashiq_sultan@iqvia.com',
        created_at: '2022/7/6',
        data: 'Aute est nisi consequat velit esse nulla ex.',
        isSeen: true,
        proposal_id: 'dfb2343a-539d-4c1e-ae96-bf88f2ad58db',
        opportunity_no: '5318cccd-8319-4a69-aa81-75a308350f71',
        action_url: 'https://www.google.com/search?q=Entogrok'
      }
    ];
    console.log(listItems);
    const results = isUserUbuildAdmin();
    return (
      <div className="toolbar-wrapper">
        <Link to={DASHBOARD}>
          <p className="toolbar-title">IQVIA™</p>
          <p className="toolbar-title">Unity</p>
        </Link>
        {results && (
          <div
            className={
              (this.props &&
                this.props?.location &&
                this.props.location?.pathname) == UBUILD
                ? 'ubuild-linkactive'
                : 'ubuild-link'
            }
          >
            <Link to={UBUILD} className="toolbar-space">
              <p className="ubuild-title">U-Build</p>
            </Link>
          </div>
        )}
        <Notification listItems={listItems} />

        <div className="toolbar-account-spacer" style={{ flex: 0 }}>
          <div ref={this.wrapperRef} className="toolbar-account-wrapper">
            <div
              className={classnames(
                'toolbar-account-info',
                isCollapsed && 'expanded'
              )}
              id="menu-title"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type="button"
              tabIndex={-1}
            >
              {' '}
              <Avatar
                src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                style={{
                  marginLeft: '10px'
                }}
              />
              <DropMenu className="toolbar-account-info-icon" />
            </div>
            {isCollapsed ? (
              <ToolbarMenu
                name="Profile"
                handleCollapse={this.handleCollapse}
              />
            ) : null}
          </div>
        </div>
        {(!roleName || roleName === 'undefined') && (
          <WelcomeModal
            id="welcomemodal"
            roles={rolesList || []}
            onRoleChange={e => this.onRoleChange(e)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  rolesList: getRoles(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRolesInfoF: getRolesInfo,
    changeUserRole: onSetUserRole
  })
)(MatomoHOC(Toolbar));
