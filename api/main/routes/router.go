package routes

import (
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/middlewares"
)

var router = gin.New()
var server = &http.Server{
	Addr:    ":3000",
	Handler: router,
}

func Run() error {
	getRoutes()
	port := os.Getenv("PORT")
	if port != "" {
		server.Addr = ":" + port
	}
	return server.ListenAndServe()
}

func ShutDown(ctx context.Context) error {
	return server.Shutdown(ctx)
}

func getRoutes() {
	router.Use(gin.Recovery())
	router.Use(httptrace.Middleware(os.Getenv("DD_SERVICE")))
	apiPrefix := router.Group("")
	apiPrefix.Use(middlewares.NewCorsMiddleware())
	addDocsRoutes(apiPrefix)
	addHealthCheckRoutes(apiPrefix)
	addConciergeRoutes(apiPrefix)
}
