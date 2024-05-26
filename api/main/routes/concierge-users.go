package routes

import (
	"github.com/aldofrota/concierge/main/adapters"
	"github.com/aldofrota/concierge/main/factories"
	"github.com/gin-gonic/gin"
)

func addConciergeUsersRoutes(rg *gin.RouterGroup) {
	Concierge := rg.Group("/users")
	Concierge.POST("/create", adapters.AdaptController(factories.NewConciergeCreateUserControllerFactory()))
	Concierge.GET("/all", adapters.AdaptController(factories.NewConciergeFindAllUsersControllerFactory()))
	Concierge.GET("/:id", adapters.AdaptController(factories.NewConciergeFindUserControllerFactory()))
	Concierge.PUT("/:id/update", adapters.AdaptController(factories.NewConciergeUpdateUserControllerFactory()))
	Concierge.DELETE("/:id/delete", adapters.AdaptController(factories.NewConciergeDeleteUserControllerFactory()))
}
