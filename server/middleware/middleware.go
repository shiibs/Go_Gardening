package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/auth"
)

func Authenticate(c *fiber.Ctx) {
	token := c.Get("token")

	if token == "" {
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token not present."})
	    return
	}

	claims, msg := auth.ValidateToken(token)

	if msg != "" {
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": msg})
		return 
	}

	c.Locals("email", claims.Email)

	c.Next()
}