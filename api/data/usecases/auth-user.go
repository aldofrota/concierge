package usecases

import (
	"errors"
	"os"
	"time"

	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type ConciergeAuthUserCase struct {
	mongo protocols.Mongo
}

func NewConciergeAuthUserCase(
	mongo protocols.Mongo,
) usecases.ConciergeAuthUser {
	return ConciergeAuthUserCase{
		mongo,
	}
}

func (service ConciergeAuthUserCase) Auth(payload protocols.AuthUser) (protocols.AuthUserStruct, error) {
	// Buscar o usuário pelo email
	user, err := service.mongo.FindUserByEmail(payload.Email)
	if err != nil {
		return protocols.AuthUserStruct{}, errors.New("invalid email or password")
	}

	// Comparar a senha fornecida com a senha hash armazenada
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		return protocols.AuthUserStruct{}, errors.New("invalid email or password")
	}

	// Gerar um token JWT
	tokenString, err := generateJWT(user)
	if err != nil {
		return protocols.AuthUserStruct{}, err
	}

	// Retornar o objeto AuthUserStruct sem o campo Password
	return protocols.AuthUserStruct{
		Id:          user.Id,
		Name:        user.Name,
		Email:       user.Email,
		Status:      user.Status,
		Language:    user.Language,
		Permissions: user.Permissions,
		Token:       tokenString,
	}, nil
}

// Função para gerar um token JWT
func generateJWT(user protocols.UserStruct) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		// Define um segredo padrão caso a variável de ambiente não esteja definida
		secret = "default_secret"
	}

	claims := jwt.MapClaims{
		"userId":    user.Id.Hex(),
		"userEmail": user.Email,
		"exp":       time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
