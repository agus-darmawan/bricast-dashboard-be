import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

import { middleware } from './kernel.js'
import authRoutes from './routes/v1/auth.js'
import zoneRoutes from './routes/v1/zones.js'
import regionsRoutes from './routes/v1/regions.js'
import statusesRoutes from './routes/v1/statuses.js'
import devicesRoutes from './routes/v1/devices.js'
import usersRoutes from './routes/v1/user.js'
import dashboardRoutes from './routes/v1/dashboard.js'

router.get('/', async ({ response }: HttpContext) => {
  response.status(200).json({
    status: 200,
    message: 'Welcome to SMBRICast by Agus Darmawan',
  })
})
  
router.group(() => {
  authRoutes()
  statusesRoutes()
  router.group(() => {
    router.group(() => {
      router.group(()=> {
        dashboardRoutes()
        zoneRoutes()
        regionsRoutes()
        devicesRoutes()
        usersRoutes()
      }).middleware(middleware.roleMiddleware("admin"))
    }).middleware(middleware.verifiedEmail())
  }).middleware(middleware.auth({ guards: ['api'] }))

}).prefix('/api/v1')