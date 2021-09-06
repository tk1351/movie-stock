export interface IMessage {
  message: string;
}

export interface UserInfo {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

interface DefaultRank {
  cnt: string;
}

export interface CrewFilter extends DefaultRank {
  crews_name: string;
}

export interface CrewRank extends DefaultRank {
  crews_category: number;
  crews_name: string;
}

export interface StudioRank extends DefaultRank {
  studios_studio: string;
}

export interface CountryRank extends DefaultRank {
  countries_name: string;
}

export type SortType = 'ASC' | 'DESC';
