package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeController struct {
	ConciergeCase usecases.Concierge
}

func NewConciergeController(ConciergeCase usecases.Concierge) protocols.Controller {
	return &ConciergeController{ConciergeCase}
}

func (controller *ConciergeController) Handle(ctx *gin.Context) protocols.HttpResponse {

	flagger := ctx.Param("flagger")
	id := ctx.Param("id")

	inRollout, err := controller.ConciergeCase.Rollout(flagger, id)
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
			"rollout": inRollout,
		},
	}
}
