import { useMemo } from 'react'

type UnitSystem = 'metric' | 'imperial'
type MeasurementType = 'weight' | 'volume'

interface UnitConversion {
  from: string
  to: string
  ratio: number
}

// Common weight conversions
const weightConversions: UnitConversion[] = [
  { from: 'g', to: 'oz', ratio: 0.035274 },
  { from: 'kg', to: 'lb', ratio: 2.20462 },
  { from: 'oz', to: 'g', ratio: 28.3495 },
  { from: 'lb', to: 'g', ratio: 453.592 },
]

// Common volume conversions
const volumeConversions: UnitConversion[] = [
  { from: 'ml', to: 'fl oz', ratio: 0.033814 },
  { from: 'l', to: 'cup', ratio: 4.22675 },
  { from: 'fl oz', to: 'ml', ratio: 29.5735 },
  { from: 'cup', to: 'ml', ratio: 236.588 },
]

// Common serving sizes and their approximate gram weights
const commonServings: Record<string, number> = {
  'cup': 240,
  'tbsp': 15,
  'tsp': 5,
  'piece': 100, // This is a rough estimate and should be adjusted per food
  'slice': 30,  // This is a rough estimate and should be adjusted per food
}

export function useUnitTranslation(preferredSystem: UnitSystem = 'metric') {
  const converter = useMemo(() => ({
    convertWeight: (value: number, fromUnit: string, toUnit: string): number => {
      if (fromUnit === toUnit) return value
      
      const conversion = weightConversions.find(c => c.from === fromUnit && c.to === toUnit)
      if (conversion) {
        return +(value * conversion.ratio).toFixed(2)
      }
      
      // Try to find reverse conversion
      const reverseConversion = weightConversions.find(c => c.from === toUnit && c.to === fromUnit)
      if (reverseConversion) {
        return +(value / reverseConversion.ratio).toFixed(2)
      }
      
      return value
    },
    convertVolume: (value: number, fromUnit: string, toUnit: string): number => {
      if (fromUnit === toUnit) return value
      
      const conversion = volumeConversions.find(c => c.from === fromUnit && c.to === toUnit)
      if (conversion) {
        return +(value * conversion.ratio).toFixed(2)
      }
      
      // Try to find reverse conversion
      const reverseConversion = volumeConversions.find(c => c.from === toUnit && c.to === fromUnit)
      if (reverseConversion) {
        return +(value / reverseConversion.ratio).toFixed(2)
      }
      
      return value
    },
    convertServing: (serving: string, toUnit: string): number => {
      const gramWeight = commonServings[serving]
      if (!gramWeight) return 0
      
      if (preferredSystem === 'metric') {
        return +(gramWeight / 1000).toFixed(2)
      } else {
        return +(gramWeight / 453.592).toFixed(2)
      }
    },
  }), [])

  return converter
} 