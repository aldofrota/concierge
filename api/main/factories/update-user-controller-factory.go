package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/mongo"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeUpdateUserControllerFactory() protocols.Controller {
	mongoService := mongo.NewMongoService(db_mongo_con, "concierge")
	ConciergeUpdateUserCase := usecases.NewConciergeUpdateUserCase(
		mongoService,
	)
	return controllers.NewConciergeUpdateUserController(ConciergeUpdateUserCase)
}
