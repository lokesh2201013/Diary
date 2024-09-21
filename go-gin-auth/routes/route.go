package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lokesh2201013/Diary/controller"
	"github.com/lokesh2201013/Diary/middleware"
)

func SetupRoutes(r *fiber.App) {
r.Post("/login",controller.Login)
r.Post("/register",controller.Register)

private:=r.Group("/private")
private.Use(middleware.Authenticate)
private.Get("/refreshtoken",controller.RefreshToken)
r.Get("/logout",controller.Logout)
r.Get("/refreshtoken",controller.RefreshToken)
}
