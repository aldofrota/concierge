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
}
