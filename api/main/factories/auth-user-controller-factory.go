package factories

import (
	"github.com/aldofrota/concierge/data/usecases"
	"github.com/aldofrota/concierge/infra/db/mongo"
	"github.com/aldofrota/concierge/presentation/controllers"
	"github.com/aldofrota/concierge/presentation/protocols"
)

func NewConciergeAuthUserControllerFactory() protocols.Controller {
	mongoService := mongo.NewMongoService(db_mongo_con, "concierge")
	ConciergeAuthUserCase := usecases.NewConciergeAuthUserCase(
		mongoService,
	)
	return controllers.NewConciergeAuthUserController(ConciergeAuthUserCase)
}
