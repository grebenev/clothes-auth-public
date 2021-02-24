import request from 'supertest';
import { app } from '../../app';
import { getCookie } from '../../test/testHelpers';

it('авторизированный текуший пользователь', async () => {
  const cookie = await getCookie();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});
