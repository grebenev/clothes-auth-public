import request from 'supertest';
import { app } from '../../app';

it('вход с неверным паролем', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'sdfasdf',
    })
    .expect(400);
});

it('вход с правильными данными, и проверка куки', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
