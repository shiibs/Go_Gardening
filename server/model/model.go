package model

import (
	"encoding/json"
	"time"

	"gorm.io/gorm"
)

type Plant struct {
    gorm.Model
    ID                          uint     `json:"id" gorm:"primaryKey"`
    Name                        string   `json:"name" gorm:"column:name;size:255;not null;index:idx_name"`
    PlantsPerSquare             int      `json:"plantPerSquare" gorm:"column:plantPerSquare;not null"`
    ProducePerSquareFootPerWeek float64  `json:"producePerSquare" gorm:"column:producePerSquare;not null"`
    ReplantFrequencyDays        int      `json:"replantFrequency" gorm:"column:replantFrequency;not null"`
    HarvestingWeek              string   `json:"harvestingWeek" gorm:"column:harvestingWeek;type:text;not null"`
    Count                       int      `json:"count" gorm:"-"`
    EnemyPlants                 []Enemy  `json:"enemies" gorm:"-"`
    FriendPlants                []Friend `json:"friends" gorm:"-"`
}

type Friend struct {
    gorm.Model
    PlantID  uint `gorm:"column:plant_id"`
    FriendID uint `gorm:"column:friend_id"`
}

type Enemy struct {
    gorm.Model
    PlantID uint `gorm:"column:plant_id"`
    EnemyID uint `gorm:"column:enemy_id"`
}

type User struct {
    gorm.Model
    ID       uint           `json:"id" gorm:"primaryKey"`
    GoogleID string         `json:"googleId" gorm:"unique;not null;index:idx_google_id"`
    UserName string         `json:"name" gorm:"not null"`
    Email    string         `json:"email" gorm:"unique;not null;index:idx_email"`
    Gardens  []GardenLayout `json:"gardens"`
}




type GardenLayout struct {
	gorm.Model
	ID               uint       `json:"id" gorm:"primaryKey"`
	Name             string     `json:"name" gorm:"not null"`
	UserID           uint       `json:"userId" gorm:"not null"`
	StartDate        time.Time  `json:"startDate" gorm:"not null"`
	GardenLayout     Garden     `json:"gardenLayout" gorm:"type:jsonb;not null"`
	CareDates DateSlice `json:"careDates" gorm:"type:jsonb"`
	Schedules        []Schedule `json:"schedules" gorm:"foreignKey:GardenID"`
}



type Schedule struct {
	gorm.Model
	ID            uint          `json:"id" gorm:"primaryKey"`
	PlantName          string        `json:"name" gorm:"not null"`
	GardenID      uint          `json:"gardenId" gorm:"not null"`
    PlantingDates DateSlice `json:"plantingDates" gorm:"type:jsonb"`
}


// Define a custom type for the slice of dates
type DateSlice []time.Time

// Define a method to convert DateSlice to JSONB
func (ds DateSlice) ToJSONB() (interface{}, error) {
    return json.Marshal(ds)
}

// Define a method to scan JSONB into DateSlice
func (ds *DateSlice) Scan(value interface{}) error {
    // Check if value is nil
    if value == nil {
        *ds = []time.Time{}
        return nil
    }

    // Convert the value to []byte
    bytes, ok := value.([]byte)
    if !ok {
        return gorm.ErrInvalidData
    }

    // Unmarshal JSONB data into DateSlice
    return json.Unmarshal(bytes, ds)
}








