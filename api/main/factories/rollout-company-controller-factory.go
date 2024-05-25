package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/redis"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeCompanyControllerFactory() protocols.Controller {
	redisService := redis.NewRedisService(db_redis_con)
	ConciergeCompanyCase := usecases.NewConciergeCompanyCase(
		redisService,
	)
	return controllers.NewConciergeCompanyController(ConciergeCompanyCase)
}
