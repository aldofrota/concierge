package routes

import (
	"github.com/aldofrota/concierge/main/adapters"
	"github.com/aldofrota/concierge/main/factories"
	"github.com/gin-gonic/gin"
)

func addHealthCheckRoutes(rg *gin.RouterGroup) {
	healthCheck := rg.Group("/health")
	healthCheck.GET("", adapters.AdaptController(factories.NewHealthCheckControllerFactory()))
}
