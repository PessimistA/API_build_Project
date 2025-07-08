const request = require('supertest');
const app = require('./server'); 
const mongoose = require('mongoose');
const User = require('./models/mongouser');


let token = [];
afterAll(async () => {/**arka planda mongo bağlantısı kapanması için eklenir */
  await mongoose.connection.close();
});

describe('Sensor API Test', () => {/**testleri genel olarak tanımlar */
  const user1 = {
    email: 'Basisal1@example',
    name: 'Basi',
    password: 'ab12.'
  };
  const user2 = {
    email: 'Agrilal1@example',
    name: 'Agr',
    password: '6534a12.'
  };
  const user3 = {
    email: 'vibial1@example',
    name: 'vib',
    password: '523.'
  };
  const allusers = [
    user3,
    user2,
    user1
  ];

  it('1.Register)', async () => {/**testlere başlar ilk olarak kayıt olunur */
    for (let index = 0; index < allusers.length; index++) {
      const element = allusers[index];
      const res = await request(app)/**register için post edilir yol belirlenir ve kaydedilecek veriler seçilir */
        .post('/api/auth/register')
        .send({ email: element.email,name:element.name ,password: element.password });

    }
  });

  it('2.Login)', async () => {/**loginde post ve send vardır token değeri döner bu değeri diziye eklerim */
    for (let index = 0; index < allusers.length; index++) {
      const element = allusers[index];
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: element.email, password: element.password });

      token.push(res.body.token);
    }
  });

  it('3.Post Sensor)', async () => {/**burada data değerini post ederim set kısmı burada headerda authorization:bearer <token> işlemi yaparım yani kimliğimi doğrularım */
    let temp1 = 15;
    for (let index = 0; index < allusers.length; index++) {
      const element = allusers[index];
      const res = await request(app)
        .post('/api/sensor')
        .set('Authorization', `Bearer ${token[index]}`)
        .send({ temperature: temp1 });

      temp1 += 12;
    }
  });

  it('4.Get Sensor Values)', async () => {/**get yapmamı burada sağlarım hangi veriyi alacaksam */
    for (let index = 0; index < allusers.length; index++) {
      const element = allusers[index];
      const res = await request(app)
        .get('/api/sensor')
        .set('Authorization', `Bearer ${token[index]}`);
    }
  });

  it('5)Search part:', async () => {
    for (let index = 0; index < allusers.length; index++) {
      const res = await request(app)
        .get('/api/sensor/search?min=20&max=30')
        .set('Authorization', `Bearer ${token[index]}`);
    }
  });

  it('6)delete part:', async () => {
    const user = await User.findOne({ email: allusers[0].email }).populate('sensors');

    if (!user) {
      throw new Error("Test user not found");
    }

    if (!user.sensors || user.sensors.length === 0) {
      console.warn("User has no sensors to delete");
      return;
    }

    const sensorId = user.sensors[0]._id;

    const res = await request(app)
      .delete(`/api/sensor/${sensorId}`)
      .set('Authorization', `Bearer ${token[1]}`);
  });
});
