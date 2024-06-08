package model

import "encoding/json"

type Garden [][]Plant

func (g Garden) MarshalJSON() ([]byte, error) {
    return json.Marshal([][]Plant(g))
}

func (g *Garden) UnmarshalJSON(data []byte) error {
    return json.Unmarshal(data, (*[][]Plant)(g))
}


func NewGarden(rows, columns int) Garden {
	g := make(Garden, rows)
	for i:= range g {
		g[i] = make([]Plant, columns)
	}

	return g
}


func (g Garden) PlantAt(row, col int, plant Plant) {
	g[row][col] = plant
}