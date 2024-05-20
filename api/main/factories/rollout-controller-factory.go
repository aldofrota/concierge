package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	redisHelper "github.com/aldofrota/concierge/infra/db/redis/helpers"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeControllerFactory() protocols.Controller {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeCase := usecases.NewConciergeCase(
		redisService,
	)
	return controllers.NewConciergeController(ConciergeCase)
}
