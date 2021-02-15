import request from 'supertest';
import { app } from '../../app';

it('возврат 201 кода signupUser', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123456' })
    .expect(201);
});

it('возврат 400 с не валидным email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'asdfasd', password: '123456' })
    .expect(400);
});

it('возврат 400 с не валидным password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123' })
    .expect(400);
});

it('возврат 400 без email или без password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: '123' })
    .expect(400);
});

it('Запрет дублирования email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123456' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123456' })
    .expect(400);
});

it('Установелны cookie после успешной регистрации', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123456' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
