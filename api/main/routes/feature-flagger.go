package routes

import (
	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/adapters"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/factories"
)

func addConciergeRoutes(rg *gin.RouterGroup) {
	Concierge := rg.Group("/feature-flagger")
	Concierge.GET("/all", adapters.AdaptController(factories.NewConciergeFindAllControllerFactory()))
	Concierge.GET("/:flagger", adapters.AdaptController(factories.NewConciergeFindControllerFactory()))
	Concierge.GET("/rollouts/:id", adapters.AdaptController(factories.NewConciergeCompanyControllerFactory()))
	Concierge.GET("/rollout/:flagger/:id", adapters.AdaptController(factories.NewConciergeControllerFactory()))
	Concierge.PUT("/release/:flagger", adapters.AdaptController(factories.NewConciergeReleaseControllerFactory()))
	Concierge.PUT("/unrelease/:flagger", adapters.AdaptController(factories.NewConciergeUnreleaseControllerFactory()))
	Concierge.PUT("/full-rollout/:flagger", adapters.AdaptController(factories.NewConciergeFullRolloutControllerFactory()))
	Concierge.POST("/create", adapters.AdaptController(factories.NewConciergeCreateControllerFactory()))
	Concierge.DELETE("/:flagger", adapters.AdaptController(factories.NewConciergeDeleteControllerFactory()))
}
