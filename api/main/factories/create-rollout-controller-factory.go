package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/redis"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeCreateControllerFactory() protocols.Controller {
	redisService := redis.NewRedisService(db_redis_con)
	ConciergeCreateCase := usecases.NewConciergeCreateCase(
		redisService,
	)
	return controllers.NewConciergeCreateController(ConciergeCreateCase)
}
