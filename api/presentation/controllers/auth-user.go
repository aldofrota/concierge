package controllers

import (
	"net/http"

	protocolsData "github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
	"gopkg.in/go-playground/validator.v9"
)

type ConciergeAuthUserController struct {
	ConciergeAuthCase usecases.ConciergeAuthUser
}

func NewConciergeAuthUserController(ConciergeAuthUserCase usecases.ConciergeAuthUser) protocols.Controller {
	return &ConciergeAuthUserController{ConciergeAuthUserCase}
}

type AuthUserRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (controller *ConciergeAuthUserController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody AuthUserRequest

	// Faz a leitura do corpo JSON da solicitação
	if err := ctx.BindJSON(&requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Error parsing JSON request body",
		}
	}

	// Valida os campos obrigatórios
	validate := validator.New()
	if err := validate.Struct(requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Validation error: " + err.Error(),
		}
	}

	// Converte AuthUserRequest para AuthUser
	data := protocolsData.AuthUser{

		Email:    requestBody.Email,
		Password: requestBody.Password,
	}

	user, err := controller.ConciergeAuthCase.Auth(data)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       user,
	}
}
