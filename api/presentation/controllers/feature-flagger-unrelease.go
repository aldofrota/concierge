package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeUnreleaseController struct {
	ConciergeUnreleaseCase usecases.ConciergeUnrelease
}

func NewConciergeUnreleaseController(ConciergeUnreleaseCase usecases.ConciergeUnrelease) protocols.Controller {
	return &ConciergeUnreleaseController{ConciergeUnreleaseCase}
}

func (controller *ConciergeUnreleaseController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody protocols.RequestRelease
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

	err := controller.ConciergeUnreleaseCase.Unrelease(flagger, requestBody.Ids)
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
			"message": "Companies removed from implementation",
		},
	}
}
