package middleware

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/lokesh2201013/Diary/helper"
)

func Authenticate(c *fiber.Ctx)error {
	token := c.Get("token")

	if token == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Token not Present"})
		
		
	}

	claims, msg := helper.ValidateToken(token)

	log.Println(claims)

	if msg != "" {
		return c.Status(401).JSON(fiber.Map{"error": msg})
		
		
	}
	return  c.Next()
}