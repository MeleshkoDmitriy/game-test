export type TGame = {
    id: number,
    name: string,
    rating: number,
    platform: string[],
    maxOfflinePlayers: number,
    onlineMultiplayer: boolean,
    languages: string[],
    russianVoiceover: boolean,
    description: string,
    poster: string,
    screenshots: string[]
}

export type TQueryParams = {
  platform?: string[],
  onlineMultiplayer?: boolean,
  russianVoiceover?: boolean,
  maxOfflinePlayers?: number,
}