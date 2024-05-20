package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	protocolsData "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeCreateController struct {
	ConciergeCreateCase usecases.ConciergeCreate
}

func NewConciergeCreateController(ConciergeCreateCase usecases.ConciergeCreate) protocols.Controller {
	return &ConciergeCreateController{ConciergeCreateCase}
}

func (controller *ConciergeCreateController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody protocolsData.FlagPayload

	// Faz a leitura do corpo JSON da solicitação
	if err := ctx.BindJSON(&requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body: map[string]interface{}{
				"error": "Error parsing JSON request body",
			},
		}
	}
	err := controller.ConciergeCreateCase.Create(requestBody)
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
			"message": "Flagger create successfuly",
		},
	}
}
