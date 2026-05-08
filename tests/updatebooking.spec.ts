//import { test, expect } from '@playwright/test'
import { test, expect } from './basetest'
import testdata from '../utils/testdata.json'
import {logger} from '../utils/logger'

console.log('Base URL:', process.env.BASE_URL);
console.log('Running Environment:', process.env.TEST_ENV || 'dev');
//console.log('Base URL:', process.env.BASE_URL);
test('create booking', async ({ request, token }) => {
    //Create booking
    logger.info("getting testdata from testdata.json file");
    const testData=testdata.createBooking_1;
    logger.info("executing the requests");
    logger.warn("execution started");
    logger.error("error deected");
    const response = await request.post('/booking',
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data:testData
        }
    )
    expect(response.status()).toBe(200);
    const body = await response.json();
    logger.info(`response: ${JSON.stringify(body, null, 2)}`);

    console.log("Create booking", body);
    const BookingId = body.bookingid;
    console.log(BookingId);
    console.log(token);

    //Get booking id details
    const getresponse = await request.get(`/booking/${BookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(getresponse.url());
    expect (getresponse.status()).toBe(200);
    const getbooking = await getresponse.json();
    console.log("get booking details ", getbooking);
   // console.log("get booking details "+getbooking);
    expect(getbooking.firstname).toBe('Jim');

    //update booking
    const updatetestData=testdata.updateBooking_1;
    const updatebooking = await request.patch(`/booking/${BookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: updatetestData
    })
    console.log(updatebooking.url());
    console.log(updatebooking.status());
    expect (updatebooking.status()).toBe(200);
    const updatebody=await updatebooking.text();
    console.log("response body", updatebody);
    //const UpdateBooking=await updatebooking.json();
    //console.log(UpdateBooking);
});