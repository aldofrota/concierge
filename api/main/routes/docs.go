package routes

import (
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/docs"
)

func addDocsRoutes(rg *gin.RouterGroup) {
	rg.GET("/docs", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
