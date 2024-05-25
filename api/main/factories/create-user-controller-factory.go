package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/mongo"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeCreateUserControllerFactory() protocols.Controller {
	mongoService := mongo.NewMongoService(db_mongo_con, "concierge")
	ConciergeCreateUserCase := usecases.NewConciergeCreateUserCase(
		mongoService,
	)
	return controllers.NewConciergeCreateUserController(ConciergeCreateUserCase)
}
