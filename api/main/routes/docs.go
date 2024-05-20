package routes

import (
	_ "github.com/aldofrota/concierge/main/docs"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func addDocsRoutes(rg *gin.RouterGroup) {
	rg.GET("/docs", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
