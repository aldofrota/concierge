package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/redis"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeUnreleaseControllerFactory() protocols.Controller {
	redisService := redis.NewRedisService(db_redis_con)
	ConciergeUnreleaseCase := usecases.NewConciergeUnreleaseCase(
		redisService,
	)
	return controllers.NewConciergeUnreleaseController(ConciergeUnreleaseCase)
}
