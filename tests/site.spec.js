const {test,expect}=require('@playwright/test');
const sizes=[[320,568],[360,800],[390,844],[768,1024],[844,390],[1024,768],[1440,900],[1920,1080]];
const routes=['index.html','menu.html','enquiry.html','about.html','events.html'];
for(const [width,height] of sizes){
 test('layout and navigation '+width+'x'+height,async({page})=>{
  await page.setViewportSize({width,height});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of routes){
   await page.goto('/'+route);await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('.site-nav a[aria-current=page]')).toHaveCount(1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
   const toggle=page.locator('.menu-toggle');await expect(toggle).toHaveAttribute('aria-expanded','false');
   await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
   await expect(page.locator('.site-nav a')).toHaveCount(5);
   await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
  }
  await page.goto('/menu.html');const cats=page.locator('.menu-list-card');
  await expect(cats).toHaveCount(4);await expect(page.locator('.menu-list-card[open]')).toHaveCount(0);
  await cats.first().locator('summary').click();await expect(cats.first()).toHaveAttribute('open','');
  await expect(cats.first().locator('li')).toHaveCount(8);await expect(cats.first().locator('li').first()).toBeVisible();
  await cats.nth(1).locator('summary').focus();await page.keyboard.press('Enter');await expect(cats.nth(1)).toHaveAttribute('open','');
  await cats.first().locator('summary').click();await expect(cats.first()).not.toHaveAttribute('open','');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  await page.reload();await expect(page.locator('.menu-list-card[open]')).toHaveCount(0);
  expect(errors).toEqual([]);
 });
}
test('reduced motion and disabled enquiry',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/menu.html');
 await page.locator('summary').first().click();await expect(page.locator('.menu-list-card').first()).toHaveAttribute('open','');
 await page.goto('/enquiry.html');await expect(page.locator('button[type=submit]')).toBeDisabled();
});
test('native menu without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:568}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:8000/menu.html');
 await expect(page.locator('.menu-list-card[open]')).toHaveCount(0);await page.locator('summary').first().click();await expect(page.locator('.menu-list-card').first()).toHaveAttribute('open','');
 await context.close();
});
