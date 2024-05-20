package factories

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/usecases"
	redisHelper "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/infra/db/redis/helpers"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/controllers"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

func NewConciergeUnreleaseControllerFactory() protocols.Controller {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeUnreleaseCase := usecases.NewConciergeUnreleaseCase(
		redisService,
	)
	return controllers.NewConciergeUnreleaseController(ConciergeUnreleaseCase)
}
