import {test,expect} from '@playwright/test'

test('get call test',async ({request})=>{
      const response=await request.get('https://jsonplaceholder.typicode.com/users');
      await expect(response.status()).toBe(200);
    //  console.log('ressponse:'+response);

      const body=await response.json();
     // console.log('ressponse=>'+body);
      expect(body.length).toBeGreaterThan(0);
      console.log(body[1].username);
      expect(body[1].username).toBe('Antonette');
      //expect(body.token).toBeDefined();


});