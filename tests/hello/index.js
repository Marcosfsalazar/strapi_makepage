const request = require('supertest');
it('should return This is my first blog', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/blog')
    .expect(200) // Expect response http code 200
    .then(data => {
      expect(data.text).toBe('This is my first blog'); // expect the response text
    });
  Promise.resolve()
});