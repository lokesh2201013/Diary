package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/helper"
	"github.com/lokesh2201013/Diary/model"
	"golang.org/x/crypto/bcrypt"
)

type formData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Login successful",
	}

	// Collect form data
	var formData formData
	if err := c.BodyParser(&formData); err != nil {
		log.Println("Error in JSON binding:", err)
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"msg":    "Invalid input",
		})
	}

	// Check if user exists
	var user model.User
	database.DBConn.First(&user, "email = ?", formData.Email)

	if user.ID == uuid.Nil {
		returnObject["msg"] = "User not found"
		return c.Status(404).JSON(returnObject)
	}

	// Validate password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(formData.Password))
	if err != nil {
		log.Println("Invalid password")
		returnObject["msg"] = "Password doesn't match"
		return c.Status(401).JSON(returnObject)
	}

	// Generate JWT token
	token, err := helper.GenerateToken(user)
	if err != nil {
		log.Println("Token creation error:", err)
		returnObject["msg"] = "Token creation error"
		return c.Status(500).JSON(returnObject)
	}

	// Successful login
	returnObject["token"] = token
	returnObject["status"] = "OK"
	returnObject["msg"] = "User authenticated"
	return c.Status(200).JSON(returnObject)
}

func Register(c *fiber.Ctx) error {
	// Collect form data
	var formData formData

	if err := c.BodyParser(&formData); err != nil {
		log.Println("Error in JSON binding:", err)
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"msg":    "Invalid input",
		})
	}

	// Check if user already exists
	var existingUser model.User
	database.DBConn.First(&existingUser, "email = ?", formData.Email)
	if existingUser.ID != uuid.Nil {
		return c.Status(409).JSON(fiber.Map{
			"status": "error",
			"msg":    "User already exists",
		})
	}

	// Create a new user
	var user model.User
	user.Email = formData.Email
	user.Password = helper.HashPassword(formData.Password) // Hash the password before saving

	result := database.DBConn.Create(&user)
	if result.Error != nil {
		log.Println(result.Error)
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"msg":    "Failed to register user",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"status": "OK",
		"msg":    "Registration successful",
	})
}

func Logout(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Logout successful",
	}
	return c.Status(200).JSON(returnObject)
}

func RefreshToken(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Token refreshed",
	}
	return c.Status(200).JSON(returnObject)
}
