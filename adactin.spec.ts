import { expect, test } from '@playwright/test'
import AdactinHome from './adactin.page'
import { jiraupdate } from '../Adactin/jira.spec'

test.describe('Adactin', () => {
    let adactin
    let jupdate
    var location = 'Sydney';

    test('login-101', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');
    })
    test('102-To verify whether the check-out date field accepts a later date than check i date', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d2 = Number(d1[1]) + 7;
        let checkIn = mm + '/' + d2 + '/' + yy
        console.log(mm + '/' + d2 + '/' + yy)
        let d3 = Number(d1[1]) + 5
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption('Sydney')
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        //await page.locator ('#room_nos').selectOption('1')
        await adactin.dateIn.fill(checkIn)
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const tt = await page.locator("span[id='checkin_span']").textContent()
        await expect(tt).toContain('Check-In Date shall be before than Check-Out Date')
        // await expect(page).toMatch()
        // await expect(page).toContain('Check-In Date shall be before than Check-Out Date')


    })
    test('103-To check if error is reported if check-out date field is in the past', async ({ page }) => {

        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d2 = Number(d1[1]) - 5;
        let checkIn = mm + '/' + d2 + '/' + yy
        console.log(mm + '/' + d2 + '/' + yy)
        let d3 = Number(d1[1]) - 3
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption('Sydney')
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        //await page.locator ('#room_nos').selectOption('1')
        await adactin.dateIn.fill(checkIn)
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const ee = await page.locator("span[id='checkin_span']").textContent();
        await expect(ee).toContain('Check-In Date shall be before than Check-Out Date')

    })

    test('104 -location verification', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d3 = Number(d1[1]) + 1
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const tt = await page.locator("//input[contains(@id,'location') and @type='text']")
        const t1 = await tt.getAttribute('value')
        const t2 = t1?.toString().trim()
        console.log('location' + t2 + 'location')
        console.log('location=' + location)
        expect(t1).toEqual(location)

        //await page .locator ('text=')
        if (t1 === location) {
            console.log('success')
        }
        else {
            console.log('fail')
            test.fail
        }

    })

    test('105-To verify whether Check-in date and Check-out date are being displayed in Select Hotel page', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');
        const now = new Date()
        const date = now.getDate()
        const dat1 = date + 1
        console.log(dat1)
        const month = now.getMonth()
        const month1 = month + 1

        let checkOut = + '/' + date + '/' + now.getFullYear()
        console.log(checkOut)
        page.waitForTimeout(50000)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        var dat2=date.toString()

        //get the date from the page and compare
        const ee = await page.locator("//input[contains(@name,'arr_date') and @type='text']").getAttribute('value')
        await expect(ee).toContain(dat2)
    })

    test('106-Verify the no.of rooms', async ({ page }) => {
        adactin = new AdactinHome(page)
        const room = "1";
        await adactin.navigate()
        await adactin.loginWithCredentials('testuser23', 'testpassword')
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d3 = Number(d1[1]) + 1
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await page.locator('#room_nos').selectOption('1')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        //Rooms
        const rooms = await page.locator("//input[contains(@name,'rooms') and @type='text']").getAttribute('value')
        await expect(rooms).toContain(room)
    })

    test.afterEach(async ({ }, testInfo) => {
        console.log('status=' + testInfo.status)
        console.log('Expected=' + testInfo.expectedStatus)
        console.log('Title=' + testInfo.title)

        if (testInfo.status !== testInfo.expectedStatus)
            console.log(`${testInfo.title} did not run as expected!`);
        jupdate = new jiraupdate()
        jupdate.logDefect(testInfo.title)

    });

})
