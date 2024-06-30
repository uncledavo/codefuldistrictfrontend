import { hc } from 'hono/client'

import { baseUrl } from '../constants.js'

type Route = import('../dev/api.js').ApiRoutes
export const client = hc<Route>(`${baseUrl}/api`)

export type Client = typeof client
