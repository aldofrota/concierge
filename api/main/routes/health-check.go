package routes

import (
	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/adapters"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/factories"
)

func addHealthCheckRoutes(rg *gin.RouterGroup) {
	healthCheck := rg.Group("/health")
	healthCheck.GET("", adapters.AdaptController(factories.NewHealthCheckControllerFactory()))
}
