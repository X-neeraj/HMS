const request = require('supertest');
const mongoose = require('mongoose');
import server from "../../index";
const config =require("../../config")
var token:string;
var roomId:string;
beforeAll(async () => {
    await mongoose.connect(config.testmongourl);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close(); 
});

describe('User API',()=>{
    it('should create a new user',async ()=>{ 
        const response=await request(server)
        .post('/user/register')
        .send({
            name:"admin",
            email:"admin@gmail.com",
            password:"admin123",
            age:22,
            owner:true,
            phoneNumber:"123456789"
        })
        token=response.body.token
        expect(response.status).toBe(201)
        expect(response.body.user.email).toBe("admin@gmail.com")
        expect(response.body.user.name).toBe("admin")
    })

    it('should allow user to login',async ()=>{
        const response=await request(server)
        .post('/user/login')
        .send({
            email:"admin@gmail.com",
            password:"admin123"
        })

        expect(response.status).toBe(200)
        expect(response.body.userInfo.email).toBe("admin@gmail.com")
        expect(response.body.userInfo.name).toBe("admin")
    })
})

describe('Room API',()=>{
    it('should create a new room',async ()=>{
        const response= await request(server)
        .post('/room/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            roomNo:105,
            roomType:"double",
            roomPrice:3999
        })

        expect(response.status).toBe(201)
        expect(response.body.roomNo).toBe("105")
        expect(response.body.roomType).toBe("double")
    })

    it('should get room Info',async ()=>{
        const response= await request(server)
        .get('/room/')
        roomId=response.body[0].roomId
        expect(response.status).toBe(200)
        expect(response.body[0].roomNo).toBe("105")
        expect(response.body[0].roomType).toBe("double")
    })

    it('should get room by id',async()=>{
        const response=await request(server)
        .get(`/room/${roomId}`)

        expect(response.status).toBe(200)
        expect(response.body.roomNo).toBe("105")
        expect(response.body.roomType).toBe("double")
    })
})

describe('Boook API',()=>{
    it('should create new booking', async ()=>{
        const response = await request(server)
        .post("/book/")
        .set('Authorization', `Bearer ${token}`)
        .send({
            roomId,
            startDateString:"2024-10-16",
            endDateString:"2024-10-20",
            guests:[
                {"name":"user4","age":22,"number":"12345678"},
                {"name":"user5","age":23,"number":"12345678"}
            ]
        })

        expect(response.status).toBe(200)
        expect(response.body.roomId).toBe(roomId)
    })

    it('should get all bookings', async ()=>{
        const response = await request(server)
        .get("/book/")
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body[0].roomId).toBe(roomId)
    })

    it('should deallocate room',async ()=>{
        const response = await request(server)
        .get(`/book/deallocate/${roomId}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('room is sucessfully deallocated')
    })
})