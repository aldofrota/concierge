package routes

import (
	"github.com/aldofrota/concierge/main/adapters"
	"github.com/aldofrota/concierge/main/factories"
	"github.com/gin-gonic/gin"
)

func addConciergeRoutes(rg *gin.RouterGroup) {
	Concierge := rg.Group("/concierge")
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
