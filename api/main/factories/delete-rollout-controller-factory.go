package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	redisHelper "github.com/aldofrota/concierge/infra/db/redis/helpers"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeDeleteControllerFactory() protocols.Controller {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeDeleteCase := usecases.NewConciergeDeleteCase(
		redisService,
	)
	return controllers.NewConciergeDeleteController(ConciergeDeleteCase)
}
