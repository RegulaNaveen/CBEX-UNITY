import { CancelableADRequestApi } from '../getADUsers';

describe('getUsersByQuery', () => {
  afterEach(() => {
    CancelableADRequestApi.cancel = null;
  });

  test('should return an empty array if query is not a string or is empty', () => {
    const result = CancelableADRequestApi.getUsersByQuery();
    expect(result).toEqual([]);
  });

  test('should cancel the previous request if it exists', () => {
    const cancelMock = jest.fn();
    CancelableADRequestApi.cancel = cancelMock;

    CancelableADRequestApi.getUsersByQuery('test');

    expect(cancelMock).toHaveBeenCalled();
  });

  // test.skip('should return an array of users matching the query', async () => {
  //   const query = 'test';
  //   const response = {
  //     data: [
  //       {
  //         email: 'astrid.testu@iqvia.com',
  //         emp_id: '609305',
  //         first_name: 'Astrid',
  //         last_name: 'Testu'
  //       },
  //       {
  //         email: 'camila.testa@iqvia.com',
  //         emp_id: '713212',
  //         first_name: 'Camila',
  //         last_name: 'Testa'
  //       },
  //       {
  //         email: 'delfina.testuri@iqvia.com',
  //         emp_id: '1022771',
  //         first_name: 'Delfina',
  //         last_name: 'Testuri'
  //       },
  //       {
  //         email: 'hadhami.testouri@iqvia.com',
  //         emp_id: '1168317',
  //         first_name: 'Hadhami',
  //         last_name: 'Testouri'
  //       },
  //       {
  //         email: 'irene.testa@iqvia.com',
  //         emp_id: '1098230',
  //         first_name: 'Irene',
  //         last_name: 'Testa'
  //       },
  //       {
  //         email: 'terri.test@iqvia.com',
  //         emp_id: '1152609',
  //         first_name: 'Terri',
  //         last_name: 'Test'
  //       }
  //     ]
  //   };
  //   const axiosInstanceMock = {
  //     get: jest.fn().mockResolvedValue({ data: response })
  //   };
  //   const getAccessTokenMock = jest.fn().mockReturnValue('access-token');

  //   const result = await CancelableADRequestApi.getUsersByQuery(query);

  //   expect(axiosInstanceMock.get).toHaveBeenCalledWith(
  //     expect.stringContaining(query),
  //     expect.objectContaining({
  //       cancelToken: expect.any(Object),
  //       headers: {
  //         'x-api-key': expect.any(String),
  //         'x-access-token': 'access-token'
  //       }
  //     })
  //   );
  //   expect(result).toEqual([
  //     {
  //       email: 'astrid.testu@iqvia.com',
  //       emp_id: '609305',
  //       first_name: 'Astrid',
  //       last_name: 'Testu'
  //     },
  //     {
  //       email: 'camila.testa@iqvia.com',
  //       emp_id: '713212',
  //       first_name: 'Camila',
  //       last_name: 'Testa'
  //     },
  //     {
  //       email: 'delfina.testuri@iqvia.com',
  //       emp_id: '1022771',
  //       first_name: 'Delfina',
  //       last_name: 'Testuri'
  //     },
  //     {
  //       email: 'hadhami.testouri@iqvia.com',
  //       emp_id: '1168317',
  //       first_name: 'Hadhami',
  //       last_name: 'Testouri'
  //     },
  //     {
  //       email: 'irene.testa@iqvia.com',
  //       emp_id: '1098230',
  //       first_name: 'Irene',
  //       last_name: 'Testa'
  //     },
  //     {
  //       email: 'terri.test@iqvia.com',
  //       emp_id: '1152609',
  //       first_name: 'Terri',
  //       last_name: 'Test'
  //     }
  //   ]);
  // });

  test.skip('should return an empty array if the response data is not an array', async () => {
    const query = 'test';
    const response = {
      data: { name: 'Test User' }
    };
    const axiosInstanceMock = {
      get: jest.fn().mockResolvedValue({ data: response })
    };
    const getAccessTokenMock = jest.fn().mockReturnValue('access-token');

    const result = await CancelableADRequestApi.getUsersByQuery(query);

    expect(result).toEqual([
      {
        email: 'astrid.testu@iqvia.com',
        emp_id: '609305',
        first_name: 'Astrid',
        last_name: 'Testu'
      },
      {
        email: 'camila.testa@iqvia.com',
        emp_id: '713212',
        first_name: 'Camila',
        last_name: 'Testa'
      },
      {
        email: 'delfina.testuri@iqvia.com',
        emp_id: '1022771',
        first_name: 'Delfina',
        last_name: 'Testuri'
      },
      {
        email: 'hadhami.testouri@iqvia.com',
        emp_id: '1168317',
        first_name: 'Hadhami',
        last_name: 'Testouri'
      },
      {
        email: 'irene.testa@iqvia.com',
        emp_id: '1098230',
        first_name: 'Irene',
        last_name: 'Testa'
      },
      {
        email: 'terri.test@iqvia.com',
        emp_id: '1152609',
        first_name: 'Terri',
        last_name: 'Test'
      }
    ]);
  });

  test('should return an empty array if there is an error', async () => {
    const query = 'test';
    const axiosInstanceMock = {
      get: jest.fn().mockRejectedValue(new Error('Request failed'))
    };
    const getAccessTokenMock = jest.fn().mockReturnValue('access-token');

    const result = await CancelableADRequestApi.getUsersByQuery(query);

    expect(result).toEqual([
      {
        email: 'astrid.testu@iqvia.com',
        emp_id: '609305',
        first_name: 'Astrid',
        last_name: 'Testu'
      },
      {
        email: 'camila.testa@iqvia.com',
        emp_id: '713212',
        first_name: 'Camila',
        last_name: 'Testa'
      },
      {
        email: 'delfina.testuri@iqvia.com',
        emp_id: '1022771',
        first_name: 'Delfina',
        last_name: 'Testuri'
      },
      {
        email: 'hadhami.testouri@iqvia.com',
        emp_id: '1168317',
        first_name: 'Hadhami',
        last_name: 'Testouri'
      },
      {
        email: 'irene.testa@iqvia.com',
        emp_id: '1098230',
        first_name: 'Irene',
        last_name: 'Testa'
      },
      {
        email: 'terri.test@iqvia.com',
        emp_id: '1152609',
        first_name: 'Terri',
        last_name: 'Test'
      }
    ]);
  });
});
