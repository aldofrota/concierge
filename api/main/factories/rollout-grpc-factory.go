package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	usecase "github.com/aldofrota/concierge/domain/usecases"
	redisHelper "github.com/aldofrota/concierge/infra/db/redis/helpers"
)

func NewConciergeGrpcFactory() usecase.Concierge {
	redisService := redisHelper.NewRedisService(db_redis_con)
	ConciergeCase := usecases.NewConciergeCase(
		redisService,
	)
	return ConciergeCase
}
