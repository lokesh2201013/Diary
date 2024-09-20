package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lokesh2201013/Diary/controller"
)

func SetupRoutes(r *fiber.App) {
r.Post("/login",controller.Login)
r.Post("/register",controller.Register)
r.Get("/logout",controller.Logout)
r.Get("/refreshtoken",controller.RefreshToken)
}
