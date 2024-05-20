package factories

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/usecases"
	usecase "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	redisHelper "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/infra/db/redis/helpers"
)

func NewConciergeGrpcFactory() usecase.Concierge {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeCase := usecases.NewConciergeCase(
		redisService,
	)
	return ConciergeCase
}
