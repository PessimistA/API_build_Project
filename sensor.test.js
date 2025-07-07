const request = require('supertest');
const app = require('./server'); 
let token;

describe('Sensor API Test', () => {
  const user = {
    email: 'Alis3@example.com',
    name: 'Alis',
    password: '12345678'
  };

  it('1.Register)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(user);
    expect(res.statusCode).toBe(201);
  });

  it('2.Login)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('3.Post Sensor)', async () => {
    const res = await request(app)
      .post('/api/sensor')
      .set('Authorization', `Bearer ${token}`)
      .send({ temperature: 222 });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('4.Get Sensor Values)', async () => {
    const res = await request(app)
      .get('/api/sensor')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
