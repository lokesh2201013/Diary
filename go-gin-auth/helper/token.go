package helper

import (
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/lokesh2201013/Diary/model"
)

// CustomClaims represents the JWT claims for the user
type CustomClaims struct {
	UserId uuid.UUID
	Email  string
	jwt.RegisteredClaims
}

// Secret key for signing JWTs
var secret = "secret"

// GenerateToken generates a JWT token for the given user
func GenerateToken(user model.User) (string, error) {
	// Define custom claims
	claims := CustomClaims{
		UserId: user.ID,
		Email:  user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 3)), // Token expiration time
		},
	}

	// Create a new token with the claims and signing method
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Println("Error in token signing:", err)
		return "", err
	}

	return t, nil
}


func ValidateToken(clientToken string)(claims *CustomClaims,msg string){
token ,err:=jwt.ParseWithClaims(clientToken,&CustomClaims{},func(token *jwt.Token)(interface {},error){
	return []byte(secret),nil
})

if err!=nil{
	msg=err.Error()
}

claims,ok:=token.Claims.(*CustomClaims)
if !ok{
	msg=err.Error()
	return
}
return claims,msg
}