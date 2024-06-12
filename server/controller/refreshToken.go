package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/auth"
	"github.com/shiibs/go-garden-planner/database"
	"github.com/shiibs/go-garden-planner/model"
)

func RefreshToken(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Refresh Token route",
	}

	email := c.Locals("email")

	if email == nil {
		log.Println("Email not found")
		returnObject["msg"] = "Email not found."
		return c.Status(fiber.StatusUnauthorized).JSON(returnObject)
	}

	var user model.User

	if err := database.DBConn.Where("email = ?", email).First(&user).Error; err != nil {
		log.Println("User not found.")
		returnObject["msg"] = "User not found."
		return c.Status(fiber.StatusBadRequest).JSON(returnObject)
	}

	token, err := auth.GenerateToken(user)

	if err != nil {
		returnObject["msg"] = "Token creation error."
		return c.Status(fiber.StatusUnauthorized).JSON(returnObject)
	}

	var loggedInUser model.LoggedInUser

    loggedInUser.ID = user.ID
    loggedInUser.UserName= user.UserName

	returnObject["token"] = token
	returnObject["user"] = loggedInUser

	return c.Status(fiber.StatusOK).JSON(returnObject)
}