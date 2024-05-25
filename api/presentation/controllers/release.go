package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeReleaseController struct {
	ConciergeReleaseCase usecases.ConciergeRelease
}

func NewConciergeReleaseController(ConciergeReleaseCase usecases.ConciergeRelease) protocols.Controller {
	return &ConciergeReleaseController{ConciergeReleaseCase}
}

func (controller *ConciergeReleaseController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody protocols.RequestRelease
	flagger := ctx.Param("flagger")

	// Faz a leitura do corpo JSON da solicitação
	if err := ctx.BindJSON(&requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Error parsing JSON request body",
		}
	}

	err := controller.ConciergeReleaseCase.Release(flagger, requestBody.Ids)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body: map[string]interface{}{
			"message": "Companies added in rollout",
		},
	}
}
