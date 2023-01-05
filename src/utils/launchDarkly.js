import LDClient from 'launchdarkly-js-client-sdk';
import deviceParser from 'ua-parser-js';
import { LAUNCH_DARKLY_CLIENT_ID } from '../constants/api';

const main = async (flagKey: string, defaultValue: any) => {
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');
  const role = localStorage.getItem('userRole');

  const deviceInfo = deviceParser(window.navigator.userAgent);
  const user = {
    key: email,
    name,
    email,
    custom: {
      role,
      osName: deviceInfo?.os?.name,
      osVersion: deviceInfo?.os?.version,
      browserName: deviceInfo?.browser?.name,
      browserVersion: deviceInfo?.browser?.version
    }
  };
  let flagValue = defaultValue;
  try {
    const ldclient = LDClient.initialize(LAUNCH_DARKLY_CLIENT_ID, user, {
      fetchGoals: false
    });
    await ldclient.waitForInitialization();
    await ldclient.waitUntilReady();
    flagValue = ldclient.allFlags(flagKey, defaultValue);
    ldclient.close();
  } catch (error) {
    console.log('launchDarky error');
    console.error(error);
  }
  return flagValue;
};

export default main;
