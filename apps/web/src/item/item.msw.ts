/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * @fastify/swagger
 * OpenAPI spec version: 9.4.2
 */
import {
  faker
} from '@faker-js/faker'
import {
  HttpResponse,
  delay,
  http
} from 'msw'
import type {
  GetItems201Item
} from '.././model'

export const getGetItemsResponseMock = (): GetItems201Item[] => (Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), name: faker.helpers.arrayElement([faker.string.alpha(20), undefined])})))


export const getGetItemsMockHandler = (overrideResponse?: GetItems201Item[] | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<GetItems201Item[]> | GetItems201Item[])) => {
  return http.get('*/items', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getGetItemsResponseMock()),
      { status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPostItemsMockHandler = (overrideResponse?: void | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<void> | void)) => {
  return http.post('*/items', async (info) => {await delay(1000);
  if (typeof overrideResponse === 'function') {await overrideResponse(info); }
    return new HttpResponse(null,
      { status: 200,
        
      })
  })
}

export const getDeleteItemsItemIdMockHandler = (overrideResponse?: void | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<void> | void)) => {
  return http.delete('*/items/:itemId', async (info) => {await delay(1000);
  if (typeof overrideResponse === 'function') {await overrideResponse(info); }
    return new HttpResponse(null,
      { status: 200,
        
      })
  })
}
export const getItemMock = () => [
  getGetItemsMockHandler(),
  getPostItemsMockHandler(),
  getDeleteItemsItemIdMockHandler()
]
