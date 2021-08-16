interface NedResponse {
  status?: number;
  data?: NedReponseData;
  message?: string;
}

interface NedReponseData {
  next_to_go_ids?: string[];
  race_summaries?: { [id: string]: RaceResponse };
}

interface RaceResponse {
  race_id?: string;
  meeting_name?: string;
  race_number?: number
  category_id?: string;
  advertised_start?: { seconds?: number };
}

export type {
  NedResponse,
  NedReponseData,
  RaceResponse,
}