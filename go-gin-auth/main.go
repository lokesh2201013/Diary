package main

import (
	"log"
	"os"

	//"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)
func init(){
	if err:=godotenv.Load();err!=nil{
 log.Println("Error in loading env file")
	}
}
func main(){
	port:=os.Getenv("port")
	
	router:=fiber.New()
	router.Get("/",func(c *fiber.Ctx) error  {
		return c.SendString("hellpppp")
	})
	log.Fatal(router.Listen(":"+port))
}