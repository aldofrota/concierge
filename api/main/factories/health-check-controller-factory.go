package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	redisHelper "github.com/aldofrota/concierge/infra/db/redis"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

// HealthCheck godoc
// @Summary      Validate if service is healthy
// @Description  Validate if mongo database, redis database, kafka producer and kafka consumer is connected
// @Tags         Health Check
// @Accept       json
// @Produce      json
// @Success      200  {object}  protocols.HttpResponse "OK"
// @Failure      404  {object}  protocols.HttpResponse "Not Found"
// @Failure      500  {object}  protocols.HttpResponse "Internal Server Error"
// @Router       /health [get]
func NewHealthCheckControllerFactory() protocols.Controller {
	redisDatabaseIsConnectedHelper := redisHelper.NewRedisDatabaseIsConnectedHelper(db_redis_con)
	validateIfHealthyService := usecases.NewValidateIfHealthyService(
		redisDatabaseIsConnectedHelper,
	)
	return controllers.NewHealthCheckController(validateIfHealthyService)
}
