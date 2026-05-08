import {test,expect} from '@playwright/test'

test('token test',async ({request})=>{
   const response=await request.post('https://reqres.in/api/login',{
    data: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
   });
   expect (response.status()).toBe(401);
   const body=await response.json();
   expect(body.token).toBeDefined();

});

