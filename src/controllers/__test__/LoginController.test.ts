import request from 'supertest';
import { app } from '../../app';

it('возврат 201 кода signupUser', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123456' })
    .expect(201);
});
