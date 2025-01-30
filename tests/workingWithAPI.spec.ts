import { test, expect, request} from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async({page})=>{
  await page.route('*/**/api/tags',async route =>{
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  
  await page.goto('https://conduit.bondaracademy.com/')

})

test('has title', async ({ page }) => {
  await page.route('*/**/api/articles*',async route =>{

    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This is a MOCK test title"
    responseBody.articles[0].description = "This is a MOCK test description"

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  })
  await page.waitForTimeout(4000)

  await page.getByText('Global Feed').click()
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  const articleList = await page.locator('app-article-list')
  const articleTitle = await articleList.locator('.article-preview a h1').first().textContent()
  const articleDescription = await articleList.locator('.article-preview a p').first().textContent()
  await expect(articleTitle).toBe("This is a MOCK test title")
  await expect(articleDescription).toBe("This is a MOCK test description")
});

test('delete article', async({page, request})=>{
    
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
      data:{
        article: {title: "This is a test title", description: "This is a test description", body: "This is a test body"}
      }
    })

  expect(articleResponse.status()).toEqual(201)

  await page.getByText('Global feed').click()
  await page.getByText('This is a test title').click()
  await page.getByRole('button',{name:"Delete Article"}).first().click()
  await page.getByText('Global feed').click()

  await expect(page.locator('app-article-list h1').first).not.toContain('This is a test title')
})

test('create article', async({page,request})=>{
  await page.getByText('New Article').click()
  await page.getByRole('textbox',{name:"Article Title"}).fill('Playwright is awesome')
  await page.getByRole('textbox',{name:"What's this article about?"}).fill('About the Playwright')
  await page.getByRole('textbox',{name:"Write your article (in markdown)"}).fill('Playwright is a Node.js library to automate the Chromium, Firefox and WebKit browsers with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.')
  await page.getByText('Publish Article').click()
  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleResponseBody = await articleResponse.json()
  const slugId = articleResponseBody.article.slug

   
  await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
  await page.getByText('Home').click()
  await page.getByText('Global feed').click()

  await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`
  );
  expect(deleteArticleResponse.status()).toEqual(204)

})