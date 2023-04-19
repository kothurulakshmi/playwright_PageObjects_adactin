import { Locator, Page } from "@playwright/test";

class AdactinHome {
    page: Page;
    username: Locator;
    password: Locator;
    login: Locator;
    location: Locator;
    hotel: Locator;
    roomType: Locator;
    dateIn: Locator;
    dateOut: Locator;
    search: Locator;
    constructor(page){
        this.page=page;
        this.username= page.locator('#username');
        this.password=page.locator('#password');
        this.login=page.locator('#login');
        this.location=page.locator ('#location');
        this.hotel=page.locator ('#hotels');
        this.roomType=page.locator ('#room_type')
        this.dateIn=page.locator('#datepick_in')
        this.dateOut=page.locator("input[name='datepick_out']")
        this.search=page.locator("input[name='Submit']")
    }
    async navigate() {
 //help to go the website
        await this.page.goto('http://adactinhotelapp.com/')
        
        }
        async loginWithCredentials(username:any , password:any)
        {
            //login credentials
            await this.username.fill(username);
            await  this.password.fill(password);
             await this.login.click();
        }
}
export default AdactinHome;
