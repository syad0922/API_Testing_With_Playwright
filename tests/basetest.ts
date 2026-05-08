import { test as base } from '@playwright/test'
import { logfile } from '../utils/logger';
import fs from 'fs'

export const test = base.extend<{ token: String }>({
    token: async ({ request }, use) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                "username": "admin",
                "password": "password123"
            }

        });
        const body = await response.json();
        await use(body.token)

    }

});

/*test.beforeEach(async ({ page }) => {
     page.goto('/');
 });*/

export { expect } from '@playwright/test';

test.afterEach(async ({},testinfo)=>{
   try{
    const logs = fs.readFileSync(logfile, 'utf-8');
    await testinfo.attach("Logs",{
        body:logs,
        contentType:'text/plain'
    });
   }catch(error){
    console.error('error reading file:',error);
   }
});