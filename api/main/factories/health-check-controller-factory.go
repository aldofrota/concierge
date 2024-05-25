package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	mongoHelper "github.com/aldofrota/concierge/infra/db/mongo/helpers"
	redisHelper "github.com/aldofrota/concierge/infra/db/redis/helpers"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

// HealthCheck godoc
// @Summary      Validate if service is healthy
// @Description  Validate if mongo database, redis database is connected
// @Tags         Health Check
// @Accept       json
// @Produce      json
// @Success      200  {object}  protocols.HttpResponse "OK"
// @Failure      404  {object}  protocols.HttpResponse "Not Found"
// @Failure      500  {object}  protocols.HttpResponse "Internal Server Error"
// @Router       /health [get]
func NewHealthCheckControllerFactory() protocols.Controller {
	redisDatabaseIsConnectedHelper := redisHelper.NewRedisDatabaseIsConnectedHelper(db_redis_con)
	mongoDatabaseIsConnectedHelper := mongoHelper.NewMongoDatabaseIsConnectedHelper(db_mongo_con)
	validateIfHealthyService := usecases.NewValidateIfHealthyService(
		redisDatabaseIsConnectedHelper,
		mongoDatabaseIsConnectedHelper,
	)
	return controllers.NewHealthCheckController(validateIfHealthyService)
}
