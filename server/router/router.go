package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lokesh2201013/Diary/controller"
)

func SetUpRoutes(app *fiber.App){
	app.Get("/",controller.DiaryList)
	app.Post("/",controller.DiaryCreate)
	app.Put("/:id",controller.DiaryUpdate)
	app.Delete("/:id",controller.DiaryDelete)
}