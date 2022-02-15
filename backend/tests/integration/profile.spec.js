const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('PROFILE', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it("should be able to get all ONG's incidents", async () => {
        const response = await request(app)
        .get('/profile')
        .set('Authorization', 'd6c6314a')
        .expect(200);
    });
});