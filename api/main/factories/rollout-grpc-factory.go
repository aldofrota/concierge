package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	usecase "github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/infra/db/redis"
)

func NewConciergeGrpcFactory() usecase.Concierge {
	redisService := redis.NewRedisService(db_redis_con)
	ConciergeCase := usecases.NewConciergeCase(
		redisService,
	)
	return ConciergeCase
}
