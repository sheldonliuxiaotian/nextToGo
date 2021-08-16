import { RaceResponse } from '../services/interfaces';
import { RacingCategory, RACING_CATEGORIES } from '../Constants';

class Race {
  public raceId?: string;
  public meetingName?: string;
  public raceNumber: number;
  public category: RacingCategory;
  public startTime: Date;

  constructor(json: RaceResponse) {
    this.raceId = json.race_id;
    this.meetingName = json.meeting_name;
    this.raceNumber = json.race_number ?? 0;
    this.category = RACING_CATEGORIES[json.category_id ?? ''] ?? RacingCategory.Unknown;
    this.startTime = json.advertised_start?.seconds ? new Date(json.advertised_start.seconds * 1000) : new Date();
  }

  countDownTime(): string {
    let diff = Math.ceil((this.startTime.getTime() - new Date().getTime()) / 1000);
    let sign = Math.sign(diff);
    let timeInSeconds = Math.abs(diff);

    let seconds = timeInSeconds % 60;
    let timeInMinutes = Math.floor(timeInSeconds / 60);
    let minutes = Math.floor(timeInMinutes % 60);
    let hours = Math.floor(timeInMinutes / 60);

    return `${sign < 0 ? '-' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`
  }

  isOneMinPast(from: Date = new Date()): boolean {
    let diff = this.startTime.getTime() - from.getTime();
    const ONE_MINUTE = -60 * 1000;
    return diff < ONE_MINUTE;
  }
}

export default Race;