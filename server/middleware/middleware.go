package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/auth"
)

func Authenticate(c *fiber.Ctx) error {
	token := c.Get("token")

	
	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token not present."})
	    
	}

	claims, msg := auth.ValidateToken(token)

	if msg != "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": msg})
		 
	}

	c.Locals("email", claims.Email)

	return c.Next()
}