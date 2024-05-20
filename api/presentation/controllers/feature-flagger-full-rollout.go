package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeFullRolloutController struct {
	ConciergeFullRolloutCase usecases.ConciergeFullRollout
}

func NewConciergeFullRolloutController(ConciergeFullRolloutCase usecases.ConciergeFullRollout) protocols.Controller {
	return &ConciergeFullRolloutController{ConciergeFullRolloutCase}
}

func (controller *ConciergeFullRolloutController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody protocols.RequestFullRollout
	flagger := ctx.Param("flagger")

	// Faz a leitura do corpo JSON da solicitação
	if err := ctx.BindJSON(&requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body: map[string]interface{}{
				"error": "Error parsing JSON request body",
			},
		}
	}

	err := controller.ConciergeFullRolloutCase.FullRollout(flagger, requestBody.FullRollout)
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
			"message": "flagger in full rollouts",
		},
	}
}
