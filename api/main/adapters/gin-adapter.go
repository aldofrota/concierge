package adapters

import (
	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

// AdaptController adapts a controller to a gin handler
// This is a function that receives a controller and returns a gin.HandlerFunc
// TODO: Aumentar desacoplamento da Controller para que não seja preciso passar o gin.Context
func AdaptController(controller protocols.Controller) gin.HandlerFunc {
	return func(c *gin.Context) {
		httpResponse := controller.Handle(c)
		if httpResponse.StatusCode >= 200 && httpResponse.StatusCode <= 299 {
			c.JSON(httpResponse.StatusCode, httpResponse.Body)
		} else {
			c.JSON(httpResponse.StatusCode, gin.H{"error": httpResponse.Body})
		}
	}
}
