const { json } = require('express/lib/response');
const request = require('supertest');
const { response } = require('../../src/app');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new incident', async () => {
        const response = await request(app)
        .post('/incidents')
        .send({
            title: "APAD2 Test",
            description: "Doidera bixo",
            value: "4725682009",
        }).set('Authorization', '5635ad46');

        expect(response.body).toHaveProperty('id');
    });

    it('should return an error', async () => {
        await request(app)
        .post('/incidents')
        .send({
            title: "APAD2 Test",
            description: "Doidera bixo",
            value: "4725682009",
        }).set('Authorization', '')
        .expect(400);
    });

    it('should get an incident', async () => {
        await request(app)
        .get('/incidents')
        .expect(200);
    });
});