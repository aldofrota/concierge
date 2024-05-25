package controllers

import (
	"net/http"

	protocolsData "github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
	"gopkg.in/go-playground/validator.v9"
)

type ConciergeCreateUserController struct {
	ConciergeCreateCase usecases.ConciergeCreateUser
}

func NewConciergeCreateUserController(ConciergeCreateUserCase usecases.ConciergeCreateUser) protocols.Controller {
	return &ConciergeCreateUserController{ConciergeCreateUserCase}
}

type CreateUserRequest struct {
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required,email"`
	Password    string `json:"password" validate:"required"`
	Language    string `json:"language" validate:"required"`
	Status      string `json:"status"`
	Permissions struct {
		CreateRollout bool `json:"create_rollout"`
		UpdateRelease bool `json:"update_release"`
		RemoveRollout bool `json:"remove_rollout"`
		CreateUser    bool `json:"create_user"`
		Admin         bool `json:"admin"`
	} `json:"permissions"`
}

func (controller *ConciergeCreateUserController) Handle(ctx *gin.Context) protocols.HttpResponse {

	var requestBody CreateUserRequest

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

	// Define o status padrão se não fornecido
	if requestBody.Status == "" {
		requestBody.Status = "active"
	}

	// Converte CreateUserRequest para UserStruct
	user := protocolsData.UserStruct{
		Name:     requestBody.Name,
		Email:    requestBody.Email,
		Password: requestBody.Password,
		Language: requestBody.Language,
		Status:   requestBody.Status,
		Permissions: protocolsData.UserPermissions{
			CreateRollout: requestBody.Permissions.CreateRollout,
			UpdateRelease: requestBody.Permissions.UpdateRelease,
			RemoveRollout: requestBody.Permissions.RemoveRollout,
			CreateUser:    requestBody.Permissions.CreateUser,
			Admin:         requestBody.Permissions.Admin,
		},
	}

	err := controller.ConciergeCreateCase.Create(user)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body: map[string]interface{}{
			"message": "User created successfully",
		},
	}
}
