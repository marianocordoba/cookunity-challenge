export const stages = ['basic', 'stage1', 'stage2'] as const

export type EvolutionStage = typeof stages[number]
