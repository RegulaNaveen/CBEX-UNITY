// @flow
import axios from 'axios';
import { API } from '../constants';

const {
  PROPOSAL_API_URL,
  PROPOSAL_QUESTIONS_API_URL,
  PROPOSAL_VALIDATED_DATA,
  API_KEY
} = API.PROPOSAL;

export const getProposalInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/${id}`, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const setProposalAnswer = async (
  proposalId: string,
  questionId: string,
  answer: string,
  userData: Object
): Promise<Object> => {
  return axios.put(
    `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`,
    { answer, userData },
    { headers: { 'x-api-key': `${API_KEY}` } }
  );
};

export const getQuestionSectionInfo = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/sections`, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getAnswerTypes = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/answerTypes`, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getRoles = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/roles`, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const setProposalQuestionData = async (
  proposalId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}`, questionData, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProposalInfoUpdated = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${PROPOSAL_API_URL}/${id}`,
        {},
        {
          headers: { 'x-api-key': `${API_KEY}` }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProposlBoxId = async (id: string): Promise<Object> => {
  return axios.get(`${PROPOSAL_API_URL}/${id}/boxid`, {
    headers: { 'x-api-key': `${API_KEY}` }
  });
};

export const getValidatedProposalData = (id: string): Promise<Object> => {
  // $FlowFixMe
  return {
    data: [
      {
        label: 'Line Of Business',
        intakeData: 'Core Clinical',
        unityData: 'Core Clinical',
        status: 'match'
      },
      {
        label: 'Is this IQVIA Biotech?',
        intakeData: 'No',
        unityData: 'No',
        status: 'match'
      },
      {
        label: 'Phase',
        intakeData: '2',
        unityData: '3',
        status: 'no match'
      },
      {
        label: 'Indication',
        intakeData: 'no data',
        unityData: 'Test 1011012',
        status: 'null'
      },
      {
        label: 'Verbatim Indication',
        intakeData: 'Non - Small Cell Lung Cancer',
        unityData: 'Non - Small Cell Lung Cancer',
        status: 'match'
      },
      {
        label: 'Intervention Type',
        intakeData: 'Biologic',
        unityData: 'Biologic',
        status: 'match'
      },
      {
        label: 'Patients screened',
        intakeData: 'no data',
        unityData: '',
        status: 'null'
      },
      {
        label: 'Patients enrolled',
        intakeData: 'no data',
        unityData: '',
        status: 'null'
      },
      {
        label: 'Patients completed',
        intakeData: 'no data',
        unityData: '',
        status: 'null'
      },
      {
        label: 'Patient Age Group',
        intakeData: 'no data',
        unityData: '',
        status: 'null'
      },
      {
        label: 'Patient Type',
        intakeData: 'no data',
        unityData: '',
        status: 'null'
      }
    ]
  };

  // return axios.get(`${PROPOSAL_VALIDATED_DATA}`, {
  //   params: {
  //     proposalId: id
  //   },
  //   headers: {
  //     'x-api-key': `${API_KEY}`
  //   }
  // });
};
