package factories

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/usecases"
	redisHelper "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/infra/db/redis/helpers"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/controllers"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

func NewConciergeCompanyControllerFactory() protocols.Controller {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeCompanyCase := usecases.NewConciergeCompanyCase(
		redisService,
	)
	return controllers.NewConciergeCompanyController(ConciergeCompanyCase)
}
