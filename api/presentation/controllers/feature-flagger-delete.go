package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeDeleteController struct {
	ConciergeDeleteCase usecases.ConciergeDelete
}

func NewConciergeDeleteController(ConciergeDeleteCase usecases.ConciergeDelete) protocols.Controller {
	return &ConciergeDeleteController{ConciergeDeleteCase}
}

func (controller *ConciergeDeleteController) Handle(ctx *gin.Context) protocols.HttpResponse {

	flagger := ctx.Param("flagger")
	err := controller.ConciergeDeleteCase.Delete(flagger)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body: map[string]interface{}{
				"error": err.Error(),
			},
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body: map[string]interface{}{
			"message": "Flagger removed successfuly",
		},
	}
}
