package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/mongo"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeFindAllUsersControllerFactory() protocols.Controller {
	mongoService := mongo.NewMongoService(db_mongo_con, "concierge")
	ConciergeFindAllUsersCase := usecases.NewConciergeFindAllUsersCase(
		mongoService,
	)
	return controllers.NewConciergeFindAllUsersController(ConciergeFindAllUsersCase)
}
