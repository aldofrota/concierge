package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/mongo"
)

func NewConciergeFindUserDefaultFactory() error {
	mongoService := mongo.NewMongoService(db_mongo_con, "concierge")
	ConciergeFindUserDefaultCase := usecases.NewConciergeFindUserDefaultCase(
		mongoService,
	)

	err := ConciergeFindUserDefaultCase.CheckDefault()
	if err != nil {
		return err
	}

	return nil
}
