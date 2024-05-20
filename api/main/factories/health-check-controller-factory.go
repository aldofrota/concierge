package factories

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/usecases"
	redisHelper "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/infra/db/redis"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/controllers"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
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
